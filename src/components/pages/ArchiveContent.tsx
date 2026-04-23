"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { archivedWatches, ArchivedWatch } from "@/lib/archive";
import { fadeInUp, staggerContainer } from "@/lib/animations";

function ArchiveCard({ watch }: { watch: ArchivedWatch }) {
  const [index, setIndex] = useState(0);
  const hasImages = watch.images.length > 0;
  const hasMultiple = watch.images.length > 1;

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    setIndex((i) => (i - 1 + watch.images.length) % watch.images.length);
  }

  function next(e: React.MouseEvent) {
    e.preventDefault();
    setIndex((i) => (i + 1) % watch.images.length);
  }

  return (
    <div id={watch.slug} className="group relative overflow-hidden rounded-lg border border-accent/[0.06] bg-background">
      {/* Sold badge */}
      <span className="absolute left-3 top-3 z-10 border border-white/15 bg-background/80 px-3 py-1.5 text-[11px] font-medium tracking-[1.5px] uppercase text-white/50 backdrop-blur-sm">
        Sold · {watch.soldYear}
      </span>

      {/* Image area */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-lg bg-[var(--surface)]">
        {/* Greyscale overlay */}
        <div className="absolute inset-0 z-[1] bg-background/30 mix-blend-color" />

        {hasImages ? (
          <Image
            key={watch.images[index]}
            src={watch.images[index]}
            alt={watch.dialNames?.[index] ?? watch.name}
            fill
            className="object-contain opacity-80 transition-all duration-500"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-[32px] font-light text-accent/[0.12]">{watch.name}</span>
          </div>
        )}

        {/* Prev / Next arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              aria-label="Previous dial"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-foreground-muted opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:text-accent"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next dial"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/60 text-foreground-muted opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:text-accent"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Dot indicators */}
        {hasMultiple && (
          <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {watch.images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); setIndex(i); }}
                aria-label={`Dial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-4 bg-accent" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6">
        <p className="mb-1 text-[11px] font-normal tracking-[2px] uppercase text-accent/60">
          {watch.year} · {watch.editionLabel ?? `Edition of ${watch.editionSize}`}
        </p>
        <h2 className="font-serif text-2xl font-normal text-foreground">
          Pedral {watch.name}
        </h2>
        {watch.dialNames?.[index] && (
          <p className="mt-1 text-[12px] font-light tracking-[1px] text-foreground-muted/60">
            {watch.dialNames[index]}
          </p>
        )}
        <p className="mt-1.5 text-[14px] font-light italic leading-snug text-foreground-muted">
          &ldquo;{watch.hook}&rdquo;
        </p>
        <p className="mt-3 text-[13px] font-light leading-[1.8] text-foreground-muted/70">
          {watch.description}
        </p>
        <div className="mt-4 flex items-center justify-between border-t border-accent/[0.06] pt-4">
          <span className="text-[13px] font-light text-foreground-muted">
            Sold for €{watch.price.toLocaleString()}
          </span>
          <span className="text-[11px] font-normal tracking-[1px] uppercase text-foreground-muted/40">
            Closed
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ArchiveContent() {
  return (
    <>
      {/* Header */}
      <section className="relative bg-background pb-14 pt-32 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(17,29,32,0.6)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              variants={fadeInUp}
              className="mb-3.5 text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              Pedral Archive
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-[clamp(36px,5vw,56px)] font-light text-foreground"
            >
              The watches that found their owners.
            </motion.h1>
            <motion.div variants={fadeInUp} className="mt-4 h-px w-[60px] bg-accent" />
            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-[520px] text-[15px] font-light leading-[1.85] text-foreground-muted"
            >
              Every edition is capped at 20 pieces. When it closes, it stays closed — no reissue, no sequel. These are the watches that proved there was a market for something different. None are coming back.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mt-3 max-w-[520px] text-[13px] font-light text-foreground-muted/50"
            >
              Most sold out within 2–8 weeks. The current collection is next.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-background-alt py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
          >
            {archivedWatches.map((watch) => (
              <motion.div key={watch.slug} variants={fadeInUp}>
                <ArchiveCard watch={watch} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-12 rounded-lg border border-accent/10 bg-background p-8 text-center md:p-12"
          >
            <p className="font-serif text-[clamp(18px,2vw,24px)] font-light text-foreground">
              None of these editions will reopen.
            </p>
            <p className="mx-auto mt-3 max-w-[480px] text-[14px] font-light leading-[1.85] text-foreground-muted">
              This is the exclusivity Pedral collectors depend on. The current collection follows the same rule — when it closes, it closes. A few pieces remain.
            </p>
            <Link
              href="/collections"
              className="mt-7 inline-block rounded-lg bg-accent px-10 py-4 text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover"
            >
              See what&apos;s still available →
            </Link>
            <p className="mt-4 text-[11px] font-light text-foreground-muted/40">
              Maestro · Triomphe · Okapi Classique — limited pieces remaining
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
