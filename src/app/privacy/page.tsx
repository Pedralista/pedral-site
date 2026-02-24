import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Pedral Watches privacy policy — how we collect, use, and protect your personal data.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="Last updated: February 2026">
      <h2>1. Who We Are</h2>
      <p>
        Pedral Watches is the trading name of [LEGAL ENTITY NAME], registered in Sweden.
        Organisation number: [XXXXXX-XXXX]. Address: [Street Address], Stockholm, Sweden.
        Email: <a href="mailto:hello@pedral.eu">hello@pedral.eu</a>.
      </p>
      <p>
        We are the data controller for personal data processed through pedral.eu, shop.pedral.eu,
        email communications, and social media.
      </p>

      <h2>2. What Data We Collect &amp; Why</h2>
      <p>
        <strong>Orders:</strong> Name, email, addresses, phone, order details, payment reference —
        to process and deliver your order. Lawful basis: Contract (Art. 6(1)(b)).
      </p>
      <p>
        <strong>Account:</strong> Email, name, order history — to provide your account area.
        Lawful basis: Contract.
      </p>
      <p>
        <strong>Newsletter:</strong> Email address — for marketing with explicit consent.
        Lawful basis: Consent (Art. 6(1)(a)).
      </p>
      <p>
        <strong>Browsing:</strong> IP address, device/browser type, pages visited — for site
        functionality and analytics. Lawful basis: Legitimate Interest (Art. 6(1)(f)), balanced
        against your rights. Analytics data is anonymised.
      </p>

      <h2>3. Who We Share Data With</h2>
      <p>
        Payment processor (Stripe/Klarna), Shipping courier, Email platform (e.g. Mailchimp/Klaviyo),
        Analytics (Google Analytics or Plausible). No data is sold. Processors are bound by data
        processing agreements.
      </p>

      <h2>4. International Transfers</h2>
      <p>
        Some processors operate outside the EU/EEA. Where this applies, transfers rely on Standard
        Contractual Clauses (SCCs) or EU adequacy decisions.
      </p>

      <h2>5. Retention</h2>
      <p>
        Order data: 7 years (Swedish accounting law). Newsletter: Until unsubscribe.
        Browsing/analytics: 26 months max. Account data: Until deletion request.
      </p>

      <h2>6. Your Rights (GDPR)</h2>
      <p>
        Access, rectification, erasure, restriction, portability, objection, withdraw consent.
        Contact <a href="mailto:hello@pedral.eu">hello@pedral.eu</a>. Complaints: Swedish
        Authority for Privacy Protection (IMY), imy.se.
      </p>

      <h2>7. Cookies</h2>
      <p>
        See our <a href="/cookies">Cookie Policy</a>. We use a consent banner for non-essential
        cookies. No tracking without your approval.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update this policy. Material changes will be communicated via email to existing
        customers.
      </p>
    </LegalPage>
  );
}
