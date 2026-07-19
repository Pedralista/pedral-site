import type { Metadata } from "next";
import LegalPage from "@/components/pages/LegalPage";
import { WARRANTY_TERMS } from "@/lib/warranty";

export const metadata: Metadata = {
  title: "Warranty",
  description: "Pedral Watches 24-month international warranty — coverage, exclusions, and how to make a claim.",
  alternates: { canonical: "/warranty" },
};

export default function WarrantyPage() {
  return (
    <LegalPage eyebrow="Legal" title="Warranty" updated="24-month international warranty">
      <h2>{WARRANTY_TERMS.coverage.title}</h2>
      <p>{WARRANTY_TERMS.coverage.text}</p>

      <h2>{WARRANTY_TERMS.exclusions.title}</h2>
      <p>The warranty does not cover:</p>
      <ul>
        {WARRANTY_TERMS.exclusions.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>{WARRANTY_TERMS.claim.title}</h2>
      <p>
        Email <a href="mailto:info@pedral.watch">info@pedral.watch</a>. {WARRANTY_TERMS.claim.text}
      </p>

      <h2>{WARRANTY_TERMS.repair.title}</h2>
      <p>{WARRANTY_TERMS.repair.text}</p>

      <h2>Questions</h2>
      <p>
        Anything unclear? Email{" "}
        <a href="mailto:info@pedral.watch">info@pedral.watch</a> — Kevin reads every message
        personally.
      </p>
    </LegalPage>
  );
}
