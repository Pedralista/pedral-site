import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import StoryPreview from "@/components/sections/StoryPreview";
import CollectionShowcase from "@/components/sections/CollectionShowcase";
import WhyPedral from "@/components/sections/WhyPedral";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StoryPreview />
      <CollectionShowcase />
      <WhyPedral />
      <Testimonials />
      <Newsletter />
    </>
  );
}
