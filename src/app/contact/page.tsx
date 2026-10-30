import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { TrackedLink } from "@/components/TrackedLink";
import { Container, Eyebrow, ExternalIcon, NewTab } from "@/components/ui";
import { person } from "@/content/person";
import { ventures } from "@/content/ventures";
import { canShow, visible } from "@/lib/content";
import { withUtm } from "@/lib/links";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Marc Rodriguez about speaking, media and podcast appearances, or partnerships. Education and training inquiries go to the Manifest businesses.",
  path: "/contact",
});

export default function ContactPage() {
  const instagram = person.social.instagram;
  const email = canShow(person.publicEmail) ? person.publicEmail : undefined;

  const fallback = email ? (
    <p>
      You can also email{" "}
      <a href={`mailto:${email.address}`} className="underline">
        {email.address}
      </a>
      .
    </p>
  ) : (
    <p>
      You can also reach Marc on{" "}
      <a href={instagram.url} target="_blank" rel="noopener noreferrer" className="underline">
        Instagram
        <NewTab />
      </a>
      .
    </p>
  );

  return (
    <>
      <section className="bg-ink text-ivory">
        <Container className="py-16 lg:py-20">
          <Eyebrow tone="dark">Contact</Eyebrow>
          <h1 className="mt-4 max-w-3xl font-display text-5xl leading-[1.05] font-light sm:text-6xl">
            Let&rsquo;s start a conversation.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            For speaking, media, podcast, and partnership inquiries. Tell Marc about your event or idea below.
          </p>
        </Container>
      </section>

      <section className="on-light bg-ivory py-16 lg:py-24">
        <Container className="grid gap-16 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <div>
            <h2 className="sr-only">Inquiry form</h2>
            <ContactForm fallback={fallback} />
          </div>

          <aside className="space-y-10 lg:border-l lg:border-divider lg:pl-12">
            <div>
              <h2 className="font-display text-2xl">Looking for training or education?</h2>
              <p className="mt-3 text-stone">
                Course, enrollment, trainer, and facility questions are handled directly by each business.
              </p>
              <ul className="mt-6 space-y-4">
                {visible(ventures).map((v) => (
                  <li key={v.id}>
                    <TrackedLink
                      external
                      href={withUtm(v.url, "contact_sidebar")}
                      className="group flex items-start justify-between gap-4 border border-divider bg-white/50 p-4 hover:border-ink"
                      event={{ name: "business_referral", props: { venture: v.id, location: "contact_sidebar" } }}
                    >
                      <span>
                        <span className="block font-semibold">{v.name}</span>
                        <span className="text-sm text-stone">{new URL(v.url).hostname.replace(/^www\./, "")}</span>
                      </span>
                      <ExternalIcon className="mt-1 shrink-0" />
                      <NewTab />
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl">Elsewhere</h2>
              <ul className="mt-4 space-y-2 text-stone">
                {email && (
                  <li>
                    <a href={`mailto:${email.address}`} className="underline underline-offset-4 hover:text-ink">
                      {email.address}
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={instagram.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="underline underline-offset-4 hover:text-ink"
                  >
                    Instagram {instagram.handle}
                    <NewTab />
                  </a>
                </li>
              </ul>
              <p className="mt-6 text-sm text-stone">
                How inquiries are handled: see the{" "}
                <Link href="/privacy" className="underline underline-offset-4">
                  privacy notice
                </Link>
                .
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
