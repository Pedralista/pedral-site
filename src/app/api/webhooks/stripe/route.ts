import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendMetaCapiPurchase } from "@/lib/metaCapi";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.error("Stripe env vars not set");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-01-28.clover",
  });

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const isPreOrder = session.metadata?.type === "preorder";

      console.log(
        isPreOrder
          ? `Pre-order deposit received: ${session.metadata?.collection} — ${session.customer_details?.email}`
          : `Order completed: ${session.metadata?.product} ${session.metadata?.variant} — ${session.customer_details?.email}`
      );

      // Server-side Meta Conversions API Purchase. No-ops if unconfigured and
      // never throws — the webhook's 200 to Stripe is unaffected.
      await sendMetaCapiPurchase(session);
      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.warn(`Payment failed: ${intent.id} — ${intent.last_payment_error?.message}`);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
