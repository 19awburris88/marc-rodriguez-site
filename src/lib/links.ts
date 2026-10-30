import { siteConfig } from "./config";

/**
 * Adds UTM attribution to an outbound business link when NEXT_PUBLIC_UTM_SOURCE
 * is configured. Existing query parameters on the destination are preserved
 * and never overwritten.
 */
export function withUtm(href: string, content?: string): string {
  const { source, medium, campaign } = siteConfig.utm;
  if (!source) return href;
  const url = new URL(href);
  const params: Record<string, string | undefined> = {
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
    utm_content: content,
  };
  for (const [key, value] of Object.entries(params)) {
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
  }
  return url.toString();
}
