// Community discount codes for the Étiquette Hebrew / Bangla pages (Kevin,
// Oct 2026). Currently UNUSED: Kevin wants the discount to appear only at
// checkout, so customers enter the codes in Stripe's own promotion-code box
// (allow_promotion_codes). Kept as a fallback — set `communityCodes: true` on
// a collection to show an on-page code box that applies the coupon server-side.
// (Stripe's box rejects codes typed by automated browsers, so test by hand.)
//
// Codes are stored only as SHA-256 hashes, so they can't be read from the
// page source. The plain codes are the promotion codes in Kevin's Stripe.

export const COMMUNITY_CODES_EXPIRE_AT = Date.parse("2026-11-06T23:59:59Z");

export type CommunityCode = {
  /** SHA-256 hex of the upper-cased code */
  hash: string;
  amountOff: number;
  /** Stripe prices the code is valid for */
  priceIds: string[];
};

export const COMMUNITY_CODES: CommunityCode[] = [
  {
    // Hebrew community, Japanese hand-wound: €1,100 → €950
    hash: "8b7d8690eff4cbfafd8934a5c5e3e5d824511b75cbdc9ea501637abf27cefb34",
    amountOff: 150,
    priceIds: ["price_1UUOovCfxE1lSBKRZltUibsZ", "price_1UUOsdCfxE1lSBKRzIQMNG8X"],
  },
  {
    // Hebrew community, Swiss hand-wound: €1,800 → €1,500
    hash: "67076ba311b797ce5bccb86dd16ee65580df2996a2c6c8eab44d60f329bcc854",
    amountOff: 300,
    priceIds: ["price_1UUOqaCfxE1lSBKRZ0PFXRKD", "price_1UUOtmCfxE1lSBKRpwNV6Bpc"],
  },
  {
    // Bangla community: €1,100 → €950
    hash: "2e20d2dd7e7a19389cc7f6d8d985bb739fd1b9736de5da981737a99aeea576ea",
    amountOff: 150,
    priceIds: ["price_1UUPTrCfxE1lSBKRy4L1h1fg", "price_1UUPNOCfxE1lSBKR7Zr4TfjN"],
  },
];

export function normalizeCode(code: string): string {
  return code.trim().toUpperCase();
}

export async function hashCode(code: string): Promise<string> {
  const data = new TextEncoder().encode(normalizeCode(code));
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** The code entry matching `code`, if the code exists and hasn't expired. */
export async function findCommunityCode(code: string): Promise<CommunityCode | undefined> {
  if (!code || Date.now() > COMMUNITY_CODES_EXPIRE_AT) return undefined;
  const hash = await hashCode(code);
  return COMMUNITY_CODES.find((c) => c.hash === hash);
}
