/**
 * Shared analytics helpers — thin, defensive wrappers around the global `gtag`
 * (GA4 / Google Ads) and `fbq` (Meta Pixel) functions.
 *
 * NO-OP BY DESIGN: if a loader never initialised its global (its env var is
 * unset, or the user hasn't consented yet), these helpers silently do nothing.
 * Callers therefore never need to check whether a given tag is configured — an
 * unconfigured or unconsented tag simply produces no events, and never throws.
 */

/** GA4 e-commerce item shape (item array entries). */
export interface AnalyticsItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
  item_variant?: string;
  item_category?: string;
}

type GtagArgs =
  | ["js", Date]
  | ["config", string, Record<string, unknown>?]
  | ["event", string, Record<string, unknown>?]
  | ["consent", "default" | "update", Record<string, unknown>]
  | ["set", ...unknown[]];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: GtagArgs) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

/** Fire a GA4 / Google Ads event. No-op if gtag isn't loaded. */
export function gaEvent(name: string, params: Record<string, unknown>): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** Fire a Meta Pixel standard event. No-op if fbq isn't loaded. */
export function fbqTrack(
  name: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string }
): void {
  if (typeof window === "undefined" || typeof window.fbq !== "function") return;
  if (options?.eventID) {
    window.fbq("track", name, params ?? {}, options);
  } else {
    window.fbq("track", name, params ?? {});
  }
}

/**
 * Deterministic `event_id` shared between the client-side Pixel Purchase event
 * and the server-side CAPI Purchase event for the same order, so Meta can
 * deduplicate the two. Derived from the Stripe Checkout Session id — the same
 * id the client reads from the `session_id` return-URL param and the same one
 * the webhook has on `session.id` — so both sides produce an identical string.
 */
export function purchaseEventId(sessionId: string): string {
  return `purchase_${sessionId}`;
}
