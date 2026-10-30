import Link from "next/link";
import { person } from "@/content/person";
import { ventures } from "@/content/ventures";
import { visible } from "@/lib/content";
import { withUtm } from "@/lib/links";
import { TrackedLink } from "./TrackedLink";
import { Container, NewTab } from "./ui";

export function Footer() {
  const roles = visible(person.roles);
  const instagram = person.social.instagram;
  return (
    <footer className="bg-iron text-stone-soft">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="font-display text-2xl text-marble">
            {person.name}
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-relaxed">
            {roles.map((r) => `${r.title}, ${r.org}`).join(" · ")}
          </p>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-bronze uppercase">Ventures</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {visible(ventures).map((v) => (
              <li key={v.id}>
                <TrackedLink
                  external
                  href={withUtm(v.url, "footer")}
                  className="hover:text-marble"
                  event={{ name: "business_referral", props: { venture: v.id, location: "footer" } }}
                >
                  {v.name}
                  <NewTab />
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-bronze uppercase">Connect</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/contact" className="hover:text-marble">
                Contact
              </Link>
            </li>
            <li>
              <a href={instagram.url} target="_blank" rel="noopener noreferrer me" className="hover:text-marble">
                Instagram <span className="text-stone-soft/70">{instagram.handle}</span>
                <NewTab />
              </a>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-marble">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
      </Container>
      <Container className="border-t border-white/10 py-6 text-xs">
        <p>
          © {COPYRIGHT_YEAR} {person.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

/** Fixed at build time; reading the clock during render would opt routes out of prerendering. */
const COPYRIGHT_YEAR = 2026;
