import type { ReactNode } from "react";
import { speakingHref } from "@/lib/config";
import { TrackedLink } from "./TrackedLink";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`font-sans text-xs font-semibold tracking-[0.2em] uppercase ${
        tone === "dark" ? "text-bronze" : "text-red"
      }`}
    >
      {children}
    </p>
  );
}

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-2 px-6 font-sans text-sm font-semibold tracking-wide transition-[background-color,border-color,color,transform] duration-150 ease-out active:scale-[0.97] active:duration-100";

export const buttonStyles = {
  primary: `${buttonBase} bg-red text-marble hover:bg-red-deep`,
  outlineDark: `${buttonBase} border border-stone-soft/40 text-marble hover:border-marble`,
  outlineLight: `${buttonBase} border border-iron/25 text-iron hover:border-iron`,
  solidDark: `${buttonBase} bg-iron text-marble hover:bg-charcoal`,
};

/** The sitewide primary CTA. Jumps to the contact form with Speaking preselected. */
export function SpeakingCta({
  location,
  className = buttonStyles.primary,
  children = "Inquire About Speaking",
}: {
  location: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <TrackedLink href={speakingHref} className={className} event={{ name: "speaking_cta_click", props: { location } }}>
      {children}
    </TrackedLink>
  );
}

export function ArrowRight({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={`h-4 w-4 ${className}`}>
      <path d="M4 10h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

export function ExternalIcon({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" fill="none" className={`h-3.5 w-3.5 ${className}`}>
      <path d="M8 4H4v12h12v-4M11 4h5v5m0-5-7 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
    </svg>
  );
}

/** Screen-reader note appended to links that open a new tab. */
export function NewTab() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}
