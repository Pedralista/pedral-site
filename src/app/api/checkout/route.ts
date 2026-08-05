import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { rateLimit, getIp } from "@/lib/rateLimit";
import { collections } from "@/lib/collections";
import {
  addOnsEnabledFor,
  getStrapAddon,
  engravingAddon,
  sanitizeEngraving,
} from "@/lib/addons";

const VALID_PRICE_IDS = new Set([
  "price_1TOwepCfxE1lSBKRI7sNBLcW", // Maestro — Lapis No.1 (€1,450)
  "price_1TOwodCfxE1lSBKRaUZJ0s7O", // Maestro — Frosted Flex (€1,450)
  "price_1TOxPMCfxE1lSBKRFQfT9aRT", // Triomphe — Saphir Azur (€1,750)
  "price_1TOxO4CfxE1lSBKR8hiQjgiE", // Triomphe — Ember Stone (€1,750)
  "price_1T4TsqCfxE1lSBKRFBCRLukn",
  "price_1T4TpQCfxE1lSBKR6aJh8nbb",
  "price_1TEVYOCfxE1lSBKRdzi2pJsj",
  "price_1TKw2kCfxE1lSBKRLqfS1Lvb", // Okapi — ETA 7001
  "price_1TKw7wCfxE1lSBKRcFLiQiu6", // Okapi — LJP7380
  "price_1TPWFUCfxE1lSBKRrOHlguJc", // Maestro Petite Seconde — Soul Blue (€1,600)
  "price_1TPWI7CfxE1lSBKR6eBgMdJl", // Maestro Petite Seconde — Aura Gold (€1,600)
  "price_1U16isCfxE1lSBKRSMBWzhCO", // Contour — Quartz, Nacre (€895)
  "price_1U0sqHCfxE1lSBKRl7VPZnh7", // Contour — Hand-Wound, Onyx (€1,950)
  "price_1TyJgICfxE1lSBKRRyl9DzAp", // Contour × Seconds Society — Sodalite (€895)
]);

const ALLOWED_ORIGINS = new Set(["https://pedral.eu", "https://www.pedral.eu", "https://pedral.watch", "https://www.pedral.watch"]);
// Generous ceilings for a low-SKU microbrand catalogue — just abuse guards,
// not real usage limits.
const MAX_CART_LINES = 20;
const MAX_LINE_QUANTITY = 10;

interface AddOnsInput {
  strapSlug?: unknown;
  engravingText?: unknown;
}

/**
 * Optional, additive add-on line items re-derived server-side (never trusted
 * from the client) and only accepted when add-ons are enabled for this
 * product. Shared between the single-item and cart checkout paths.
 */
function buildAddOnLineItems(
  productName: string,
  addOns: AddOnsInput | undefined
): Stripe.Checkout.SessionCreateParams.LineItem[] {
  const items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  const collection = collections.find((c) => c.name === productName);
  if (!addOns || !collection || !addOnsEnabledFor(collection)) return items;

  const strapSlug = typeof addOns.strapSlug === "string" ? addOns.strapSlug : undefined;
  if (strapSlug) {
    const strap = getStrapAddon(strapSlug);
    if (strap && strap.compatibleWith.includes(collection.slug)) {
      items.push({
        price_data: {
          currency: "eur",
          product_data: { name: `${strap.name} (${productName})` },
          unit_amount: Math.round(strap.price * 100),
        },
        quantity: 1,
      });
    }
  }

  const rawEngraving = typeof addOns.engravingText === "string" ? addOns.engravingText : "";
  const engravingText = sanitizeEngraving(rawEngraving).trim();
  if (engravingText.length > 0) {
    items.push({
      price_data: {
        currency: "eur",
        product_data: { name: `Case-back engraving (${productName}): "${engravingText}"` },
        unit_amount: Math.round(engravingAddon.price * 100),
      },
      quantity: 1,
    });
  }

  return items;
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const { allowed } = await rateLimit(`checkout:${ip}`, 10, 60_000);
  if (!allowed) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });
  const body = await req.json();

  const requestOrigin = req.headers.get("origin") ?? "";
  const origin = ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : "https://pedral.eu";

  // ── Cart checkout: multiple line items in one session ──────────────────────
  if (Array.isArray(body.items)) {
    const { items } = body as {
      items: {
        priceId?: unknown;
        productName?: unknown;
        variantName?: unknown;
        quantity?: unknown;
        isPreOrder?: unknown;
        addOns?: AddOnsInput;
      }[];
    };

    if (items.length === 0 || items.length > MAX_CART_LINES) {
      return NextResponse.json({ error: "Invalid cart" }, { status: 400 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    const cartMetadata: { p: string; v: string; q: number }[] = [];
    let anyNonRefundable = false;

    for (const item of items) {
      const priceId = item.priceId;
      const productName = item.productName;
      const quantity = item.quantity;

      if (
        typeof priceId !== "string" ||
        typeof productName !== "string" ||
        !VALID_PRICE_IDS.has(priceId) ||
        typeof quantity !== "number" ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > MAX_LINE_QUANTITY
      ) {
        return NextResponse.json({ error: "Invalid cart item" }, { status: 400 });
      }

      const variantName = typeof item.variantName === "string" ? item.variantName : "";
      lineItems.push({ price: priceId, quantity });
      lineItems.push(...buildAddOnLineItems(productName, item.addOns));
      cartMetadata.push({ p: productName, v: variantName, q: quantity });
      if (item.isPreOrder === true) anyNonRefundable = true;
    }

    const cartMetadataJson = JSON.stringify(cartMetadata);
    if (cartMetadataJson.length > 490) {
      return NextResponse.json({ error: "Cart too large" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      // One-time-payment sessions default to only creating a Stripe Customer
      // "if_required" (e.g. saving a card) — without this, most real orders
      // never get a Customer record, and /account's lookup (which checks for
      // exactly that) tells genuine buyers they have no account.
      customer_creation: "always",
      line_items: lineItems,
      return_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        cartItems: cartMetadataJson,
      },
      shipping_address_collection: {
        allowed_countries: [
          "SE", "NO", "DK", "FI", "DE", "NL", "BE", "FR", "IT", "ES",
          "PT", "AT", "CH", "GB", "IE", "PL", "CZ", "SK", "HU", "RO",
          "US", "CA", "AU", "JP", "SG", "AE",
        ],
      },
      phone_number_collection: { enabled: true },
      billing_address_collection: "required",
      custom_text: {
        submit: {
          message: anyNonRefundable
            ? "Pre-order · Non-refundable · Delivery in 3–6 months. Kevin will confirm your allocation within 24 hours."
            : "Your order is allocation-based. Kevin will confirm your piece within 24 hours.",
        },
      },
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  }

  // ── Legacy single-item checkout (unchanged) ─────────────────────────────────
  const { priceId, productName, variantName, isPreOrder, addOns } = body;

  if (!priceId || !productName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!VALID_PRICE_IDS.has(priceId)) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const addOnLineItems = buildAddOnLineItems(productName, addOns);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: "embedded",
    // See the cart branch above for why this is needed.
    customer_creation: "always",
    line_items: [{ price: priceId, quantity: 1 }, ...addOnLineItems],
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
        message: isPreOrder
          ? "Pre-order · Non-refundable · Delivery in 3–6 months. Kevin will confirm your allocation within 24 hours."
          : "Your order is allocation-based. Kevin will confirm your piece within 24 hours.",
      },
    },
  });

  return NextResponse.json({ clientSecret: session.client_secret });
}
