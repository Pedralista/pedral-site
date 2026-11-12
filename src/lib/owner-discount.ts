// Lifetime owner discount (Kevin, 2026-11-12): 7% off any Pedral for the
// Contour and Silhouette Aventurine buyers whose delivery slipped to Dec/Jan.
// One code for everyone, but it only works together with the buyer's own
// email address: the checkout locks Stripe to that email (customer_email).
//
// SERVER ONLY: import from API routes, never from a client component, so the
// email list doesn't ship in the page bundle. Emails are SHA-256 hashes of the
// lower-cased address; the code itself is stored as a hash too.
import { createHash } from "node:crypto";

/** Stripe coupon "Pedral lifetime privilege · 7%" (percent off, no expiry). */
export const OWNER_COUPON_ID = "SwUMlBUh";
export const OWNER_PERCENT_OFF = 7;

/** SHA-256 of the upper-cased code (PEDRAL7). */
const OWNER_CODE_HASH = "baf800beb5872f19288818f4f6b9c1631b6b22b48b2ba61d79738a6347690376";

/** SHA-256 of each eligible buyer's lower-cased email (30 buyers from Stripe). */
const OWNER_EMAIL_HASHES = new Set([
  "12cac1bd03305b914d99ec1ea38ed0b8df82a9eefde1a79947a967f3ed53ef4d",
  "152c31e3a777ad7b8c460f301119d9fa63918ade4496b422571e6d33337afa08",
  "25966566555030965efb809341625dbb351d05caee48f49faad41a5b3a765924",
  "2b5c23de184fb414b6abd0b5faa9b1ada135c8192e670fb3721ab3e3d2f8235b",
  "2bf3d15087ca0878c9982f35e23e74a46fba33d67cbd72c57cb6b33d65d0cc84",
  "3b41f95a48277f22e980f9894d7b3ef6a282375dd060ebfe4f82d1c9b653f67b",
  "4428661865027bf9cc852fd0ddbc6734c1eb7c6bfd03d9d7377501e59cd4d58e",
  "4b839c74f6832f0c5e4e251b458839ea1d14c0d590d39cd4341484660c6e0eda",
  "523b19a60d2e4c68ab4519c0bd43cad010ecdf19cacbd809c868b4f0c00b1bb6",
  "5aeb8088c7206d990abb99c67aaaf29d7f93e2a41f86a01b6d49400938e47fee",
  "5d1a7d02343311ae06cbfeb66e5e192a34841f343e8de99f2b282aa8d8d76dd4",
  "5fffae878a6363f254e8414830a925cc39ca34557a3ff06335235dd605b8f2e7",
  "70be34f4835f974ae3b900afe3edac534c5b401fc66cfae614dc024f241a3949",
  "7cfff8efb13ec86f18f71fae63914b701544fecfd9ec1581c7a8edb962379bf6",
  "855fd8c682701acb4454b8f20495aac6d82c5e99bc708867c567703323c8e4a1",
  "8ced3f5342a8f897c7c381bc5e03255b9c2d5173c113a606d69175860697d36e",
  "93dae6efbbb4a21b7d262cceb73ac7a29eb10c5757f24492ea901f310b96d87c",
  "94a608acece2b6fb82e730da70eeba33242ebf3bf81308d2baf8687630a8123c",
  "a1031afcb4579c009935bb29effe450e7f7e76ea3c9a0d651bde1250323fa2ff",
  "b825897cbfea0fc315c64163106a3582a3e8f46635918ae4146cf3e53f5fbdf1",
  "baeeb4a4620a985350cd53168c4ef3b5c7a91e0af090ab46b33fe311a19a3fe1",
  "bb312d65e9bb60e751f2da996c7f06eb4ca0a301ff29149cb70f0121b91e3a03",
  "bb38b5d8ca2574833e7c67055cd6bf7da7614896bc6be8e90e19e79217c28606",
  "c56fb8ed962317bc2cbd45c0cac8dc7ed53f77d4d4e6d3eb090ff883edb21d24",
  "c744ce904e89a9a371480f761b9070d3d6213dfce1567d31783f9eef31225ab7",
  "c7647beb3c5137398a5a77a039939b43eba2425d0e0777167059ef7cb92864be",
  "d0a462dd0d409d83c983eb15bfa84fc63aa0c5b7cd3f82fc7c51b42cc7648dae",
  "e62dab00b620c49a31e8515d2e0a19b1f9ce5e629c664317941b06b54566a69a",
  "ec059c8a66fe8ba69285ef4784b03c9d8825f1bda12bcb418882a02f1aafd34f",
  "fff0fc6ecace321ee9bd183cee3a4f6f1542cf02bfdd62f2af8764375f3c1666",
]);

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");

export function isOwnerCode(code: unknown): boolean {
  return typeof code === "string" && sha256(code.trim().toUpperCase()) === OWNER_CODE_HASH;
}

export function normalizeEmail(email: unknown): string | null {
  if (typeof email !== "string") return null;
  const e = email.trim().toLowerCase();
  return e.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : null;
}

/** True when the code is the owner code and the email is on the list. */
export function checkOwnerDiscount(code: unknown, email: unknown): { ok: true; email: string } | { ok: false } {
  const e = normalizeEmail(email);
  if (!isOwnerCode(code) || !e || !OWNER_EMAIL_HASHES.has(sha256(e))) return { ok: false };
  return { ok: true, email: e };
}
