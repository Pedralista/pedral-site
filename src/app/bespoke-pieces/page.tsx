import type { Metadata } from "next";
import UniquePiecesContent from "@/components/pages/UniquePiecesContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Bespoke Commissions",
  description:
    "Bespoke watch commissions designed by Kevin Pedral in Stockholm: stone dials, custom numerals, gold or tantalum cases, engraving, gem setting and your choice of movement. In steel from €7,000. Made once, never repeated.",
  alternates: {
    canonical: "/bespoke-pieces",
    languages: { en: "/bespoke-pieces", "x-default": "/bespoke-pieces" },
  },
  openGraph: {
    title: "Bespoke Commissions — Pedral",
    description:
      "Bespoke watch commissions designed by Kevin Pedral in Stockholm: stone dials, custom numerals, gold or tantalum cases, engraving, gem setting and your choice of movement. In steel from €7,000. Made once, never repeated.",
    url: "/bespoke-pieces",
  },
};

export default function UniquePiecesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Bespoke Pieces", url: "/bespoke-pieces" }]} />
      <UniquePiecesContent />
    </>
  );
}
