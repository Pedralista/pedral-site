"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


export default function Hero() {
  return (
    <section className="relative flex h-dvh min-h-[600px] items-center overflow-hidden bg-background">
      {/* Background image */}
      <div className="pointer-events-none absolute inset-0 md:left-[45%]">
        <Image
          src="/images/hero-lifestyle.jpg"
          alt="Pedral watch lifestyle"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-20 md:py-24 md:px-12">
        <div className="max-w-[600px]">

          {/* 1. Origin */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-6 text-[11px] font-normal tracking-[4px] uppercase text-accent"
          >
            Designed in Stockholm
          </motion.p>

          {/* 2. Headline */}
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-[clamp(52px,8vw,88px)] font-light leading-[1.0] tracking-[-0.5px] text-foreground"
            >
              Not for everyone.
            </motion.h1>
          </div>

          {/* 4. Craft proof */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.95 }}
            className="mt-8 max-w-[420px] text-[15px] font-light leading-[1.9] text-foreground-muted/70"
          >
            Swiss automatic calibre.<br />
            Sapphire crystal.<br />
            Crafted from exceptional materials.
          </motion.p>

          {/* 5. CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-10"
          >
            <Link
              href="/collections"
              className="inline-block rounded-lg border border-accent/30 px-8 py-3.5 text-[11px] font-medium tracking-[3px] uppercase text-foreground-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Discover the remaining pieces
            </Link>
          </motion.div>


        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] font-light tracking-[1.5px] uppercase text-foreground-muted/40">
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
