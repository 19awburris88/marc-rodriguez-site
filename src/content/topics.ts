import type { Topic } from "./types";

/**
 * Proposed session concepts from the brief — NOT verified titles from Marc's
 * catalog. They render only in preview until Marc confirms or replaces them.
 */
export const topics: Topic[] = [
  {
    id: "leadership",
    title: "Leadership People Can Feel",
    short: "Leading people so expectations become clear communication and consistent action.",
    audience: "Teams, business leaders, and professional associations",
    takeaway: "Turn expectations into clearer communication and consistent action.",
    status: "draft",
    note: "Proposed concept. Marc to confirm title, description, and formats.",
  },
  {
    id: "entrepreneurship",
    title: "From Expertise to Enterprise",
    short: "Turning technical skill into a business people choose and return to.",
    audience: "Entrepreneurs and independent professionals",
    takeaway: "Connect technical skill with positioning, customer experience, and business systems.",
    status: "draft",
    note: "Proposed concept. Marc to confirm title, description, and formats.",
  },
  {
    id: "fitness-business",
    title: "The Business Behind the Fitness",
    short: "The professional habits that keep a training business sustainable.",
    audience: "Trainers, gym owners, and fitness education events",
    takeaway: "Understand the professional habits that support a sustainable training business.",
    status: "draft",
    note: "Proposed concept. Marc to confirm title, description, and formats.",
  },
];

export const speakingIntro = {
  heading: "Conversations that move people to act.",
  text: "Marc speaks on leadership, entrepreneurship, and the business of fitness — drawing on more than two decades of Marine Corps service and the work of building Manifest.",
  status: "draft" as const,
  note: "Draft positioning. Marc to approve.",
};

/** Speaker reel URL (YouTube/Vimeo) once supplied. Block is omitted until then. */
export const speakerReel: { url: string; title: string; transcriptUrl?: string } | undefined = undefined;

/** Downloadable speaker sheet. Only set once the PDF exists in /public. */
export const speakerSheet: { href: string; label: string } | undefined = undefined;
