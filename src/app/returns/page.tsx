import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Pedral Watches returns policy — 14-day free returns, refund to original payment method.",
  alternates: { canonical: "/returns" },
};

export default function ReturnsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Returns &amp; Refunds" updated="14-day free returns">
      <h2>Return Window</h2>
      <p>
        You may return any standard Pedral watch within <strong>14 days</strong> of receiving your
        order — no questions asked. The 14-day period begins the day you physically receive the
        goods.
      </p>

      <h2>How to Return</h2>
      <ol>
        <li>
          Email <a href="mailto:info@pedral.watch">info@pedral.watch</a> with your order number and
          reason for return.
        </li>
        <li>
          We will reply within one business day with a prepaid return shipping label.
        </li>
        <li>
          Pack the watch securely in its original box with all included accessories (strap,
          documents, dust bag).
        </li>
        <li>
          Attach the label and drop off at the designated carrier point.
        </li>
      </ol>
      <p>Return shipping is <strong>free of charge</strong> — the prepaid label covers all costs.</p>

      <h2>Condition</h2>
      <p>
        Items must be returned in unused, unworn condition in original packaging. Watches that show
        signs of wear, damage, or missing components may be subject to a reduced refund reflecting
        any diminished value.
      </p>

      <h2>Refund</h2>
      <p>
        Once we receive and inspect the return, we will process a full refund to your{" "}
        <strong>original payment method within 14 days</strong>. No fees or deductions for standard
        returns in original condition.
      </p>

      <h2>Exceptions — Non-Returnable Items</h2>
      <p>
        The following cannot be returned as they are produced to your individual specifications:
      </p>
      <ul>
        <li>Triomphe Hebrew numeral edition (made-to-order)</li>
        <li>Triomphe Eastern Arabic numeral edition (made-to-order)</li>
      </ul>
      <p>
        You will be clearly informed before purchase if this exception applies. All other editions —
        including pre-orders — are fully returnable within 14 days of delivery.
      </p>

      <h2>Damaged or Incorrect Items</h2>
      <p>
        Received something damaged or not what you ordered? Email{" "}
        <a href="mailto:info@pedral.watch">info@pedral.watch</a> immediately with photos. We will
        arrange a replacement or full refund at no cost to you.
      </p>

      <h2>Legal Right of Withdrawal</h2>
      <p>
        For the full formal notice of your statutory right of withdrawal under EU Consumer Rights
        Directive 2011/83/EU, see our{" "}
        <a href="/withdrawal">Right of Withdrawal</a> page.
      </p>

      <h2>Contact</h2>
      <p>
        Pedral Design Studio AB · Sveavägen 117A · 113 49 Stockholm · Sweden
        <br />
        <a href="mailto:info@pedral.watch">info@pedral.watch</a>
      </p>
    </LegalPage>
  );
}
