"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import { collections, collectionCountWord } from "@/lib/collections";
import TrustIcons from "@/components/sections/TrustIcons";
import { useEffect, useState } from "react";
import { cardStockLabel } from "@/lib/card-stock-label";

function BadgeLabel({ stock, isPreOrder, isEnquiryOnly, badge }: { stock: number; isPreOrder?: boolean; isEnquiryOnly?: boolean; badge?: string }) {
  if (isEnquiryOnly) {
    return (
      <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-accent/40 bg-background/80 px-2 py-1 text-[9px] font-medium tracking-[1px] sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] uppercase text-accent backdrop-blur-sm">
        By Enquiry Only
      </span>
    );
  }
  if (badge) {
    return (
      <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-accent/40 bg-background/80 px-2 py-1 text-[9px] font-medium tracking-[1px] sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] uppercase text-accent backdrop-blur-sm">
        {badge}
      </span>
    );
  }
  if (stock === 0 && isPreOrder) {
    return (
      <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-accent/40 bg-background/80 px-2 py-1 text-[9px] font-medium tracking-[1px] sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] uppercase text-accent backdrop-blur-sm">
        Pre-order Opens Soon
      </span>
    );
  }
  if (stock === 0) {
    return (
      <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-white/15 bg-background/80 px-2 py-1 text-[9px] font-medium tracking-[1px] sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] uppercase text-white/50 backdrop-blur-sm">
        Fully Allocated
      </span>
    );
  }
  if (stock <= 2) {
    return (
      <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-red-500/40 bg-background/80 px-2 py-1 text-[9px] font-medium tracking-[1px] sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] uppercase text-red-400/90 backdrop-blur-sm">
        Final Pieces
      </span>
    );
  }
  return (
    <span className="absolute left-2 top-2 z-10 sm:left-3 sm:top-3 border border-accent/40 bg-background/80 px-2 py-1 text-[9px] font-medium tracking-[1px] sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[1.5px] uppercase text-accent backdrop-blur-sm">
      {stock} Remain
    </span>
  );
}

// Homepage grid order (Kevin, Oct 2026). Anything not listed goes last.
const CAROUSEL_ORDER = ["contour", "etiquette", "maestro", "triomphe", "silhouette", "okapi"];
function carouselRank(slug: string) {
  const i = CAROUSEL_ORDER.indexOf(slug);
  return i === -1 ? CAROUSEL_ORDER.length : i;
}

export default function CollectionShowcase() {
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
    .sort((a, b) => carouselRank(a.slug) - carouselRank(b.slug));
  const visibleCount = visible.length;

  return (
    <section className="bg-background-alt py-16 md:py-24 lg:py-[120px]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="mb-3.5 text-[11px] font-normal tracking-[2px] sm:tracking-[4px] uppercase text-accent">
              The Collection
            </p>
            <h2 className="font-serif text-[clamp(32px,3.5vw,40px)] font-light text-foreground">
              {collectionCountWord(visibleCount)} watches. One designer.
            </h2>
            <p className="mt-4 max-w-[600px] text-[15px] font-light leading-[1.85] text-foreground-muted">
              Each dial is limited to twenty pieces or fewer. When it sells out, it stays gone. Not a strategy. One person behind every decision.
            </p>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="mt-8 grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16 lg:grid-cols-3 lg:gap-x-8"
        >
          {visible.map((c) => (
            <motion.div
              key={c.slug}
              variants={fadeInUp}
              className="w-full"
            >
              <Link
                href={`/collections/${c.slug}`}
                className="group relative block cursor-pointer"
              >
                <BadgeLabel stock={c.stock} isPreOrder={c.isPreOrder} isEnquiryOnly={c.isEnquiryOnly && !c.inDevelopment} badge={c.isEnquiryOnly && !c.inDevelopment ? undefined : c.badge} />
                <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-[var(--surface)]">
                  {c.image ? (
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="font-serif text-[32px] font-light text-accent/[0.12]">
                        {c.name}
                      </span>
                    </div>
                  )}
                </div>

                <div className="pt-5 text-center">
                  <h3 className="font-serif text-[20px] font-normal text-foreground sm:text-2xl">
                    {c.name}
                  </h3>
                  <p className="mx-auto mt-1.5 mb-4 min-h-[3.6rem] max-w-full text-[13px] font-light italic leading-snug text-foreground-muted sm:min-h-[2.8rem] sm:max-w-[85%] sm:text-[16px]">
                    &ldquo;{c.hook}&rdquo;
                  </p>
                  <div className="flex flex-col items-center gap-2">
                    <div>
                      {c.isEnquiryOnly || c.hidePriceOnCard ? (
                        <>
                          <span className="block text-[11px] font-light tracking-[0.5px] uppercase text-foreground-muted">
                            Pricing
                          </span>
                          <span className="text-[17px] font-medium text-foreground">
                            {c.inDevelopment ? "To be announced" : "Upon request"}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="block text-[11px] font-light tracking-[0.5px] uppercase text-foreground-muted">
                            From
                          </span>
                          <span className="text-[17px] font-normal text-foreground">
                            &euro;{c.price.toLocaleString()}
                          </span>
                          {c.valueComparePrice && (
                            <span className="block text-[14px] font-light tracking-[0.3px] text-foreground-muted/40">
                              Elsewhere {c.valueComparePrice}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    {c.stock > 0 && !c.isEnquiryOnly ? (
              <span className="text-[14px] font-normal tracking-[0.5px] text-accent">
                {cardStockLabel(c.stock, c.cardScarcity)}
              </span>
            ) : c.isEnquiryOnly ? (
                      <span className="text-[14px] font-normal tracking-[0.5px] text-accent">
                        {c.inDevelopment ? c.inDevelopment.cardStatus : "Allocation only"}
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
          ))}
        </motion.div>

        <p className="mt-8 text-center text-[16px] tracking-[0.5px] leading-[1.7] text-foreground-muted">
          Earlier editions are fully allocated and won&apos;t return.
        </p>
        <div className="mt-3 flex justify-center">
          <Link
            href="/archive"
            className="text-[12px] font-light tracking-[2px] uppercase text-foreground-muted/50 underline underline-offset-4 transition-colors hover:text-accent"
          >
            Browse the archive →
          </Link>
        </div>
      </div>
      <div className="mt-12">
        <TrustIcons />
      </div>
    </section>
  );
}
