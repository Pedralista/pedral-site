"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import { collections } from "@/lib/collections";

function BadgeLabel({ stock, isPreOrder }: { stock: number; isPreOrder?: boolean }) {
  if (stock === 0 && isPreOrder) {
    return (
      <span className="absolute left-3 top-3 z-10 border border-accent/40 bg-background/60 px-2 py-1 text-[9px] font-light tracking-[2px] uppercase text-accent backdrop-blur-sm">
        Pre-order Opens Soon
      </span>
    );
  }
  if (stock === 0) {
    return (
      <span className="absolute left-3 top-3 z-10 border border-white/15 bg-background/60 px-2 py-1 text-[9px] font-light tracking-[2px] uppercase text-white/50 backdrop-blur-sm">
        Sold Out
      </span>
    );
  }
  if (stock <= 3) {
    return (
      <span className="absolute left-3 top-3 z-10 border border-red-500/40 bg-background/60 px-2 py-1 text-[9px] font-light tracking-[2px] uppercase text-red-400/90 backdrop-blur-sm">
        Almost Gone
      </span>
    );
  }
  return (
    <span className="absolute left-3 top-3 z-10 border border-accent/40 bg-background/60 px-2 py-1 text-[9px] font-light tracking-[2px] uppercase text-accent backdrop-blur-sm">
      {stock} Remaining
    </span>
  );
}

export default function CollectionShowcase() {
  return (
    <section className="bg-background-alt py-16 md:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-6">
          <p className="mb-3.5 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
            The Collection
          </p>
          <h2 className="font-serif text-[clamp(32px,3.5vw,40px)] font-light text-foreground">
            Three watches. One maker.
          </h2>
          <p className="mt-4 max-w-[600px] text-[15px] font-light leading-[1.85] text-foreground-muted">
            Each edition is limited to 20 pieces. When it sells out, it stays gone. Not a strategy. One person behind every decision.
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
                <BadgeLabel stock={c.stock} isPreOrder={c.isPreOrder} />
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
                      <span className="font-serif text-[32px] font-light text-accent/[0.12]">
                        {c.name}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="font-serif text-2xl font-normal text-foreground">
                    {c.name}
                  </h3>
                  <p className="mt-1.5 mb-4 text-[15px] font-light italic leading-snug text-foreground-muted sm:text-[14px]">
                    &ldquo;{c.hook}&rdquo;
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="block text-[11px] font-light tracking-[0.5px] uppercase text-foreground-muted">
                        From
                      </span>
                      <span className="text-[17px] font-normal text-foreground">
                        &euro;{c.price.toLocaleString()}
                      </span>
                    </div>
                    {c.stock > 0 ? (
                      <div>
                        <div className="mb-1 ml-auto h-[3px] w-[72px] overflow-hidden rounded-sm bg-accent/[0.12]">
                          <div
                            className="h-full rounded-sm bg-accent"
                            style={{ width: `${((c.maxStock - c.stock) / c.maxStock) * 100}%` }}
                          />
                        </div>
                        <p className="text-right text-[11px] font-normal tracking-[0.5px] text-accent">
                          {c.stock} left of {c.maxStock}
                        </p>
                      </div>
                    ) : (
                      <span className="text-[11px] font-normal tracking-[0.5px] text-foreground-muted">
                        Sold out
                      </span>
                    )}
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
