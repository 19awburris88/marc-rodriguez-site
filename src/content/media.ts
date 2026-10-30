import type { MediaItem, Testimonial } from "./types";

/**
 * Up to three selected videos, interviews, or posts. Link to the original and
 * use an approved local thumbnail. The section is hidden while this is empty.
 */
export const media: MediaItem[] = [];

/**
 * Real quotes only — attributed to a real person with a role and written
 * permission to publish. Hidden while empty. Never add sample praise, and do
 * not copy the Institute's "pending approval" testimonials.
 */
export const testimonials: Testimonial[] = [];
