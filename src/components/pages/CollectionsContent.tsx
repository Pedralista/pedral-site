"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { collections, Collection } from "@/lib/collections";
import { fadeInUp, staggerContainer } from "@/lib/animations";

type Filter = "all" | "signature" | "limited";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "signature", label: "Signature" },
  { key: "limited", label: "Limited Edition" },
];

function BadgeLabel({ stock, isPreOrder }: { stock: number; isPreOrder?: boolean }) {
  if (stock === 0 && isPreOrder) {
    return (
      <span className="absolute left-4 top-4 z-10 border border-accent/40 bg-background/60 px-3 py-1.5 text-[10px] font-light tracking-[2.5px] uppercase text-accent backdrop-blur-sm">
        Pre-order Opens Soon
      </span>
    );
  }
  if (stock === 0) {
    return (
      <span className="absolute left-4 top-4 z-10 border border-white/15 bg-background/60 px-3 py-1.5 text-[10px] font-light tracking-[2.5px] uppercase text-white/50 backdrop-blur-sm">
        Sold Out
      </span>
    );
  }
  if (stock <= 3) {
    return (
      <span className="absolute left-4 top-4 z-10 border border-red-500/40 bg-background/60 px-3 py-1.5 text-[10px] font-light tracking-[2.5px] uppercase text-red-400/90 backdrop-blur-sm">
        Almost Gone
      </span>
    );
  }
  return (
    <span className="absolute left-4 top-4 z-10 border border-accent/40 bg-background/60 px-3 py-1.5 text-[10px] font-light tracking-[2.5px] uppercase text-accent backdrop-blur-sm">
      {stock} Remaining
    </span>
  );
}

export default function CollectionsContent() {
  const [active, setActive] = useState<Filter>("all");

  const filtered =
    active === "all" ? collections : collections.filter((c) => c.tier === active);

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
              The Collection
            </motion.p>
            <motion.h1
              variants={fadeInUp}
              className="font-serif text-[clamp(40px,5vw,60px)] font-light text-foreground"
            >
              Choose Your Expression
            </motion.h1>
          </motion.div>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="bg-background-alt py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12">
          {/* Filters */}
          <div className="mb-12 flex flex-wrap justify-center gap-3 sm:gap-4 md:mb-16">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActive(f.key)}
                className={`rounded-[2px] border px-5 py-3 text-[12px] font-medium tracking-[1.5px] uppercase transition-all cursor-pointer sm:px-6 sm:py-2.5 sm:text-[11px] sm:tracking-[2px] ${
                  active === f.key
                    ? "border-accent bg-accent text-background"
                    : "border-accent/20 bg-transparent text-foreground-muted hover:border-accent hover:text-accent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
              className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((collection) => (
                <CollectionCard key={collection.slug} collection={collection} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}

function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/collections/${collection.slug}`}
        className="group relative block cursor-pointer overflow-hidden rounded-[2px] border border-accent/[0.06] bg-background transition-all duration-400 hover:-translate-y-[3px] hover:border-accent/20"
      >
        <BadgeLabel stock={collection.stock} isPreOrder={collection.isPreOrder} />

        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--surface)]">
          {collection.image ? (
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-serif text-[32px] font-light text-accent/[0.12]">
                {collection.name}
              </span>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="font-serif text-2xl font-normal text-foreground">
            {collection.name}
          </h3>
          <p className="mt-1.5 mb-4 text-[14px] font-light italic leading-snug text-foreground-muted">
            &ldquo;{collection.hook}&rdquo;
          </p>
          <div className="flex items-end justify-between">
            <div>
              <span className="block text-[11px] font-light tracking-[0.5px] uppercase text-foreground-muted">
                From
              </span>
              <span className="text-[17px] font-normal text-foreground">
                €{collection.price.toLocaleString()}
              </span>
            </div>
            {collection.stock > 0 ? (
              <div>
                <div className="mb-1 ml-auto h-[3px] w-[72px] overflow-hidden rounded-sm bg-accent/[0.12]">
                  <div
                    className="h-full rounded-sm bg-accent"
                    style={{
                      width: `${((collection.maxStock - collection.stock) / collection.maxStock) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-right text-[11px] font-normal tracking-[0.5px] text-accent">
                  {collection.stock} left of {collection.maxStock}
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
  );
}
