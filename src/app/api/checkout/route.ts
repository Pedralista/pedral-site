import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { rateLimit, getIp } from "@/lib/rateLimit";
import { collections } from "@/lib/collections";
import { findCommunityCode } from "@/lib/community-codes";
import { holdNumber } from "@/lib/edition-numbers";
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
  "price_1TPWFUCfxE1lSBKRrOHlguJc", // Maestro — Soul Blue, Petite Seconde (€1,600)
  "price_1TPWI7CfxE1lSBKR6eBgMdJl", // Maestro — Aura Gold, Petite Seconde (€1,600)
  "price_1U16isCfxE1lSBKRSMBWzhCO", // Contour — Swiss Quartz, Nacre (€895)
  "price_1U0sqHCfxE1lSBKRl7VPZnh7", // Contour — Hand-Wound, Onyx (€1,950)
  "price_1U3blkCfxE1lSBKR3ZwxlQ60", // Contour — Contour Aurum, Lapis (€1,000)
  "price_1TyJgICfxE1lSBKRRyl9DzAp", // Contour × Seconds Society — Sodalite (€895)
  "price_1UBz4bCfxE1lSBKRxoKbUr0w", // Silhouette — Aventurine (€2,200), formerly Contour 39mm
  "price_1UBz7uCfxE1lSBKRLZGUEFVq", // Silhouette — Ituri (€5,000), formerly Contour 39mm
  "price_1UVaclCfxE1lSBKRrfhLXk3D", // Silhouette — Ophion · Swiss Hand-Wound (€2,200)
  "price_1UVadbCfxE1lSBKRn5qrUnUI", // Silhouette — Ophion · Japanese Hand-Wound (€1,500)
  "price_1UUF1JCfxE1lSBKRMKslTe28", // Étiquette — Soirée · Japanese Hand-Wound (€1,100)
  "price_1UUF2bCfxE1lSBKRY27YyEDf", // Étiquette — Soirée · Swiss Hand-Wound (€1,800)
  "price_1UUF4ACfxE1lSBKRaBgmkl77", // Étiquette — Bourgogne · Japanese Hand-Wound (€1,100)
  "price_1UUF5hCfxE1lSBKRu70dLbhe", // Étiquette — Bourgogne · Swiss Hand-Wound (€1,800)
  "price_1UUF7cCfxE1lSBKRNbpTOgfk", // Étiquette — Nocturne · Japanese Hand-Wound (€1,100)
  "price_1UUF8YCfxE1lSBKRMREPi5B7", // Étiquette — Nocturne · Swiss Hand-Wound (€1,800)
  "price_1UUFARCfxE1lSBKREzsyJnrM", // Étiquette — Ambiance · Japanese Hand-Wound (€1,100)
  "price_1UUFCICfxE1lSBKRHBF1I95p", // Étiquette — Ambiance · Swiss Hand-Wound (€1,800)
  // Étiquette numeral editions (standalone pages)
  "price_1UUOovCfxE1lSBKRZltUibsZ", // Étiquette Hebrew — Tchelet · Japanese Hand-Wound (€1,100)
  "price_1UUOqaCfxE1lSBKRZ0PFXRKD", // Étiquette Hebrew — Tchelet · Swiss Hand-Wound (€1,800)
  "price_1UUOsdCfxE1lSBKRzIQMNG8X", // Étiquette Hebrew — Layla · Japanese Hand-Wound (€1,100)
  "price_1UUOtmCfxE1lSBKRpwNV6Bpc", // Étiquette Hebrew — Layla · Swiss Hand-Wound (€1,800)
  "price_1UUPTrCfxE1lSBKRy4L1h1fg", // Étiquette Bangla — Ekushey (€1,100)
  "price_1UUPNOCfxE1lSBKR7Zr4TfjN", // Étiquette Bangla — Sondhya (€1,100)
  "price_1UUl4sCfxE1lSBKREY3afrAq", // Étiquette Famille Royale · Japanese Hand-Wound (€1,100)
  "price_1UUl5lCfxE1lSBKRRJDXaq90", // Étiquette Famille Royale · Swiss Hand-Wound (€1,800)
]);

