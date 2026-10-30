import { sources } from "./sources";
import type { Approval, BioChapter } from "./types";

/** Proposed short bio from the brief. Website copy, not a quotation from Marc. */
export const shortBio: Approval & { text: string } = {
  text: "Marc Rodriguez is the founder and CEO of Manifest Fitness Institute and owner of Manifest Dallas. A retired U.S. Marine, he brings experience in leadership, entrepreneurship, and fitness business to his work as a speaker and educator.",
  status: "draft",
  source: `${sources.instagram}; ${sources.manifestDallas}`,
  note: "Marc to approve wording.",
};

export const storyPreview: Approval & { heading: string; text: string } = {
  heading: "The experience behind the perspective.",
  text: "Marc's path runs from more than two decades of Marine Corps service to independent personal training, and from there to owning a training facility and building a school for the next generation of fitness professionals. Each chapter shaped how he thinks about leading people and building something that lasts.",
  status: "draft",
  source: sources.manifestDallas,
  note: "Paraphrases the Manifest Dallas biography. Marc to approve.",
};

/**
 * Career chapters for /about. No dates until confirmed — do not derive a
 * founding timeline from the length of military service.
 */
export const chapters: BioChapter[] = [
  {
    id: "military",
    title: "Leading in the Marine Corps",
    body: "Marc served 21 years in the United States Marine Corps before retiring. [Pending interview: what that service taught him about leading people.]",
    status: "draft",
    source: `${sources.manifestDallas}; ${sources.instagram}`,
    note: "Service length from the Manifest Dallas bio. Bracketed text needs Marc's own account.",
  },
  {
    id: "training",
    title: "Building a training practice",
    body: "After the Marine Corps, Marc worked as an independent personal trainer — learning firsthand what it takes to earn clients, deliver results, and run a business on your own. [Pending interview: key lessons from this period.]",
    status: "draft",
    source: sources.manifestDallas,
  },
  {
    id: "manifest",
    title: "Building Manifest",
    body: "That experience led to Manifest Dallas, a professional training environment for independent trainers and their clients, and Manifest Fitness Institute, which pairs fitness education with practical coaching and business development. [Pending interview: why he built Manifest and the problems he wants to solve.]",
    status: "draft",
    source: `${sources.manifestDallas}; ${sources.instituteAbout}`,
  },
];

/** Marc's leadership philosophy in his own words. Nothing to show until the interview. */
export const philosophy: (Approval & { text: string }) | undefined = undefined;

/** Interview prompts to collect the full 250–400 word bio. Used in preview placeholders and docs. */
export const interviewQuestions = [
  "Why did you build Manifest?",
  "What problems do you want to solve for fitness professionals?",
  "What did the Marine Corps teach you about leading people?",
  "What do you want an audience to walk away with?",
];
