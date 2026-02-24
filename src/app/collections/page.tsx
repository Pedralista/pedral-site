import type { Metadata } from "next";
import CollectionsContent from "@/components/pages/CollectionsContent";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore all Pedral watch collections — Maestro, Triomphe, and Okapi Classique. Three collections, one vision.",
  alternates: { canonical: "/collections" },
  openGraph: {
    title: "Collections — Pedral",
    description:
      "Explore all Pedral watch collections — Maestro, Triomphe, and Okapi Classique.",
    url: "/collections",
  },
};

export default function CollectionsPage() {
  return <CollectionsContent />;
}
