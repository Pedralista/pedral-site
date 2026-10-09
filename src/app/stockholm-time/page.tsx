import type { Metadata } from "next";
import StockholmTimeContent from "@/components/pages/StockholmTimeContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Pedral at Stockholm Time 2026",
  description:
    "Pedral at Stockholm Time 2026 — October 10, Stockholm. Premiere viewing of Maestro Petite Seconde and the Okapi Classique prototype, plus original Artefact and Okapi Quartz pieces available to take home from 5,000 SEK.",
  alternates: {
    canonical: "/stockholm-time",
    languages: { en: "/stockholm-time", "x-default": "/stockholm-time" },
  },
  openGraph: {
    title: "Pedral at Stockholm Time 2026",
    description:
      "October 10, Stockholm. Premiere viewing of Maestro Petite Seconde and Okapi Classique, plus original Artefact and Okapi Quartz pieces to take home from 5,000 SEK.",
    url: "/stockholm-time",
    images: [{ url: "/images/maestro-ps-hero-2.png", width: 1200, height: 630, alt: "Pedral at Stockholm Time 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedral at Stockholm Time 2026",
    description:
      "October 10, Stockholm. Premiere viewing of Maestro Petite Seconde and Okapi Classique, plus original Artefact and Okapi Quartz pieces to take home from 5,000 SEK.",
    images: ["/images/maestro-ps-hero-2.png"],
  },
  robots: { index: false, follow: true },
};

export default function StockholmTimePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Stockholm Time 2026", url: "/stockholm-time" }]} />
      <StockholmTimeContent />
    </>
  );
}
