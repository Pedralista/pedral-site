"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const stats = [
  { label: "Since 2015", sub1: "Independent", sub2: "Stockholm" },
  { label: "Max 20", sub1: "Pieces per dial", sub2: "No restocks" },
  { label: "Swiss", sub1: "Automatic movements", sub2: "Sapphire crystal" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-accent/[0.08] bg-background-alt px-6 py-14 md:px-12 md:py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mx-auto max-w-[1400px] text-center"
      >
        <p className="mb-10 text-[11px] font-normal tracking-[3px] uppercase text-accent">
          Worn by collectors in 30+ countries
        </p>
        <div className="grid grid-cols-3 gap-4 md:gap-10 lg:gap-16 md:max-w-[700px] mx-auto">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-[clamp(20px,3vw,32px)] font-light text-foreground">{s.label}</p>
              <p className="mt-2 text-[11px] md:text-[13px] font-light leading-[1.7] text-foreground-muted/70">
                {s.sub1}<br />{s.sub2}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
