"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

// TODO: Kevin — add real press coverage here (outlet name, article URL, optional pull-quote). Do not fabricate entries.
const PRESS_MENTIONS: { outlet: string; url: string; quote?: string }[] = [];

export default function Press() {
  if (PRESS_MENTIONS.length === 0) return null;

  return (
    <section className="border-y border-accent/[0.06] bg-background-alt py-12">
      <div className="mx-auto max-w-[1000px] px-6 md:px-12">
        <p className="mb-8 text-center font-mono text-[10px] tracking-[2px] uppercase text-accent/70">
          As Featured In
        </p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 gap-8 text-center md:grid-cols-4"
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
                <p className="font-serif text-[13px] font-light italic leading-[1.6] text-foreground-muted/70">
                  &ldquo;{mention.quote}&rdquo;
                </p>
              ) : null}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
