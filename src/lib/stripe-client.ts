import { loadStripe } from "@stripe/stripe-js/pure";
import type { Stripe } from "@stripe/stripe-js";

// Stripe.js is ~1–2.5 MB of script. Importing "@stripe/stripe-js" injects it
// on every page as a side effect, which slowed the homepage on phones; the
// "pure" entry only fetches it when getStripe() is first called — when the
// shopper taps a buy button — and reuses the same promise afterwards.
let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe() {
  stripePromise ??= loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  return stripePromise;
}
