"use client";

import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";

export default function ContactContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-background pb-16 pt-32 md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(17,29,32,0.6)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 text-center md:px-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              variants={fadeInUp}
              className="mb-3.5 text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              Contact
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-[clamp(40px,5vw,60px)] font-light text-foreground"
            >
              Have a conversation that matters.
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="overflow-hidden bg-background-alt py-14 md:py-20 lg:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid gap-16 md:grid-cols-5 md:gap-24">
            {/* CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              className="md:col-span-3"
            >
              <div className="flex min-h-[300px] flex-col justify-center">
                <p className="max-w-lg text-[16px] font-light leading-relaxed text-foreground-muted">
                  Questions about a watch, a collaboration, a custom commission, or how Pedral works. Kevin reads and responds to every message personally — within 24 hours.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Product question", "Custom commission", "Partnership", "Press inquiry"].map((type) => (
                    <span key={type} className="rounded-full border border-accent/15 px-3 py-1 text-[11px] font-light tracking-[0.5px] text-foreground-muted/60">
                      {type}
                    </span>
                  ))}
                </div>
                <div className="mt-7">
                  <a
                    href="mailto:info@pedral.watch"
                    className="inline-block rounded-lg bg-accent px-9 py-4 text-[11px] font-medium tracking-[3px] uppercase text-background transition-all hover:bg-accent-hover"
                  >
                    Send a Message →
                  </a>
                  <p className="mt-3 text-[12px] font-light text-foreground-muted/50">
                    Kevin responds personally · Average reply time: under 24 hours
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Info sidebar */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="md:col-span-2"
            >
              <div className="space-y-10">
                <div>
                  <h3 className="text-[11px] font-medium tracking-[2px] uppercase text-accent">
                    Email
                  </h3>
                  <a
                    href="mailto:info@pedral.watch"
                    className="mt-2 block font-serif text-xl font-light text-foreground transition-colors hover:text-accent"
                  >
                    info@pedral.watch
                  </a>
                </div>
                <div>
                  <h3 className="text-[11px] font-medium tracking-[2px] uppercase text-accent">
                    Location
                  </h3>
                  <p className="mt-2 font-serif text-xl font-light text-foreground">
                    Stockholm, Sweden
                  </p>
                </div>
                <div>
                  <h3 className="text-[11px] font-medium tracking-[2px] uppercase text-accent">
                    See what we&apos;re building
                  </h3>
                  <div className="mt-3 flex flex-col gap-2">
                    {[
                      { href: "https://www.instagram.com/pedralwatches", label: "Instagram" },
                      { href: "https://facebook.com/pedralwatches", label: "Facebook" },
                      { href: "https://youtube.com/@pedralwatches", label: "YouTube" },
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[15px] font-light text-foreground transition-colors hover:text-accent"
                      >
                        {link.label} &rarr;
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
