"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { collections, collectionCountWord, Collection } from "@/lib/collections";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ComingSoon from "@/components/sections/ComingSoon";
import Newsletter from "@/components/sections/Newsletter";

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

type Filter = "all" | "signature" | "limited";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "signature", label: "Signature" },
  { key: "limited", label: "Limited Edition" },
];

function BadgeLabel({ stock, isPreOrder, isEnquiryOnly, badge }: { stock: number; isPreOrder?: boolean; isEnquiryOnly?: boolean; badge?: string }) {
  if (isEnquiryOnly) {
    return (
      <span className="absolute left-3 top-3 z-10 border border-accent/40 bg-background/80 px-3 py-1.5 text-[11px] font-medium tracking-[1.5px] uppercase text-accent backdrop-blur-sm">
        By Enquiry Only
      </span>
    );
  }
  if (badge) {
    return (
      <span className="absolute left-3 top-3 z-10 border border-accent/40 bg-background/80 px-3 py-1.5 text-[11px] font-medium tracking-[1.5px] uppercase text-accent backdrop-blur-sm">
        {badge}
      </span>
    );
  }
  if (stock === 0 && isPreOrder) {
    return (
      <span className="absolute left-3 top-3 z-10 border border-accent/40 bg-background/80 px-3 py-1.5 text-[11px] font-medium tracking-[1.5px] uppercase text-accent backdrop-blur-sm">
        Pre-order Opens Soon
      </span>
    );
  }
  if (stock === 0) {
    return (
      <span className="absolute left-3 top-3 z-10 border border-white/15 bg-background/80 px-3 py-1.5 text-[11px] font-medium tracking-[1.5px] uppercase text-white/50 backdrop-blur-sm">
        Sold Out
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="absolute left-3 top-3 z-10 border border-red-500/40 bg-background/80 px-3 py-1.5 text-[11px] font-medium tracking-[1.5px] uppercase text-red-400/90 backdrop-blur-sm">
        Almost Gone
      </span>
    );
  }
  return (
    <span className="absolute left-3 top-3 z-10 border border-accent/40 bg-background/80 px-3 py-1.5 text-[11px] font-medium tracking-[1.5px] uppercase text-accent backdrop-blur-sm">
      {stock} Remaining
    </span>
  );
}

