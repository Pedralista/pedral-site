import crypto from "crypto";
import type Stripe from "stripe";

/**
 * Server-side Meta Conversions API (CAPI) Purchase event.
 *
 * NO-OP (logs + returns) when `META_PIXEL_ID` (or `NEXT_PUBLIC_META_PIXEL_ID`)
 * or `META_CAPI_ACCESS_TOKEN` is unset. It never throws — every code path is
 * wrapped so the Stripe webhook always returns its 200 to Stripe.
 *
 * DEDUP: `event_id` is derived deterministically from the Stripe Checkout
 * Session id (`purchase_<session.id>`) — the EXACT same string the client-side
 * Pixel sends as `eventID` (see `purchaseEventId` in `analytics.ts`) — so Meta
 * deduplicates the browser event against this server event.
 */
const GRAPH_VERSION = "v19.0";

/** Meta requires PII fields hashed with SHA-256, trimmed + lowercased. */
function sha256(value: string): string {
  return crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export async function sendMetaCapiPurchase(session: Stripe.Checkout.Session): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID ?? process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !token) {
    console.log(
      "[Meta CAPI] Not configured (META_PIXEL_ID / META_CAPI_ACCESS_TOKEN unset) — skipping Purchase event."
    );
    return;
  }

  try {
    const email = session.customer_details?.email ?? undefined;
    const phone = session.customer_details?.phone ?? undefined;

    const userData: Record<string, string[]> = {};
    if (email) userData.em = [sha256(email)];
    if (phone) userData.ph = [sha256(phone.replace(/[^0-9]/g, ""))];

    const value = (session.amount_total ?? 0) / 100;
    const currency = (session.currency ?? "eur").toUpperCase();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://pedral.eu";
    const productName = session.metadata?.product ?? session.metadata?.collection ?? "Pedral";
    const contentId = session.metadata?.product ?? session.metadata?.collection ?? "pedral";

    const payload = {
      data: [
        {
          event_name: "Purchase",
          event_time: Math.floor(Date.now() / 1000),
          event_id: `purchase_${session.id}`,
          event_source_url: `${siteUrl}/order/success`,
          action_source: "website",
          user_data: userData,
          custom_data: {
            currency,
            value,
            content_type: "product",
            content_name: productName,
            contents: [{ id: contentId, quantity: 1, item_price: value }],
          },
        },
      ],
    };

    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      console.error("[Meta CAPI] Purchase event failed:", res.status, await res.text());
    }
  } catch (err) {
    // Never let tracking break the webhook's 200 to Stripe.
    console.error("[Meta CAPI] Error sending Purchase event:", err);
  }
}
