import Link from "next/link";
import { person } from "@/content/person";
import { storyPreview } from "@/content/biography";
import { speakingIntro, topics } from "@/content/topics";
import { ventures } from "@/content/ventures";
import { media, testimonials } from "@/content/media";
import { canShow, visible } from "@/lib/content";
import { withUtm } from "@/lib/links";
import { Draft } from "./Draft";
import { HeroVideo } from "./HeroVideo";
import { Photo } from "./Photo";
import { TrackedLink } from "./TrackedLink";
import { ArrowRight, Container, Eyebrow, ExternalIcon, NewTab, SpeakingCta, buttonStyles } from "./ui";

export function Hero() {
  const { hero, heroVideo } = person;
  return (
    <section className="relative isolate flex min-h-[calc(100svh-72px)] flex-col justify-end overflow-hidden bg-iron text-marble lg:min-h-[min(calc(100svh-72px),900px)] lg:justify-center">
      {canShow(heroVideo) && (
        <HeroVideo
          youtubeId={heroVideo.youtubeId}
          start={heroVideo.start}
          title={heroVideo.title}
          poster={heroVideo.poster}
        />
      )}
      {/* Scrim: keeps text legible over any frame. Heavier where the copy sits. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-iron)_0%,rgb(11_9_7/0.86)_50%,rgb(11_9_7/0.35)_100%)] lg:bg-[linear-gradient(to_right,rgb(11_9_7/0.92)_0%,rgb(11_9_7/0.78)_42%,rgb(11_9_7/0.2)_100%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-iron to-transparent lg:block" />

      <Container className="relative z-10 pt-40 pb-20 lg:py-24">
        <div className="max-w-2xl">
          <h1 className="rise font-display text-[clamp(3rem,9vw,6.5rem)] leading-[0.95] font-light">{person.name}</h1>
          <Draft item={hero} tone="dark" className="mt-8">
            <p className="rise rise-delay-1 mt-8 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.12] text-marble">
              {hero.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <p className="rise rise-delay-2 mt-6 font-sans text-xs font-semibold tracking-[0.22em] text-bronze uppercase">
              {hero.tagline}
            </p>
            <p className="rise rise-delay-2 mt-4 max-w-xl text-base leading-relaxed text-marble/85 sm:text-lg">
              {hero.intro}
            </p>
          </Draft>
          <div className="rise rise-delay-3 mt-10 flex flex-col gap-3 sm:flex-row">
            <SpeakingCta location="hero" />
            <Link href="/about" className={buttonStyles.outlineDark}>
              Meet Marc
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function RoleStrip() {
  const roles = visible(person.roles);
  return (
    <section aria-label="Roles" className="on-light border-b border-travertine bg-limestone">
      <Container className="flex flex-col gap-4 py-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10">
        {roles.map((r) => (
          <a key={r.org} href="#manifest" className="group text-sm">
            <span className="text-steel">{r.title}, </span>
            <span className="font-semibold text-iron underline-offset-4 group-hover:underline">{r.org}</span>
          </a>
        ))}
        <Draft item={person.military} className="sm:ml-auto">
          <p className="text-sm text-steel">{person.military.label}</p>
        </Draft>
      </Container>
    </section>
  );
}

export function StoryPreview() {
  if (!canShow(storyPreview)) return null;
  return (
    <section className="on-light bg-marble py-20 lg:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Photo
          image={person.candid.src ? person.candid : person.portrait}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={person.candid.src ? "aspect-[4/3] w-full" : "mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"}
        />
        <div>
          <Eyebrow>His story</Eyebrow>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{storyPreview.heading}</h2>
          <Draft item={storyPreview} className="mt-8">
            <p className="mt-6 text-lg leading-relaxed text-steel">{storyPreview.text}</p>
          </Draft>
          <Link
            href="/about"
            className="mt-8 inline-flex items-center gap-2 border-b border-iron pb-1 text-sm font-semibold"
          >
            Read his story <ArrowRight />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function SpeakingPreview() {
  const shown = visible(topics);
  if (!shown.length) return null;
  return (
    <section className="bg-iron py-20 text-marble lg:py-28">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow tone="dark">Speaking</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{speakingIntro.heading}</h2>
          </div>
          <Draft item={speakingIntro} tone="dark">
            <p className="text-lg leading-relaxed text-stone-soft">{speakingIntro.text}</p>
          </Draft>
        </div>
        <ol className="mt-14 border-t border-white/15">
          {shown.map((topic, i) => (
            <li key={topic.id} className="border-b border-white/15">
              <Draft item={topic} tone="dark" className="my-6">
                <Link
                  href={`/speaking#${topic.id}`}
                  className="group grid gap-2 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-6"
                >
                  <span className="font-sans text-sm text-bronze tabular-nums">0{i + 1}</span>
                  <span>
                    <span className="block font-display text-2xl sm:text-3xl group-hover:text-bronze">
                      {topic.title}
                    </span>
                    <span className="mt-2 block max-w-2xl text-stone-soft">{topic.short}</span>
                  </span>
                  <ArrowRight className="hidden text-bronze transition-transform group-hover:translate-x-1 sm:block" />
                </Link>
              </Draft>
            </li>
          ))}
        </ol>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <SpeakingCta location="home_speaking" />
          <Link href="/speaking" className={buttonStyles.outlineDark}>
            Speaking details
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function Ventures() {
  const shown = visible(ventures);
  return (
    <section id="manifest" className="on-light bg-marble py-20 lg:py-28">
      <Container>
        <Eyebrow>Manifest</Eyebrow>
        <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">What I&rsquo;m building.</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-8">
          {shown.map((v) => (
            <article key={v.id} className="flex flex-col border border-travertine bg-white/40">
              <Photo image={v.image} sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[3/2] w-full" />
              <div className="flex flex-1 flex-col p-6 sm:p-10">
                <p className="text-sm text-steel">{v.role}</p>
                <h3 className="mt-2 font-display text-3xl">{v.name}</h3>
                <p className="mt-4 flex-1 leading-relaxed text-steel">{v.description}</p>
                <TrackedLink
                  external
                  href={withUtm(v.url, "home_ventures")}
                  className={`${buttonStyles.solidDark} mt-8 self-start`}
                  event={{ name: "business_referral", props: { venture: v.id, location: "home_ventures" } }}
                >
                  {v.cta} <ExternalIcon />
                  <NewTab />
                </TrackedLink>
                <p className="mt-3 text-xs text-steel">{new URL(v.url).hostname.replace(/^www\./, "")}</p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

/** Selected media and testimonials. Each block is omitted entirely while empty. */
export function Proof() {
  const items = visible(media).slice(0, 3);
  const quotes = visible(testimonials);
  if (!items.length && !quotes.length) return null;
  return (
    <section className="on-light bg-limestone py-20 lg:py-28">
      <Container>
        {items.length > 0 && (
          <>
            <Eyebrow>Selected media</Eyebrow>
            <ul className="mt-10 grid gap-8 md:grid-cols-3">
              {items.map((m) => (
                <li key={m.url}>
                  <Draft item={m}>
                    <a href={m.url} target="_blank" rel="noopener noreferrer" className="group block">
                      <Photo image={m.thumbnail} sizes="(min-width: 768px) 33vw, 100vw" className="aspect-video" />
                      <p className="mt-4 font-display text-xl group-hover:underline">{m.title}</p>
                      <p className="mt-1 text-sm text-steel">{m.date}</p>
                      <NewTab />
                    </a>
                  </Draft>
                </li>
              ))}
            </ul>
          </>
        )}
        {quotes.length > 0 && (
          <ul className={`grid gap-8 md:grid-cols-2 ${items.length ? "mt-16" : ""}`}>
            {quotes.map((q) => (
              <li key={q.name}>
                <Draft item={q}>
                  <figure>
                    <blockquote className="font-display text-2xl leading-snug">&ldquo;{q.quote}&rdquo;</blockquote>
                    <figcaption className="mt-4 text-sm text-steel">
                      {q.name}, {q.role}
                    </figcaption>
                  </figure>
                </Draft>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

export function ClosingCta() {
  return (
    <section className="bg-charcoal py-20 text-marble lg:py-28">
      <Container className="max-w-3xl text-center">
        <h2 className="font-display text-4xl leading-tight sm:text-6xl">Let&rsquo;s start a conversation.</h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-soft">
          Planning an event, recording a show, or exploring a collaboration? Reach out and tell Marc what you have in
          mind.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/contact" className={buttonStyles.primary}>
            Connect With Marc
          </Link>
          <SpeakingCta location="closing" className={buttonStyles.outlineDark} />
        </div>
      </Container>
    </section>
  );
}
