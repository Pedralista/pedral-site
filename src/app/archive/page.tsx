import type { Metadata } from "next";
import ArchiveContent from "@/components/pages/ArchiveContent";

export const metadata: Metadata = {
  title: "Archive — Pedral",
  description: "The Pedral Archive: Artefact, Okapi GMT, and Okapi — sold-out limited editions, 20 pieces each. Closed permanently. See what came before.",
  alternates: { canonical: "/archive" },
  openGraph: {
    title: "Archive — Pedral",
    description: "Sold-out limited editions. Artefact, Okapi GMT, Okapi — 20 pieces each. Closed permanently.",
    url: "/archive",
    images: [{ url: "/images/okapi-classique.png", width: 1200, height: 630, alt: "Pedral Archive" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archive — Pedral",
    description: "Sold-out limited editions. Artefact, Okapi GMT, Okapi — 20 pieces each. Closed permanently.",
    images: ["/images/okapi-classique.png"],
  },
};

export default function ArchivePage() {
  return <ArchiveContent />;
}
