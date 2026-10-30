import "server-only";
import { siteConfig } from "./config";
import { inquiryLabel, type InquiryInput } from "./validation";

/**
 * Server-side delivery for contact inquiries.
 *
 * CONTACT_DELIVERY=resend  Sends through Resend. Requires RESEND_API_KEY,
 *                          CONTACT_TO_EMAIL (supplied by Marc/Austin) and
 *                          CONTACT_FROM_EMAIL (a verified sender).
 * CONTACT_DELIVERY=test    Logs the inquiry on the server instead of sending.
 *                          Allowed only in preview mode, and the UI says so.
 * unset / anything else    Unconfigured: the form reports that it cannot send.
 */
export type DeliveryResult =
  | { status: "sent" }
  | { status: "test" }
  | { status: "unconfigured" }
  | { status: "failed"; reason: string };

type DeliveryConfig =
  | { kind: "resend"; apiKey: string; to: string; from: string }
  | { kind: "test" }
  | { kind: "none"; missing: string[] };

export function getDeliveryConfig(): DeliveryConfig {
  const mode = process.env.CONTACT_DELIVERY;
  if (mode === "test" && siteConfig.isPreview) return { kind: "test" };
  if (mode === "resend") {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL;
    if (apiKey && to && from) return { kind: "resend", apiKey, to, from };
    return {
      kind: "none",
      missing: [
        !apiKey && "RESEND_API_KEY",
        !to && "CONTACT_TO_EMAIL",
        !from && "CONTACT_FROM_EMAIL",
      ].filter(Boolean) as string[],
    };
  }
  return { kind: "none", missing: ["CONTACT_DELIVERY"] };
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function rows(inquiry: InquiryInput): [string, string][] {
  const out: [string, string | undefined][] = [
    ["Inquiry type", inquiryLabel(inquiry.type)],
    ["Name", inquiry.name],
    ["Email", inquiry.email],
    ["Organization", inquiry.organization],
    ["Event date", inquiry.eventDate],
    ["Location", inquiry.location],
    ["Website", inquiry.website],
  ];
  return out.filter((r): r is [string, string] => Boolean(r[1]));
}

export function composeEmail(inquiry: InquiryInput) {
  const subject = `${inquiryLabel(inquiry.type)} inquiry from ${inquiry.name}`.replace(/[\r\n]+/g, " ");
  const text = [...rows(inquiry).map(([k, v]) => `${k}: ${v}`), "", inquiry.message].join("\n");
  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows(
    inquiry,
  )
    .map(
      ([k, v]) =>
        `<tr><td style="color:#5c5a55;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`,
    )
    .join(
      "",
    )}</table><p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(inquiry.message)}</p>`;
  return { subject, text, html };
}

export async function deliverInquiry(inquiry: InquiryInput): Promise<DeliveryResult> {
  const config = getDeliveryConfig();

  if (config.kind === "none") {
    console.error(`[contact] Delivery not configured. Missing: ${config.missing.join(", ")}`);
    return { status: "unconfigured" };
  }

  const message = composeEmail(inquiry);

  if (config.kind === "test") {
    console.info("[contact:test] Inquiry NOT sent (CONTACT_DELIVERY=test)\n" + message.text);
    return { status: "test" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: inquiry.email,
        subject: message.subject,
        text: message.text,
        html: message.html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[contact] Resend rejected the message (${res.status}): ${body.slice(0, 500)}`);
      return { status: "failed", reason: `provider_${res.status}` };
    }
    return { status: "sent" };
  } catch (error) {
    console.error("[contact] Resend request failed", error);
    return { status: "failed", reason: "network" };
  }
}
