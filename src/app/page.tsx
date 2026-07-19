import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import StoryPreview from "@/components/sections/StoryPreview";
import CollectionShowcase from "@/components/sections/CollectionShowcase";
import ComingSoon from "@/components/sections/ComingSoon";
import WhyPedral from "@/components/sections/WhyPedral";
import Testimonials from "@/components/sections/Testimonials";
import Press from "@/components/sections/Press";
import Newsletter from "@/components/sections/Newsletter";

export const metadata: Metadata = {
  title: { absolute: "Pedral — Not For Everyone" },
  description:
    "Independent Swedish watchmaker in Stockholm. Swiss automatic dress watches in editions of 20, no restocks. Worn in 30+ countries. Not for everyone.",
  alternates: {
    canonical: "https://www.pedral.eu",
    languages: { en: "https://www.pedral.eu", "x-default": "https://www.pedral.eu" },
  },
  openGraph: {
    title: "Pedral — Not For Everyone",
    description:
      "Independent Swedish watchmaker in Stockholm. Swiss automatic dress watches in editions of 20, no restocks. Worn in 30+ countries. Not for everyone.",
    url: "https://www.pedral.eu",
    images: [{ url: "/images/hero-lifestyle.jpg", width: 1200, height: 630, alt: "Pedral Watches" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pedral — Not For Everyone",
    description: "Independent Swedish watchmaker in Stockholm. Swiss automatic dress watches in editions of 20, no restocks.",
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
      <Press />
      <Newsletter />
    </>
  );
}
