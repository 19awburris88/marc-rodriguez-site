import { sources } from "./sources";
import type { Approval, ImageAsset } from "./types";

export const person = {
  name: "Marc Rodriguez",
  roles: [
    {
      title: "Founder & CEO",
      org: "Manifest Fitness Institute",
      status: "approved",
      source: `${sources.austin}; ${sources.instagram}`,
    },
    {
      title: "Owner",
      org: "Manifest Dallas",
      status: "approved",
      source: `${sources.austin}; ${sources.manifestDallas}`,
    },
  ] satisfies (Approval & { title: string; org: string })[],

  /** Shown after the roles. Brief: include only after Marc approves the wording. */
  military: {
    label: "U.S. Marine Corps, Retired",
    status: "draft",
    source: `${sources.instagram} (USMC retired); ${sources.manifestDallas} (21 years of service)`,
    note: "Marc to approve exact wording. Do not add rank, deployments, or unit.",
  } as Approval & { label: string },

  /** Optional social reference, subject to Marc's preference. */
  socialAlias: {
    label: "The Real Manifest CEO",
    status: "draft",
    source: sources.instagram,
    note: "Marc to confirm he wants this shown on the site.",
  } as Approval & { label: string },

  social: {
    instagram: {
      handle: "@therealmanifestceo",
      url: sources.instagram,
      status: "approved",
      source: sources.instagram,
    },
  } as Record<string, Approval & { handle: string; url: string }>,

  /** Public booking/contact email. Undefined until Marc supplies one. */
  publicEmail: undefined as (Approval & { address: string }) | undefined,

  hero: {
    tagline: "Founder. Entrepreneur. Keynote Speaker.",
    headline: ["Leadership that builds people.", "Experience that builds businesses."],
    intro:
      "Marc Rodriguez brings his perspective on leadership, entrepreneurship, and the business of fitness to the stage and to the organizations he leads.",
    status: "draft",
    note: "Draft copy from the brief. Marc to approve.",
  } as Approval & { tagline: string; headline: string[]; intro: string },

  portrait: {
    src: undefined,
    alt: "Portrait of Marc Rodriguez",
    needed: "Primary portrait of Marc — high resolution, clear face, room to crop for mobile",
    status: "draft",
    note: "Request originals. The Institute About page portrait is a candidate, not an approval.",
  } as ImageAsset,

  candid: {
    src: undefined,
    alt: "Marc Rodriguez teaching a group of fitness professionals",
    needed: "Candid photo of Marc teaching, working, or leading",
    status: "draft",
  } as ImageAsset,

  speakingPhoto: {
    src: undefined,
    alt: "Marc Rodriguez speaking to an audience",
    needed: "Marc on stage or speaking to a room",
    status: "draft",
  } as ImageAsset,
};
