import type { Metadata } from "next";
import StockholmTimeContent from "@/components/pages/StockholmTimeContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Pedral på Stockholm Time 2026",
  description:
    "Pedral på Stockholm Time 2026 — 10 oktober, Stockholm. Premiärvisning av Maestro Petite Seconde och Okapi Classique-prototypen, samt ursprungliga Artefact- och Okapi Quartz-klockor att ta med hem från 5 500 SEK.",
  alternates: {
    canonical: "/stockholm-time/sv",
    languages: { en: "/stockholm-time", sv: "/stockholm-time/sv", "x-default": "/stockholm-time" },
  },
  openGraph: {
    title: "Pedral på Stockholm Time 2026",
    description:
      "10 oktober, Stockholm. Premiärvisning av Maestro Petite Seconde och Okapi Classique, samt ursprungliga Artefact- och Okapi Quartz-klockor att ta med hem från 5 500 SEK.",
    url: "/stockholm-time/sv",
    images: [{ url: "/images/maestro-ps-hero-2.png", width: 1200, height: 630, alt: "Pedral på Stockholm Time 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedral på Stockholm Time 2026",
    description:
      "10 oktober, Stockholm. Premiärvisning av Maestro Petite Seconde och Okapi Classique, samt ursprungliga Artefact- och Okapi Quartz-klockor att ta med hem från 5 500 SEK.",
    images: ["/images/maestro-ps-hero-2.png"],
  },
  robots: { index: false, follow: true },
};

export default function StockholmTimeSvPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Stockholm Time 2026", url: "/stockholm-time/sv" }]} />
      <StockholmTimeContent locale="sv" />
    </>
  );
}
