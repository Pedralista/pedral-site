import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { FaqJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Pedral watches — ordering, shipping, returns, warranty, and sizing.",
  alternates: { canonical: "/faq" },
};

const FAQ_ITEMS = [
  {
    q: "I've never heard of Pedral before.",
    a: "Kevin has been designing watches in Stockholm since 2015. Over 400 pieces delivered to collectors in 30+ countries. Reviewed by independent watch media and recommended by collectors who own dozens of other watches.",
  },
  {
    q: "What if it doesn't work on my wrist?",
    a: "Every piece ships with a 14-day return window after delivery. Case dimensions are listed in full on each product page. If you have doubts about sizing, write to Kevin directly — he responds personally.",
  },
  {
    q: "What about production delays?",
    a: "Timeline updates are sent directly from Kevin throughout production — not automated emails. If something changes, you hear it from the person responsible.",
  },
  {
    q: "I can't see it in person before buying.",
    a: "Most owners say the watch is better in person than in photos. High-resolution images and full specifications are available for every edition. The 14-day return policy exists precisely for this reason.",
  },
  {
    q: "How does the pre-order model work?",
    a: "Full payment reserves your allocation for the edition you choose. Pieces ship in 4–6 weeks as they complete production. Klarna is available at checkout if you'd rather split the payment.",
  },
  {
    q: "Where does Pedral ship from and how long does it take?",
    a: "All watches ship from Stockholm, Sweden via insured, tracked courier. Sweden: 2–4 business days. EU & EEA: 3–7 business days. United Kingdom, United States & Canada: 5–10 business days. Rest of world: 7–14 business days.",
  },
  {
    q: "Will I owe customs or import duties?",
    a: "EU customers pay nothing further — VAT is included in the displayed price. Orders shipped outside the EU may be subject to import duties, VAT, GST, or other taxes collected by your local courier or customs office, not by Pedral.",
  },
  {
    q: "What's the return policy?",
    a: "Standard editions can be returned within 14 days of delivery, no questions asked, with a prepaid return label. Made-to-order variants — the Triomphe Hebrew and Eastern Arabic numeral editions — are produced to individual specification and cannot be returned, per the EU Consumer Rights Directive's custom-goods exemption.",
  },
  {
    q: "What warranty comes with a Pedral watch?",
    a: "Every watch carries a 24-month international warranty covering movement and manufacturing defects from the date of delivery. Normal wear, water damage from misuse, accidental damage, and unauthorized service are excluded. Claims go to info@pedral.watch with your order number and photos.",
  },
  {
    q: "How do I know which size will fit?",
    a: "Each product page lists case diameter, thickness, lug-to-lug, lug width, and a recommended wrist range. If you're between sizes or unsure, email Kevin directly with your wrist measurement — he'll tell you honestly whether a piece will suit you.",
  },
  {
    q: "How do I care for the watch?",
    a: "Keep it away from magnets and extreme temperature swings, avoid the shower and sauna even on water-resistant models, and wipe the case and strap with a soft cloth after wear. The included polishing cloth is suited for the case metal.",
  },
];

export default function FaqPage() {
  return (
    <>
      <FaqJsonLd items={FAQ_ITEMS} />
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "FAQ", url: "/faq" }]} />
      <LegalPage eyebrow="Help" title="Frequently Asked Questions" updated="Ordering, shipping, returns, warranty, sizing">
        <h2>About Pedral</h2>
        <p>
          Kevin has been designing watches in Stockholm since 2015. Over 400 pieces delivered to
          collectors in 30+ countries. Reviewed by independent watch media and recommended by
          collectors who own dozens of other watches. Most owners say the watch reads better in
          person than in photos — high-resolution images and full specifications are published
          for every edition, and the 14-day return policy exists precisely for the cases where
          photos aren&apos;t enough.
        </p>
        <p>
          Timeline updates during production are sent directly from Kevin — not automated
          emails. If something changes, you hear it from the person responsible.
        </p>

        <h2>Ordering &amp; Payment</h2>
        <p>
          Pedral operates on a pre-order model. Full payment reserves your allocation for the
          edition you choose, and pieces ship in <strong>4–6 weeks</strong> as production
          completes. Klarna is available at checkout for customers who prefer to split the
          payment. Visa, Mastercard, American Express, Apple Pay, and Google Pay are also
          accepted.
        </p>

        <h2>Shipping</h2>
        <p>
          All watches ship from Stockholm, Sweden via insured, tracked courier, with a tracking
          number sent by email upon dispatch.
        </p>
        <ul>
          <li><strong>Sweden:</strong> 2–4 business days</li>
          <li><strong>EU &amp; EEA:</strong> 3–7 business days</li>
          <li><strong>United Kingdom:</strong> 5–10 business days</li>
          <li><strong>United States &amp; Canada:</strong> 5–10 business days</li>
          <li><strong>Rest of world:</strong> 7–14 business days</li>
        </ul>
        <p>
          EU customers owe nothing further — VAT is included in the displayed price. Orders
          shipped outside the EU may be subject to import duties, VAT, GST, or other taxes,
          collected by your courier or local customs office rather than by Pedral. Full details
          are on the <a href="/shipping">Shipping &amp; Customs</a> page.
        </p>

        <h2>Returns</h2>
        <p>
          Standard editions can be returned within <strong>14 days</strong> of delivery, no
          questions asked. Email <a href="mailto:info@pedral.watch">info@pedral.watch</a> with
          your order number and we&apos;ll send a prepaid return label — return shipping is
          free.
        </p>
        <p>
          Made-to-order variants — the Triomphe Hebrew and Eastern Arabic numeral editions — are
          produced to your individual specification and cannot be returned, under the EU
          Consumer Rights Directive&apos;s custom-goods exemption. You&apos;ll always be told
          before purchase if this exception applies. Full policy on the{" "}
          <a href="/returns">Returns &amp; Refunds</a> page.
        </p>

        <h2>Warranty</h2>
        <p>
          Every Pedral watch carries a <strong>24-month international warranty</strong> covering
          movement and manufacturing defects from the date of delivery. Repairs and replacement
          are handled by Pedral directly. Full terms and exclusions are on the{" "}
          <a href="/warranty">Warranty</a> page.
        </p>

        <h2>Sizing &amp; Care</h2>
        <p>
          Case diameter, thickness, lug-to-lug, lug width, and a recommended wrist range are
          listed on every product page. If you&apos;re between sizes, email Kevin directly with
          your wrist measurement — he answers sizing questions personally rather than leaving
          you to guess.
        </p>
        <p>
          Keep the watch away from magnets and extreme temperature swings, and avoid the shower
          or sauna even on water-resistant models. Wipe the case and strap with a soft cloth
          after wear — the polishing cloth included in the box is suited for the case metal.
        </p>

        <h2>Still Have Questions?</h2>
        <p>
          Email <a href="mailto:info@pedral.watch">info@pedral.watch</a> — Kevin reads and
          answers every message personally.
        </p>
      </LegalPage>
    </>
  );
}
