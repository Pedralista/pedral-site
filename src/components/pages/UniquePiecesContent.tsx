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
              A short note is enough. I read every message personally and respond myself.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-5 flex flex-col items-center gap-3">
              <Link
                href="/contact"
                className="inline-block w-full border border-accent/30 px-8 py-3 text-center text-[11px] font-normal tracking-[2.5px] uppercase text-accent transition-colors hover:border-accent hover:bg-accent hover:text-background sm:w-auto"
              >
                Begin a Commission
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
                Studies are being prepared.
              </motion.p>
              <motion.p
                variants={fadeInUp}
                className="mt-3 text-[15px] font-light text-foreground-muted"
              >
                If you are looking for something that does not exist yet —
                write directly. That is how these things start.
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
                className="inline-block w-full border border-accent/30 px-8 py-3 text-center text-[11px] font-normal tracking-[2.5px] uppercase text-accent transition-colors hover:border-accent hover:bg-accent hover:text-background sm:w-auto"
              >
                Begin a Commission
              </Link>
              <p className="text-[12px] font-light tracking-[0.5px] text-foreground-muted/50">
                I respond to every message personally.
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
        style={{ aspectRatio: "16/9" }}
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
