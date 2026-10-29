"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const reasons = [
  {
    num: "01",
    title: "Designed by One",
    desc: "Every Pedral watch is designed in Stockholm by Kevin Pedral — not a committee, not a trend report.\n\nWhen you contact Pedral, you speak directly with the person behind the watch.",
  },
  {
    num: "02",
    title: "No Shortcuts",
    desc: "Swiss or Japanese movements, chosen for each design. Sapphire crystal on every watch.\n\nFull quality focus. No compromise on materials, no compromise on execution.",
  },
  {
    num: "03",
    title: "The Watch Finds Its Buyer",
    desc: "Each dial is made in twenty pieces or fewer. When an edition closes, it is never produced again.\n\nThese are not watches you stumble into. They find the people they belong to.",
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
            How It Works
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid gap-6 md:gap-14 md:grid-cols-3"
        >
          {reasons.map((r) => (
            <motion.div
              key={r.num}
              variants={fadeInUp}
              className="border-t border-accent/[0.12] pt-7 md:pt-9"
            >
              <span className="font-serif text-[36px] font-light text-accent md:text-[44px]">
                {r.num}
              </span>
              <h3 className="mt-4 font-serif text-[20px] font-normal text-foreground md:text-[22px]">
                {r.title}
              </h3>
              {r.desc.split("\n\n").map((para, i) => (
                <p key={i} className="mt-3.5 text-[15px] font-light leading-[1.85] text-foreground-muted">
                  {para}
                </p>
              ))}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
