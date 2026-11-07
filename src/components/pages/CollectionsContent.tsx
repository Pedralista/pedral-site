"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { collections, collectionCountWord, Collection } from "@/lib/collections";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import ComingSoon from "@/components/sections/ComingSoon";
import Newsletter from "@/components/sections/Newsletter";
import { cardStockLabel } from "@/lib/card-stock-label";
import { archivedWatches } from "@/lib/archive";

type Filter = "all" | "signature" | "limited";

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "signature", label: "Signature" },
  { key: "limited", label: "Limited Edition" },
];

function BadgeLabel({ stock, isPreOrder, isEnquiryOnly, badge }: { stock: number; isPreOrder?: boolean; isEnquiryOnly?: boolean; badge?: string }) {
  if (isEnquiryOnly) {
    return (
      <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-accent/40 bg-background/80 whitespace-nowrap px-2 py-1 text-[9px] font-medium tracking-[1px] uppercase sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] text-accent backdrop-blur-sm">
        By Enquiry Only
      </span>
    );
  }
  if (badge) {
    return (
      <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-accent/40 bg-background/80 whitespace-nowrap px-2 py-1 text-[9px] font-medium tracking-[1px] uppercase sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] text-accent backdrop-blur-sm">
        {badge}
      </span>
    );
  }
  if (stock === 0 && isPreOrder) {
    return (
      <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-accent/40 bg-background/80 whitespace-nowrap px-2 py-1 text-[9px] font-medium tracking-[1px] uppercase sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] text-accent backdrop-blur-sm">
        Pre-order Opens Soon
      </span>
    );
  }
  if (stock === 0) {
    return (
      <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-white/15 bg-background/80 whitespace-nowrap px-2 py-1 text-[9px] font-medium tracking-[1px] uppercase sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] text-white/50 backdrop-blur-sm">
        Fully Allocated
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-red-500/40 bg-background/80 whitespace-nowrap px-2 py-1 text-[9px] font-medium tracking-[1px] uppercase sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] text-red-400/90 backdrop-blur-sm">
        Final Pieces
      </span>
    );
  }
  return (
    <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-accent/40 bg-background/80 whitespace-nowrap px-2 py-1 text-[9px] font-medium tracking-[1px] uppercase sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] text-accent backdrop-blur-sm">
      {stock} Remain
    </span>
  );
}

// Closed dials shown after the current editions, so visitors see what has
// already found its owners (Kevin, Oct 2026).
// Eight sold-out dials, two rows of four (Kevin, 2026-11-07). `dial` is a
// variant name, or a dial option inside one (Contour's Solaire etc.).
const SOLD_OUT_CARDS: { slug: string; dial: string }[] = [
  { slug: "contour", dial: "Solaire" },
  { slug: "contour", dial: "Nébuleuse" },
  { slug: "contour", dial: "Lumière" },
  { slug: "silhouette", dial: "Ituri" },
  { slug: "triomphe", dial: "Émeraude Vert" },
  { slug: "maestro", dial: "Laguna View" },
  { slug: "triomphe", dial: "Ember Stone" },
  { slug: "maestro", dial: "Cosmic Tilt" },
];
// Closed archive editions can be listed here too (they link to /archive).
const ARCHIVE_SOLD_OUT: { slug: string; dial: string }[] = [];

