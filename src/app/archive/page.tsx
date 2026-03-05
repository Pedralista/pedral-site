import type { Metadata } from "next";
import ArchiveContent from "@/components/pages/ArchiveContent";

export const metadata: Metadata = {
  title: "Archive — Pedral",
  description: "The Pedral Archive: Artefact, Okapi GMT, and Okapi — sold-out limited editions, 20 pieces each. Closed permanently. See what came before.",
};

export default function ArchivePage() {
  return <ArchiveContent />;
}
