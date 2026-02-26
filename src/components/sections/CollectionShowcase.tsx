"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
    <div className="mt-3 flex items-center gap-2 text-[12px] font-light tracking-[1px] uppercase text-accent/60 sm:text-[10px] sm:tracking-[1.5px]">
      <span className="h-[4px] w-[4px] shrink-0 animate-pulse rounded-full bg-accent/60" />
      <span className="leading-tight">{text}</span>
    </div>
  );
}

export default function CollectionShowcase() {
  return (
    <section className="bg-background-alt py-16 md:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-[1100px] px-6 md:px-12">
        <div className="mb-6">
          <p className="mb-3.5 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
            The Collection
          </p>
          <h2 className="font-serif text-[clamp(32px,3.5vw,40px)] font-light text-foreground">
            Three watches. One maker.
          </h2>
          <p className="mt-4 max-w-[600px] text-[15px] font-light leading-[1.85] text-foreground-muted">
            Each edition is capped at 20 pieces. When it sells out, it&apos;s gone.
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
                {/* Product image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
                  {c.image ? (
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="text-center text-[10px] tracking-[2px] uppercase text-accent/30">
                        {c.name}
                        <br />
                        Product Image
                      </span>
                    </div>
                  )}
                </div>

                {/* Card body */}
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] tracking-[1px] uppercase text-accent/70 sm:text-[10px] sm:tracking-[2px]">
                      {c.badge}
                    </span>
                    <span className="font-serif text-[18px] text-accent">
                      &euro;{c.price.toLocaleString()}
                    </span>
                  </div>
                  <h3 className="mt-2 font-serif text-[22px] font-normal text-foreground">
                    {c.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-[14px] font-serif font-light italic leading-[1.6] text-foreground-muted sm:text-[13px]">
                    &ldquo;{c.hook}&rdquo;
                  </p>
                  <div className="mt-4 border-t border-accent/[0.08] pt-3">
                    <ScarcityBar stock={c.stock} maxStock={c.maxStock} />
                    <UrgencyTag text={c.urgencyTag} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <p className="mt-8 text-center text-[13px] tracking-[0.5px] leading-[1.7] text-foreground-muted">
          Earlier editions are sold out and won&apos;t return.
        </p>
      </div>
    </section>
  );
}
