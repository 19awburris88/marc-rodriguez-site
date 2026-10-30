import type { Metadata } from "next";
import { siteConfig } from "./config";

/** Per-route metadata with canonical URL and social preview. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | Marc Rodriguez` : siteConfig.title;
  return {
    title: title ? { absolute: fullTitle } : { absolute: siteConfig.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: "Marc Rodriguez",
      type: path === "/" ? "website" : "profile",
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
