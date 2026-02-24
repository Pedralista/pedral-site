import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { collections } from "@/lib/collections";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: NextRequest) {
  const { slug, variantName, email } = await req.json();

  const collection = collections.find((c) => c.slug === slug);
  if (!collection) {
    return NextResponse.json({ error: "Collection not found" }, { status: 404 });
  }

  const variant = collection.variants?.find((v) => v.name === variantName);
  if (!variant) {
    return NextResponse.json({ error: "Variant not found" }, { status: 404 });
  }

  // Find or create Stripe customer
  let customerId: string | undefined;
  if (email) {
    const existing = await stripe.customers.list({ email, limit: 1 });
    if (existing.data.length > 0) {
      customerId = existing.data[0].id;
    } else {
      const customer = await stripe.customers.create({ email });
      customerId = customer.id;
    }
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: collection.price * 100, // cents
    currency: "eur",
    customer: customerId,
    receipt_email: email,
    metadata: {
      product: collection.name,
      variant: variantName,
      slug,
    },
    automatic_payment_methods: { enabled: true },
  });

  return NextResponse.json({ clientSecret: paymentIntent.client_secret });
}
