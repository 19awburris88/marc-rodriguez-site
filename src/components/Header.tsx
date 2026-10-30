"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { speakingHref } from "@/lib/config";
import { track } from "@/lib/analytics";
import { Container, buttonStyles } from "./ui";

const nav = [
  { href: "/#about", label: "About" },
  { href: "/#speaking", label: "Speaking" },
  { href: "/#manifest", label: "Manifest" },
  { href: "/#contact", label: "Contact" },
];

const sectionIds = nav.map((item) => item.href.slice(2));

export function Header({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [panelTop, setPanelTop] = useState(72);
  const [section, setSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      // Keep Tab focus inside the open menu (toggle button + panel links).
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [
          toggleRef.current,
          ...panelRef.current.querySelectorAll<HTMLElement>("a"),
        ].filter(Boolean) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  // Scroll-spy: highlight the section occupying the middle of the viewport (home page only).
  useEffect(() => {
    if (pathname !== "/") return;
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        setSection(sectionIds.find((id) => inBand.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  // Release the scroll lock before the hash jump so the page can actually scroll.
  const closeMenu = () => {
    document.body.style.overflow = "";
    setOpen(false);
  };

  const toggle = () => {
    // Anchor the panel to the header's current bottom edge (the preview banner may sit above it).
    if (!open && headerRef.current) setPanelTop(headerRef.current.getBoundingClientRect().bottom);
    setOpen((v) => !v);
  };

  const isActive = (href: string) => pathname === "/" && section === href.slice(2);

  return (
    <>
      <header ref={headerRef} className="material-dark sticky top-0 z-40 text-marble">
        <a
          href="#main"
          className="sr-only z-50 bg-red px-4 py-2 font-semibold text-marble focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
        >
          Skip to content
        </a>
        <Container className="flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="font-display text-xl sm:text-2xl" onClick={closeMenu}>
            {name}
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            <ul className="flex items-center gap-8 font-sans text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "true" : undefined}
                    className={`py-2 transition-colors duration-150 hover:text-marble ${
                      isActive(item.href)
                        ? "text-marble underline decoration-red decoration-2 underline-offset-8"
                        : "text-stone-soft"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={speakingHref}
              className={`${buttonStyles.primary} min-h-10 px-5`}
              onClick={() => track({ name: "speaking_cta_click", props: { location: "header" } })}
            >
              Inquire About Speaking
            </Link>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center transition-transform duration-100 active:scale-90 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={toggle}
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
            </svg>
          </button>
        </Container>
      </header>

      {/*
        Sibling of the header (not a child): backdrop-filter would otherwise become the
        containing block for this fixed panel. Enters and exits along the same path —
        down from the header, back up into it — anchored to the top edge.
      */}
      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        style={{ top: panelTop }}
        className={`fixed inset-x-0 bottom-0 z-30 origin-top overflow-y-auto bg-iron text-marble transition-[opacity,transform,visibility] duration-300 ease-settle lg:hidden motion-reduce:transform-none ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"
        }`}
      >
        <nav aria-label="Mobile">
          <Container className="flex flex-col py-6">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href} className="border-b border-white/10">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "true" : undefined}
                    className="block py-5 font-display text-3xl transition-colors active:text-stone-soft"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href={speakingHref}
              className={`${buttonStyles.primary} mt-8 w-full`}
              onClick={() => {
                track({ name: "speaking_cta_click", props: { location: "mobile_menu" } });
                closeMenu();
              }}
            >
              Inquire About Speaking
            </Link>
          </Container>
        </nav>
      </div>
    </>
  );
}
