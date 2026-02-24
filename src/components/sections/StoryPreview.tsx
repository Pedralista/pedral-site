"use client";

import { motion } from "framer-motion";
import { slideInLeft, slideInRight } from "@/lib/animations";
import Link from "next/link";

export default function StoryPreview() {
  return (
    <section className="bg-background py-28 md:py-[120px]">
      <div className="mx-auto max-w-[900px] px-6 md:px-12">
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-16">
          {/* Left — Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
          >
            <p className="mb-6 text-[11px] font-normal tracking-[4px] uppercase text-accent">
              The Story
            </p>
            <h2 className="font-serif text-[clamp(26px,3vw,40px)] font-light leading-[1.25] text-foreground">
              In 2015, Sweden&apos;s only watchmaking school rejected Kevin
              Pedral.
            </h2>
            <div className="mt-6 h-px w-[60px] bg-accent" />
            <p className="mt-6 text-[15px] font-light leading-[1.8] text-foreground-muted">
              Born in the Democratic Republic of Congo, raised in Stockholm,
              Kevin didn&apos;t fit the profile they wanted. So he taught himself
              — through obsessive research, hundreds of failed prototypes, and
              one stubborn belief: if the path to creating beautiful things has a
              gate, you can also just walk around it.
            </p>
            <p className="mt-5 text-[15px] font-light leading-[1.8] text-foreground-muted">
              Today, every Pedral watch is designed by Kevin in Stockholm. Each
              edition is capped at 20 pieces. Each dial tells a different story.
              And each owner knows: this isn&apos;t a brand — it&apos;s one
              person&apos;s obsession, made tangible.
            </p>
            <Link
              href="/story"
              className="mt-8 inline-flex items-center gap-2 text-[11px] font-medium tracking-[3px] uppercase text-accent transition-colors hover:text-accent-hover"
            >
              Read the full story &rarr;
            </Link>
          </motion.div>

          {/* Right — Image placeholder */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
          >
            <div className="flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 rounded-[4px] border border-accent/10 bg-[linear-gradient(145deg,rgba(201,168,76,0.05),rgba(17,29,32,0.4))]">
              <span className="font-serif text-[40px] text-accent/20">
                &#10022;
              </span>
              <span className="text-[11px] tracking-[2px] uppercase text-foreground-muted">
                Kevin Portrait
              </span>
              <span className="text-[11px] text-foreground-muted">
                or Workshop Shot
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
