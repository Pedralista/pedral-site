import { KX_PATTERN } from "@/lib/klaviyo-kx";

/**
 * Server-side Klaviyo events for the abandoned-checkout flow.
 *
 * Uses Klaviyo's Client API with the account's PUBLIC site id (the same id
 * Klaviyo's own website snippet exposes — not a secret, no private key
 * needed). Events are only sent for visitors Klaviyo already knows, i.e.
 * subscribers who arrived by clicking a Klaviyo email (`_kx`, see
 * klaviyo-kx.ts) and accepted cookies. Never throws.
 *
 * - "Started Checkout": sent when a session is created (/api/checkout).
 * - "Placed Order": sent by the Stripe webhook when that session is paid.
 * The Klaviyo flow waits ~1 hour after "Started Checkout" and only emails
 * people with no "Placed Order" since.
 */
const KLAVIYO_SITE_ID = "WieX3u";
const KLAVIYO_REVISION = "2026-10-15";

/** Validate a `_kx` value coming from the client or from Stripe metadata. */
export function cleanKx(value: unknown): string | undefined {
  return typeof value === "string" && KX_PATTERN.test(value) ? value : undefined;
}

export async function trackKlaviyoEvent(
  metric: "Started Checkout" | "Placed Order",
  kx: string,
  event: { properties: Record<string, unknown>; value?: number; uniqueId?: string }
): Promise<void> {
  try {
    const res = await fetch(`https://a.klaviyo.com/client/events?company_id=${KLAVIYO_SITE_ID}`, {
      method: "POST",
      headers: { revision: KLAVIYO_REVISION, "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            properties: event.properties,
            metric: { data: { type: "metric", attributes: { name: metric } } },
            profile: { data: { type: "profile", attributes: { _kx: kx } } },
            ...(event.value !== undefined && { value: event.value, value_currency: "EUR" }),
            ...(event.uniqueId && { unique_id: `${metric}:${event.uniqueId}` }),
          },
        },
      }),
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) console.error(`[Klaviyo] ${metric} failed: ${res.status} ${await res.text()}`);
  } catch (err) {
    console.error(`[Klaviyo] ${metric} failed:`, err);
  }
}
