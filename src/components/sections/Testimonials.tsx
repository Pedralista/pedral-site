"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const testimonials = [
  {
    quote:
      "Somehow, the watch feels alive. It's incredibly elegant and feels like a part of me. Kevin simply cannot help but do what is in his heart and mind.",
    author: "R.C.",
    detail: "Writer · Switzerland · Okapi owner",
  },
  {
    quote:
      "Your designs stand out. They have an understated elegance and exude quality far above the price point. The combination was unbelievable.",
    author: "M.S.",
    detail: "Collector · Triomphe owner",
  },
  {
    quote:
      "Not following trends but being a trend setter. For me, I have to connect with the owner of the brand. Then it's the watch.",
    author: "D.H.",
    detail: "Watch enthusiast · Maestro owner",
  },
  {
    quote:
      "I've got watches people recognise immediately. This one they don't. That's what starts the conversation.",
    author: "Swen A.",
    detail: "Architect · Hamburg · Collector since 2022",
  },
  {
    quote:
      "I emailed Kevin and he called me back the same afternoon. We ended up talking for half an hour. Try getting that from Tissot or Longines.",
    author: "David M.",
    detail: "Creative Director · Brussels · Triomphe owner",
  },
  {
    quote:
      "I own blue dials from the usual names. The Émeraude Vert is different. On the wrist, in actual light, it has this depth that surprised me.",
    author: "Anthony A.",
    detail: "Artist · France",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-background-alt py-16 md:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-[1000px] px-6 md:px-12">
        <div className="mb-10 text-center md:mb-14">
          <p className="mb-3.5 text-[11px] font-normal tracking-[4px] uppercase text-accent">
            From the Collection
          </p>
          <h2 className="font-serif text-[clamp(32px,3.5vw,48px)] font-light text-foreground">
            What Owners Say
          </h2>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid gap-8 sm:grid-cols-2 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={fadeInUp}
              className="relative border-l-2 border-accent/20 py-2 pl-5 sm:pl-8"
            >
              <p className="mb-4 font-serif text-[17px] font-light italic leading-[1.6] text-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-[15px] font-normal tracking-[1.5px] text-accent">
                {t.author}
              </p>
              <p className="mt-0.5 text-[14px] font-light text-foreground-muted">
                {t.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
