"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l10 10-10 10L2 12z" />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

const trustItems = [
  { icon: <GlobeIcon />, title: "30+", desc: "Countries · Collectors worldwide" },
  { icon: <ClockIcon />, title: "Since 2015", desc: "Independent · Stockholm" },
  { icon: <DiamondIcon />, title: "Max 20", desc: "Per edition · No restocks" },
  { icon: <GearIcon />, title: "Swiss", desc: "Movements · Sapphire crystal" },
];

export default function TrustBar() {
  return (
    <section className="border-y border-accent/[0.08] bg-background-alt">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-6 py-8 sm:flex sm:flex-row sm:items-center sm:justify-center sm:gap-[56px] sm:py-7 md:px-12"
      >
        {trustItems.map((item) => (
          <div key={item.title} className="flex items-center gap-3.5">
            <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-accent/20 text-accent sm:h-[38px] sm:w-[38px]">
              {item.icon}
            </div>
            <div>
              <p className="font-serif text-lg font-normal text-foreground">{item.title}</p>
              <p className="text-[12px] font-normal tracking-[0.5px] text-foreground-muted">{item.desc}</p>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
