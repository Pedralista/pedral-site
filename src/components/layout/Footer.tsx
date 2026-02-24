"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function Footer() {
  return (
    <footer className="border-t border-accent/[0.06] bg-background">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="mx-auto max-w-[1400px] px-6 py-12 text-center md:px-12"
      >
        <p className="font-sans text-base font-light tracking-[10px] uppercase text-foreground">
          PEDRAL
        </p>
        <p className="mt-3.5 text-xs font-light text-foreground-muted">
          Designed in Stockholm. Limited by conviction. &copy;{" "}
          {new Date().getFullYear()}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-7">
          <Link
            href="/collections"
            className="text-[11px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Collection
          </Link>
          <Link
            href="/story"
            className="text-[11px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Brand Story
          </Link>
          <a
            href="https://shop.pedral.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Shop
          </a>
          <Link
            href="/contact"
            className="text-[11px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Contact
          </Link>
          <Link
            href="/privacy"
            className="text-[11px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-[11px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Terms
          </Link>
          <Link
            href="/shipping"
            className="text-[11px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Shipping
          </Link>
          <Link
            href="/cookies"
            className="text-[11px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Cookies
          </Link>
          <Link
            href="/withdrawal"
            className="text-[11px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Withdrawal
          </Link>
        </div>
      </motion.div>
    </footer>
  );
}
