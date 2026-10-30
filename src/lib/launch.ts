import "server-only";
import { shortBio } from "@/content/biography";
import { person } from "@/content/person";
import { topics } from "@/content/topics";
import { privacy } from "@/content/privacy";
import { siteConfig } from "./config";
import { getDeliveryConfig } from "./email";

/**
 * Content and configuration that must exist before the public launch.
 * Mirrors the "blocks production" rows in docs/CONTENT_GAPS.md.
 */
export function launchBlockers(): string[] {
  const blockers: string[] = [];
  if (person.portrait.status !== "approved" || !person.portrait.src)
    blockers.push("Approved primary portrait (content/person.ts → portrait)");
  if (person.hero.status !== "approved") blockers.push("Approved hero copy (content/person.ts → hero)");
  if (shortBio.status !== "approved") blockers.push("Approved short biography (content/biography.ts → shortBio)");
  if (!topics.some((t) => t.status === "approved"))
    blockers.push("At least one Marc-approved speaking topic (content/topics.ts)");
  if (privacy.status !== "approved") blockers.push("Reviewed privacy notice (content/privacy.ts)");
  if (!siteConfig.urlConfigured) blockers.push("NEXT_PUBLIC_SITE_URL (final domain)");
  if (getDeliveryConfig().kind !== "resend")
    blockers.push("Contact delivery: CONTACT_DELIVERY=resend + RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL");
  return blockers;
}

/** Fails the production build/render when launch content is unresolved. */
export function assertLaunchReady(): void {
  if (siteConfig.isPreview) return;
  const blockers = launchBlockers();
  if (blockers.length) {
    throw new Error(
      `Production launch blocked. Resolve these items or set NEXT_PUBLIC_SITE_MODE=preview:\n- ${blockers.join("\n- ")}`,
    );
  }
}