export default function CollectionsContent() {
  const [active, setActive] = useState<Filter>("all");
  const [liveStock, setLiveStock] = useState<Record<string, { stock: number }> | null>(null);

  useEffect(() => {
    fetch("/api/stock")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setLiveStock(data))
      .catch(() => {
        // Live stock is a progressive enhancement — the static numbers already
        // rendered server-side stay correct if this fetch fails.
      });
  }, []);

  const visible = collections
    .filter((c) => !c.hidden && !c.standalone)
    .map((c) => (liveStock?.[c.slug] ? { ...c, stock: liveStock[c.slug].stock } : c))
    .sort((a, b) => a.price - b.price)
    .sort((a, b) => (a.slug === "contour" ? -1 : b.slug === "contour" ? 1 : 0));
  const filtered =
    active === "all" ? visible : visible.filter((c) => c.tier === active);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const amount = (card?.offsetWidth ?? el.clientWidth * 0.7) + 16;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

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
              {collectionCountWord(visible.length)} watches. One designer.
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="mx-auto mt-4 max-w-md text-[16px] font-light text-foreground-muted"
            >
              When an edition closes, it stays closed.
            </motion.p>
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
                className={`rounded-lg border px-5 py-3 text-[12px] font-medium tracking-[1.5px] uppercase transition-all cursor-pointer sm:px-6 sm:py-2.5 sm:text-[11px] sm:tracking-[2px] ${
                  active === f.key
                    ? "border-accent bg-accent text-background"
                    : "border-accent/20 bg-transparent text-foreground-muted hover:border-accent hover:text-accent"
                }`}
              >
                {f.label}
              </button>
            ))}
            <Link
              href="/archive"
              className="rounded-lg border border-accent/20 bg-transparent px-5 py-3 text-[12px] font-medium tracking-[1.5px] uppercase text-foreground-muted transition-all hover:border-accent hover:text-accent sm:px-6 sm:py-2.5 sm:text-[11px] sm:tracking-[2px]"
            >
              Archive
            </Link>
          </div>

          <div className="mb-4 hidden justify-end gap-2 sm:flex">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => scrollByCard("left")}
              className="flex h-9 w-9 items-center justify-center border border-foreground-muted/20 text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronIcon direction="left" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => scrollByCard("right")}
              className="flex h-9 w-9 items-center justify-center border border-foreground-muted/20 text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ChevronIcon direction="right" />
            </button>
          </div>

          {/* Carousel */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background-alt to-transparent md:w-24" />
            <AnimatePresence mode="wait">
              <motion.div
                ref={scrollerRef}
                key={active}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={staggerContainer}
                className="horizontal-scroll -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:-mx-12 md:gap-5 md:px-12"
              >
                {filtered.map((collection) => (
                  <div
                    key={collection.slug}
                    data-carousel-card
                    className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[24%]"
                  >
                    <CollectionCard collection={collection} />
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      <ComingSoon />
      <Newsletter
        title="First access. No noise."
        subtitle="Collectors on the list are notified before any public announcement. New editions, closed dials, studio releases."
      />
    </>
  );
}

function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/collections/${collection.slug}`}
        className="group relative block cursor-pointer"
      >
        <BadgeLabel stock={collection.stock} isPreOrder={collection.isPreOrder} isEnquiryOnly={collection.isEnquiryOnly} badge={collection.isEnquiryOnly ? undefined : collection.badge} />

        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[var(--surface)]">
          {collection.image ? (
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-serif text-[32px] font-light text-accent/[0.12]">
                {collection.name}
              </span>
            </div>
          )}
        </div>

        <div className="pt-5 text-center">
          <h3 className="font-serif text-2xl font-normal text-foreground">
            {collection.name}
          </h3>
          <p className="mx-auto mt-1.5 mb-4 max-w-[85%] min-h-[2.8rem] text-[15px] font-light italic leading-snug text-foreground-muted sm:text-[16px]">
            &ldquo;{collection.hook}&rdquo;
          </p>
          <div className="flex flex-col items-center gap-2">
            <div>
              {collection.isEnquiryOnly || collection.hidePriceOnCard ? (
                <>
                  <span className="block text-[11px] font-light tracking-[0.5px] uppercase text-foreground-muted">
                    Pricing
                  </span>
                  <span className="text-[17px] font-medium text-foreground">
                    Upon request
                  </span>
                </>
              ) : (
                <>
                  <span className="block text-[11px] font-light tracking-[0.5px] uppercase text-foreground-muted">
                    From
                  </span>
                  <span className="text-[17px] font-normal text-foreground">
                    €{collection.price.toLocaleString()}
                  </span>
                </>
              )}
            </div>
            {collection.stock > 0 && !collection.isEnquiryOnly ? (
              <div>
                <div className="mb-1 mx-auto h-[3px] w-[72px] overflow-hidden rounded-sm bg-accent/[0.12]">
                  <div
                    className="h-full rounded-sm bg-accent"
                    style={{
                      width: `${((collection.maxStock - collection.stock) / collection.maxStock) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-center text-[14px] font-normal tracking-[0.5px] text-accent">
                  {collection.stock} left of {collection.maxStock}
                </p>
              </div>
            ) : collection.isEnquiryOnly ? (
              <span className="text-[14px] font-normal tracking-[0.5px] text-accent">
                Allocation only
              </span>
            ) : (
              <span className="text-[14px] font-normal tracking-[0.5px] text-foreground-muted">
                Sold out
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
