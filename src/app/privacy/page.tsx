import Link from "next/link";
import { Draft } from "@/components/Draft";
import { Container, Eyebrow } from "@/components/ui";
import { privacy } from "@/content/privacy";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Privacy",
  description: "How this site handles the information you share through the contact form.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <section className="on-light bg-ivory py-16 lg:py-24">
      <Container className="max-w-3xl">
        <Eyebrow>Privacy</Eyebrow>
        <h1 className="mt-4 font-display text-5xl leading-tight">Privacy notice</h1>
        <p className="mt-4 text-sm text-stone">Last updated {privacy.updated}</p>

        <Draft item={privacy} className="mt-12">
          <div className="mt-10 space-y-10 text-lg leading-relaxed text-stone [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-ink">
            <div>
              <h2>What we collect</h2>
              <p className="mt-3">
                When you use the <Link href="/contact" className="underline">contact form</Link>, we collect the
                details you enter: your name, email address, inquiry type, and message, plus any optional details such
                as your organization, website, event date, and location. Please don&rsquo;t include health information
                or payment details — the form isn&rsquo;t designed for them.
              </p>
            </div>
            <div>
              <h2>How it&rsquo;s used</h2>
              <p className="mt-3">
                Your inquiry is delivered by email so it can be read and answered. It is used only to respond to you.
                Submitting the form does not subscribe you to a newsletter or marketing list.
              </p>
            </div>
            <div>
              <h2>Service providers</h2>
              <p className="mt-3">
                Form submissions are sent through {privacy.emailProvider}, an email delivery service. This site does
                not store submissions in its own database. The site&rsquo;s hosting provider may keep standard server
                logs, such as IP addresses and request times, for security and reliability.
              </p>
            </div>
            <div>
              <h2>Analytics</h2>
              <p className="mt-3">
                {privacy.analytics
                  ? `This site uses ${privacy.analytics} to count visits and clicks in aggregate. Names, email addresses, and message content are never sent to analytics.`
                  : "This site does not currently use analytics or advertising trackers."}
              </p>
            </div>
            <div>
              <h2>Retention and your choices</h2>
              <p className="mt-3">
                Inquiry emails are kept only as long as needed to respond and follow up. To ask for a copy of your
                message or for it to be deleted,{" "}
                {privacy.privacyContact ? (
                  <>
                    email{" "}
                    <a href={`mailto:${privacy.privacyContact}`} className="underline">
                      {privacy.privacyContact}
                    </a>
                    .
                  </>
                ) : (
                  <>
                    send a request through the <Link href="/contact" className="underline">contact form</Link>.
                  </>
                )}
              </p>
            </div>
          </div>
        </Draft>
      </Container>
    </section>
  );
}
