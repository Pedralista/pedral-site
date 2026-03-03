"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { archivedWatches } from "@/lib/archive";
import { fadeInUp, staggerContainer } from "@/lib/animations";

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
              Editions that closed.
            </motion.h1>
            <motion.div variants={fadeInUp} className="mt-4 h-px w-[60px] bg-accent" />
            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-[520px] text-[15px] font-light leading-[1.85] text-foreground-muted"
            >
              Every Pedral edition is limited to 20 pieces. When it sells through, it stays closed. These are the watches that came before — each one complete, none returning.
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
                <div className="group relative overflow-hidden rounded-[2px] border border-accent/[0.06] bg-background">
                  {/* Sold badge */}
                  <span className="absolute left-3 top-3 z-10 border border-white/15 bg-background/80 px-3 py-1.5 text-[11px] font-medium tracking-[1.5px] uppercase text-white/50 backdrop-blur-sm">
                    Sold · {watch.soldYear}
                  </span>

                  {/* Image */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
                    {/* Greyscale overlay */}
                    <div className="absolute inset-0 z-[1] bg-background/30 mix-blend-color" />
                    <Image
                      src={watch.image}
                      alt={watch.name}
                      fill
                      className="object-contain opacity-80 transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <p className="mb-1 text-[11px] font-normal tracking-[2px] uppercase text-accent/60">
                      {watch.year} · Edition of {watch.editionSize}
                    </p>
                    <h3 className="font-serif text-2xl font-normal text-foreground">
                      {watch.name}
                    </h3>
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
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-10 text-center text-[13px] font-light leading-[1.7] tracking-[0.5px] text-foreground-muted/60"
          >
            None of these editions will reopen. Subscribe to hear about new ones first.
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-5 flex justify-center"
          >
            <Link
              href="/collections"
              className="rounded-[2px] border border-accent/30 px-8 py-3.5 text-[11px] font-medium tracking-[3px] uppercase text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              View current editions →
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
