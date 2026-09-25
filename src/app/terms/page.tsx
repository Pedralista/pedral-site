import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Pedral Watches terms and conditions of sale.",
  alternates: {
    canonical: "/terms",
    languages: { en: "/terms", "x-default": "/terms" },
  },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Legal" title="Terms &amp; Conditions of Sale" updated="Last updated: February 2026">
      <h2>1. About Us</h2>
      <p>
        Pedral Design Studio AB, Organisation number 559484-4275, Sveavägen 117A,
        113 49 Stockholm, Sweden.
        Email: <a href="mailto:info@pedral.watch">info@pedral.watch</a>. VAT: SE559484427501.
      </p>

      <h2>2. Scope</h2>
      <p>
        These terms apply to all purchases made through shop.pedral.eu by consumers. They cover
        both in-stock purchases and pre-orders.
      </p>

      <h2>3. Pricing</h2>
      <p>
        Prices in EUR include Swedish VAT (25%) where applicable. For non-EU deliveries, VAT is
        not charged at checkout but import duties/taxes may apply and are the buyer&apos;s
        responsibility.
      </p>

      <h2>4. Ordering &amp; Payment</h2>
      <p>
        Your order constitutes an offer to purchase. Confirmed by email = contract formed.
        Payment via Stripe/Klarna.
      </p>

      <h3>In-Stock Orders</h3>
      <p>
        Full payment is taken at time of order. If your watch is already in stock, it dispatches
        quickly — within 5 business days of order confirmation.
      </p>

      <h3>Pre-Orders</h3>
      <p>
        Many Pedral watches are produced in limited editions and may not yet be in stock at the
        time of purchase. When you place a pre-order:
      </p>
      <ul>
        <li>Full payment is taken at time of order to secure your allocation</li>
        <li>
          For a <strong>standard pre-order</strong> (an existing, already-tooled design), the
          estimated delivery window is typically <strong>4–6 weeks</strong>, clearly stated on
          the product page and in your order confirmation email
        </li>
        <li>
          For an <strong>entirely new production run</strong> (a new design or edition being
          produced for the first time, with new tooling and materials sourced from scratch), the
          estimated delivery window is typically <strong>16–20 weeks</strong> — this will be
          clearly stated on the product page if it applies to your order
        </li>
        <li>
          If production delays push delivery more than <strong>60 days</strong> past the
          estimated window, you will be notified by email and may cancel for a full refund
        </li>
      </ul>
      <p>
        <strong>Placing a pre-order is a binding commitment.</strong> Once your order is
        confirmed, we source materials and schedule production specifically against it. Outside
        of the production-delay right above, pre-orders cannot be cancelled once production has
        begun, and are non-refundable prior to delivery except where required by law. This does
        not affect your statutory 14-day right of withdrawal after you receive the goods (see
        Section 6).
      </p>
      <p>
        <strong>Chargebacks and payment disputes:</strong> If you have a question or concern
        about your order, please contact us at{" "}
        <a href="mailto:info@pedral.watch">info@pedral.watch</a> before raising a dispute with
        your bank or payment provider — most issues can be resolved directly and faster this way.
        Where a charge was properly authorised and the order is proceeding on schedule (or within
        the delay terms above), we will contest unfounded chargebacks using your order
        confirmation, these Terms, and evidence of production progress.
      </p>
      <p>
        <strong>Why we charge upfront:</strong> Each edition is limited to 20 pieces. Payment at
        time of order ensures your allocation is secured and production is committed. This model
        allows us to produce without overstock — aligning with our limited-edition philosophy.
      </p>

      <h2>5. Delivery</h2>
      <p>
        Shipped from Stockholm via insured tracked courier. Estimated delivery times provided at
        checkout and in your confirmation email. Risk passes to you upon delivery.
      </p>
      <p>
        <strong>Pre-order deliveries:</strong> You will receive a shipping notification with
        tracking number once your watch is dispatched. The estimated delivery window is provided
        at checkout — if this changes, we will notify you.
      </p>

      <h2>6. Right of Withdrawal</h2>
      <p>
        Under EU law (Consumer Rights Directive 2011/83/EU), you have{" "}
        <strong>14 days from the day you receive the goods</strong> to withdraw without giving
        any reason. This applies to both in-stock orders and pre-orders. See full{" "}
        <a href="/withdrawal">Right of Withdrawal</a> page.
      </p>

      <h3>Pre-Orders: Your Cancellation Rights</h3>
      <ul>
        <li>
          <strong>Before dispatch:</strong> Pre-orders are a binding commitment once confirmed
          (see Section 4) and cannot be cancelled once production has begun, except where
          production is delayed more than 60 days past the estimated window.
        </li>
        <li>
          <strong>After delivery:</strong> The standard 14-day withdrawal period applies from
          the date you receive the watch. Return the watch in its original condition for a full
          refund.
        </li>
      </ul>

      <h3>Exception — Made-to-Order</h3>
      <p>
        Goods made to your personal specifications are exempt from the right of withdrawal under
        Art. 16(c) of the Consumer Rights Directive. This applies only to: Triomphe custom Hebrew
        and Eastern Arabic numeral editions produced specifically for the buyer. You will be
        clearly informed at checkout if this exception applies to your order.
      </p>
      <p>
        <strong>
          For all standard, non-personalised editions (including pre-orders): the 14-day
          withdrawal right applies in full.
        </strong>
      </p>

      <h2>7. Warranty &amp; Conformity</h2>
      <p>
        24-month international warranty covering manufacturing defects. Does not cover: normal
        wear and tear, misuse, water damage from unsecured crown, battery replacement.
      </p>
      <p>
        EU consumers also benefit from the statutory guarantee of conformity — in Sweden, 3 years
        from delivery (Konsumentk&ouml;plagen 2022:260, &sect;23).
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        Nothing in these terms excludes liability for negligence causing death/injury, fraud, or
        non-excludable statutory rights. Total liability capped at the product purchase price.
      </p>

      <h2>9. Governing Law &amp; Disputes</h2>
      <p>
        Swedish law applies. EU consumers:{" "}
        <a href="https://ec.europa.eu/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/odr
        </a>
        . Swedish consumers: ARN (www.arn.se).
      </p>
    </LegalPage>
  );
}
