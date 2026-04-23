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

          {/* Headline — full width */}
          <motion.h2
            variants={fadeInUp}
            className="font-serif text-[clamp(26px,3.5vw,44px)] font-light leading-[1.2] text-foreground"
          >
            Watches today are born in boardrooms, built to please everyone. I took a different route.
          </motion.h2>

          {/* Body + CTA */}
          <motion.div variants={fadeInUp} className="mt-8 grid gap-8 md:grid-cols-2 md:gap-16">
            <p className="text-[15px] font-light leading-[1.85] text-foreground-muted">
              Every Pedral is made to reflect the person who wears it rather than the widest
              possible market. The squarcle is its signature, a shape found nowhere else in
              watchmaking and the quiet mark of an edition capped at twenty. Not everyone gets
              a design like this in their collection.
            </p>
            <div className="flex items-center">
              <Link
                href="/story"
                className="inline-flex items-center gap-2 text-[12px] font-medium tracking-[2px] uppercase text-accent transition-colors hover:text-accent-hover"
              >
                Read the full story &rarr;
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
