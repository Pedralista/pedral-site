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
    <section className="border-y border-accent/[0.08] bg-background-alt px-6 py-10 md:px-12 md:py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mx-auto max-w-[1400px] text-center"
      >
        <p className="mb-7 text-[10px] font-normal tracking-[3px] uppercase text-accent">
          Worn by collectors in 30+ countries
        </p>
        <div className="grid grid-cols-3 gap-6 sm:gap-12 md:max-w-[600px] mx-auto">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-[20px] font-normal text-foreground">{s.label}</p>
              <p className="mt-1 text-[12px] font-light leading-[1.7] text-foreground-muted/70">
                {s.sub1}<br />{s.sub2}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
