"use client";

import { useEffect, useRef } from "react";
import { useCookieConsent } from "@/lib/useCookieConsent";
import { gaEvent, fbqTrack, type AnalyticsItem } from "@/lib/analytics";

/**
 * Fires the checkout-initiation events from `checkout/page.tsx`.
 *
 * The primary "Reserve" action lives inside CollectionDetail (off-limits), and
 * there is no separate cart step — reaching checkout with the item selected IS
 * both the add-to-cart and begin-checkout moment. So we fire GA4 `add_to_cart`
 * + `begin_checkout` and Pixel `AddToCart` + `InitiateCheckout` together here.
 * No-ops until consent; each helper no-ops if its tag isn't configured.
 */
export default function BeginCheckoutTracker({
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

    gaEvent("add_to_cart", { currency, value, items: [item] });
    gaEvent("begin_checkout", { currency, value, items: [item] });

    const pixelParams = {
      content_type: "product",
      content_ids: [item.item_id],
      content_name: item.item_name,
      value,
      currency,
    };
    fbqTrack("AddToCart", pixelParams);
    fbqTrack("InitiateCheckout", pixelParams);
  }, [consented, item, value, currency]);

  return null;
}
