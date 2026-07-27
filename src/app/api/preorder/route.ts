import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { rateLimit, getIp } from "@/lib/rateLimit";
import { collections } from "@/lib/collections";

const ALLOWED_ORIGINS = new Set([
  "https://pedral.eu",
  "https://www.pedral.eu",
  "https://pedral.watch",
  "https://www.pedral.watch",
]);

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const { allowed } = await rateLimit(`preorder:${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
    });

    const { collectionSlug } = await req.json();

    if (!collectionSlug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Resolve price and name server-side — never trust the client for pricing
    const collection = collections.find((c) => c.slug === collectionSlug);
    if (!collection) {
      return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }
    const depositAmount = collection.depositAmount ?? Math.round(collection.price * 0.3);
    const collectionName = collection.name;
    const isNonRefundable = collection.nonRefundable === true;

    const requestOrigin = req.headers.get("origin") ?? "";
    const origin = ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : "https://pedral.eu";

    const productDescription = isNonRefundable
      ? "Non-refundable deposit. This is a made-to-order piece produced to your specifications (EU Art. 16(c)). Secures your place in the production queue. Remaining balance invoiced before shipping."
      : "Deposit secures your place in the production queue. You may cancel before dispatch for a full refund per our withdrawal policy. Remaining balance invoiced before shipping.";

    const submitMessage = isNonRefundable
      ? `This €${depositAmount} deposit is non-refundable. Your ${collectionName} is produced to your specifications — by placing this order you acknowledge the right of withdrawal does not apply (EU Art. 16(c)). Remaining balance invoiced before shipping.`
      : `This €${depositAmount} deposit secures your place in the ${collectionName} production queue. You may cancel before dispatch for a full refund per our withdrawal policy. Remaining balance invoiced before shipping.`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      // Without this, one-time-payment sessions only create a Stripe Customer
      // "if_required" — most deposits wouldn't get one, and /account's lookup
      // (which checks for exactly that) would tell genuine buyers they have
      // no account.
      customer_creation: "always",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: depositAmount * 100,
            product_data: {
              name: `${collectionName} — Reservation Deposit`,
              description: productDescription,
            },
          },
        },
      ],
      return_url: `${origin}/order/success?type=preorder&session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        type: "preorder",
        collection: collectionSlug,
        nonRefundable: isNonRefundable ? "true" : "false",
      },
      shipping_address_collection: {
        allowed_countries: [
          "SE", "NO", "DK", "FI", "DE", "NL", "BE", "FR", "IT", "ES",
          "PT", "AT", "CH", "GB", "IE", "PL", "CZ", "SK", "HU", "RO",
          "US", "CA", "AU", "JP", "SG", "AE",
        ],
      },
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      custom_text: {
        submit: { message: submitMessage },
      },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err: unknown) {
    console.error("Preorder error:", err instanceof Error ? err.message : "Unknown error");
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
