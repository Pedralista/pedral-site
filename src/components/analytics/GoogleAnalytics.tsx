"use client";

import Script from "next/script";
import { useCookieConsent } from "@/lib/useCookieConsent";

// GA4 measurement id (format `G-XXXXXXXXXX`).
const GA4_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
// Optional Google Ads id (format `AW-XXXXXXXXX`) — piggybacks on the same gtag
// instance for conversion tracking. Omit to disable Ads without touching GA4.
const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

/**
 * GA4 + Google Ads loader with Google consent mode v2.
 *
 * NO-OP when `NEXT_PUBLIC_GA4_MEASUREMENT_ID` is unset — renders nothing, never
 * throws. Consent-gated exactly like MetaPixel: the scripts only load once the
 * user has accepted cookies. Because the loader itself is consent-gated, the
 * inline init sets consent-mode v2 defaults to `denied` (as required, before
 * the `config` call) and then immediately updates them to `granted` — this code
 * path only runs after the user accepted, mirroring the binary CookieBanner.
 */
export default function GoogleAnalytics() {
  const consented = useCookieConsent();

  // No-op when GA4 isn't configured.
  if (!GA4_MEASUREMENT_ID) return null;
  // Respect consent — nothing loads before the user accepts cookies.
  if (!consented) return null;

  return (
    <>
      <Script
        id="ga4-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        // Consent mode v2 — all denied by default, BEFORE any config call.
        gtag('consent', 'default', {
          ad_storage: 'denied',
          analytics_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
        // User has accepted (this script only renders post-consent) — grant.
        gtag('consent', 'update', {
          ad_storage: 'granted',
          analytics_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
        gtag('config', '${GA4_MEASUREMENT_ID}');
        ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
      `}</Script>
    </>
  );
}
