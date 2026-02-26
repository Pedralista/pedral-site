"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    quote:
      "It starts conversations because people are curious. Not because of the branding. It's not widely known. I prefer it that way.",
    author: "Swen A.",
    detail: "Architect · Hamburg · Collector since 2022",
  },
  {
    quote:
      "I own blue from the usual houses. Émeraude Vert carries more presence than the photographs reveal.",
    author: "Anthony A.",
    detail: "Artist · France",
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
