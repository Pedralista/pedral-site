"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import { collections } from "@/lib/collections";

function ScarcityBar({ stock, maxStock }: { stock: number; maxStock: number }) {
  const sold = maxStock - stock;
  const pct = (sold / maxStock) * 100;
  return (
    <div className="mt-3 h-[3px] overflow-hidden rounded-sm bg-accent/10">
      <div
        className="h-full rounded-sm bg-accent"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function UrgencyTag({ text }: { text: string }) {
  return (
    <div className="mt-2.5 flex items-center gap-2 text-[10px] tracking-[1.5px] uppercase text-[#d4956a]">
      <span className="h-[5px] w-[5px] animate-pulse rounded-full bg-[#d4956a]" />
      {text}
    </div>
  );
}

export default function CollectionShowcase() {
  return (
    <section className="bg-background-alt py-24 md:py-[120px]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <div className="mb-6">
          <p className="mb-3.5 text-[11px] font-normal tracking-[4px] uppercase text-accent">
            The Collection
          </p>
          <h2 className="font-serif text-[clamp(32px,3.5vw,40px)] font-light text-foreground">
            Three Watches. Three Philosophies.
          </h2>
          <p className="mt-4 max-w-[600px] text-[14px] font-light leading-[1.8] text-foreground-muted">
            Each collection is an edition of 20. When they sell out, they
            don&apos;t return. This is how Kevin works — deliberately, not at
            scale.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
        >
          {collections.map((c) => (
            <motion.div key={c.slug} variants={fadeInUp}>
              <Link
                href={`/collections/${c.slug}`}
                className="group relative block cursor-pointer overflow-hidden rounded-[2px] border border-accent/[0.06] bg-background transition-all duration-400 hover:-translate-y-[3px] hover:border-accent/20"
              >
                {/* Image placeholder */}
                <div className="flex aspect-[4/5] items-center justify-center bg-[linear-gradient(160deg,var(--background-alt),var(--surface))]">
                  <span className="text-center text-[10px] tracking-[2px] uppercase text-accent/30">
                    {c.name}
                    <br />
                    Product Image
                  </span>
                </div>

                {/* Card body */}
                <div className="p-6">
                  <div className="text-[10px] tracking-[2.5px] uppercase text-accent">
                    {c.badge}
                  </div>
                  <h3 className="mt-1.5 font-serif text-[22px] font-light text-foreground">
                    {c.name}
                  </h3>
                  <p className="mt-1 text-[14px] font-serif font-light italic text-foreground-muted">
                    &ldquo;{c.hook}&rdquo;
                  </p>
                  <p className="mt-3 font-serif text-[19px] text-accent">
                    &euro;{c.price.toLocaleString()}
                  </p>
                  <ScarcityBar stock={c.stock} maxStock={c.maxStock} />
                  <UrgencyTag text={c.urgencyTag} />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-[11px] tracking-[1px] leading-[1.7] text-foreground-muted">
          Some earlier Pedral editions were released exclusively through
          Kickstarter and are no longer available. These limited-run pieces will
          not appear on this site — once an edition is gone, it&apos;s gone.
        </p>
      </div>
    </section>
  );
}
