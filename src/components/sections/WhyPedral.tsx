"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const reasons = [
  {
    num: "01",
    title: "One Designer, One Vision",
    desc: "Every watch is designed by Kevin Pedral in Stockholm. Not a committee. Not a marketing department. One person, one vision. When you meet the creator, you're meeting the entire company.",
  },
  {
    num: "02",
    title: "Swiss Specs, Independent Price",
    desc: "Swiss movements. HV1200 scratch-resistant coating. Sapphire crystal with Super-AR. The spec sheet reads like a €3,000+ watch — because it would be, at any established brand. Without the corporate overhead, the value stays with you.",
  },
  {
    num: "03",
    title: "Radically Limited",
    desc: "Maximum 20 pieces per colourway. No restocks. No waitlist extensions. This isn't artificial scarcity — it's the natural output of one designer who refuses to scale what shouldn't be scaled.",
  },
];

export default function WhyPedral() {
  return (
    <section className="bg-background py-16 md:py-28 lg:py-[120px]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <div className="mb-10 md:mb-16">
          <p className="mb-3.5 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
            Why Pedral
          </p>
          <h2 className="font-serif text-[clamp(32px,3.5vw,40px)] font-light text-foreground">
            What Makes This Different
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid gap-10 md:gap-14 md:grid-cols-3"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.num}
              variants={fadeInUp}
              className="border-t border-accent/[0.12] pt-7 md:pt-9"
            >
              <span className="font-serif text-[44px] font-light text-accent/20">
                {r.num}
              </span>
              <h3 className="mt-4 font-serif text-[22px] font-normal text-foreground">
                {r.title}
              </h3>
              <p className="mt-3.5 text-sm font-light leading-[1.75] text-foreground-muted">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
