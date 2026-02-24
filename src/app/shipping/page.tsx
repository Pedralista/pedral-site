import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Shipping & Customs",
  description: "Pedral Watches shipping information, delivery times, and customs duties.",
  alternates: { canonical: "/shipping" },
};

export default function ShippingPage() {
  return (
    <LegalPage eyebrow="Legal" title="Shipping &amp; Customs" updated="International delivery information">
      <h2>Shipping</h2>
      <p>
        All watches shipped from Stockholm, Sweden via insured, tracked courier. Tracking number
        sent by email upon dispatch.
      </p>
      <ul>
        <li><strong>Sweden:</strong> 2–4 business days</li>
        <li><strong>EU &amp; EEA:</strong> 3–7 business days</li>
        <li><strong>United Kingdom:</strong> 5–10 business days</li>
        <li><strong>United States &amp; Canada:</strong> 5–10 business days</li>
        <li><strong>Rest of world:</strong> 7–14 business days</li>
      </ul>
      <p>All shipments insured for full purchase value.</p>

      <h2>Customs, Duties &amp; Import Taxes</h2>
      <p>
        Orders shipped outside the EU may be subject to import duties, VAT, GST, or other taxes.
        These are <strong>NOT</strong> included in the price and are the buyer&apos;s
        responsibility.
      </p>
      <ul>
        <li>Customs charges are determined by your country&apos;s laws</li>
        <li>
          Charges are collected by your courier or local customs office — not by Pedral
        </li>
        <li>We declare the full value on all customs documents — we cannot under-declare</li>
        <li>
          Refused delivery results in return/destruction by courier; refund minus shipping costs
        </li>
      </ul>
      <p>Estimate charges: SimplyDuty.com or your national customs authority.</p>

      <h3>EU Customers</h3>
      <p>
        All VAT is included in the displayed price. No additional customs charges for intra-EU
        shipments.
      </p>

      <h3>United Kingdom</h3>
      <p>
        UK import VAT (20%) and possible customs duty apply post-Brexit. Typically collected by
        the courier upon delivery.
      </p>

      <h2>Delivery Issues</h2>
      <p>
        Lost, damaged, or delayed? Email{" "}
        <a href="mailto:hello@pedral.eu">hello@pedral.eu</a> with your order number. We&apos;ll
        investigate and resolve promptly.
      </p>
    </LegalPage>
  );
}
