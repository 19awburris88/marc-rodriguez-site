import { ClosingCta, Hero, Proof, RoleStrip, SpeakingPreview, StoryPreview, Ventures } from "@/components/home";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({ description: siteConfig.description, path: "/" });

export default function Home() {
  return (
    <>
      <Hero />
      <RoleStrip />
      <StoryPreview />
      <SpeakingPreview />
      <Ventures />
      <Proof />
      <ClosingCta />
    </>
  );
}
