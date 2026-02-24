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
      "The Maestro is the watch I reach for when it matters. The diagonal display, the tonneau case — it's full of decisions that only make sense once you understand them. That's rare at any price.",
    author: "Adrien L.",
    detail: "Investment analyst · Lyon — Owns Okapi Classique & Maestro",
  },
  {
    quote:
      "The finishing punches well above its price. I've handled pieces at three times the cost that don't match the Okapi's dial work. The way this studio approaches craft — refusing to scale, refusing to compromise — is something the industry needs more of.",
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
    <section className="bg-background-alt py-16 md:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-[1000px] px-6 md:px-12">
        <div className="mb-10 text-center md:mb-14">
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
              className="relative border-l-2 border-accent/20 py-2 pl-5 sm:pl-8"
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
