import Image from "next/image";
import type { ImageAsset } from "@/content/types";
import { canShow } from "@/lib/content";
import { siteConfig } from "@/lib/config";

/**
 * An approved photo, or — in preview only — a clearly labeled placeholder
 * describing the photo we need. Never substitutes another person.
 * Returns null in production when no approved file exists.
 */
export function Photo({
  image,
  sizes,
  preload = false,
  tone = "light",
  className = "",
}: {
  image: ImageAsset | undefined;
  sizes: string;
  preload?: boolean;
  tone?: "light" | "dark";
  className?: string;
}) {
  if (!image || !canShow(image)) return null;

  if (image.src && image.width && image.height) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          preload={preload}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  if (!siteConfig.isPreview) return null;

  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${image.needed}`}
      className={`relative flex items-end overflow-hidden border border-dashed ${
        dark ? "border-bronze/40 bg-charcoal text-stone-soft" : "border-red/40 bg-limestone text-steel"
      } ${className}`}
    >
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full ${dark ? "text-bronze/10" : "text-red/10"}`}
      >
        <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.3" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.3" />
      </svg>
      <div className="relative p-5">
        <p
          className={`font-sans text-[11px] font-semibold tracking-[0.16em] uppercase ${
            dark ? "text-bronze" : "text-red"
          }`}
        >
          Photo needed
        </p>
        <p className="mt-1 max-w-xs text-sm leading-snug">{image.needed}</p>
      </div>
    </div>
  );
}
