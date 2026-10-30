import type { Approval } from "./types";

/**
 * Privacy notice details. Describe only what the site actually does. Update
 * this when hosting, email provider, or analytics choices are made.
 */
export const privacy: Approval & {
  updated: string;
  emailProvider: string;
  host: string;
  analytics: string | undefined;
  privacyContact: string | undefined;
} = {
  updated: "October 30, 2026",
  emailProvider: "Resend",
  host: "Not yet selected",
  /** Name of the analytics provider once enabled; undefined means none. */
  analytics: undefined,
  /** Email address for privacy requests, supplied by Marc. */
  privacyContact: undefined,
  status: "draft",
  note: "Needs host, privacy contact, and a review by Marc before launch.",
};
