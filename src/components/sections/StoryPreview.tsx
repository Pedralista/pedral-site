"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { slideInLeft, slideInRight } from "@/lib/animations";
import Link from "next/link";

export default function StoryPreview() {
  return (
    <section className="bg-background py-16 md:py-28 lg:py-[120px]">
      <div className="mx-auto max-w-[900px] px-6 md:px-12">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          {/* Left — Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
          >
            <p className="mb-6 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
              The Story
            </p>
            <h2 className="font-serif text-[clamp(26px,3vw,40px)] font-light leading-[1.25] text-foreground">
              In 2015, Sweden&apos;s only watchmaking school rejected me.
            </h2>
            <div className="mt-6 h-px w-[60px] bg-accent" />
            <p className="mt-6 text-[16px] font-light leading-[1.9] text-foreground-muted">
              Born in the Democratic Republic of Congo, raised in Stockholm.
              I didn&apos;t fit the profile they wanted. So I taught myself
              through obsessive research, hundreds of failed prototypes, and
              one stubborn belief: if the path to creating beautiful things has a
              gate, you can also just walk around it.
            </p>
            <p className="mt-5 text-[16px] font-light leading-[1.9] text-foreground-muted">
              Every watch I make is designed here in Stockholm. Each edition is
              capped at 20 pieces. Each dial tells a different story. And each
              owner knows: this isn&apos;t a brand. It&apos;s one
              person&apos;s obsession, made tangible.
            </p>
            <Link
              href="/story"
              className="mt-8 inline-flex items-center gap-2 text-[12px] font-medium tracking-[2px] uppercase text-accent transition-colors hover:text-accent-hover"
            >
              Read the full story &rarr;
            </Link>
          </motion.div>

          {/* Right — Portrait */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[4px]">
              <Image
                src="/images/kevin-portrait.jpeg"
                alt="Kevin Pedral"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
