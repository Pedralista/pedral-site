"use client";

import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/lib/useCookieConsent";
import { gaEvent, fbqTrack, purchaseEventId, type AnalyticsItem } from "@/lib/analytics";

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
// Optional Google Ads conversion label. When set, the conversion is attributed
// to a specific conversion action via `send_to: "AW-XXXX/label"`; otherwise it
// falls back to the account-level id. No-op if NEXT_PUBLIC_GOOGLE_ADS_ID unset.
const GOOGLE_ADS_PURCHASE_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_PURCHASE_LABEL;

/**
 * Fires `purchase` (GA4), a Google Ads `conversion`, and `Purchase` (Meta Pixel)
 * on the order-success page.
 *
 * - Dedup: GA4 has no native purchase dedup, so we guard on `sessionStorage`
 *   keyed by the Stripe session id and skip if already fired this session
 *   (covers refreshes / back-nav to the success URL).
 * - Meta dedup: the Pixel event carries `eventID = purchase_<sessionId>` — the
 *   SAME string the server-side CAPI event uses — so Meta merges the two.
 *
 * No-ops until consent; each helper no-ops if its tag isn't configured.
 */
export default function PurchaseTracker({
  sessionId,
  value,
  items,
  currency = "EUR",
}: {
  sessionId: string;
  value: number;
  items: AnalyticsItem[];
  currency?: string;
}) {
  const consented = useCookieConsent();
  const fired = useRef(false);

  useEffect(() => {
    if (!consented || fired.current) return;

    const key = `pedral-purchase-fired:${sessionId}`;
    if (sessionStorage.getItem(key)) return;
    fired.current = true;
    sessionStorage.setItem(key, "1");

    gaEvent("purchase", {
      transaction_id: sessionId,
      currency,
      value,
      items,
    });

    // Google Ads conversion piggybacks on the same gtag instance.
    if (GOOGLE_ADS_ID) {
      gaEvent("conversion", {
        send_to: GOOGLE_ADS_PURCHASE_LABEL
          ? `${GOOGLE_ADS_ID}/${GOOGLE_ADS_PURCHASE_LABEL}`
          : GOOGLE_ADS_ID,
        transaction_id: sessionId,
        value,
        currency,
      });
    }

    // Meta Pixel Purchase — SAME eventID as the server-side CAPI event -> dedup.
    fbqTrack(
      "Purchase",
      {
        value,
        currency,
        content_type: "product",
        contents: items.map((i) => ({ id: i.item_id, quantity: i.quantity })),
      },
      { eventID: purchaseEventId(sessionId) }
    );
  }, [consented, sessionId, value, items, currency]);

  return null;
}
