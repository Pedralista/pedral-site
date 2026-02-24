"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function Newsletter({
  title = "Join 1,200+ collectors who see new editions first.",
  subtitle = "Priority access. No spam. Just watches — and they sell out fast.",
  buttonText = "Get Priority Access",
}: NewsletterProps) {
  return (
    <section className="border-t border-accent/[0.06] bg-background py-14 md:py-20 lg:py-[80px]">
      <div className="mx-auto max-w-[520px] px-6 text-center md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="font-serif text-[24px] font-light text-foreground">
            {title}
          </h2>
          <p className="mt-2 text-[13px] font-light text-foreground-muted">
            {subtitle}
          </p>

          <div className="mx-auto mt-7 flex max-w-[420px] flex-col gap-3 sm:flex-row sm:gap-0">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-[2px] border border-accent/15 bg-white/[0.04] px-5 py-3.5 text-sm font-light text-foreground outline-none placeholder:text-foreground-muted/50 sm:flex-1 sm:rounded-none sm:border-r-0"
            />
            <button className="w-full rounded-[2px] border border-accent bg-accent px-7 py-3.5 text-[12px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover sm:w-auto sm:rounded-none sm:text-[11px] sm:tracking-[2.5px]">
              {buttonText}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
