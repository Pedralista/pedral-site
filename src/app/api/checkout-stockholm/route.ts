import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { rateLimit, getIp } from "@/lib/rateLimit";

// Booth-only checkout for Stockholm Time 2026 old-stock pieces. These aren't
// part of the main catalogue and have no pre-created Stripe Price objects —
// amounts are defined here as price_data instead. Not linked from the public
// landing page; reached only via the QR code at the table.
const STOCKHOLM_ITEMS = {
  artefact: {
    name: "Pedral Artefact — Stockholm Time 2026",
    amountSek: 5500,
  },
  okapiQuartz: {
    name: "Pedral Okapi — Quartz — Stockholm Time 2026",
    amountSek: 2500,
  },
} as const;

// Buying both together is discounted below the sum of the individual prices
// (5,500 + 2,500 = 8,000) to a flat 7,000 SEK.
const BUNDLE_AMOUNT_SEK = 7000;
const BUNDLE_NAME = "Pedral Artefact + Okapi Quartz — Stockholm Time 2026";

type ItemKey = keyof typeof STOCKHOLM_ITEMS;
const VALID_ITEM_KEYS = new Set(Object.keys(STOCKHOLM_ITEMS));

const ALLOWED_ORIGINS = new Set(["https://pedral.eu", "https://www.pedral.eu", "https://pedral.watch", "https://www.pedral.watch"]);

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const { allowed } = await rateLimit(`checkout-stockholm:${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json();
  const items = body?.items;

  if (
    !Array.isArray(items) ||
    items.length === 0 ||
    items.length > 2 ||
    !items.every((key) => typeof key === "string" && VALID_ITEM_KEYS.has(key)) ||
    new Set(items).size !== items.length
  ) {
    return NextResponse.json({ error: "Invalid selection" }, { status: 400 });
  }

  const requestOrigin = req.headers.get("origin") ?? "";
  const origin = ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : "https://pedral.eu";

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });

  const isBundle = items.length === 2;

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = isBundle
    ? [
        {
          price_data: {
            currency: "sek",
            product_data: { name: BUNDLE_NAME },
            unit_amount: BUNDLE_AMOUNT_SEK * 100,
          },
          quantity: 1,
        },
      ]
    : (items as ItemKey[]).map((key) => {
        const item = STOCKHOLM_ITEMS[key];
        return {
          price_data: {
            currency: "sek",
            product_data: { name: item.name },
            unit_amount: item.amountSek * 100,
          },
          quantity: 1,
        };
      });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["swish"],
    line_items: lineItems,
    success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/stockholm-time/pay`,
    metadata: {
      cartItems: isBundle
        ? JSON.stringify([{ p: BUNDLE_NAME, v: "", q: 1 }])
        : JSON.stringify((items as ItemKey[]).map((key) => ({ p: STOCKHOLM_ITEMS[key].name, v: "", q: 1 }))),
    },
    customer_creation: "always",
    invoice_creation: { enabled: true },
    custom_text: {
      submit: {
        message: "Picked up in person at the Pedral table, Stockholm Time 2026.",
      },
    },
  });

  return NextResponse.json({ url: session.url });
}
