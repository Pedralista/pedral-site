"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import { collections, collectionCountWord } from "@/lib/collections";
import TrustIcons from "@/components/sections/TrustIcons";
import { useRef } from "react";

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
  if (stock <= 2) {
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

export default function CollectionShowcase() {
  const visible = collections
    .filter((c) => !c.hidden && !c.standalone)
    .sort((a, b) => (a.slug === "contour" ? -1 : b.slug === "contour" ? 1 : 0));
  const visibleCount = visible.length;
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-carousel-card]");
    const amount = (card?.offsetWidth ?? el.clientWidth * 0.7) + 16;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

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
              Each edition is limited to 20 pieces. When it sells out, it stays gone. Not a strategy. One person behind every decision.
            </p>
          </div>
          <div className="hidden shrink-0 gap-2 sm:flex">
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
        </div>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background-alt to-transparent md:w-24" />
          <motion.div
            ref={scrollerRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="horizontal-scroll -mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:-mx-12 md:gap-5 md:px-12"
        >
          {visible.map((c) => (
            <motion.div
              key={c.slug}
              variants={fadeInUp}
              data-carousel-card
              className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[24%]"
            >
              <Link
                href={`/collections/${c.slug}`}
                className="group relative block cursor-pointer"
              >
                <BadgeLabel stock={c.stock} isPreOrder={c.isPreOrder} isEnquiryOnly={c.isEnquiryOnly} badge={c.isEnquiryOnly ? undefined : c.badge} />
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
                  <h3 className="font-serif text-2xl font-normal text-foreground">
                    {c.name}
                  </h3>
                  <p className="mx-auto mt-1.5 mb-4 max-w-[85%] min-h-[2.8rem] text-[15px] font-light italic leading-snug text-foreground-muted sm:text-[16px]">
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
                            Upon request
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
                      <div>
                        <div className="mb-1 mx-auto h-[3px] w-[72px] overflow-hidden rounded-sm bg-accent/[0.12]">
                          <div
                            className="h-full rounded-sm bg-accent"
                            style={{ width: `${((c.maxStock - c.stock) / c.maxStock) * 100}%` }}
                          />
                        </div>
                        <p className="text-center text-[14px] font-normal tracking-[0.5px] text-accent">
                          {c.stock} left of {c.maxStock}
                        </p>
                      </div>
                    ) : c.isEnquiryOnly ? (
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
          ))}
          </motion.div>
        </div>

        <p className="mt-8 text-center text-[16px] tracking-[0.5px] leading-[1.7] text-foreground-muted">
          Earlier editions are sold out and won&apos;t return.
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
