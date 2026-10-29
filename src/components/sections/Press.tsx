"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import { PRESS_MENTIONS } from "@/lib/reviews";


export default function Press() {
  if (PRESS_MENTIONS.length === 0) return null;

  return (
    <section className="border-y border-accent/[0.06] bg-background-alt py-12">
      <div className="mx-auto max-w-[1000px] px-6 md:px-12">
        <p className="mb-8 text-center font-mono text-[11px] tracking-[2px] uppercase text-accent/70">
          {PRESS_MENTIONS.length === 1 ? "Independently Reviewed" : "As Featured In"}
        </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className={`grid gap-10 text-center ${PRESS_MENTIONS.length === 1 ? "mx-auto max-w-[560px] grid-cols-1" : PRESS_MENTIONS.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4"}`}
        >
          {PRESS_MENTIONS.map((mention) => (
            <motion.div key={mention.outlet} variants={fadeInUp} className="flex flex-col items-center gap-3">
              <a
                href={mention.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-light tracking-[1px] text-foreground-muted transition-colors hover:text-accent"
              >
                {mention.outlet}
              </a>
              {mention.quote ? (
                <p className="font-serif text-[15px] font-light italic leading-[1.6] text-foreground-muted/70">
                  &ldquo;{mention.quote}&rdquo;
                </p>
              ) : null}
              {mention.detail ? (
                <p className="text-[13px] font-light tracking-[1px] text-foreground-muted/60">{mention.detail}</p>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 text-center">
          <Link
            href="/reviews"
            className="text-[12px] font-medium tracking-[2px] uppercase text-accent transition-colors hover:text-accent-hover"
          >
            Read more reviews &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
