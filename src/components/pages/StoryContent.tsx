"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/sections/Newsletter";

// ─── Proof stats ────────────────────────────────────────────────────────────
const stats = [
  { value: "6", label: "Collections" },
  { value: "6/6", label: "Sold out" },
  { value: "30+", label: "Countries" },
  { value: "20", label: "Pieces per edition — never more" },
];

export default function StoryContent() {
  return (
    <>

      {/* ── ACT I · ATTENTION ─────────────────────────────────────────────────
          Emotional priming: injustice + outsider identity.
          The reader feels before they think.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="bg-background-alt px-6 pb-14 pt-28 sm:pt-32 md:px-24 md:pt-44 md:pb-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">

            {/* Text */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.p
                variants={fadeInUp}
                className="mb-4 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent"
              >
                Brand Story
              </motion.p>
              <motion.h1
                variants={fadeInUp}
                className="font-serif text-[clamp(36px,4vw,48px)] font-light leading-[1.25] text-foreground"
              >
                They said no. I said watch me.
              </motion.h1>
              <motion.div variants={fadeInUp} className="mt-6 h-px w-[60px] bg-accent" />
              <motion.p
                variants={fadeInUp}
                className="mt-6 text-[16px] font-light leading-[1.85] text-foreground-muted"
              >
                In 2015, I applied to Sweden&apos;s only watchmaking school. Born in
                the Democratic Republic of Congo, raised in Stockholm. I didn&apos;t
                have the background they expected. The rejection letter was polite.
                My response was a decade of work.
              </motion.p>
            </motion.div>

            {/* Portrait — face first, trust before product */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
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


      {/* ── ACT II · INTEREST ─────────────────────────────────────────────────
          The years nobody saw. Struggle, doubt, near-failure.
          Reciprocity: vulnerability is a gift — reader owes attention back.
          Anchoring: the decade of cost anchors the value of every watch.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="bg-background py-16 md:py-28">
        <div className="mx-auto max-w-[760px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeInUp}
              className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              2015 – 2018
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-[clamp(28px,3.5vw,42px)] font-light leading-[1.25] text-foreground"
            >
              The years nobody saw.
            </motion.h2>
            <motion.div variants={fadeInUp} className="mt-6 h-px w-[60px] bg-accent" />

            <motion.div
              variants={staggerContainer}
              className="mt-8 space-y-5 text-[16px] font-light leading-[1.9] text-foreground-muted"
            >
              <motion.p variants={fadeInUp}>
                Three years of evenings and weekends. Movements ordered from
                Switzerland, disassembled on a kitchen table. Prototypes that
                failed — not by a little, but completely. Books that answered one
                question and opened five more.
              </motion.p>
              <motion.p variants={fadeInUp}>
                There was no audience. No validation. Suppliers wouldn&apos;t take
                the call. Manufacturers quoted minimum orders I couldn&apos;t meet.
                One told me to come back when I had ten thousand units. I had a
                budget for twenty.
              </motion.p>
              <motion.p variants={fadeInUp}>
                In 2017 I nearly stopped. The parts wouldn&apos;t cooperate. The
                industry had no interest in making space for someone like me. And
                for a moment, the doubt was louder than the conviction.
              </motion.p>
              <motion.p variants={fadeInUp}>
                But I kept returning to the same question: if the watch I had in
                my head didn&apos;t exist, and nobody else was going to make it —
                what was I waiting for?
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ── TURNING POINT ─────────────────────────────────────────────────────
          The breakthrough. Proof the obsession wasn't his alone.
          Social proof + dopamine peak — the story earns its resolution here.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
            >
              <p className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent">
                2018
              </p>
              <h2 className="font-serif text-[clamp(28px,3.5vw,40px)] font-light leading-[1.25] text-foreground">
                The Okapi sold out. The obsession wasn&apos;t just mine.
              </h2>
              <div className="mt-6 h-px w-[60px] bg-accent" />
              <p className="mt-6 text-[16px] font-light leading-[1.9] text-foreground-muted">
                The first watch went live on Kickstarter. Within weeks, every piece
                was spoken for. Collectors in twelve countries. People I had never
                met, who had never heard of Pedral, saw what I saw.
              </p>
              <p className="mt-5 text-[16px] font-light leading-[1.9] text-foreground-muted">
                It wasn&apos;t a sale. It was confirmation. The market existed. The
                established houses just weren&apos;t serving it.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="grid grid-cols-3 gap-px overflow-hidden rounded-lg"
            >
              {[
                { src: "/images/kevin-early-work.jpg", alt: "Kevin early work" },
                { src: "/images/kevin-design-studio.jpg", alt: "Pedral Stockholm studio" },
                { src: "/images/kevin-workshop.jpg", alt: "Kevin in the workshop" },
              ].map(({ src, alt }) => (
                <div key={src} className="relative aspect-square overflow-hidden bg-[#111]">
                  <Image src={src} alt={alt} fill className="object-cover opacity-90" />
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>


      {/* ── PROOF STATS ───────────────────────────────────────────────────────
          Cognitive ease + social proof: four numbers, no prose needed.
          Scarcity anchor: "20 pieces — never more" repeated before desire peak.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="bg-background py-14 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-accent/[0.06] md:grid-cols-4"
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="bg-background-alt px-8 py-10 text-center"
              >
                <p className="font-serif text-[clamp(36px,4vw,52px)] font-light text-accent">
                  {s.value}
                </p>
                <p className="mt-2 text-[11px] font-light tracking-[1px] text-foreground-muted/60">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ── ACT III · DESIRE ──────────────────────────────────────────────────
          The design philosophy — what Pedral *is*.
          Identity + tribe: "Not made for everyone" arrives after the arc is earned.
          Loss aversion: squarcle exists nowhere else — you can't find this elsewhere.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="bg-background py-16 md:py-28">
        <div className="mx-auto max-w-[760px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeInUp}
              className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              The Design
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="font-serif text-[clamp(28px,3.5vw,42px)] font-light leading-[1.25] text-foreground"
            >
              A shape found nowhere else. A number that never changes.
            </motion.h2>
            <motion.div variants={fadeInUp} className="mt-6 h-px w-[60px] bg-accent" />

            <motion.div
              variants={staggerContainer}
              className="mt-8 space-y-5 text-[16px] font-light leading-[1.9] text-foreground-muted"
            >
              <motion.p variants={fadeInUp}>
                Every Pedral carries the squarcle — a case geometry that exists
                nowhere else in watchmaking. Not a rounded square, not a cushion
                case. Something that required years of refinement to arrive at,
                and that is immediately recognisable once you know it.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Every edition is capped at twenty pieces. Not as a marketing
                decision. As a commitment. When an edition closes, it closes
                permanently — no reissue, no sequel, no &ldquo;by popular demand.&rdquo;
                The collectors who own them know they hold something the market
                will never produce again.
              </motion.p>
              <motion.p variants={fadeInUp}>
                Watches today are born in boardrooms, built to please everyone. I
                took a different route. Every Pedral is made to reflect the person
                who wears it. Not everyone gets a design like this in their
                collection.
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ── PEAK MOMENT · QUOTE ───────────────────────────────────────────────
          Peak-end rule: this is the emotional high — place it after desire,
          before social proof, so the reader feels belonging before they act.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="border-y border-accent/[0.06] bg-background-alt py-14 text-center md:py-20 lg:py-28">
        <div className="mx-auto max-w-[800px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="font-serif text-[clamp(20px,5vw,28px)] font-light italic leading-[1.5] text-foreground">
              &ldquo;Pedral is not made for everyone. It is made for those who
              already understand.&rdquo;
            </p>
            <p className="mt-5 text-[12px] font-light tracking-[2px] uppercase text-foreground-muted/50">
              Kevin Pedral, Stockholm
            </p>
          </motion.div>
        </div>
      </section>


      {/* ── SOCIAL PROOF ──────────────────────────────────────────────────────
          Testimonials arrive after identity is established.
          Reader is now in the tribe — proof confirms they belong.
      ──────────────────────────────────────────────────────────────────────── */}
      <Testimonials />


      {/* ── ACTION · SCARCITY ─────────────────────────────────────────────────
          Loss aversion: "every watch in this story is in the archive" = if you
          wait, this one joins them. The current collection is the open window.
          Peak-end rule: end on urgency + belonging, not a generic product CTA.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-2 md:gap-16"
          >
            <motion.div variants={fadeInUp}>
              <p className="mb-3 text-[11px] font-normal tracking-[4px] uppercase text-accent">
                Now Available
              </p>
              <h2 className="font-serif text-[clamp(24px,3vw,34px)] font-light text-foreground">
                Every watch in this story is in the archive. The current edition is not.
              </h2>
              <div className="mt-5 h-px w-[60px] bg-accent" />
              <p className="mt-5 text-[15px] font-light leading-[1.85] text-foreground-muted">
                Six collections. Six sell-outs. None came back. The current edition
                follows the same rule — 20 pieces, no reissue. When it closes, it
                joins the archive permanently. A few pieces remain.
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex flex-col justify-center gap-4">
              <Link
                href="/collections"
                className="inline-block rounded-lg bg-accent px-8 py-4 text-center text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover"
              >
                See what&apos;s still available →
              </Link>
              <Link
                href="/archive"
                className="inline-block rounded-lg border border-accent/20 px-8 py-4 text-center text-[11px] font-medium tracking-[3px] uppercase text-foreground-muted transition-colors hover:border-accent hover:text-accent"
              >
                Browse the archive →
              </Link>
              <p className="text-[11px] font-light text-foreground-muted/40">
                Maestro · Triomphe · Okapi Classique — limited pieces remaining
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>


      {/* ── NEWSLETTER ────────────────────────────────────────────────────────
          Reciprocity close: the story was a gift. Subscribing is the natural
          next step for someone who now feels part of the narrative.
      ──────────────────────────────────────────────────────────────────────── */}
      <Newsletter
        title="Be part of the story."
        subtitle="Join collectors in 30+ countries. First access to new editions — before any public announcement."
      />

    </>
  );
}
