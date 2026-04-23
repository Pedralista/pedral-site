"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";

export default function StoryPreview() {
  return (
    <section className="bg-background-alt py-16 md:py-28 lg:py-[120px]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="border-t border-accent/[0.12] pt-7 md:pt-10"
        >
          <motion.p variants={fadeInUp} className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent">
            The Story
          </motion.p>

          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <motion.div variants={fadeInUp} className="flex flex-col gap-5">
              <h2 className="font-serif text-[clamp(26px,3vw,38px)] font-light leading-[1.3] text-foreground">
                Watches today are born in boardrooms, built to please everyone. I took a different route.
              </h2>
              <p className="text-[15px] font-light leading-[1.85] text-foreground-muted">
                Every Pedral is made to reflect the person who wears it. The squarcle is its
                signature — a shape found nowhere else and the quiet mark of an edition capped at twenty.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col justify-center gap-3">
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
