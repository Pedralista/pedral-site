"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const reasons = [
  {
    num: "01",
    title: "One Designer",
    desc: "Designed in Stockholm. One person, one vision. When you contact Pedral, you reach the designer directly — not a customer service team.",
  },
  {
    num: "02",
    title: "Swiss Specs, Independent Price",
    desc: "Swiss movement. Sapphire crystal. HV1200 coating. At any established house, this specification starts at €3,000+. Without the overhead, the difference stays in the watch.",
  },
  {
    num: "03",
    title: "20 Pieces. No Restocks.",
    desc: "20 pieces per colourway. One designer working at the pace the work demands. When an edition closes, it closes.",
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
              <p className="mt-3.5 text-[15px] font-light leading-[1.85] text-foreground-muted">
                {r.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
