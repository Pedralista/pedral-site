import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { rateLimit, getIp } from "@/lib/rateLimit";

const VALID_PRICE_IDS = new Set([
  "price_1T4Tw7CfxE1lSBKRY9zmQqHV",
  "price_1T4TvBCfxE1lSBKRfCkEqWVd",
  "price_1T9xa2CfxE1lSBKR4hPpmnPR",
  "price_1T9xbUCfxE1lSBKR5IDT0QJ1",
  "price_1T4TsqCfxE1lSBKRFBCRLukn",
  "price_1T4TpQCfxE1lSBKR6aJh8nbb",
  "price_1TEVYOCfxE1lSBKRdzi2pJsj",
]);

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const { allowed } = await rateLimit(`checkout:${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });
  const { priceId, productName, variantName } = await req.json();

  if (!priceId || !productName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!VALID_PRICE_IDS.has(priceId)) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const ALLOWED_ORIGINS = new Set(["https://pedral.eu", "https://www.pedral.eu", "https://pedral.watch", "https://www.pedral.watch"]);
  const requestOrigin = req.headers.get("origin") ?? "";
  const origin = ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : "https://pedral.eu";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: "embedded",
    line_items: [{ price: priceId, quantity: 1 }],
    return_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      product: productName,
      variant: variantName ?? "",
    },
    shipping_address_collection: {
      allowed_countries: [
        "SE", "NO", "DK", "FI", "DE", "NL", "BE", "FR", "IT", "ES",
        "PT", "AT", "CH", "GB", "IE", "PL", "CZ", "SK", "HU", "RO",
        "US", "CA", "AU", "JP", "SG", "AE",
      ],
    },
    ...(priceId === "price_1TEVYOCfxE1lSBKRdzi2pJsj" && { allow_promotion_codes: true }),
    phone_number_collection: { enabled: true },
    billing_address_collection: "required",
    custom_text: {
      submit: {
        message: "Your order is allocation-based. Kevin will confirm your piece within 24 hours.",
      },
    },
  });

  return NextResponse.json({ clientSecret: session.client_secret });
}
