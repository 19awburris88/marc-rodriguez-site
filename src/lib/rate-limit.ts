import "server-only";

/**
 * Small in-memory sliding-window limiter for the contact endpoint.
 *
 * Limitation: state lives in a single server process. On serverless hosts each
 * instance has its own memory, so pair this with the host's firewall/bot rules
 * (or swap in a shared store such as Upstash) before relying on it at scale.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

export function rateLimit(key: string, now = Date.now()): { allowed: boolean; retryAfterSeconds: number } {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return { allowed: false, retryAfterSeconds: Math.ceil((WINDOW_MS - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);

  // Keep memory bounded.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (!times.some((t) => now - t < WINDOW_MS)) hits.delete(k);
    }
  }
  return { allowed: true, retryAfterSeconds: 0 };
}
