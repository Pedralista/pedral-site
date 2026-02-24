"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative flex h-dvh min-h-[600px] items-center overflow-hidden bg-background">
      {/* Background image placeholder */}
      <div className="pointer-events-none absolute inset-0 md:left-[45%]">
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(201,168,76,0.06)_0%,rgba(201,168,76,0.02)_50%,rgba(201,168,76,0.08)_100%)]">
          <span className="text-center text-[10px] tracking-[3px] uppercase text-accent/30">
            Hero Image
            <br />
            Lifestyle / Wrist Shot
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-20 md:py-24 md:px-12">
        <div className="max-w-[650px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent"
          >
            Stockholm &middot; Limited Editions
          </motion.p>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-[clamp(36px,8vw,72px)] font-light leading-[1.05] text-foreground"
            >
              Not for everyone.
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-5 max-w-[480px] text-[16px] font-light leading-[1.8] text-foreground-muted"
          >
            One designer. Twenty pieces per edition. Three collections for those
            who already understand.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="mt-4 text-[12px] tracking-[1.5px] text-foreground-muted"
          >
            Collectors in <strong className="text-accent">30+ countries</strong>{" "}
            &middot; From <strong className="text-accent">&euro;1,300</strong>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
          >
            <Button href="/collections" variant="primary">
              Explore the Collection
            </Button>
            <Button href="/story" variant="outline">
              Meet the Maker &rarr;
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-light tracking-[1.5px] uppercase text-foreground-muted">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-[1px] bg-gradient-to-b from-accent/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
