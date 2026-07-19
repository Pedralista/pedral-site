"use client";

import { useState, useEffect } from "react";

/**
 * Shared cookie-consent hook.
 *
 * Reads the SAME store the CookieBanner writes (`localStorage["pedral-cookies"]`)
 * and listens for the SAME custom event it dispatches (`"pedral-cookies-accepted"`).
 * Every analytics loader (GA4, Google Ads, Meta Pixel) gates on this instead of
 * re-implementing its own consent check.
 *
 * Returns `true` once the user has accepted cookies — either already-accepted on
 * load, or after the accept event fires this session. Never `true` before consent.
 */
export function useCookieConsent(): boolean {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const grant = () => setConsented(true);

    // Already-accepted on load: defer the state update out of the synchronous
    // effect body (via a 0ms timeout) so we neither trip the
    // `react-hooks/set-state-in-effect` rule nor cause a hydration mismatch —
    // the first client render matches the server's `false`.
    if (localStorage.getItem("pedral-cookies") === "accepted") {
      const id = setTimeout(grant, 0);
      return () => clearTimeout(id);
    }

    // Otherwise wait for the banner's accept event.
    window.addEventListener("pedral-cookies-accepted", grant);
    return () => window.removeEventListener("pedral-cookies-accepted", grant);
  }, []);

  return consented;
}
