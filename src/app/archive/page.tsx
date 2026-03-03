import type { Metadata } from "next";
import ArchiveContent from "@/components/pages/ArchiveContent";

export const metadata: Metadata = {
  title: "Archive — Pedral",
  description: "Past Pedral editions that have sold through. Limited to 20 pieces each. None returning.",
};

export default function ArchivePage() {
  return <ArchiveContent />;
}
