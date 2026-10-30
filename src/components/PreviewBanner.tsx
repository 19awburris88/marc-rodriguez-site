import { siteConfig } from "@/lib/config";

export function PreviewBanner() {
  if (!siteConfig.isPreview) return null;
  return (
    <div className="bg-bronze px-4 py-1.5 text-center font-sans text-xs font-medium text-iron">
      Private preview — content marked <strong>Draft</strong> is awaiting Marc&rsquo;s approval and is hidden in
      production.
    </div>
  );
}
