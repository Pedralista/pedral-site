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
    <section className="border-t border-accent/[0.06] bg-background py-20 md:py-[80px]">
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

          <div className="mx-auto mt-7 flex max-w-[420px]">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 border border-r-0 border-accent/15 bg-white/[0.04] px-5 py-3.5 text-sm font-light text-foreground outline-none placeholder:text-foreground-muted/50"
            />
            <button className="border border-accent bg-accent px-7 py-3.5 text-[11px] font-medium tracking-[2.5px] uppercase text-background transition-colors hover:bg-accent-hover">
              {buttonText}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
