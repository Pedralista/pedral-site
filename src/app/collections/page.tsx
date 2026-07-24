import type { Metadata } from "next";
import CollectionsContent from "@/components/pages/CollectionsContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore all Pedral watch collections — Contour, Maestro, Maestro Petite Seconde, Triomphe, and Okapi Classique. Five limited editions. One independent designer. Worn in 30+ countries.",
  alternates: {
    canonical: "/collections",
    languages: { en: "/collections", "x-default": "/collections" },
  },
  openGraph: {
    title: "Collections — Pedral",
    description:
      "Contour, Maestro, Maestro Petite Seconde, Triomphe, and Okapi Classique. Five limited editions. One independent designer from Stockholm.",
    url: "/collections",
    images: [{ url: "/images/maestro.jpg", width: 1200, height: 630, alt: "Pedral Watch Collections" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Collections — Pedral",
    description: "Contour, Maestro, Maestro Petite Seconde, Triomphe, and Okapi Classique. Five limited editions. One independent designer from Stockholm.",
    images: ["/images/maestro.jpg"],
  },
};

export default function CollectionsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Collections", url: "/collections" }]} />
      <CollectionsContent />
    </>
  );
}
