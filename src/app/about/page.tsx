import Link from "next/link";
import { Draft, DraftLabel } from "@/components/Draft";
import { Photo } from "@/components/Photo";
import { Container, Eyebrow, SpeakingCta, buttonStyles } from "@/components/ui";
import { chapters, interviewQuestions, philosophy, shortBio } from "@/content/biography";
import { person } from "@/content/person";
import { canShow, visible } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "The story of Marc Rodriguez — retired U.S. Marine, founder and CEO of Manifest Fitness Institute, and owner of Manifest Dallas.",
  path: "/about",
});

export default function AboutPage() {
  const shownChapters = visible(chapters);
  return (
    <>
      <section className="bg-iron text-marble">
        <Container className="grid items-end gap-12 py-16 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:py-24">
          <div>
            <Eyebrow tone="dark">About</Eyebrow>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] font-light sm:text-7xl">{person.name}</h1>
            <Draft item={shortBio} tone="dark" className="mt-10">
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-stone-soft">{shortBio.text}</p>
            </Draft>
          </div>
          <Photo
            image={person.portrait}
            tone="dark"
            preload
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] max-h-[620px] w-full sm:aspect-[5/4] lg:aspect-[4/5]"
          />
        </Container>
      </section>

      {shownChapters.length > 0 && (
        <section className="on-light bg-marble py-20 lg:py-28">
          <Container className="max-w-4xl">
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">Three chapters, one throughline.</h2>
            <ol className="mt-14 space-y-14">
              {shownChapters.map((c, i) => (
                <li key={c.id} id={c.id} className="grid gap-4 border-t border-travertine pt-10 sm:grid-cols-[6rem_1fr]">
                  <span className="font-display text-4xl text-red">0{i + 1}</span>
                  <Draft item={c}>
                    <h3 className="font-display text-2xl sm:text-3xl">{c.title}</h3>
                    <p className="mt-4 text-lg leading-relaxed text-steel">{c.body}</p>
                  </Draft>
                </li>
              ))}
            </ol>
          </Container>
        </section>
      )}

      <Philosophy />

      <section className="bg-charcoal py-20 text-marble">
        <Container className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-xl font-display text-3xl leading-tight sm:text-4xl">
            Bring Marc&rsquo;s perspective to your event.
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SpeakingCta location="about" />
            <Link href="/#manifest" className={buttonStyles.outlineDark}>
              See what he&rsquo;s building
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

/** Leadership philosophy in Marc's own words. Preview shows what is still needed; production omits it. */
function Philosophy() {
  if (canShow(philosophy)) {
    return (
      <section className="on-light bg-limestone py-20 lg:py-28">
        <Container className="max-w-3xl">
          <Eyebrow>Leadership philosophy</Eyebrow>
          <Draft item={philosophy} className="mt-8">
            <p className="mt-6 font-display text-3xl leading-snug">{philosophy.text}</p>
          </Draft>
        </Container>
      </section>
    );
  }
  if (!siteConfig.isPreview) return null;
  return (
    <section className="on-light bg-limestone py-20">
      <Container className="max-w-3xl">
        <div className="relative border border-dashed border-red/40 p-8">
          <DraftLabel text="Pending client interview" />
          <Eyebrow>Leadership philosophy</Eyebrow>
          <p className="mt-4 text-steel">
            This section will hold Marc&rsquo;s philosophy in his own words, along with a fuller 250–400 word
            biography. Questions to cover:
          </p>
          <ul className="mt-4 list-disc space-y-1 pl-5 text-steel">
            {interviewQuestions.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
