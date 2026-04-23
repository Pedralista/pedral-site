"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { studioPieces } from "@/lib/models";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function UniquePiecesContent() {
  return (
    <>
      {/* ── 1. Hero intro ── */}
      <section className="relative bg-background pb-0 pt-28 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(17,29,32,0.6)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[720px] px-6 text-center md:px-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              variants={fadeInUp}
              className="mb-4 text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              The Studio
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-[clamp(26px,4.5vw,54px)] font-light leading-[1.15] text-foreground"
            >
              Some watches begin long before they are made.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-4 text-[15px] font-light leading-[1.8] text-foreground-muted"
            >
              With a material. With a dial. Or simply with an idea.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-3 text-[15px] font-light leading-[1.8] text-foreground-muted"
            >
              The watches shown here were created once and never as part of a collection. Each piece has already found its owner.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-3 text-[15px] font-light leading-[1.8] text-foreground-muted"
            >
              If you are considering something particular, you are welcome to write. Many of the most interesting watches begin exactly that way.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-3 text-[15px] font-light leading-[1.8] text-foreground-muted"
            >
              A short note is enough. I read every message personally and respond within 24 hours.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-4 text-[12px] font-light tracking-[0.5px] text-foreground-muted/50"
            >
              Custom commissions from €7,000 · Typical timeline: 6–8 months from concept to wrist
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-6 flex flex-col items-center gap-3">
              <Link
                href="/contact"
                className="inline-block w-full rounded-lg bg-accent px-8 py-3.5 text-center text-[11px] font-medium tracking-[2.5px] uppercase text-background transition-colors hover:bg-accent-hover sm:w-auto"
              >
                Start the Conversation
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Gallery ── */}
      <section className="border-t border-accent/[0.08] bg-background-alt pt-10 pb-14 md:pt-14 md:pb-20">
        <div className="mx-auto max-w-[720px] px-6 md:px-12">
          {studioPieces.length === 0 ? (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="py-16 text-center"
            >
              <motion.p
                variants={fadeInUp}
                className="font-serif text-[22px] font-light text-foreground"
              >
                Custom commissions are underway.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="mt-3 text-[15px] font-light text-foreground-muted"
              >
                If you are looking for something that does not exist yet — write directly. Typical timeline: 6–8 months from first conversation to finished watch.
              </motion.p>
            </motion.div>
          ) : (
            <div className="space-y-14 md:space-y-24">
              {studioPieces.map((piece) => (
                <StudyEntry key={piece.id} piece={piece} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Bespoke Journey ── */}
      <section className="bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeInUp}
              className="mb-3 text-center text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              The Process
            </motion.p>
            <motion.h2
              variants={fadeInUp}
              className="mb-12 text-center font-serif text-[clamp(26px,3vw,38px)] font-light text-foreground md:mb-16"
            >
              The Bespoke Journey
            </motion.h2>

            <div className="grid gap-10 sm:grid-cols-2 md:gap-16">
              {[
                {
                  n: "01",
                  title: "The Idea",
                  body: "It begins with something you can't find. A colour from memory. A material you've always wanted on your wrist. Or simply the feeling that nothing existing is quite right.",
                },
                {
                  n: "02",
                  title: "The Conversation",
                  body: "We talk. Sketches are made, discarded, refined. Once the brief feels inevitable, a deposit secures your place and production is scheduled.",
                },
                {
                  n: "03",
                  title: "The Making",
                  body: "Components are sourced. The dial is developed. Every detail confirmed before a single part is ordered. There is no rushing this step.",
                },
                {
                  n: "04",
                  title: "The Watch",
                  body: "It arrives as a finished object — not a configured product, but a watch that did not exist before you asked for it. The balance is settled before delivery.",
                },
              ].map((step) => (
                <motion.div key={step.n} variants={fadeInUp}>
                  <p className="font-serif text-[clamp(48px,6vw,72px)] font-light leading-none text-accent/30">
                    {step.n}
                  </p>
                  <p className="mt-3 text-[13px] font-medium tracking-[2px] uppercase text-foreground">
                    {step.title}
                  </p>
                  <p className="mt-2 text-[15px] font-light leading-[1.8] text-foreground-muted">
                    {step.body}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-[560px] px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.p
              variants={fadeInUp}
              className="font-serif text-[clamp(22px,2.5vw,30px)] font-light text-foreground"
            >
              If something here stayed with you, that is usually where it begins.
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-4 text-[15px] font-light leading-[1.8] text-foreground-muted"
            >
              Not every enquiry becomes a watch. But every watch began as one.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-8 flex flex-col items-center gap-3">
              <Link
                href="/contact"
                className="inline-block w-full rounded-lg bg-accent px-8 py-3.5 text-center text-[11px] font-medium tracking-[2.5px] uppercase text-background transition-colors hover:bg-accent-hover sm:w-auto"
              >
                Start the Conversation
              </Link>
              <p className="text-[12px] font-light tracking-[0.5px] text-foreground-muted/50">
                Kevin responds personally within 24 hours · Commissions from €7,000
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </>
  );
}

function StudyEntry({ piece }: { piece: import("@/lib/models").StudioPiece }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={staggerContainer}
    >
      {/* Image */}
      <motion.div
        variants={fadeInUp}
        className="relative w-full overflow-hidden bg-[#111]"
        style={{ aspectRatio: "4/3" }}
      >
        {piece.image ? (
          <>
            <Image
              src={piece.image}
              alt={piece.title}
              fill
              className="object-cover"
            />
            {piece.darken && (
              <div className="absolute inset-0 bg-black/40" />
            )}
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-[28px] font-light text-accent/[0.10]">
              {piece.title}
            </span>
          </div>
        )}
      </motion.div>

      {/* Caption */}
      <motion.div variants={fadeInUp} className="mt-5 border-l border-accent/20 pl-5">
        <p className="font-serif text-[20px] font-light text-foreground">
          {piece.title}
        </p>
        <p className="mt-2 text-[15px] font-light leading-[1.75] text-foreground-muted">
          {piece.caption}
        </p>
      </motion.div>
    </motion.div>
  );
}
