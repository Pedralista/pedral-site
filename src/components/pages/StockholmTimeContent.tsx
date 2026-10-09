"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const ARTEFACT_DIALS = [
  { name: "Yellow Glyph", image: "/images/stockholm-time/artefact-yellow-glyph.png" },
  { name: "Blue Magic", image: "/images/stockholm-time/artefact-blue-magic.png" },
  { name: "Golden Glyph", image: "/images/stockholm-time/artefact-golden-glyph.png" },
  { name: "Kingfisher Blue", image: "/images/stockholm-time/artefact-kingfisher-blue-std.png" },
  { name: "Maglehems Lugn", image: "/images/stockholm-time/artefact-maglehems-lugn.png" },
  { name: "Raw Malachite", image: "/images/stockholm-time/artefact-raw-malachite.png" },
  { name: "Marabou Brown", image: "/images/stockholm-time/artefact-marabou-brown.png" },
];

function ArtefactCarousel() {
  const [index, setIndex] = useState(0);

  function prev(e: React.MouseEvent) {
    e.preventDefault();
    setIndex((i) => (i - 1 + ARTEFACT_DIALS.length) % ARTEFACT_DIALS.length);
  }

  function next(e: React.MouseEvent) {
    e.preventDefault();
    setIndex((i) => (i + 1) % ARTEFACT_DIALS.length);
  }

  return (
    <div className="group relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
      <Image
        key={ARTEFACT_DIALS[index].image}
        src={ARTEFACT_DIALS[index].image}
        alt={`Artefact — ${ARTEFACT_DIALS[index].name}`}
        fill
        className="object-contain"
      />

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

      <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
        {ARTEFACT_DIALS.map((dial, i) => (
          <button
            key={dial.image}
            onClick={(e) => { e.preventDefault(); setIndex(i); }}
            aria-label={`Show ${dial.name}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-4 bg-accent" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>

      <span className="absolute bottom-3 right-3 z-10 rounded-full bg-background/70 px-2.5 py-1 text-[10px] font-normal tracking-[1px] uppercase text-foreground-muted/80 backdrop-blur-sm">
        {ARTEFACT_DIALS[index].name}
      </span>
    </div>
  );
}

export default function StockholmTimeContent() {
  return (
    <>
      {/* ── 1. Hero ── */}
      <section className="relative bg-background pb-0 pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[720px] px-6 text-center md:px-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              variants={fadeInUp}
              className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              Stockholm Time 2026 · October 10
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-[clamp(26px,4.5vw,54px)] font-light leading-[1.15] text-foreground"
            >
              Pedral, in person, in Stockholm.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-4 text-[15px] font-light leading-[1.8] text-foreground-muted"
            >
              I&rsquo;m showing at this year&rsquo;s Stockholm Time — the annual exhibition for
              Scandinavian watchmakers. One day, one table, the watches in front of you instead
              of on a screen.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-3 text-[15px] font-light leading-[1.8] text-foreground-muted"
            >
              Two new pieces are on view for the first time. A handful of original pieces from
              early Pedral are there to take home the same day.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="#take-home"
                className="inline-block w-full rounded-lg bg-accent px-8 py-3.5 text-center text-[11px] font-medium tracking-[2.5px] uppercase text-background transition-colors hover:bg-accent-hover sm:w-auto"
              >
                See What&rsquo;s Available
              </a>
              <a
                href="https://www.stockholmtime.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full rounded-lg border border-accent/30 px-8 py-3.5 text-center text-[11px] font-medium tracking-[2.5px] uppercase text-foreground transition-colors hover:border-accent hover:text-accent sm:w-auto"
              >
                About Stockholm Time ↗
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Premiere viewing ── */}
      <section className="border-t border-accent/[0.08] bg-background-alt pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-[1000px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-10 text-center md:mb-14"
          >
            <motion.p variants={fadeInUp} className="mb-3 text-[11px] font-normal tracking-[3px] uppercase text-accent/70">
              On View for the First Time
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif text-[clamp(22px,3.5vw,34px)] font-light text-foreground">
              Two pieces, shown before anywhere else.
            </motion.h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {/* Maestro Petite Seconde */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="overflow-hidden rounded-lg border border-accent/[0.08] bg-background"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
                <Image
                  src="/images/maestro-ps-hero-2.png"
                  alt="Maestro Petite Seconde"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 md:p-7">
                <p className="mb-1 text-[11px] font-normal tracking-[2px] uppercase text-accent/60">
                  Premiere · For Sale
                </p>
                <h3 className="font-serif text-2xl font-normal text-foreground">Maestro Petite Seconde</h3>
                <p className="mt-2 text-[15px] font-light leading-[1.8] text-foreground-muted/80">
                  The Maestro at its most complete — a small seconds complication added without
                  disturbing the dial. Reserve it at the table; I hand-deliver each watch
                  personally once it&rsquo;s cased and checked, rather than boxing it up on the
                  day.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-accent/[0.06] pt-4">
                  <span className="text-[16px] font-light text-foreground">€1,600</span>
                  <Link
                    href="/collections/maestro-petite-seconde"
                    className="text-[11px] font-medium tracking-[1px] uppercase text-accent transition-colors hover:text-accent-hover"
                  >
                    Buy Now →
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Okapi Classique prototype */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="overflow-hidden rounded-lg border border-accent/[0.08] bg-background"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
                <Image
                  src="/images/okapi-classique.png"
                  alt="Okapi Classique prototype"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-6 md:p-7">
                <p className="mb-1 text-[11px] font-normal tracking-[2px] uppercase text-accent/60">
                  Prototype · Viewing Only
                </p>
                <h3 className="font-serif text-2xl font-normal text-foreground">Okapi Classique — Prototype</h3>
                <p className="mt-2 text-[15px] font-light leading-[1.8] text-foreground-muted/80">
                  A working prototype of the next Okapi Classique, on the wrist and on the table
                  for the first time. Not for sale at this stage — here to be handled, discussed,
                  and reacted to before it becomes a finished edition.
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-accent/[0.06] pt-4">
                  <span className="text-[16px] font-light text-foreground-muted">Not for sale</span>
                  <span className="text-[11px] font-normal tracking-[1px] uppercase text-foreground-muted/50">
                    Try it on
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. Take it home ── */}
      <section id="take-home" className="border-t border-accent/[0.08] bg-background pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="mx-auto max-w-[1000px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mb-10 text-center md:mb-14"
          >
            <motion.p variants={fadeInUp} className="mb-3 text-[11px] font-normal tracking-[3px] uppercase text-accent/70">
              Original Stock · Take It Home the Same Day
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif text-[clamp(22px,3.5vw,34px)] font-light text-foreground">
              From the first Pedral runs. No restock after this.
            </motion.h2>
            <motion.p variants={fadeInUp} className="mx-auto mt-4 max-w-[560px] text-[15px] font-light leading-[1.8] text-foreground-muted">
              A small number of pieces from Pedral&rsquo;s earliest days — original Artefact
              watches from the first campaign and the Boris Pjanić capsule, and Okapi pieces on
              the original Ronda 1069 quartz movement. Pay and leave with your watch at the
              table. Nothing ships, nothing waits.
            </motion.p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 md:gap-10">
            {/* Artefact */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="overflow-hidden rounded-lg border border-accent/[0.08] bg-background-alt"
            >
              <ArtefactCarousel />
              <div className="p-6 md:p-7">
                <p className="mb-1 text-[11px] font-normal tracking-[2px] uppercase text-accent/60">
                  First Campaign &amp; Boris Pjanić Capsule
                </p>
                <h3 className="font-serif text-2xl font-normal text-foreground">Artefact</h3>
                <p className="mt-2 text-[15px] font-light leading-[1.8] text-foreground-muted/80">
                  Integrated bracelet, guilloché and original-artwork dials, Miyota 9039 — the
                  watch that built Pedral&rsquo;s first community. Several dials remain from the
                  original run and the Boris Pjanić collaboration — browse the range above. In
                  person only.
                </p>
                <p className="mt-4 border-t border-accent/[0.06] pt-4 text-[16px] font-light text-foreground">
                  5,500 SEK
                </p>
              </div>
            </motion.div>

            {/* Okapi Quartz */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="overflow-hidden rounded-lg border border-accent/[0.08] bg-background-alt"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
                <Image
                  src="/images/stockholm-time/okapi-quartz-original.jpg"
                  alt="Okapi Quartz prototype cases from Pedral's first years"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 md:p-7">
                <p className="mb-1 text-[11px] font-normal tracking-[2px] uppercase text-accent/60">
                  Original Prototypes · Ronda 1069 Quartz
                </p>
                <h3 className="font-serif text-2xl font-normal text-foreground">Okapi — Quartz</h3>
                <p className="mt-2 text-[15px] font-light leading-[1.8] text-foreground-muted/80">
                  The cushion case that started the studio, on the Swiss Ronda 1069 quartz
                  movement from Pedral&rsquo;s first years. These are original prototype pieces,
                  not standard production — the language the rest of the Okapi line still speaks.
                  A last few, in person only.
                </p>
                <p className="mt-4 border-t border-accent/[0.06] pt-4 text-[16px] font-light text-foreground">
                  2,500 SEK
                </p>
              </div>
            </motion.div>
          </div>

          {/* Pricing */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mx-auto mt-10 max-w-[560px] rounded-lg border border-accent/20 bg-background-alt p-7 text-center md:p-9"
          >
            <p className="mb-1 text-[11px] font-normal tracking-[2px] uppercase text-accent/70">
              Table Pricing · Swish Only
            </p>
            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-8">
              <div>
                <p className="font-serif text-3xl font-light text-foreground">5,500 SEK</p>
                <p className="mt-1 text-[13px] font-light text-foreground-muted/70">
                  Artefact
                </p>
              </div>
              <div className="hidden w-px bg-accent/15 sm:block" />
              <div>
                <p className="font-serif text-3xl font-light text-foreground">2,500 SEK</p>
                <p className="mt-1 text-[13px] font-light text-foreground-muted/70">
                  Okapi Quartz
                </p>
              </div>
              <div className="hidden w-px bg-accent/15 sm:block" />
              <div>
                <p className="font-serif text-3xl font-light text-foreground">7,000 SEK</p>
                <p className="mt-1 text-[13px] font-light text-foreground-muted/70">
                  Both, together
                </p>
              </div>
            </div>
            <p className="mt-6 text-[13px] font-light leading-[1.7] text-foreground-muted/60">
              A limited, unrepeated number of each. First come, first served — no holds, no
              online reservation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 4. Event details ── */}
      <section className="border-t border-accent/[0.08] bg-background-alt py-14 md:py-20">
        <div className="mx-auto max-w-[640px] px-6 text-center md:px-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
            <motion.p variants={fadeInUp} className="mb-3 text-[11px] font-normal tracking-[3px] uppercase text-accent/70">
              Find Us There
            </motion.p>
            <motion.h2 variants={fadeInUp} className="font-serif text-[clamp(20px,3vw,28px)] font-light text-foreground">
              Stockholm Time 2026
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-3 text-[15px] font-light leading-[1.8] text-foreground-muted">
              Saturday, October 10, 2026 · 11:00–19:00 · Stockholm
            </motion.p>
            <motion.p variants={fadeInUp} className="mt-3 text-[14px] font-light leading-[1.8] text-foreground-muted/70">
              An annual exhibition bringing together Scandinavian watchmakers to show their work
              in person. Full details, directions and tickets are on the official site.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-6">
              <a
                href="https://www.stockholmtime.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border border-accent/30 px-8 py-3.5 text-[11px] font-medium tracking-[2.5px] uppercase text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                stockholmtime.com ↗
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
