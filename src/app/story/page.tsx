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
    images: [{ url: "/images/kevin-portrait.jpeg", width: 1200, height: 630, alt: "Kevin Pedral — The Story" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Story — Pedral",
    description:
      "The story of Kevin Pedral — a self-taught watchmaker from Stockholm who turned rejection into a brand worn in 30+ countries.",
    images: ["/images/kevin-portrait.jpeg"],
  },
};

export default function StoryPage() {
  return <StoryContent />;
}