// Étiquette Hebrew / Bangla / Famille Royale prices: the checkout shows a
// discount-code box so community members and owners can use the codes Kevin shared (codes and
// their expiry, 3 Nov 2026, live in Stripe — nothing about them is on the site).
const PROMO_CODE_PRICE_IDS = new Set([
  "price_1UUOovCfxE1lSBKRZltUibsZ", // Tchelet · Japanese
  "price_1UUOqaCfxE1lSBKRZ0PFXRKD", // Tchelet · Swiss
  "price_1UUOsdCfxE1lSBKRzIQMNG8X", // Layla · Japanese
  "price_1UUOtmCfxE1lSBKRpwNV6Bpc", // Layla · Swiss
  "price_1UUPTrCfxE1lSBKRy4L1h1fg", // Ekushey
  "price_1UUPNOCfxE1lSBKR7Zr4TfjN", // Sondhya
  "price_1UUl4sCfxE1lSBKREY3afrAq", // Famille Royale · Japanese (owners: ROYALE950)
  "price_1UUl5lCfxE1lSBKRRJDXaq90", // Famille Royale · Swiss (owners: ROYALE1500)
]);

// Stripe coupon per community code (keyed by the code's hash — see
// src/lib/community-codes.ts). Applied server-side as `discounts`.
const COMMUNITY_COUPONS: Record<string, string> = {
  "8b7d8690eff4cbfafd8934a5c5e3e5d824511b75cbdc9ea501637abf27cefb34": "2Y0NU7KX", // Hebrew · Japanese, €150 off
  "67076ba311b797ce5bccb86dd16ee65580df2996a2c6c8eab44d60f329bcc854": "o6bSjdo1", // Hebrew · Swiss, €300 off
  "2e20d2dd7e7a19389cc7f6d8d985bb739fd1b9736de5da981737a99aeea576ea": "dS6NsWUL", // Bangla, €150 off
};

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

    // What was ordered, in one line — same as the single-item branch below, so
    // cart orders also show the watch / dial / movement on the Stripe payment
    // and invoice instead of a blank description.
    const cartOrderLabel = cartMetadata
      .map(({ p, v, q }) => `${p}${v ? ` — ${v}` : ""}${q > 1 ? ` ×${q}` : ""}`)
      .join(" + ")
      .slice(0, 300);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ui_mode: "embedded",
      // One-time-payment sessions default to only creating a Stripe Customer
      // "if_required" (e.g. saving a card) — without this, most real orders
      // never get a Customer record, and /account's lookup (which checks for
      // exactly that) tells genuine buyers they have no account.
      customer_creation: "always",
      // A Customer record alone still isn't enough: the Billing Portal's
      // "order history" is really invoice history, and "payment" mode
      // sessions don't generate an invoice by default — so without this,
      // customers can log in but still see nothing under Order History.
      invoice_creation: { enabled: true, invoice_data: { description: cartOrderLabel } },
      payment_intent_data: {
        description: cartOrderLabel,
        metadata: { cartItems: cartMetadataJson },
      },
      line_items: lineItems,
      ...(lineItems.some((li) => !!li.price && PROMO_CODE_PRICE_IDS.has(li.price)) && {
        allow_promotion_codes: true,
        // Fixed-amount EUR codes are rejected as "invalid" while Adaptive
        // Pricing localises the currency, so keep these sessions in EUR.
        adaptive_pricing: { enabled: false },
      }),
      return_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        cartItems: cartMetadataJson,
      },
      shipping_address_collection: {
        allowed_countries: [
          "SE", "NO", "DK", "FI", "DE", "NL", "BE", "FR", "IT", "ES",
          "PT", "AT", "CH", "GB", "IE", "PL", "CZ", "SK", "HU", "RO",
          "US", "CA", "AU", "JP", "SG", "AE", "SA",
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
  const { priceId, productName, variantName, isPreOrder, addOns, communityCode, editionNumber, holdToken } = body;

  if (!priceId || !productName) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (!VALID_PRICE_IDS.has(priceId)) {
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });
  }

  const addOnLineItems = buildAddOnLineItems(productName, addOns);

  // Numbered edition (e.g. Étiquette Famille Royale): the buyer's chosen number is
  // held for 30 minutes while they pay, so nobody else can take it.
  const numbered = collections.find((c) => c.name === productName && c.editionNumbers);
  let chosenNumber: number | undefined;
  if (numbered?.editionNumbers) {
    const n = Number(editionNumber);
    if (!Number.isInteger(n) || n < 1 || n > numbered.editionNumbers) {
      return NextResponse.json({ error: "Please choose your number." }, { status: 400 });
    }
    const holder = typeof holdToken === "string" && holdToken.length <= 64 ? holdToken : crypto.randomUUID();
    if (!(await holdNumber(numbered.slug, n, holder))) {
      return NextResponse.json({ error: `No. ${String(n).padStart(2, "0")} was just taken — please choose another number.` }, { status: 409 });
    }
    chosenNumber = n;
  }

  // Community code typed on the product page — re-checked here (expiry and
  // which watch it's for) before the coupon is applied.
  let communityCoupon: string | undefined;
  if (typeof communityCode === "string" && communityCode.trim()) {
    const entry = await findCommunityCode(communityCode);
    if (!entry || !entry.priceIds.includes(priceId)) {
      return NextResponse.json({ error: "This code isn't valid for this watch." }, { status: 400 });
    }
    communityCoupon = COMMUNITY_COUPONS[entry.hash];
  }

  // What was ordered, in one line — shown on the Stripe payment and on the
  // customer's invoice, so Kevin sees the exact dial / movement / number
  // without digging into metadata. The number is the server-checked one.
  const editionLabel =
    chosenNumber && numbered?.editionNumbers
      ? `No. ${String(chosenNumber).padStart(2, "0")} of ${numbered.editionNumbers}`
      : undefined;
  const orderLabel = String(`${productName}${variantName ? ` — ${variantName}` : ""}`).slice(0, 300);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    ui_mode: "embedded",
    // See the cart branch above for why both of these are needed.
    customer_creation: "always",
    invoice_creation: {
      enabled: true,
      invoice_data: {
        description: orderLabel,
        ...(editionLabel ? { custom_fields: [{ name: "Edition number", value: editionLabel }] } : {}),
      },
    },
    payment_intent_data: {
      description: orderLabel,
      metadata: {
        product: String(productName).slice(0, 200),
        variant: String(variantName ?? "").slice(0, 200),
        ...(chosenNumber ? { editionNumber: String(chosenNumber) } : {}),
      },
    },
    line_items: [{ price: priceId, quantity: 1 }, ...addOnLineItems],
    return_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      product: productName,
      variant: variantName ?? "",
      ...(chosenNumber ? { editionNumber: String(chosenNumber) } : {}),
    },

    shipping_address_collection: {
      allowed_countries: [
        "SE", "NO", "DK", "FI", "DE", "NL", "BE", "FR", "IT", "ES",
        "PT", "AT", "CH", "GB", "IE", "PL", "CZ", "SK", "HU", "RO",
        "US", "CA", "AU", "JP", "SG", "AE", "SA",
      ],
    },
    // A community code applies its coupon directly; otherwise show Stripe's
    // own code box (the two can't be combined).
    ...(communityCoupon
      ? { discounts: [{ coupon: communityCoupon }] }
      : (priceId === "price_1TEVYOCfxE1lSBKRdzi2pJsj" || PROMO_CODE_PRICE_IDS.has(priceId)) && { allow_promotion_codes: true }),
    // See the cart branch: codes only validate with the session kept in EUR.
    ...(PROMO_CODE_PRICE_IDS.has(priceId) && { adaptive_pricing: { enabled: false } }),
    phone_number_collection: { enabled: true },
    billing_address_collection: "required",
    custom_text: {
      submit: {
        message: chosenNumber && numbered?.editionNumbers
          ? `Edition number ${String(chosenNumber).padStart(2, "0")} of ${numbered.editionNumbers} is held for you for 30 minutes. Kevin will confirm your piece within 24 hours.`
          : isPreOrder
          ? "Pre-order · Non-refundable · Delivery in 3–6 months. Kevin will confirm your allocation within 24 hours."
          : "Your order is allocation-based. Kevin will confirm your piece within 24 hours.",
      },
    },
  });

  return NextResponse.json({ clientSecret: session.client_secret });
}
