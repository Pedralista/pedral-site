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

/**
 * Newsletter sign-ups (2026-11-23, Kevin: "everything to Klaviyo").
 *
 * Uses the Client API with the public site id, so no secret is needed.
 * Every site form (footer newsletter, exit-intent pop-up, "notify me" on
 * sold-out pieces) adds the address to the Klaviyo list "Site subscribers
 * 2026 (from Mailchimp)", which also holds the 164 Mailchimp sign-ups
 * imported on 2026-11-23. Whether a confirmation email goes out first
 * (double opt-in) is set on that list in Klaviyo, not here.
 */
export const KLAVIYO_SITE_LIST_ID = "VfGiNy";

export async function subscribeToKlaviyo(email: string, source: string): Promise<boolean> {
  try {
    const res = await fetch(`https://a.klaviyo.com/client/subscriptions?company_id=${KLAVIYO_SITE_ID}`, {
      method: "POST",
      headers: { revision: KLAVIYO_REVISION, "Content-Type": "application/vnd.api+json" },
      body: JSON.stringify({
        data: {
          type: "subscription",
          attributes: {
            custom_source: source,
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email,
                  subscriptions: { email: { marketing: { consent: "SUBSCRIBED" } } },
                },
              },
            },
          },
          relationships: { list: { data: { type: "list", id: KLAVIYO_SITE_LIST_ID } } },
        },
      }),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) console.error(`[Klaviyo] subscribe failed: ${res.status} ${await res.text()}`);
    return res.ok;
  } catch (err) {
    console.error("[Klaviyo] subscribe failed:", err);
    return false;
  }
}

/**
 * Account page (look-up and unsubscribe). These need a Klaviyo PRIVATE key
 * (env KLAVIYO_PRIVATE_API_KEY, scopes: profiles read, subscriptions write).
 * Until Kevin adds it in Vercel, the routes keep using Mailchimp.
 */
const privateKey = () => process.env.KLAVIYO_PRIVATE_API_KEY;
export const hasKlaviyoPrivateKey = () => !!privateKey();

export async function lookupKlaviyoSubscriber(
  email: string
): Promise<{ status: string; since: string | null; firstName: string | null } | null> {
  const key = privateKey();
  if (!key) return null;
  const filter = encodeURIComponent(`equals(email,"${email.replace(/"/g, "")}")`);
  const res = await fetch(
    `https://a.klaviyo.com/api/profiles?filter=${filter}&additional-fields[profile]=subscriptions`,
    {
      headers: { Authorization: `Klaviyo-API-Key ${key}`, revision: KLAVIYO_REVISION, accept: "application/vnd.api+json" },
      signal: AbortSignal.timeout(6000),
    }
  );
  if (!res.ok) return null;
  const profile = (await res.json()).data?.[0]?.attributes;
  const marketing = profile?.subscriptions?.email?.marketing;
  if (!marketing || marketing.consent !== "SUBSCRIBED") return null;
  return {
    status: "subscribed",
    since: marketing.consent_timestamp ?? profile.created ?? null,
    firstName: profile.first_name || null,
  };
}

export async function unsubscribeFromKlaviyo(email: string): Promise<boolean> {
  const key = privateKey();
  if (!key) return false;
  const res = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-delete-jobs", {
    method: "POST",
    headers: {
      Authorization: `Klaviyo-API-Key ${key}`,
      revision: KLAVIYO_REVISION,
      "Content-Type": "application/vnd.api+json",
    },
    body: JSON.stringify({
      data: {
        type: "profile-subscription-bulk-delete-job",
        attributes: {
          profiles: {
            data: [{ type: "profile", attributes: { email, subscriptions: { email: { marketing: { consent: "UNSUBSCRIBED" } } } } }],
          },
        },
      },
    }),
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) console.error(`[Klaviyo] unsubscribe failed: ${res.status} ${await res.text()}`);
  return res.ok;
}
