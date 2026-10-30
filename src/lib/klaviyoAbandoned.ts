import type Stripe from "stripe";

/**
 * Abandoned checkout → Klaviyo "Checkout Abandoned" event.
 *
 * Called from the Stripe webhook on `checkout.session.expired`. Klaviyo then
 * sends the follow-up email from a flow triggered by that metric, with the
 * 30-day Stripe recovery link as the button.
 *
 * Only fires when the buyer ticked Stripe's promotional-consent box (that's
 * also the only case where Stripe gives us their email), and not if the same
 * email has completed a purchase since. NO-OP when `KLAVIYO_PRIVATE_KEY` is
 * unset, and never throws — the webhook's 200 to Stripe is unaffected.
 */
const KLAVIYO_REVISION = "2024-10-15";

export async function sendAbandonedCheckout(stripe: Stripe, session: Stripe.Checkout.Session): Promise<void> {
  try {
    const email = session.customer_details?.email;
    const recoveryUrl = session.after_expiration?.recovery?.url;
    if (!email || !recoveryUrl || session.consent?.promotions !== "opt_in") return;

    const key = process.env.KLAVIYO_PRIVATE_KEY;
    if (!key) {
      console.log("[Klaviyo] Not configured (KLAVIYO_PRIVATE_KEY unset) — skipping abandoned checkout.");
      return;
    }

    // Bought anyway (another tab, or came back the same day)? Then no reminder.
    const later = await stripe.checkout.sessions.list({
      customer_details: { email },
      created: { gte: session.created },
      status: "complete",
      limit: 1,
    });
    if (later.data.length > 0) return;

    const product = [session.metadata?.product, session.metadata?.variant].filter(Boolean).join(" — ")
      || session.metadata?.cartItems
      || "your Pedral";
    const value = (session.amount_total ?? 0) / 100;

    const res = await fetch("https://a.klaviyo.com/api/events", {
      method: "POST",
      headers: {
        Authorization: `Klaviyo-API-Key ${key}`,
        revision: KLAVIYO_REVISION,
        "Content-Type": "application/vnd.api+json",
        Accept: "application/vnd.api+json",
      },
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            metric: { data: { type: "metric", attributes: { name: "Checkout Abandoned" } } },
            profile: { data: { type: "profile", attributes: { email } } },
            properties: {
              product,
              recovery_url: recoveryUrl,
              currency: (session.currency ?? "eur").toUpperCase(),
            },
            value,
            unique_id: session.id,
          },
        },
      }),
    });
    if (!res.ok) console.error(`[Klaviyo] Abandoned checkout event failed: ${res.status} ${await res.text()}`);
  } catch (err) {
    console.error("[Klaviyo] Abandoned checkout event error:", err);
  }
}