export default function CollectionsContent() {
  const [active, setActive] = useState<Filter>("all");
  const [liveStock, setLiveStock] = useState<Record<string, { stock: number; variants?: Record<string, number> }> | null>(null);

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
    .map((c) => {
      // Featured dial: show its picture and its own remaining count.
      const featured = c.cardVariant ? c.variants?.find((v) => v.name === c.cardVariant) : undefined;
      if (!featured) return c;
      const liveCount = liveStock?.[c.slug]?.variants?.[featured.name];
      return { ...c, image: featured.image ?? c.image, stock: liveCount ?? featured.stock };
    })
    .sort((a, b) => a.price - b.price)
    .sort((a, b) => (a.slug === "contour" ? -1 : b.slug === "contour" ? 1 : 0));
  const filtered =
    active === "all" ? visible : visible.filter((c) => c.tier === active);
  const soldOutCards = [
    ...SOLD_OUT_CARDS.flatMap(({ slug, dial }) => {
      const c = collections.find((x) => x.slug === slug);
      const v = c?.variants?.find((x) => x.name === dial);
      const image = v?.image ?? c?.variants?.map((x) => x.numeralImages?.[dial]).find(Boolean);
      if (!c || !image || (active !== "all" && c.tier !== active)) return [];
      return [{ key: `${c.slug}-${dial}`, href: `/collections/${c.slug}`, dial, model: c.name, image }];
    }),
    ...(active === "all"
      ? ARCHIVE_SOLD_OUT.flatMap(({ slug, dial }) => {
          const w = archivedWatches.find((x) => x.slug === slug);
          const i = w?.dialNames?.indexOf(dial) ?? -1;
          const image = w && i >= 0 ? w.images[i] : undefined;
          return w && image ? [{ key: `${slug}-${dial}`, href: "/archive", dial, model: w.name, image }] : [];
        })
      : []),
  ];
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

          {/* Available watches: a grid, two rows of three on desktop (Kevin, 2026-11-07) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={staggerContainer}
              className="grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16 lg:grid-cols-3 lg:gap-x-8"
            >
              {filtered.map((collection) => (
                <div key={collection.slug}>
                  <CollectionCard collection={collection} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Sold-out dials, kept below the available watches */}
          {soldOutCards.length > 0 && (
            <div className="mt-20 border-t border-accent/10 pt-14 md:mt-28 md:pt-20">
              <p className="mb-10 text-center text-[11px] font-normal tracking-[4px] uppercase text-accent">
                Found their owners
              </p>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-12 md:gap-x-6 lg:gap-x-8">
                {soldOutCards.map((s) => (
                  <div key={s.key} className="w-[calc(50%-8px)] md:w-[calc(50%-12px)] lg:w-[calc(25%-24px)]">
                    <SoldOutCard href={s.href} dial={s.dial} model={s.model} image={s.image} />
                  </div>
                ))}
              </div>
            </div>
          )}
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

function SoldOutCard({ href, dial, model, image }: { href: string; dial: string; model: string; image: string }) {
  return (
    <motion.div variants={fadeInUp}>
      <Link href={href} className="group relative block cursor-pointer">
        <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[var(--surface)]">
          <Image
            src={image}
            alt={`${model} ${dial}`}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
        <div className="pt-5 text-center">
          <h3 className="font-serif text-xl font-normal text-foreground sm:text-2xl">{dial}</h3>
          <p className="mx-auto mt-1 max-w-[85%] text-[14px] font-light italic leading-snug text-foreground-muted sm:text-[15px]">
            {model}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function CollectionCard({ collection }: { collection: Collection }) {
  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={`/collections/${collection.slug}`}
        className="group relative block cursor-pointer"
      >
        <BadgeLabel stock={collection.stock} isPreOrder={collection.isPreOrder} isEnquiryOnly={collection.isEnquiryOnly && !collection.inDevelopment} badge={collection.isEnquiryOnly && !collection.inDevelopment ? undefined : collection.badge} />

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
          <p className="mx-auto mt-1.5 mb-4 hidden max-w-[85%] min-h-[2.8rem] text-[15px] font-light italic leading-snug text-foreground-muted sm:block sm:text-[16px]">
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
                    {collection.inDevelopment ? "To be announced" : "Upon request"}
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
              <span className="text-[14px] font-normal tracking-[0.5px] text-accent">
                {cardStockLabel(collection.stock, collection.cardScarcity)}
              </span>
            ) : collection.isEnquiryOnly ? (
              <span className="text-[14px] font-normal tracking-[0.5px] text-accent">
                {collection.inDevelopment ? collection.inDevelopment.cardStatus : "Allocation only"}
              </span>
            ) : (
              <span className="text-[14px] font-normal tracking-[0.5px] text-foreground-muted">
                Fully Allocated
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
