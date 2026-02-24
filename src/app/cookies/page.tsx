import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Pedral Watches cookie policy — how we use cookies and similar technologies.",
  alternates: { canonical: "/cookies" },
};

export default function CookiePolicyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Cookie Policy" updated="Last updated: February 2026">
      <h2>What Are Cookies</h2>
      <p>
        Cookies are small text files placed on your device when you visit a website. They help the
        site remember your preferences and understand how you use it. Some cookies are essential for
        the site to work; others are optional and require your consent.
      </p>

      <h2>Strictly Necessary (No Consent Required)</h2>
      <p>
        These cookies are required for the site to function correctly. You cannot opt out of them.
      </p>
      <ul>
        <li>
          <strong>pedral-cookies</strong> — Stores your cookie consent preference (accept or
          decline). Saved in your browser&apos;s local storage. Duration: until you clear your
          browser data. Set by: Pedral Design Studio AB.
        </li>
      </ul>

      <h2>Analytics Cookies (Require Consent)</h2>
      <p>
        We do not currently use any analytics cookies or tracking tools. If we introduce analytics
        in the future (for example, a privacy-first tool such as Plausible Analytics, which is
        EU-hosted and cookie-free), this policy will be updated before any tracking begins and your
        consent will be re-requested where required.
      </p>

      <h2>Marketing &amp; Advertising Cookies (Require Consent)</h2>
      <p>
        We do not currently use marketing or advertising cookies. No Facebook pixel, Google Ads
        tag, or similar tracking is loaded on this site. If this changes, this policy will be
        updated and consent obtained before any such cookies are set.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        This site uses the following third-party services that may set their own cookies or use
        local storage:
      </p>
      <ul>
        <li>
          <strong>Google Fonts</strong> — Fonts are loaded via Next.js font optimisation, which
          downloads font files to our own server at build time. No request is made to Google
          servers when you visit the site, and no Google cookies are set.
        </li>
        <li>
          <strong>Stripe / Klarna</strong> — Payment processing cookies are only set when you
          proceed to checkout on our external shop (shop.pedral.eu). Please refer to{" "}
          <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">
            Stripe&apos;s Privacy Policy
          </a>{" "}
          and{" "}
          <a href="https://www.klarna.com/privacy/" target="_blank" rel="noopener noreferrer">
            Klarna&apos;s Privacy Policy
          </a>{" "}
          for details.
        </li>
      </ul>

      <h2>How to Control Cookies</h2>
      <p>
        You can withdraw your consent at any time by clicking &ldquo;Decline&rdquo; in our cookie
        banner (visible on your first visit) or by clearing your browser&apos;s local storage. You
        can also manage cookies directly in your browser:
      </p>
      <ul>
        <li>Chrome: Settings &rarr; Privacy and security &rarr; Cookies</li>
        <li>Firefox: Settings &rarr; Privacy &amp; Security</li>
        <li>Safari: Preferences &rarr; Privacy</li>
        <li>Edge: Settings &rarr; Privacy, search and services &rarr; Cookies</li>
      </ul>

      <h2>Contact</h2>
      <p>
        For questions about this policy or our data practices, contact us at{" "}
        <a href="mailto:info@pedral.watch">info@pedral.watch</a> or write to Pedral Design Studio
        AB, Sveavägen 117A, 113 49 Stockholm, Sweden.
      </p>
    </LegalPage>
  );
}
