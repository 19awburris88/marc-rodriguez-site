import { Draft } from "@/components/Draft";
import { Photo } from "@/components/Photo";
import { Container, Eyebrow, NewTab, SpeakingCta, buttonStyles } from "@/components/ui";
import { shortBio } from "@/content/biography";
import { person } from "@/content/person";
import { speakerReel, speakerSheet, speakingIntro, topics } from "@/content/topics";
import { canShow, visible } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Speaking",
  description:
    "Invite Marc Rodriguez to speak on leadership, entrepreneurship, and the business of fitness. Topics, audiences, and how to inquire.",
  path: "/speaking",
});

export default function SpeakingPage() {
  const shownTopics = visible(topics);
  return (
    <>
      <section className="bg-ink text-ivory">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-[55fr_45fr] lg:gap-16 lg:py-24">
          <div>
            <Eyebrow tone="dark">Speaking</Eyebrow>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] font-light sm:text-6xl">
              {speakingIntro.heading}
            </h1>
            <Draft item={speakingIntro} tone="dark" className="mt-10">
              <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">{speakingIntro.text}</p>
            </Draft>
            <div className="mt-10">
              <SpeakingCta location="speaking_hero" />
            </div>
          </div>
          <Photo
            image={person.speakingPhoto}
            tone="dark"
            preload
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] w-full lg:aspect-[4/5] lg:max-h-[600px]"
          />
        </Container>
      </section>

      {speakerReel && (
        <section className="on-light bg-ivory-deep py-16">
          <Container className="max-w-4xl">
            <Eyebrow>Speaker reel</Eyebrow>
            <p className="mt-4 font-display text-2xl">{speakerReel.title}</p>
            <a href={speakerReel.url} target="_blank" rel="noopener noreferrer" className={`${buttonStyles.solidDark} mt-6`}>
              Watch the reel
              <NewTab />
            </a>
            {speakerReel.transcriptUrl && (
              <a href={speakerReel.transcriptUrl} className="ml-4 text-sm underline underline-offset-4">
                Read transcript
              </a>
            )}
          </Container>
        </section>
      )}

      {shownTopics.length > 0 && (
        <section className="on-light bg-ivory py-20 lg:py-28">
          <Container>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">Topics</h2>
            <div className="mt-14 space-y-6">
              {shownTopics.map((t, i) => (
                <article
                  key={t.id}
                  id={t.id}
                  className="grid gap-6 border-t border-divider pt-10 lg:grid-cols-[5rem_1.2fr_1fr] lg:gap-10"
                >
                  <span className="font-display text-4xl text-bronze-deep">0{i + 1}</span>
                  <Draft item={t} className="lg:col-span-2">
                    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10">
                      <div>
                        <h3 className="font-display text-3xl">{t.title}</h3>
                        <p className="mt-3 text-lg leading-relaxed text-stone">{t.short}</p>
                      </div>
                      <dl className="space-y-4 text-sm">
                        <div>
                          <dt className="font-semibold tracking-[0.14em] text-bronze-deep uppercase">For</dt>
                          <dd className="mt-1 text-base text-ink">{t.audience}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold tracking-[0.14em] text-bronze-deep uppercase">Takeaway</dt>
                          <dd className="mt-1 text-base text-ink">{t.takeaway}</dd>
                        </div>
                      </dl>
                    </div>
                  </Draft>
                </article>
              ))}
            </div>
          </Container>
        </section>
      )}

      {canShow(shortBio) && (
        <section className="on-light bg-ivory-deep py-20">
          <Container className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <div>
              <Eyebrow>For organizers</Eyebrow>
              <h2 className="mt-4 font-display text-3xl">Short bio</h2>
            </div>
            <div>
              <Draft item={shortBio}>
                <p className="text-lg leading-relaxed">{shortBio.text}</p>
              </Draft>
              {speakerSheet && (
                <a href={speakerSheet.href} download className={`${buttonStyles.outlineLight} mt-8`}>
                  {speakerSheet.label}
                </a>
              )}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-ink-soft py-20 text-ivory">
        <Container className="max-w-3xl text-center">
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">Planning an event?</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            Share your date, audience, and goals to start the conversation about fit and availability.
          </p>
          <div className="mt-10">
            <SpeakingCta location="speaking_footer" />
          </div>
        </Container>
      </section>
    </>
  );
}
