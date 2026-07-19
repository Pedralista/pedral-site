// TODO: Kevin confirm — is shipping actually free? if not, replace with the real cost/region breakdown.
// The Stripe checkout session (src/app/api/checkout/route.ts) only collects a shipping address —
// it configures NO shipping_options / shipping rates — so the real cost is unconfirmed. This default
// matches how most watch microbrands in this price tier operate, but it has NOT been verified.
export const SHIPPING_LINE = "Free insured express shipping";

// TODO: Kevin confirm — verify actual Klarna installment count/terms configured in Stripe.
// The Stripe checkout route doesn't explicitly configure Klarna, so this count is unverified.
export const KLARNA_INSTALLMENTS = 3;

// Builds the "3 interest-free payments of €X with Klarna" line from a price.
// Formats as whole euros when the division is clean, otherwise 2 decimals — matching the
// site's toLocaleString() price convention.
export function klarnaLine(price: number): string {
  const per = price / KLARNA_INSTALLMENTS;
  const amount = Number.isInteger(per)
    ? per.toLocaleString()
    : per.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `or ${KLARNA_INSTALLMENTS} interest-free payments of €${amount} with Klarna`;
}
