/**
 * Klaviyo email-click identity (`_kx`).
 *
 * Klaviyo adds `?_kx=…` to every link in its emails ("email-to-website
 * tracking" is on in Kevin's account). It is an encrypted id for the
 * subscriber who clicked. We keep it so that, when that subscriber taps
 * Reserve, the checkout route can tell Klaviyo "Started Checkout" for them —
 * which triggers the abandoned-checkout email flow if they don't pay.
 *
 * Consent-gated like GA4 / Meta: the id is only kept across visits, and only
 * ever sent, after the visitor accepted cookies. Before that it lives in
 * memory for the current visit only. No Klaviyo script is loaded on the site.
 */

export const KX_PATTERN = /^[A-Za-z0-9._~+/=%-]{8,300}$/;

const STORAGE_KEY = "pedral-kx";
let landingKx: string | null = null;

/** Read `_kx` from the landing URL (call once on load). */
export function captureKx(): void {
  const kx = new URLSearchParams(window.location.search).get("_kx");
  if (kx && KX_PATTERN.test(kx)) landingKx = kx;
}

/** After consent: remember the id for later visits. */
export function persistKx(): void {
  if (!landingKx) return;
  try {
    localStorage.setItem(STORAGE_KEY, landingKx);
  } catch {
    // Storage blocked — the in-memory id still works for this visit.
  }
}

/** The id to send with a checkout, or undefined (no id, or no consent). */
export function getKx(): string | undefined {
  try {
    if (localStorage.getItem("pedral-cookies") !== "accepted") return undefined;
    const kx = landingKx ?? localStorage.getItem(STORAGE_KEY);
    return kx && KX_PATTERN.test(kx) ? kx : undefined;
  } catch {
    return undefined;
  }
}
