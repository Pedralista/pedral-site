"use client";

import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/lib/useCookieConsent";
import { gaEvent, fbqTrack, type AnalyticsItem } from "@/lib/analytics";

/**
 * Fires `view_item` (GA4) and `ViewContent` (Meta Pixel) on the product page.
 * Rendered from `collections/[slug]/page.tsx` so we never touch CollectionDetail.
 * No-ops until the user consents; both underlying helpers no-op if their tag
 * isn't configured.
 */
export default function ViewItemTracker({
  item,
  value,
  currency = "EUR",
}: {
  item: AnalyticsItem;
  value: number;
  currency?: string;
}) {
  const consented = useCookieConsent();
  const fired = useRef(false);

  useEffect(() => {
    if (!consented || fired.current) return;
    fired.current = true;

    gaEvent("view_item", { currency, value, items: [item] });
    fbqTrack("ViewContent", {
      content_type: "product",
      content_ids: [item.item_id],
      content_name: item.item_name,
      value,
      currency,
    });
  }, [consented, item, value, currency]);

  return null;
}
