import { person } from "@/content/person";
import { ventures } from "@/content/ventures";
import { visible } from "@/lib/content";
import { siteConfig } from "@/lib/config";

/**
 * Person structured data built from approved facts only. The Manifest
 * businesses are separate Organizations — this is not a local-business listing.
 */
export function PersonJsonLd() {
  const orgs = visible(ventures).filter((v) => v.status === "approved");
  const roles = person.roles.filter((r) => r.status === "approved");
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    url: siteConfig.url,
    jobTitle: roles.map((r) => `${r.title}, ${r.org}`),
    worksFor: orgs.map((v) => ({ "@type": "Organization", name: v.name, url: v.url })),
    sameAs: Object.values(person.social)
      .filter((s) => s.status === "approved")
      .map((s) => s.url),
    ...(person.portrait.status === "approved" && person.portrait.src
      ? { image: `${siteConfig.url}${person.portrait.src}` }
      : {}),
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
