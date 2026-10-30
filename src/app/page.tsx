import { About, Contact, Hero, Proof, RoleStrip, Speaking, Ventures } from "@/components/home";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ description: siteConfig.description, path: "/" });

/** One-page site: every section is an anchor target for the header nav. */
export default function Home() {
  return (
    <>
      <Hero />
      <RoleStrip />
      <About />
      <Speaking />
      <Ventures />
      <Proof />
      <Contact />
    </>
  );
}
