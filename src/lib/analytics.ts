/**
 * Provider-agnostic event tracking. Off until a provider is chosen.
 *
 * Never pass names, email addresses, or message content — only the event name
 * and coarse, non-identifying properties.
 */
export type AnalyticsEvent =
  | { name: "speaking_cta_click"; props: { location: string } }
  | { name: "business_referral"; props: { venture: string; location: string } }
  | { name: "inquiry_submitted"; props: { type: string } };

type Plausible = (event: string, options?: { props?: Record<string, string> }) => void;

export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  const plausible = (window as unknown as { plausible?: Plausible }).plausible;
  if (plausible) {
    plausible(event.name, { props: event.props });
  } else if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event.name, event.props);
  }
}
