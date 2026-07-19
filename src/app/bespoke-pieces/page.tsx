import type { Metadata } from "next";
import UniquePiecesContent from "@/components/pages/UniquePiecesContent";

export const metadata: Metadata = {
  title: "Bespoke Pieces",
  description:
    "Designs and prototypes by Kevin Pedral. Not for sale — for the right conversation.",
  alternates: {
    canonical: "/bespoke-pieces",
    languages: { en: "/bespoke-pieces", "x-default": "/bespoke-pieces" },
  },
  openGraph: {
    title: "Bespoke Pieces — Pedral",
    description:
      "Designs and prototypes by Kevin Pedral. Not for sale — for the right conversation.",
    url: "/bespoke-pieces",
  },
};

export default function UniquePiecesPage() {
  return <UniquePiecesContent />;
}
