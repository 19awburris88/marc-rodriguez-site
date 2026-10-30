import { deliverInquiry } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { HONEYPOT_FIELD, validateInquiry } from "@/lib/validation";

/**
 * POST /api/contact
 *
 * Responses (JSON):
 *   200 { status: "sent" }            provider accepted the message
 *   200 { status: "test" }            preview test adapter — NOT sent
 *   400 { status: "invalid", errors } validation failed
 *   403 { status: "forbidden" }       cross-origin request
 *   413 / 415                         body too large / not JSON
 *   429 { status: "rate_limited" }    too many requests
 *   502 { status: "failed" }          provider rejected or unreachable
 *   503 { status: "unconfigured" }    delivery not configured
 */
const MAX_BODY_BYTES = 20_000;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) {
    return Response.json({ status: "forbidden" }, { status: 403 });
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return Response.json({ status: "invalid" }, { status: 415 });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return Response.json({ status: "invalid" }, { status: 413 });

  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ status: "invalid" }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
  const limit = rateLimit(ip);
  if (!limit.allowed) {
    return Response.json(
      { status: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } },
    );
  }

  // Bots that fill the hidden field get a quiet, generic response and nothing is sent.
  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD].length > 0) {
    return Response.json({ status: "sent" });
  }

  const result = validateInquiry(body);
  if (!result.ok) return Response.json({ status: "invalid", errors: result.errors }, { status: 400 });

  const delivery = await deliverInquiry(result.data);
  switch (delivery.status) {
    case "sent":
      return Response.json({ status: "sent" });
    case "test":
      return Response.json({ status: "test" });
    case "unconfigured":
      return Response.json({ status: "unconfigured" }, { status: 503 });
    case "failed":
      return Response.json({ status: "failed" }, { status: 502 });
  }
}
