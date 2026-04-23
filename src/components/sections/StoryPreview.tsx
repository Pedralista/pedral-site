"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";

export default function StoryPreview() {
  return (
    <section className="bg-background py-16 md:py-28 lg:py-[120px]">
      <div className="mx-auto max-w-[640px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <p className="mb-6 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
              The Story
            </p>
            <h2 className="font-serif text-[clamp(26px,3vw,40px)] font-light leading-[1.25] text-foreground">
              Watches today are born in boardrooms, built to please everyone. I took a different route.
            </h2>
            <div className="mt-6 h-px w-[60px] bg-accent" />
            <p className="mt-6 text-[16px] font-light leading-[1.9] text-foreground-muted">
              Every Pedral is made to reflect the person who wears it. The squarcle is its
              signature — a shape found nowhere else and the quiet mark of an edition capped at
              twenty. Not everyone gets a design like this in their collection.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-accent px-7 py-3.5 text-center text-[11px] font-medium tracking-[2.5px] uppercase text-background transition-colors hover:bg-accent-hover"
              >
                Request private access
              </Link>
              <Link
                href="/story"
                className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[2px] uppercase text-accent transition-colors hover:text-accent-hover"
              >
                Read the full story &rarr;
              </Link>
            </div>
          </motion.div>
      </div>
    </section>
  );
}
