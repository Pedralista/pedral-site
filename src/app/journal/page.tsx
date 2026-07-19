import type { Metadata } from "next";
import JournalContent from "@/components/pages/JournalContent";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "The Rounded Square — Journal",
  description:
    "The Rounded Square: stories about independent watchmaking, design philosophy, and the craft behind Pedral watches. Written from Stockholm.",
  alternates: {
    canonical: "/journal",
    languages: { en: "/journal", "x-default": "/journal" },
  },
  openGraph: {
    title: "The Rounded Square — Pedral Journal",
    description:
      "Stories about independent watchmaking, design philosophy, and the craft behind Pedral watches. Written from Stockholm.",
    url: "/journal",
    images: [{ url: "/images/kevin-design-studio.jpg", width: 1200, height: 630, alt: "The Rounded Square — Pedral Journal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Rounded Square — Pedral Journal",
    description: "Stories about independent watchmaking, design philosophy, and the craft behind Pedral watches.",
    images: ["/images/kevin-design-studio.jpg"],
  },
};

export default function JournalPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", url: "/" }, { name: "Journal", url: "/journal" }]} />
      <JournalContent />
    </>
  );
}
