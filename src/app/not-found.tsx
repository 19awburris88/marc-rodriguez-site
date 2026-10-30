import Link from "next/link";
import { Container, SpeakingCta, buttonStyles } from "@/components/ui";

export const metadata = {
  title: { absolute: "Page not found | Marc Rodriguez" },
  robots: { index: false },
};

const links = [
  { href: "/about", label: "About Marc", text: "His background and story" },
  { href: "/speaking", label: "Speaking", text: "Topics and how to book" },
  { href: "/#manifest", label: "Manifest", text: "The Institute and Manifest Dallas" },
  { href: "/contact", label: "Contact", text: "Send an inquiry" },
];

export default function NotFound() {
  return (
    <section className="bg-iron text-marble">
      <Container className="py-24 lg:py-32">
        <p className="font-sans text-xs font-semibold tracking-[0.2em] text-bronze uppercase">404</p>
        <h1 className="mt-4 max-w-2xl font-display text-5xl leading-tight font-light sm:text-6xl">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-stone-soft">
          The link may be old or mistyped. Here&rsquo;s where most people are headed:
        </p>
        <ul className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href} className="bg-iron">
              <Link href={l.href} className="block p-6 hover:bg-charcoal">
                <span className="block font-display text-2xl">{l.label}</span>
                <span className="mt-1 block text-sm text-stone-soft">{l.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className={buttonStyles.outlineDark}>
            Back to home
          </Link>
          <SpeakingCta location="404" />
        </div>
      </Container>
    </section>
  );
}
