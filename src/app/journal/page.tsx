import type { Metadata } from "next";
import JournalContent from "@/components/pages/JournalContent";

export const metadata: Metadata = {
  title: "The Rounded Square — Journal",
  description:
    "The Rounded Square: stories about independent watchmaking, design philosophy, and the craft behind Pedral watches. Written from Stockholm.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return <JournalContent />;
}
