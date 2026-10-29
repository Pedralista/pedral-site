"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Image from "next/image";
import Link from "next/link";

export default function StoryPreview() {
  return (
    <section className="bg-background-alt py-14 md:py-20">
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

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-14">
          <motion.div variants={fadeInUp} className="shrink-0">
            <Image
              src="/images/kevin-portrait.jpeg"
              alt="Kevin Pedral in Stockholm"
              width={220}
              height={275}
              className="h-[150px] w-[120px] rounded-lg object-cover md:h-[275px] md:w-[220px]"
            />
          </motion.div>
          <div>
          {/* Headline */}
          <motion.h2
            variants={fadeInUp}
            className="max-w-[560px] font-serif text-[clamp(26px,3.5vw,44px)] font-light leading-[1.2] text-foreground"
          >
            In 2015, Sweden&apos;s only watchmaking school said no.<br />I taught myself instead.
          </motion.h2>

          {/* Body + CTA */}
          <motion.div variants={fadeInUp} className="mt-8 max-w-[560px]">
            <p className="text-[15px] font-light leading-[1.85] text-foreground-muted">
              Born in the Democratic Republic of Congo, raised in Stockholm. Hundreds of failed
              prototypes and three years of evenings nobody saw, then the first Pedral in 2018.
              Every design since starts from the rounded square, a shape found nowhere else in
              watchmaking, and stops at twenty pieces per dial. Not everyone gets a design like
              this in their collection.
            </p>
            <Link
              href="/story"
              className="mt-5 inline-flex items-center gap-2 text-[12px] font-medium tracking-[2px] uppercase text-accent transition-colors hover:text-accent-hover"
            >
              Read the full story &rarr;
            </Link>
          </motion.div>
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
