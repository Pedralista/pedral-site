"use client";

import { useEffect } from "react";
import { useCookieConsent } from "@/lib/useCookieConsent";
import { captureKx, persistKx } from "@/lib/klaviyo-kx";

/** Keeps the Klaviyo email-click id (`_kx`) — see klaviyo-kx.ts. Renders nothing. */
export default function KlaviyoIdentity() {
  const consented = useCookieConsent();

  useEffect(() => {
    captureKx();
  }, []);

  useEffect(() => {
    if (consented) persistKx();
  }, [consented]);

  return null;
}
