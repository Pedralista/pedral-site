import type { Metadata } from "next";
import CollectionsContent from "@/components/pages/CollectionsContent";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore all Pedral watch collections — Maestro, Triomphe, Maestro Petite Seconde, and Okapi Classique. Four limited editions. One independent designer. Worn in 30+ countries.",
  alternates: { canonical: "/collections" },
  openGraph: {
    title: "Collections — Pedral",
    description:
      "Maestro, Triomphe, Maestro Petite Seconde, and Okapi Classique. Four limited editions. One independent designer from Stockholm.",
    url: "/collections",
    images: [{ url: "/images/maestro.jpg", width: 1200, height: 630, alt: "Pedral Watch Collections" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Collections — Pedral",
    description: "Maestro, Triomphe, Maestro Petite Seconde, and Okapi Classique. Four limited editions. One independent designer from Stockholm.",
    images: ["/images/maestro.jpg"],
  },
};

export default function CollectionsPage() {
  return <CollectionsContent />;
}
