import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description: "Pedral Watches returns and refund policy — when a refund applies, how to request one, and what is made to order.",
  alternates: {
    canonical: "/returns",
    languages: { en: "/returns", "x-default": "/returns" },
  },
};

// Policy set by Kevin (Oct 2026): change-of-mind returns at the customer's
// cost (EU/EEA statutory right only), no change-of-mind refunds outside the
// EU/EEA, bespoke deposits non-refundable, production time is not a ground
// for a refund. EU/EEA statutory rights are never reduced by this page.
export default function ReturnsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Returns & Refunds", url: "/returns" }]} />
      <LegalPage eyebrow="Legal" title="Returns &amp; Refunds" updated="Updated October 2026">
      <p>
        Every Pedral watch is made in small numbers, many of them only after you order. This
        policy explains when a refund applies and how to request one. Please read it before you
        buy. Where you live matters: if you are a consumer in the EU or EEA, the law gives you
        rights that nothing on this page reduces.
      </p>

      <h2>1. Faulty, Damaged or Incorrect Watches</h2>
      <p>For every customer, wherever you are, we will put it right if:</p>
      <ul>
        <li>the watch arrives damaged or defective, or</li>
        <li>we made a mistake with your order (wrong model, dial, movement or size).</li>
      </ul>
      <p>
        Please write to us within <strong>7 days of delivery</strong>, with photos or a short
        video of the problem, so we can act quickly with the courier and our workshops. We will
        repair, replace or refund the watch, and we cover all shipping costs. Your rights under
        the legal guarantee and our <a href="/warranty">24-month warranty</a> continue after
        these 7 days.
      </p>

      <h2>2. Changing Your Mind — Customers in the EU/EEA</h2>
      <p>
        As a consumer in the EU or EEA, you have a statutory right to withdraw from your purchase
        within <strong>14 days</strong> of receiving the watch, without giving a reason. The full
        formal terms are on our <a href="/withdrawal">Right of Withdrawal</a> page.
      </p>
      <ul>
        <li>
          The watch must come back unworn, with all accessories, in its original box. If it shows
          wear or handling beyond what is needed to examine it, we may deduct the loss in value.
        </li>
        <li>
          <strong>Return shipping is at your cost.</strong> Please use a tracked and insured
          service; the watch remains your responsibility until it reaches us.
        </li>
        <li>
          This right does not apply to watches made to your specification (see section 4).
        </li>
      </ul>

      <h2>3. Changing Your Mind — Customers Outside the EU/EEA</h2>
      <p>
        Outside the EU and EEA, all sales are final. We do not offer refunds or cancellations for
        a change of mind, a personal preference, or the time a watch takes to produce. Refunds
        apply only in the situations described in section 1.
      </p>

      <h2>4. Made to Order and Bespoke</h2>
      <p>
        The following are produced specifically for you and cannot be returned or refunded for a
        change of mind, under the EU Consumer Rights Directive&apos;s exemption for goods made to
        the consumer&apos;s specifications (Art. 16(c)):
      </p>
      <ul>
        <li>Okapi Classique (made to order)</li>
        <li>Triomphe Hebrew and Eastern Arabic numeral editions</li>
        <li>Étiquette Hebrew, Eastern Arabic and Bangla numeral editions</li>
        <li>
          Bespoke commissions: the deposit is <strong>non-refundable once paid</strong>, and no
          part of the price is refundable once the design has been agreed
        </li>
      </ul>
      <p>You will always be told before you pay if your watch falls under this section.</p>

      <h2>5. Production Times</h2>
      <p>
        Many Pedral watches are made after you order them. The delivery dates we give are our
        best estimates, and if anything moves, you will hear it from Kevin personally. The time a
        watch takes to produce is not, by itself, a reason for a refund or compensation, beyond
        any rights the law of your country gives you.
      </p>

      <h2>6. What Is Not Covered</h2>
      <ul>
        <li>Normal wear and tear</li>
        <li>Damage from misuse, accidents or improper handling</li>
        <li>Water damage when the crown was not fully secured</li>
        <li>Work carried out by anyone other than Pedral or a service centre we have approved</li>
      </ul>

      <h2>7. How to Request a Return or Refund</h2>
      <ol>
        <li>
          Email <a href="mailto:info@pedral.watch">info@pedral.watch</a> with your order number,
          a short explanation, and photos or a video if something is wrong with the watch.
        </li>
        <li>We reply within one business day with the next steps and the return address.</li>
        <li>
          Pack the watch securely in its original box with all accessories (strap, documents,
          pouch) and send it tracked and insured.
        </li>
      </ol>

      <h2>8. Refunds</h2>
      <p>
        When the watch arrives, we inspect it, usually within 5 business days. Approved refunds are
        made to your <strong>original payment method within 14 days</strong> of receiving the
        watch. How quickly the money appears then depends on your bank or card provider.
      </p>

      <h2>Contact</h2>
      <p>
        Pedral Design Studio AB · Sveavägen 117A · 113 49 Stockholm · Sweden
        <br />
        <a href="mailto:info@pedral.watch">info@pedral.watch</a>
      </p>
      <p>
        We may update this policy from time to time. The version on this page when you place your
        order is the one that applies to it.
      </p>
    </LegalPage>
    </>
  );
}
