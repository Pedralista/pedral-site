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
              Get In <em className="italic text-accent-hover">Touch</em>
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
                  Questions about a watch, a collaboration, or just want to know more about how
                  Pedral works — feel free to reach out.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                  <a
                    href="mailto:hello@pedral.watch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-[2px] bg-accent px-9 py-4 text-[12px] font-medium tracking-[2px] uppercase text-background transition-all hover:bg-accent-hover sm:text-[11px] sm:tracking-[3px]"
                  >
                    Send a Message
                  </a>
                  <a
                    href="mailto:info@pedral.watch"
                    className="rounded-[2px] border border-accent/[0.15] bg-transparent px-9 py-4 text-[12px] font-medium tracking-[2px] uppercase text-accent transition-all hover:border-accent hover:bg-accent hover:text-background sm:text-[11px] sm:tracking-[3px]"
                  >
                    Email Directly
                  </a>
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
                    Follow
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
                <div>
                  <h3 className="text-[11px] font-medium tracking-[2px] uppercase text-accent">
                    Shop
                  </h3>
                  <a
                    href="https://shop.pedral.eu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block font-serif text-xl font-light text-foreground transition-colors hover:text-accent"
                  >
                    shop.pedral.eu &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
