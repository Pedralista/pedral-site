"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ArchivedWatch } from "@/lib/archive";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Newsletter from "@/components/sections/Newsletter";

export default function ArchiveDetailContent({ watch }: { watch: ArchivedWatch }) {
  const hasImages = watch.images.length > 0;

  return (
    <>
      {/* Header */}
      <section className="relative bg-background pb-14 pt-32 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(17,29,32,0.6)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="mb-3.5">
              <Link
                href="/archive"
                className="text-[11px] font-normal tracking-[4px] uppercase text-accent transition-colors hover:text-accent-hover"
              >
                ← Pedral Archive
              </Link>
            </motion.div>
            <motion.span
              variants={fadeInUp}
              className="inline-block border border-white/15 bg-background/80 px-3 py-1.5 text-[11px] font-medium tracking-[1.5px] uppercase text-white/50 backdrop-blur-sm"
            >
              Sold · {watch.soldYear}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="mt-5 font-serif text-[clamp(36px,5vw,56px)] font-light text-foreground"
            >
              Pedral {watch.name}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mt-3 font-serif text-[clamp(18px,2.5vw,24px)] font-light italic text-accent-hover"
            >
              &ldquo;{watch.hook}&rdquo;
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-5 h-px w-[60px] bg-accent" />
            <motion.p
              variants={fadeInUp}
              className="mt-5 text-[11px] font-normal tracking-[2px] uppercase text-accent/60"
            >
              {watch.year} · {watch.editionLabel ?? `Edition of ${watch.editionSize}`}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      {hasImages && (
        <section className="bg-background-alt py-14 md:py-20">
          <div className="mx-auto max-w-[1100px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {watch.images.map((src, i) => (
                <motion.div
                  key={src}
                  variants={fadeInUp}
                  className="group relative overflow-hidden rounded-lg border border-accent/[0.06] bg-[var(--surface)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div className="absolute inset-0 z-[1] bg-background/30 mix-blend-color" />
                    <Image
                      src={src}
                      alt={watch.dialNames?.[i] ?? watch.name}
                      fill
                      className="object-contain opacity-80 transition-all duration-500"
                    />
                  </div>
                  {watch.dialNames?.[i] && (
                    <p className="px-5 py-4 text-[15px] font-light tracking-[1px] text-foreground-muted/60">
                      {watch.dialNames[i]}
                    </p>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Description */}
      <section className={`${hasImages ? "bg-background" : "bg-background-alt"} py-16 md:py-24`}>
        <div className="mx-auto max-w-[760px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-[11px] font-normal tracking-[4px] uppercase text-accent">
              The Watch
            </p>
            <div className="mt-4 h-px w-[60px] bg-accent" />
            <p className="mt-6 text-[16px] font-light leading-[1.9] text-foreground-muted">
              {watch.description}
            </p>
            <div className="mt-8 flex items-center justify-between border-t border-accent/[0.06] pt-6">
              <span className="text-[16px] font-light text-foreground-muted">
                Sold for €{watch.price.toLocaleString()}
              </span>
              <span className="text-[11px] font-normal tracking-[1px] uppercase text-foreground-muted/40">
                Closed · {watch.soldYear}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stays gone statement */}
      <section className="bg-background py-4">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="rounded-lg border border-accent/10 bg-background-alt p-8 text-center md:p-12"
          >
            <p className="font-serif text-[clamp(18px,2vw,24px)] font-light text-foreground">
              This edition is closed. It stays closed.
            </p>
            <p className="mx-auto mt-3 max-w-[480px] text-[16px] font-light leading-[1.85] text-foreground-muted">
              Every Pedral edition is capped at {watch.editionSize} pieces. No reissue, no sequel. The current collection follows the same rule — when it closes, it closes.
            </p>
            <Link
              href="/collections"
              className="mt-7 inline-block rounded-lg bg-accent px-10 py-4 text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover"
            >
              See what&apos;s still available →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Waitlist */}
      <Newsletter
        title="If it ever returns, you'll know first."
        subtitle="It won't reopen — but new editions do. Leave your email and you'll hear before anyone else. Nothing else."
        buttonText="Join the List"
      />
    </>
  );
}
