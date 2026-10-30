import type { Approval } from "@/content/types";
import { siteConfig } from "./config";

/** Whether a record may render in the current mode. */
export function canShow(item: Approval | undefined | null): item is Approval {
  if (!item) return false;
  return item.status === "approved" || siteConfig.isPreview;
}

/** Records allowed to render in the current mode. */
export function visible<T extends Approval>(items: T[]): T[] {
  return items.filter(canShow);
}
