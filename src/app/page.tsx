import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import StoryPreview from "@/components/sections/StoryPreview";
import CollectionShowcase from "@/components/sections/CollectionShowcase";
import ComingSoon from "@/components/sections/ComingSoon";
import WhyPedral from "@/components/sections/WhyPedral";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";
import TrustIcons from "@/components/sections/TrustIcons";

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
      <TrustIcons />
      <Newsletter />
    </>
  );
}
