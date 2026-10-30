"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** next/link (or a plain anchor for external URLs) that records an analytics event on click. */
export function TrackedLink({
  event,
  external = false,
  onClick,
  ...props
}: ComponentProps<typeof Link> & { event: AnalyticsEvent; external?: boolean }) {
  const handleClick: ComponentProps<typeof Link>["onClick"] = (e) => {
    track(event);
    onClick?.(e);
  };
  if (external) {
    const { href, ...rest } = props;
    return (
      <a
        href={String(href)}
        target="_blank"
        rel="noopener noreferrer"
        {...(rest as ComponentProps<"a">)}
        onClick={handleClick}
      />
    );
  }
  return <Link {...props} onClick={handleClick} />;
}
