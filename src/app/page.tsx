import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import StoryPreview from "@/components/sections/StoryPreview";
import CollectionShowcase from "@/components/sections/CollectionShowcase";
import ComingSoon from "@/components/sections/ComingSoon";
import WhyPedral from "@/components/sections/WhyPedral";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

export const metadata: Metadata = {
  title: "Pedral — Not For Everyone",
  description:
    "Stockholm-based watch microbrand. Four collections. Limited editions worn in 30+ countries. Designed by one independent creator.",
  alternates: { canonical: "https://www.pedral.eu" },
  openGraph: {
    title: "Pedral — Not For Everyone",
    description:
      "Stockholm-based watch microbrand. Four collections. Limited editions worn in 30+ countries. Designed by one independent creator.",
    url: "https://www.pedral.eu",
    images: [{ url: "/images/hero-lifestyle.jpg", width: 1200, height: 630, alt: "Pedral Watches" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedral — Not For Everyone",
    description: "Stockholm-based watch microbrand. Four collections. Limited editions worn in 30+ countries.",
    images: ["/images/hero-lifestyle.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StoryPreview />
      <CollectionShowcase />
      <ComingSoon />
      <WhyPedral />
      <Testimonials />
      <Newsletter />
    </>
  );
}
