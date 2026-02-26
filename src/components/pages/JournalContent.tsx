"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { articles } from "@/lib/journal";

export default function JournalContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-background pb-16 pt-28 md:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(17,29,32,0.6)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 text-center md:px-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.p
              variants={fadeInUp}
              className="mb-3.5 text-[11px] font-normal tracking-[4px] uppercase text-accent"
            >
              Journal
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-[clamp(40px,5vw,64px)] font-light text-foreground"
            >
              The Rounded Square
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-5 max-w-lg text-[16px] font-light leading-relaxed text-foreground-muted"
            >
              Stories about independent watchmaking, design decisions, and the
              craft behind every Pedral edition. Written from Stockholm.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="bg-background-alt py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          {/* Featured article */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-16 border-b border-accent/[0.06] pb-16"
          >
            <Link href={`/journal/${articles[0].slug}`} className="group grid gap-8 md:grid-cols-2 md:gap-16">
              <div className="flex aspect-[4/3] items-center justify-center rounded-sm bg-background text-[11px] tracking-[2px] uppercase text-foreground-muted/40">
                Featured Image
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-medium tracking-[1.5px] uppercase text-accent">
                    {articles[0].category}
                  </span>
                  <span className="text-[11px] tracking-[0.5px] text-foreground-muted/50">
                    {articles[0].date}
                  </span>
                </div>
                <h2 className="mt-4 font-serif text-[clamp(24px,3vw,36px)] font-light leading-[1.2] text-foreground transition-colors group-hover:text-accent">
                  {articles[0].title}
                </h2>
                <p className="mt-4 text-[16px] font-light leading-relaxed text-foreground-muted">
                  {articles[0].excerpt}
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <span className="text-[11px] tracking-[1px] uppercase text-foreground-muted/40">
                    {articles[0].readTime}
                  </span>
                  <span className="text-[10px] tracking-[2px] uppercase text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    Read article &rarr;
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Article list */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-px md:grid-cols-2"
          >
            {articles.slice(1).map((article) => (
              <motion.div key={article.slug} variants={fadeInUp}>
                <Link
                  href={`/journal/${article.slug}`}
                  className="group block border-b border-accent/[0.06] p-8 transition-colors hover:bg-background/50 md:p-10"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-medium tracking-[1.5px] uppercase text-accent">
                      {article.category}
                    </span>
                    <span className="text-[11px] tracking-[0.5px] text-foreground-muted/50">
                      {article.date}
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-xl font-light leading-snug text-foreground transition-colors group-hover:text-accent">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-[15px] font-light leading-relaxed text-foreground-muted">
                    {article.excerpt}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-[11px] tracking-[1px] uppercase text-foreground-muted/40">
                      {article.readTime}
                    </span>
                    <span className="text-[10px] tracking-[2px] uppercase text-accent opacity-0 transition-opacity group-hover:opacity-100">
                      Read &rarr;
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Coming soon note */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16 text-center"
          >
            <p className="text-[15px] font-light text-foreground-muted">
              More stories coming soon. Follow us on{" "}
              <a
                href="https://www.instagram.com/pedralwatches"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent transition-colors hover:text-accent-hover"
              >
                Instagram
              </a>{" "}
              for updates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-background py-14 md:py-20">
        <div className="mx-auto max-w-[600px] px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="font-serif text-3xl font-light text-foreground md:text-4xl">
              Don&apos;t miss an edition.
            </h2>
            <p className="mt-3 text-[15px] font-light text-foreground-muted">
              Subscribe to The Rounded Square for new articles, early access to
              drops, and behind-the-scenes content.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 rounded-[2px] border border-accent/[0.12] bg-transparent px-5 py-3.5 text-sm font-light text-foreground outline-none transition-colors placeholder:text-foreground-muted/40 focus:border-accent/40"
              />
              <button
                type="button"
                className="w-full rounded-[2px] bg-accent px-8 py-3.5 text-[12px] font-medium tracking-[2px] uppercase text-background transition-all hover:bg-accent-hover sm:w-auto sm:text-[11px] sm:tracking-[3px]"
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
