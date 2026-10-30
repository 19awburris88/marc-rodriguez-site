import type { ReactNode } from "react";
import type { Approval } from "@/content/types";
import { canShow } from "@/lib/content";
import { siteConfig } from "@/lib/config";

/**
 * Renders children only when the record may be shown. In preview, draft
 * content gets a visible dashed outline and label so nobody mistakes it for
 * approved copy.
 */
export function Draft({
  item,
  children,
  tone = "light",
  className = "",
}: {
  item: Approval | undefined;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!canShow(item)) return null;
  if (item.status === "approved" || !siteConfig.isPreview) return <>{children}</>;
  return (
    <div
      className={`relative rounded-sm outline-1 outline-offset-[6px] outline-dashed ${
        tone === "dark" ? "outline-bronze/50" : "outline-bronze-deep/40"
      } ${className}`}
    >
      <DraftLabel tone={tone} title={item.note} />
      {children}
    </div>
  );
}

export function DraftLabel({
  tone = "light",
  title,
  text = "Draft · pending approval",
}: {
  tone?: "light" | "dark";
  title?: string;
  text?: string;
}) {
  return (
    <span
      title={title}
      className={`absolute -top-[18px] right-0 z-10 rounded-sm whitespace-nowrap px-1.5 py-0.5 font-sans text-[10px] font-semibold tracking-[0.12em] uppercase ${
        tone === "dark" ? "bg-bronze text-ink" : "bg-bronze-deep text-ivory"
      }`}
    >
      {text}
    </span>
  );
}
