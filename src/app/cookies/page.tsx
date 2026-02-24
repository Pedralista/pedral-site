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
        Cookies are small text files placed on your device. Some are essential; others require
        consent.
      </p>

      <h2>Strictly Necessary Cookies</h2>
      <p>
        These cookies are essential for the site to function. No consent required. Includes:
        woocommerce_cart_hash (session), wp_woocommerce_session (2 days), wordpress_logged_in
        (session/14 days), cookie_consent (12 months), PHPSESSID (session).
      </p>

      <h2>Analytics Cookies (Require Consent)</h2>
      <p>
        [_ga, _gid] from [Google Analytics / Plausible] — anonymous usage data. Duration: up to 2
        years.
      </p>
      <p>
        <em>
          Recommendation: We are evaluating Plausible (EU-hosted, cookie-free) to eliminate
          analytics consent requirements entirely.
        </em>
      </p>

      <h2>Marketing Cookies (Require Consent)</h2>
      <p>
        [_fbp, fr] from Meta/Facebook — ad targeting on Instagram/Facebook. Duration: 3 months.
        Never loaded without explicit consent.
      </p>

      <h2>How to Control Cookies</h2>
      <p>
        In addition to our banner: Chrome (Settings &rarr; Privacy &rarr; Cookies), Firefox
        (Settings &rarr; Privacy), Safari (Preferences &rarr; Privacy), Edge (Settings &rarr;
        Privacy &rarr; Cookies).
      </p>
    </LegalPage>
  );
}
