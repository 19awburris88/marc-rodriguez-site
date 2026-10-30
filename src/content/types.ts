/**
 * Every public-facing record carries an approval status.
 *
 * - "approved": confirmed by Marc (or a verifiable fact Austin supplied and a
 *   public source supports). Renders in production.
 * - "draft": proposed copy or an unconfirmed detail. Renders only in preview
 *   mode, visibly labeled. Never renders in production.
 */
export type ContentStatus = "approved" | "draft";

export type Approval = {
  status: ContentStatus;
  /** Where the underlying fact came from (URL or "Supplied by Austin"). */
  source?: string;
  /** Who approved it and when, or what is still needed. */
  note?: string;
};

export type ImageAsset = Approval & {
  /** Path under /public. Leave undefined until the real file exists. */
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  /** Describes the photo we need, shown on the preview placeholder. */
  needed: string;
};

export type Topic = Approval & {
  id: string;
  title: string;
  short: string;
  audience: string;
  takeaway: string;
};

export type Venture = Approval & {
  id: string;
  name: string;
  role: string;
  description: string;
  cta: string;
  url: string;
  logo?: ImageAsset;
  image?: ImageAsset;
};

export type MediaItem = Approval & {
  title: string;
  date: string;
  url: string;
  kind: "video" | "interview" | "podcast" | "post";
  thumbnail: ImageAsset;
};

export type Testimonial = Approval & {
  quote: string;
  name: string;
  role: string;
  /** Written permission to publish, e.g. "Email from J. Smith, 2026-11-02". */
  permission: string;
};

export type BioChapter = Approval & {
  id: string;
  title: string;
  body: string;
};
