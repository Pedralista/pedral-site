"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

const items = [
  {
    label: "24-Month Warranty",
    icon: (
      <>
        <circle cx="22" cy="22" r="20" />
        <path d="M14 22l5.5 5.5L30 17" />
      </>
    ),
  },
  {
    label: "Secure Payment",
    icon: (
      <>
        <rect x="10" y="20" width="24" height="16" rx="2" />
        <path d="M15 20v-5a7 7 0 0114 0v5" />
        <circle cx="22" cy="28" r="2" />
      </>
    ),
  },
  {
    label: "Express Insured Shipping",
    icon: (
      <>
        <rect x="4" y="16" width="24" height="14" rx="2" />
        <path d="M28 20h4l6 6v4h-4" />
        <circle cx="12" cy="32" r="3" />
        <circle cx="32" cy="32" r="3" />
      </>
    ),
  },
  {
    label: "Designed in Stockholm",
    icon: (
      <>
        <circle cx="22" cy="22" r="20" />
        <circle cx="22" cy="22" r="1.5" fill="currentColor" />
        <line x1="22" y1="2" x2="22" y2="8" />
        <line x1="22" y1="36" x2="22" y2="42" />
        <line x1="2" y1="22" x2="8" y2="22" />
        <line x1="36" y1="22" x2="42" y2="22" />
        <line x1="22" y1="22" x2="30" y2="14" />
      </>
    ),
  },
];

export default function TrustIcons() {
  return (
    <section className="border-y border-accent/[0.06] bg-background-alt py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mx-auto grid max-w-[900px] grid-cols-2 gap-8 px-6 text-center sm:grid-cols-4 md:px-12"
      >
        {items.map(({ label, icon }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-foreground-muted/40"
            >
              {icon}
            </svg>
            <span className="font-mono text-[10px] tracking-[2px] uppercase text-accent/70">
              {label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
