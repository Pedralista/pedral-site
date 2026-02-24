"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    quote:
      "Nobody recognises it. And that's precisely the point. It starts a conversation no luxury logo ever could. People ask because they're genuinely curious — not because they've seen an advert.",
    author: "Marcus E.",
    detail: "Architect · Berlin — Collector since 2022",
  },
  {
    quote:
      "I followed Kevin's journey for two years before I committed. Wearing a Pedral feels like supporting an artist whose work you believe in — not filling a corporation's quarterly target.",
    author: "Adrien L.",
    detail: "Investment analyst · Lyon — Owns Okapi Classique & Maestro",
  },
  {
    quote:
      "The finishing punches well above its price. I've handled pieces at three times the cost that don't match the Okapi's dial work. Kevin is building something collectors will be talking about for years.",
    author: "Dr. Kenji N.",
    detail: "Surgeon & watch collector · Tokyo — 40+ piece collection",
  },
  {
    quote:
      "I've worn Omegas, Tudors, vintage Longines. The Triomphe at 8.8mm sits differently on the wrist — it disappears until someone catches the guilloché in the light. Then the questions start.",
    author: "Elena V.",
    detail: "Creative director · Milan — Collector since 2023",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-background-alt py-24 md:py-[120px]">
      <div className="mx-auto max-w-[1000px] px-6 md:px-12">
        <div className="mb-14 text-center">
          <p className="mb-3.5 text-[11px] font-normal tracking-[4px] uppercase text-accent">
            From the Collection
          </p>
          <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] font-light text-foreground">
            What Owners Say
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid gap-8 md:grid-cols-2"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={fadeInUp}
              className="relative border-l-2 border-accent/20 py-2 pl-8"
            >
              <p className="mb-4 font-serif text-[17px] font-light italic leading-[1.6] text-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-[12px] font-normal tracking-[1.5px] text-accent">
                {t.author}
              </p>
              <p className="mt-0.5 text-[11px] font-light text-foreground-muted">
                {t.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
