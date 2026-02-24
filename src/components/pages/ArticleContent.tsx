"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import type { Article } from "@/lib/journal";
import { articles } from "@/lib/journal";

interface Props {
  article: Article;
}

export default function ArticleContent({ article }: Props) {
  const currentIndex = articles.findIndex((a) => a.slug === article.slug);
  const prevArticle = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-background pb-12 pt-28 md:pt-40">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(17,29,32,0.6)_0%,transparent_60%)]" />
        <div className="relative z-10 mx-auto max-w-[800px] px-6 text-center md:px-12">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3">
              <Link
                href="/journal"
                className="text-[11px] tracking-[1.5px] uppercase text-foreground-muted/50 transition-colors hover:text-accent"
              >
                The Rounded Square
              </Link>
              <span className="text-foreground-muted/20">/</span>
              <span className="text-[10px] font-medium tracking-[2px] uppercase text-accent">
                {article.category}
              </span>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="mt-6 font-serif text-[clamp(28px,4vw,48px)] font-light leading-[1.2] text-foreground"
            >
              {article.title}
            </motion.h1>
            <motion.div
              variants={fadeInUp}
              className="mt-5 flex items-center justify-center gap-4 text-[11px] tracking-[1.5px] text-foreground-muted/50"
            >
              <span>{article.date}</span>
              <span className="text-foreground-muted/20">·</span>
              <span>{article.readTime}</span>
              <span className="text-foreground-muted/20">·</span>
              <span>By Kevin Pedral</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-background-alt py-16 md:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-[680px] px-6 md:px-12"
        >
          {/* Lead paragraph */}
          <motion.p
            variants={fadeInUp}
            className="mb-8 font-serif text-xl font-light leading-relaxed text-foreground md:text-2xl"
          >
            {article.body[0]}
          </motion.p>

          {/* Body paragraphs */}
          {article.body.slice(1).map((paragraph, i) => (
            <motion.p
              key={i}
              variants={fadeInUp}
              className="mb-6 text-[15px] font-light leading-[1.85] text-foreground-muted"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>
      </section>

      {/* Author + share */}
      <section className="bg-background-alt pb-16">
        <div className="mx-auto max-w-[680px] px-6 md:px-12">
          <div className="border-t border-accent/[0.06] pt-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-[11px] font-medium tracking-[1px] uppercase text-accent">
                KP
              </div>
              <div>
                <p className="text-sm font-light text-foreground">Kevin Pedral</p>
                <p className="text-[11px] font-light text-foreground-muted/50">
                  Founder &amp; Designer, Pedral Watches
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation between articles */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          <div className="grid gap-8 md:grid-cols-2">
            {prevArticle ? (
              <Link
                href={`/journal/${prevArticle.slug}`}
                className="group rounded-sm border border-accent/[0.06] p-8 transition-colors hover:border-accent/20"
              >
                <p className="text-[11px] tracking-[1.5px] uppercase text-foreground-muted/40">
                  &larr; Previous
                </p>
                <p className="mt-2 font-serif text-lg font-light text-foreground transition-colors group-hover:text-accent">
                  {prevArticle.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextArticle ? (
              <Link
                href={`/journal/${nextArticle.slug}`}
                className="group rounded-sm border border-accent/[0.06] p-8 text-right transition-colors hover:border-accent/20"
              >
                <p className="text-[11px] tracking-[1.5px] uppercase text-foreground-muted/40">
                  Next &rarr;
                </p>
                <p className="mt-2 font-serif text-lg font-light text-foreground transition-colors group-hover:text-accent">
                  {nextArticle.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/journal"
              className="text-[12px] font-normal tracking-[2px] uppercase text-foreground-muted transition-colors hover:text-accent"
            >
              &larr; Back to The Rounded Square
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
