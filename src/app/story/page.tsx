import type { Metadata } from "next";
import StoryContent from "@/components/pages/StoryContent";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "The story of Kevin Pedral — a self-taught watchmaker from Stockholm who turned rejection into a brand worn in 30+ countries.",
  alternates: { canonical: "/story" },
  openGraph: {
    title: "Our Story — Pedral",
    description:
      "The story of Kevin Pedral — a self-taught watchmaker from Stockholm who turned rejection into a brand worn in 30+ countries.",
    url: "/story",
  },
};

export default function StoryPage() {
  return <StoryContent />;
}
