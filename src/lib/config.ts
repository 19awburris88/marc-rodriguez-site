/**
 * Central site configuration. Everything environment-specific lives here.
 *
 * NEXT_PUBLIC_SITE_MODE  "preview" (default) shows labeled drafts and is noindex.
 *                        "production" shows approved content only and enforces
 *                        the launch gate (see lib/launch.ts).
 * NEXT_PUBLIC_SITE_URL   Canonical origin, e.g. https://marcrodriguez.com.
 *                        No domain has been chosen yet.
 */
const mode = process.env.NEXT_PUBLIC_SITE_MODE === "production" ? "production" : "preview";

export const siteConfig = {
  mode,
  isPreview: mode === "preview",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  urlConfigured: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  title: "Marc Rodriguez | Speaker and Manifest Founder",
  description:
    "Marc Rodriguez is the founder and CEO of Manifest Fitness Institute and owner of Manifest Dallas, speaking on leadership, entrepreneurship, and the business of fitness.",
  /** Optional attribution on outbound business links. Off unless set. */
  utm: {
    source: process.env.NEXT_PUBLIC_UTM_SOURCE,
    medium: process.env.NEXT_PUBLIC_UTM_MEDIUM || "referral",
    campaign: process.env.NEXT_PUBLIC_UTM_CAMPAIGN || "marc-personal-site",
  },
} as const;

/** Scrolls to the contact form with Speaking preselected (read by ContactForm). */
export const speakingHref = "/?type=speaking#contact";
