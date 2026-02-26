import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2026-01-28.clover",
    });

    const { collectionSlug, collectionName, depositAmount } = await req.json();

    if (!collectionSlug || !collectionName || !depositAmount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "https://pedral.eu";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: depositAmount * 100,
            product_data: {
              name: `${collectionName} — Reservation Deposit`,
              description:
                "Non-refundable deposit. Secures your place in the production queue. Remaining balance invoiced before shipping.",
            },
          },
        },
      ],
      success_url: `${origin}/order/success?type=preorder&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/collections/${collectionSlug}`,
      metadata: {
        type: "preorder",
        collection: collectionSlug,
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
        submit: {
          message: `This €${depositAmount} deposit is non-refundable and secures your place in the ${collectionName} production queue. The remaining balance will be invoiced before shipping.`,
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Preorder error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
