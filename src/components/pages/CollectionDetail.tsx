"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import { collections, type Collection, type CollectionVariant } from "@/lib/collections";
import {
  addOnsEnabledFor,
  strapsForCollection,
  getStrapAddon,
  engravingAddon,
  sanitizeEngraving,
  hasDisallowedEngravingChars,
} from "@/lib/addons";
import { getArticleBySlug } from "@/lib/journal";
import { SHIPPING_LINE, klarnaLine } from "@/lib/shipping";
import Newsletter from "@/components/sections/Newsletter";
import TrustIcons from "@/components/sections/TrustIcons";
import PreOrderModal from "@/components/ui/PreOrderModal";
import { gaEvent, fbqTrack, type AnalyticsItem } from "@/lib/analytics";
import { useCart } from "@/lib/cart-context";

function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-[linear-gradient(135deg,rgba(201,168,76,0.06)_0%,rgba(201,168,76,0.02)_50%,rgba(201,168,76,0.08)_100%)] ${className}`}
    >
      <span className="text-center text-[11px] tracking-[3px] uppercase text-accent/30">
        {label}
      </span>
    </div>
  );
}


export default function CollectionDetail({ collection, initialVariantSlug }: { collection: Collection; initialVariantSlug?: string }) {
  const c = collection;
  const relatedArticles = (c.relatedArticleSlugs ?? [])
    .map((slug) => getArticleBySlug(slug))
    .filter((a): a is NonNullable<ReturnType<typeof getArticleBySlug>> => Boolean(a));
  // "Also from the studio" cross-sell — every other publicly-listed
  // collection, so a shopper who bounces off this page (sold out, wrong
  // price point, wrong style) still has somewhere to go besides leaving.
  const crossSellCollections = collections
    .filter((other) => other.slug !== c.slug && !other.hidden && !other.standalone)
    .slice(0, 3);
  const isSoldOut = c.stock === 0 && !c.isEnquiryOnly;
  const hasVariants = c.variants && c.variants.length > 0;
  // Honors a ?variant=slug link (e.g. from the Merchant/Meta product feed,
  // where each variant gets its own URL) by preselecting that variant instead
  // of always defaulting to the first in-stock one.
  const requestedVariant = initialVariantSlug
    ? c.variants?.find((v) => v.name.toLowerCase().replace(/\s+/g, "-") === initialVariantSlug)
    : undefined;
  // When a specific variant was linked directly, show only that one — not
  // the sibling variants — so the page reads as a single product rather than
  // several. (Real issue this fixes: Instagram's "Add products" rejected a
  // ?variant= link as "more than one product" even though the meta tags were
  // already variant-specific, because the page still visually offered every
  // other variant too.)
  const visibleVariants = requestedVariant ? [requestedVariant] : (c.variants ?? []);
  const [selectedVariant, setSelectedVariant] = useState(() => {
    if (!hasVariants) return null;
    return requestedVariant ?? c.variants!.find((v) => v.stock > 0) ?? c.variants![0];
  });
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [preOrderError, setPreOrderError] = useState<string | null>(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyStatus, setNotifyStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  // Must derive from selectedVariant (the actually-selected default, which
  // skips sold-out variants), not blindly from c.variants[0] — otherwise
  // whenever the first-listed variant sells out and a later one with its own
  // dial options becomes the default, this stays null while that variant
  // requires a dial pick, permanently disabling Reserve/Add to Bag until the
  // shopper manually re-clicks a dial. Confirmed live: with Quartz (no dial
  // options) sold out and Hand-Wound (has dial options) as the new default,
  // every purchase button on the page was disabled on load.
  const [selectedNumeral, setSelectedNumeral] = useState<string | null>(
    selectedVariant?.numeralOptions?.[0] ?? null
  );
  // The Stripe price actually charged: a numeral/dial choice with its own
  // dedicated price (numeralPriceIds) overrides the variant's base price —
  // e.g. Contour's Quartz variant charges a different price for Nacre vs.
  // Aurum even though both are cosmetic "dial" choices in the UI.
  const effectivePriceId =
    (selectedNumeral && selectedVariant?.numeralPriceIds?.[selectedNumeral]) ||
    selectedVariant?.stripePriceId;
  // The price actually shown/charged: a numeral/dial choice with its own
  // numeralPrices entry overrides the variant's base price (e.g. Aurum's
  // gold-plated case costs more than Nacre despite sharing the Quartz variant).
  const effectivePrice =
    (selectedNumeral ? selectedVariant?.numeralPrices?.[selectedNumeral] : undefined) ??
    selectedVariant?.price ??
    c.price;
  const selectedVariantImage =
    (selectedNumeral && selectedVariant?.numeralImages?.[selectedNumeral]) ||
    selectedVariant?.image;

  // ── Checkout add-ons (feature-flagged OFF by default) ──────────────────────
  const addOnsActive = addOnsEnabledFor(c);
  const availableStraps = addOnsActive ? strapsForCollection(c.slug) : [];
  const [selectedStrapSlug, setSelectedStrapSlug] = useState<string | null>(null);
  const [engravingEnabled, setEngravingEnabled] = useState(false);
  const [engravingText, setEngravingText] = useState("");
  const engravingClean = sanitizeEngraving(engravingText).trim();
  const engravingActive = engravingEnabled && engravingClean.length > 0;
  const selectedStrap = selectedStrapSlug ? getStrapAddon(selectedStrapSlug) : undefined;
  const addOnsTotal =
    (selectedStrap?.price ?? 0) + (engravingActive ? engravingAddon.price : 0);
  const runningTotal = (effectivePrice) + addOnsTotal;
  const { addLine: addCartLine } = useCart();

  // Auto-cycles the hero through every "frame" that defines its own hero
  // image — a plain variant with heroImage, or (for a variant with dial
  // sub-choices like Contour's Quartz/Nacre+Aurum) each numeral choice that
  // defines its own numeralHeroImages entry — keeping the price/name/CTA
  // text in sync since they all read from selectedVariant/selectedNumeral.
  // Stops permanently the moment the shopper interacts themselves, so it
  // never fights their choice.
  type HeroFrame = { variant: CollectionVariant; numeral: string | null; heroImage: string };
  const heroFrames: HeroFrame[] = (c.variants ?? []).flatMap((v): HeroFrame[] => {
    if (v.numeralOptions && v.numeralOptions.length > 0 && v.numeralHeroImages) {
      return v.numeralOptions
        .filter((opt) => v.numeralHeroImages?.[opt])
        .map((opt) => ({ variant: v, numeral: opt, heroImage: v.numeralHeroImages![opt] }));
    }
    return v.heroImage ? [{ variant: v, numeral: null, heroImage: v.heroImage }] : [];
  });
  const [userPickedVariant, setUserPickedVariant] = useState(false);
  // setInterval's closure only sees selectedNumeral as it was when the
  // effect last (re)ran — a ref keeps it live across ticks without having
  // to restart the interval on every numeral change.
  const selectedNumeralRef = useRef(selectedNumeral);
  useEffect(() => {
    selectedNumeralRef.current = selectedNumeral;
  }, [selectedNumeral]);
  useEffect(() => {
    if (userPickedVariant || heroFrames.length < 2) return;
    const interval = setInterval(() => {
      setSelectedVariant((current) => {
        const currentIndex = heroFrames.findIndex(
          (f) => f.variant.name === current?.name && f.numeral === selectedNumeralRef.current
        );
        const next = heroFrames[(currentIndex + 1) % heroFrames.length];
        setSelectedNumeral(next.numeral);
        return next.variant;
      });
    }, 7000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPickedVariant, heroFrames.length]);

  const heroSrc =
    (selectedNumeral && selectedVariant?.numeralHeroImages?.[selectedNumeral]) ??
    selectedVariant?.heroImage ??
    c.heroImage ??
    c.image;
  // Two persistent image layers that never mount/unmount — only their src
  // and opacity change. AnimatePresence's enter/exit sequencing (mode=
  // "wait") could get stuck showing a stale image if a new heroSrc arrived
  // before the previous exit animation finished (e.g. the auto-cycle timer
  // firing right as someone clicks a dial) — this crossfade can't get
  // stuck that way since both layers always exist. Uses the functional
  // setState form (reading prev, not the closed-over showLayerA) so it
  // stays correct even if heroSrc changes again before the previous update
  // has committed — reading the render-time showLayerA instead would race
  // and could leave both layers targeting opacity 1 at once.
  const [heroCrossfade, setHeroCrossfade] = useState(() => ({ a: heroSrc, b: heroSrc, showA: true }));
  const lastHeroSrcRef = useRef(heroSrc);
  useEffect(() => {
    if (heroSrc === lastHeroSrcRef.current) return;
    lastHeroSrcRef.current = heroSrc;
    setHeroCrossfade((prev) =>
      prev.showA ? { a: prev.a, b: heroSrc, showA: false } : { a: heroSrc, b: prev.b, showA: true }
    );
  }, [heroSrc]);

  // Note: the specs table reads c.specs directly (see displaySpecs usage
  // below) — it previously had a Contour-specific override here that
  // regenerated the Edition row from live stock, but it hardcoded dial
  // names ("Orange Agate", "Black MOP") that silently went stale and
  // started overriding the real content the moment those dials were
  // renamed, which is worse than the staleness it was meant to prevent.
  const displaySpecs = c.specs;

  // Persistent sticky buy bar: appears once the hero (with the primary CTA)
  // has scrolled out of view, so Add to Bag/Reserve stay one tap away no
  // matter how far down the page someone has scrolled, instead of only
  // existing at three fixed points in the page.
  const heroRef = useRef<HTMLElement>(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // The cookie consent banner is also fixed to the bottom of the screen —
  // without this, it would sit on top of (and swallow clicks meant for) the
  // sticky buy bar below whenever both are visible at once. Measuring its
  // real rendered height and shifting the buy bar up by that amount keeps
  // both fully usable instead of overlapping.
  const [cookieBannerHeight, setCookieBannerHeight] = useState(0);
  useEffect(() => {
    function measure() {
      const el = document.getElementById("pedral-cookie-banner");
      setCookieBannerHeight(el ? el.offsetHeight : 0);
    }
    measure();
    const observer = new MutationObserver(measure);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Add to Cart shares the same "is this selection actually purchasable" gate
  // as Reserve, minus the deposit pre-order flow — that one charges a fixed
  // deposit rather than the item's real price, which doesn't compose with a
  // multi-item Stripe session the way a normal priced line item does.
  const canAddToCart =
    !c.isEnquiryOnly &&
    !c.isPreOrder &&
    !isSoldOut &&
    !!effectivePriceId &&
    !(selectedVariant?.numeralOptions && !selectedNumeral) &&
    !(selectedNumeral && selectedVariant?.soldOutNumerals?.includes(selectedNumeral));

  function handleAddToCart() {
    if (!effectivePriceId) return;
    const price = effectivePrice;
    addCartLine({
      slug: c.slug,
      productName: c.name,
      variantName: selectedVariant.numeralOptions
        ? `${selectedVariant.name} · ${selectedNumeral}`
        : selectedVariant.name,
      priceId: effectivePriceId,
      unitPrice: price,
      image: selectedVariantImage || c.image,
      nonRefundable: c.nonRefundable ?? false,
      ...(addOnsActive && (selectedStrapSlug || engravingActive)
        ? {
            addOns: {
              ...(selectedStrap ? { strapSlug: selectedStrap.slug, strapName: selectedStrap.name, strapPrice: selectedStrap.price } : {}),
              ...(engravingActive ? { engravingText: engravingClean, engravingPrice: engravingAddon.price } : {}),
            },
          }
        : {}),
    });
    const item: AnalyticsItem = {
      item_id: c.slug,
      item_name: c.name,
      price,
      quantity: 1,
      item_variant: selectedVariant.name,
    };
    gaEvent("add_to_cart", { currency: "EUR", value: price, items: [item] });
    fbqTrack("AddToCart", { currency: "EUR", value: price, content_ids: [c.slug], content_type: "product" });
  }

  function trackReserveIntent() {
    const price = effectivePrice;
    const item: AnalyticsItem = {
      item_id: c.slug,
      item_name: c.name,
      price,
      quantity: 1,
      item_variant: selectedVariant?.name,
    };
    const value = c.isPreOrder ? c.depositAmount ?? 500 : price;
    gaEvent("add_to_cart", { currency: "EUR", value, items: [item] });
    gaEvent("begin_checkout", { currency: "EUR", value, items: [item] });
    fbqTrack("AddToCart", { currency: "EUR", value, content_ids: [c.slug], content_type: "product" });
    fbqTrack("InitiateCheckout", { currency: "EUR", value, content_ids: [c.slug], content_type: "product" });
  }

  async function handleReserve() {
    trackReserveIntent();
    if (c.isPreOrder) {
      setLoading(true);
      setPreOrderError(null);
      try {
        const res = await fetch("/api/preorder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            collectionSlug: c.slug,
            collectionName: c.name,
            depositAmount: c.depositAmount ?? 500,
          }),
        });
        const data = await res.json();
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
          setLoading(false);
        } else {
          setPreOrderError(data.error ?? "Could not load checkout. Please try again.");
          setLoading(false);
        }
      } catch {
        setPreOrderError("Network error. Please try again.");
        setLoading(false);
      }
      return;
    }
    if (!effectivePriceId) return;
    setLoading(true);
    setPreOrderError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: effectivePriceId,
          productName: c.name,
          variantName: selectedVariant.numeralOptions
            ? `${selectedVariant.name} · ${selectedNumeral}`
            : selectedVariant.name,
          isPreOrder: c.nonRefundable ?? false,
          ...(addOnsActive && (selectedStrapSlug || engravingActive)
            ? {
                addOns: {
                  ...(selectedStrapSlug ? { strapSlug: selectedStrapSlug } : {}),
                  ...(engravingActive ? { engravingText: engravingClean } : {}),
                },
              }
            : {}),
        }),
      });
      const data = await res.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        setLoading(false);
      } else {
        setPreOrderError(data.error ?? "Could not load checkout. Please try again.");
        setLoading(false);
      }
    } catch {
      setPreOrderError("Network error. Please try again.");
      setLoading(false);
    }
  }

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (!notifyEmail) return;
    setNotifyStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: notifyEmail, website: "" }),
      });
      const data = await res.json();
      setNotifyStatus(data.success || data.alreadySubscribed ? "success" : "error");
    } catch {
      setNotifyStatus("error");
    }
  }

  return (
    <>
      {/* Product Hero — Full-bleed with overlay */}
      <section
        ref={heroRef}
        className={`relative flex items-end sm:items-center overflow-hidden ${c.heroFit === "contain" ? "min-h-[85vh] sm:min-h-screen justify-center" : "min-h-[60vh] sm:min-h-screen"}`}
      >
        <div className="absolute inset-0">
          {heroSrc ? (
            heroFrames.length > 1 ? (
              <>
                <motion.div
                  animate={{ opacity: heroCrossfade.showA ? 1 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroCrossfade.a}
                    alt=""
                    fill
                    className={c.heroFit === "contain" ? "object-contain" : "object-contain sm:object-cover"}
                    priority
                  />
                </motion.div>
                <motion.div
                  animate={{ opacity: heroCrossfade.showA ? 0 : 1 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroCrossfade.b}
                    alt=""
                    fill
                    className={c.heroFit === "contain" ? "object-contain" : "object-contain sm:object-cover"}
                    priority
                  />
                </motion.div>
              </>
            ) : (
              <Image
                src={heroSrc}
                alt=""
                fill
                className={c.heroFit === "contain" ? "object-contain" : "object-contain sm:object-cover"}
                priority
              />
            )
          ) : (
            <ImagePlaceholder label={`${c.name}\nHero / Lifestyle Image`} className="h-full w-full" />
          )}
          {c.heroFit === "contain" ? (
            // On mobile (below sm:), content is bottom-anchored (items-end)
            // over the middle-to-lower part of the image, but the old
            // gradient only got properly dark below 75% — the title/price/
            // badge landed in a 0.35-opacity zone, unreadable against a
            // bright watch (confirmed on a gold dial: text nearly invisible
            // against the band). Darkens that zone earlier and more.
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,10,12,0.25)_0%,rgba(5,10,12,0.65)_40%,rgba(5,10,12,0.92)_70%,rgba(5,10,12,0.97)_100%)] sm:bg-[radial-gradient(ellipse_at_center,rgba(5,10,12,0.82)_0%,rgba(5,10,12,0.55)_40%,rgba(5,10,12,0.2)_70%,transparent_100%)]" />
          ) : (
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(5,10,12,0.88)_0%,rgba(5,10,12,0.35)_50%,rgba(5,10,12,0.7)_100%)]" />
          )}
        </div>
        <div className={`relative z-10 py-10 sm:py-24 md:py-32 ${c.heroFit === "contain" ? "mx-auto max-w-[560px] px-6 text-center" : "max-w-[700px] px-6 md:px-24"}`}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-5 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent"
          >
            {isSoldOut
              ? `The Original · Since ${c.year}`
              : `Limited Edition · ${c.maxStock} Pieces`}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-[clamp(32px,7vw,56px)] font-light leading-[1.15] text-foreground"
          >
            {c.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-3 font-serif text-[clamp(18px,5vw,24px)] font-light italic text-accent-hover"
          >
            {c.hook}
          </motion.p>
          {c.collaboration && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.75 }}
              className="mt-3 text-[15px] font-light tracking-[1px] text-foreground-muted"
            >
              In collaboration with{" "}
              <a
                href={c.collaboration.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 hover:text-accent-hover"
              >
                {c.collaboration.name}
              </a>
            </motion.p>
          )}
          {!c.isEnquiryOnly && !c.hidePriceOnCard && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-4 font-serif text-[28px] font-light text-foreground"
            >
              &euro;{(effectivePrice).toLocaleString()}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className={`mt-5 flex w-fit items-center gap-3 border border-accent/25 px-4 py-2 rounded-lg ${c.heroFit === "contain" ? "mx-auto" : ""}`}
          >
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-accent" />
            <span className="text-[13px] tracking-[1px] sm:text-[11px] sm:tracking-[1.5px] uppercase text-accent">
              Edition of {c.maxStock} &middot; {c.edition}
            </span>
          </motion.div>
          {!c.isEnquiryOnly && !isSoldOut && (() => {
            const stockToShow = (hasVariants && selectedVariant) ? selectedVariant.stock : c.stock;
            return stockToShow <= 5 && stockToShow > 0 ? (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="mt-3 text-[15px] font-medium tracking-[1px] sm:text-[13px] sm:tracking-[1.5px] uppercase text-red-400/80"
              >
                Only {stockToShow} {stockToShow === 1 ? "piece" : "pieces"} remaining
              </motion.p>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="mt-3 text-[15px] font-light tracking-[0.5px] text-foreground-muted/70 sm:text-[16px] sm:text-foreground-muted/50"
              >
                Once this edition closes, it never returns.
              </motion.p>
            );
          })()}
          {/* Selected variant name */}
          {hasVariants && selectedVariant && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="mt-4 text-[15px] font-light tracking-[1px] text-foreground-muted"
            >
              {selectedVariant.name}
            </motion.p>
          )}
          {/* Also available — real customers (often landing on a single-variant
              URL shared via Instagram, where the sibling variant is
              deliberately hidden below) were missing that other options
              exist at all. This surfaces it right in the hero, either linking
              straight to the sibling's own page (single-variant view) or
              jumping down to the picker (full multi-variant view). */}
          {hasVariants && c.variants && c.variants.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05 }}
              className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] font-light text-foreground-muted/80"
            >
              <span>Also available:</span>
              {c.variants
                .filter((v) => v.name !== selectedVariant?.name)
                .map((v) => {
                  const label = `${v.name} — €${(v.price ?? c.price).toLocaleString()}`;
                  return requestedVariant ? (
                    <Link
                      key={v.name}
                      href={`/collections/${c.slug}/${v.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-accent underline underline-offset-4 hover:text-accent-hover"
                    >
                      {label}
                    </Link>
                  ) : (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => {
                        setSelectedVariant(v);
                        setSelectedNumeral(v.numeralOptions?.[0] ?? null);
                        setUserPickedVariant(true);
                        document.getElementById("dial-variants")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-accent underline underline-offset-4 hover:text-accent-hover"
                    >
                      {label}
                    </button>
                  );
                })}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6"
          >
            {c.isEnquiryOnly ? (
              <div className={`flex flex-col gap-3 ${c.heroFit === "contain" ? "items-center" : ""}`}>
                <Link
                  href="/contact"
                  className="inline-block w-full rounded-lg bg-accent px-8 py-4 text-center text-[12px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover sm:w-auto sm:px-12 sm:text-[11px] sm:tracking-[3px]"
                >
                  Request an Allocation →
                </Link>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    onClick={handleReserve}
                    disabled={loading || (!c.isPreOrder && !selectedVariant) || (!!selectedVariant?.numeralOptions && !selectedNumeral) || (!!selectedNumeral && !!selectedVariant?.soldOutNumerals?.includes(selectedNumeral))}
                    className="w-full rounded-lg bg-accent px-8 py-4 text-[12px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto sm:px-12 sm:text-[11px] sm:tracking-[3px]"
                  >
                    {loading
                      ? "Loading…"
                      : c.isPreOrder
                      ? `Reserve your allocation · €${c.depositAmount ?? 500} deposit`
                      : isSoldOut
                      ? "Join Waitlist"
                      : `${c.reserveButtonLabel ?? "Reserve Allocation"} · €${(effectivePrice).toLocaleString()}`}
                  </button>
                  {canAddToCart && (
                    <button
                      onClick={handleAddToCart}
                      className="w-full rounded-lg border border-accent/30 px-8 py-4 text-[12px] font-medium tracking-[2px] uppercase text-accent transition-colors hover:bg-accent hover:text-background sm:w-auto sm:px-10 sm:text-[11px] sm:tracking-[3px]"
                    >
                      Add to Bag
                    </button>
                  )}
                </div>
                {c.isPreOrder && (
                  <p className="mt-3 text-[16px] font-light leading-[1.7] text-foreground-muted/60">
                    €{c.depositAmount ?? 500} non-refundable deposit &middot; Secures your place in the production queue &middot; Balance invoiced before shipping
                  </p>
                )}
                {!c.isPreOrder && c.shipsBy && !isSoldOut && (
                  <p className="mt-3 text-[16px] font-light leading-[1.7] text-foreground-muted/60">
                    {c.shipsBy}
                  </p>
                )}
                {preOrderError && (
                  <p className="mt-2 text-[16px] text-red-400">{preOrderError}</p>
                )}
              </>
            )}
          </motion.div>

        </div>
      </section>

      {/* Reassurance strip */}
      <section className="bg-background border-b border-accent/[0.06]">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid gap-0 divide-y divide-accent/[0.06] sm:grid-cols-4 sm:divide-x sm:divide-y-0"
          >
            {[
              "Kevin reviews each request personally. Not all are confirmed.",
              "Sapphire crystal · Swiss automatic movement · HV1200 steel",
              "Direct communication with Kevin — not a support team",
              "Ships tracked & insured from Stockholm",
            ].map((item) => (
              <p key={item} className="px-0 py-5 text-[16px] font-light leading-[1.7] text-foreground-muted/60 sm:px-6 sm:py-6 sm:text-[16px]">
                {item}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Collaboration credit — placed before the variant picker so it's
          clear this is a collaboration before a shopper starts choosing a
          dial, not something they discover after the fact further down. */}
      {c.collaboration?.bio && (
        <section className="bg-background-alt py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                The Collaboration
              </p>
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-light text-foreground">
                About {c.collaboration.name}.
              </h2>
              <div className="mt-6 h-px w-[60px] bg-accent" />
              <p className="mt-6 text-[16px] font-light leading-[1.9] text-foreground-muted">
                {c.collaboration.bio}
              </p>
              <a
                href={c.collaboration.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-[15px] font-normal text-accent underline-offset-4 hover:underline"
              >
                {c.collaboration.url.replace(/^https?:\/\//, "").replace(/\/$/, "")} →
              </a>
            </motion.div>
          </div>
        </section>
      )}

      {/* Dial Variants Browser */}
      {hasVariants && (
        <section id="dial-variants" className="bg-background py-14 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-8"
            >
              <p className="mb-2 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                {c.variantLabel ?? "Dial Editions"}
              </p>
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-light text-foreground">
                {requestedVariant
                  ? requestedVariant.name
                  : c.variantLabel === "Movement" ? "Choose your calibre." : "Choose your expression."}
              </h2>
            </motion.div>

            {/* Available variants */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid gap-4 sm:grid-cols-2"
            >
              {visibleVariants.map((v) => {
                const isSelected = selectedVariant?.name === v.name;
                const isSoldOutVariant = v.stock === 0;
                return (
                  <motion.div
                    key={v.name}
                    variants={fadeInUp}
                    onClick={() => { if (!isSoldOutVariant) { setSelectedVariant(v); setSelectedNumeral(null); setUserPickedVariant(true); } }}
                    className={`group relative overflow-hidden rounded-lg border text-left transition-all duration-300 ${
                      isSoldOutVariant
                        ? "cursor-not-allowed opacity-50 border-accent/10"
                        : isSelected
                        ? "cursor-pointer border-accent"
                        : "cursor-pointer border-accent/10 hover:border-accent/40"
                    }`}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface)]">
                      {(() => {
                        const imgSrc = (isSelected && selectedNumeral && v.numeralImages?.[selectedNumeral]) ? v.numeralImages[selectedNumeral] : v.image;
                        return imgSrc ? (
                          <Image src={imgSrc} alt="" fill className="object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
                        ) : (
                          <ImagePlaceholder label={`${c.name}\n${v.name}`} className="h-full w-full transition-transform duration-500 group-hover:scale-[1.03]" />
                        );
                      })()}
                      {isSelected && <div className="absolute inset-0 bg-accent/10" />}
                      {isSoldOutVariant && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="border border-foreground-muted/30 px-4 py-1.5 text-[11px] tracking-[3px] uppercase text-foreground-muted/60">Sold Out</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-serif text-[20px] font-light text-foreground">{v.name}</p>
                          {v.description && (
                            <p className="mt-1.5 text-[16px] font-light leading-[1.8] text-foreground-muted">{v.description}</p>
                          )}
                        </div>
                        {!isSoldOutVariant && <div className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${isSelected ? "border-accent bg-accent" : "border-accent/30"}`} />}
                      </div>
                      <p className="mt-3 text-[13px] tracking-[0.5px] sm:text-[11px] sm:tracking-[1px] uppercase text-accent/60">
                        {isSoldOutVariant ? "Sold out" : `${v.stock} ${v.stock === 1 ? "piece" : "pieces"} remaining`}
                      </p>
                      {isSoldOutVariant && (() => {
                        const inStockSibling = visibleVariants.find((sibling) => sibling.name !== v.name && sibling.stock > 0);
                        if (!inStockSibling) return null;
                        return (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedVariant(inStockSibling);
                              setSelectedNumeral(inStockSibling.numeralOptions?.[0] ?? null);
                              setUserPickedVariant(true);
                            }}
                            className="mt-2 text-[14px] font-light text-accent underline-offset-4 hover:underline"
                          >
                            Try {inStockSibling.name} instead →
                          </button>
                        );
                      })()}
                      {/* Numeral options inline when this variant is selected */}
                      {isSelected && v.numeralOptions && v.numeralOptions.length > 0 && (
                        <div className="mt-4 border-t border-accent/[0.12] pt-4" onClick={(e) => e.stopPropagation()}>
                          <p className="mb-3 text-[11px] font-normal tracking-[3px] uppercase text-accent">
                            {c.numeralOptionsLabel ?? "Numeral Style"}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {v.numeralOptions.map((opt) => {
                              const isSoldOut = v.soldOutNumerals?.includes(opt);
                              const stock = v.numeralStock?.[opt];
                              return (
                                <button
                                  key={opt}
                                  onClick={() => { setSelectedNumeral(opt); setUserPickedVariant(true); }}
                                  className={`flex flex-col items-start border px-4 py-2.5 text-[11px] tracking-[2px] uppercase transition-colors ${
                                    selectedNumeral === opt
                                      ? "border-accent bg-accent text-background"
                                      : "border-accent/30 text-accent hover:border-accent"
                                  }`}
                                >
                                  {opt}
                                  {stock !== undefined && (
                                    <span className={`mt-0.5 text-[14px] tracking-[0.5px] normal-case font-medium ${selectedNumeral === opt ? "text-background/80" : isSoldOut ? "text-accent/50" : "text-accent/70"}`}>
                                      {isSoldOut ? "0 available" : `${stock} available`}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                          {!selectedNumeral && (
                            <p className="mt-2 text-[14px] font-light text-foreground-muted/50">
                              Select a {(c.numeralOptionsLabel ?? "Numeral Style").toLowerCase()} to continue.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Notify Me — Sold-out editions */}
            {visibleVariants.some(v => v.stock === 0) && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="mt-6 rounded-lg border border-accent/10 bg-background-alt p-6"
              >
                <p className="text-[12px] font-normal tracking-[3px] uppercase text-accent">
                  {isSoldOut ? "Second Drop Coming Soon" : "Sold-out editions"}
                </p>
                <p className="mt-2 text-[16px] font-light leading-[1.8] text-foreground-muted">
                  {isSoldOut
                    ? "The first run is fully sold out. Join the list to hear first when the next drop opens."
                    : "Some editions above are closed. Join the list to be notified when a new expression opens — or if a sold-out edition ever returns."}
                </p>
                {notifyStatus === "success" ? (
                  <p className="mt-4 text-[16px] font-light text-accent">
                    You&apos;re on the list. We&apos;ll be in touch before the next edition opens.
                  </p>
                ) : (
                  <form onSubmit={handleNotify} className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-0">
                    <input
                      type="email"
                      value={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.value)}
                      placeholder="Your email address"
                      required
                      className="w-full rounded-lg border border-accent/15 bg-white/[0.04] px-5 py-3 text-sm font-light text-foreground outline-none placeholder:text-foreground-muted/50 sm:flex-1 sm:rounded-none sm:border-r-0"
                    />
                    <button
                      type="submit"
                      disabled={notifyStatus === "loading"}
                      className="w-full rounded-lg border border-accent bg-accent px-6 py-3 text-[11px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto sm:rounded-none"
                    >
                      {notifyStatus === "loading" ? "..." : "Notify me"}
                    </button>
                  </form>
                )}
                {notifyStatus === "error" && (
                  <p className="mt-2 text-[15px] font-light text-red-400">Something went wrong. Please try again.</p>
                )}
              </motion.div>
            )}

            {/* Add-ons — feature-flagged; renders only when enabled for this product */}
            {addOnsActive && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="mt-8 border-t border-accent/[0.08] pt-8"
              >
                <p className="mb-2 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                  Make It Yours
                </p>
                <h3 className="font-serif text-[clamp(22px,3vw,32px)] font-light text-foreground">
                  Optional additions.
                </h3>

                {/* Strap add-on */}
                {availableStraps.length > 0 && (
                  <div className="mt-6">
                    <p className="mb-3 text-[11px] font-normal tracking-[3px] uppercase text-accent">
                      Additional Strap
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {/* None — the default, always valid */}
                      <div
                        onClick={() => setSelectedStrapSlug(null)}
                        className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all duration-300 ${
                          selectedStrapSlug === null
                            ? "border-accent"
                            : "border-accent/10 hover:border-accent/40"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-serif text-[16px] font-light text-foreground">No additional strap</p>
                          <p className="mt-1 text-[16px] font-light text-foreground-muted">Included strap only.</p>
                        </div>
                        <div className={`h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${selectedStrapSlug === null ? "border-accent bg-accent" : "border-accent/30"}`} />
                      </div>
                      {availableStraps.map((strap) => {
                        const isSelected = selectedStrapSlug === strap.slug;
                        return (
                          <div
                            key={strap.slug}
                            onClick={() => setSelectedStrapSlug(strap.slug)}
                            className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all duration-300 ${
                              isSelected ? "border-accent" : "border-accent/10 hover:border-accent/40"
                            }`}
                          >
                            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--surface)]">
                              {strap.image ? (
                                <Image src={strap.image} alt="" fill className="object-cover" />
                              ) : (
                                <ImagePlaceholder label="Strap" className="h-full w-full" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-serif text-[16px] font-light text-foreground">{strap.name}</p>
                              <p className="mt-1 text-[16px] font-light text-accent/70">+€{strap.price.toLocaleString()}</p>
                            </div>
                            <div className={`h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${isSelected ? "border-accent bg-accent" : "border-accent/30"}`} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Engraving add-on */}
                <div className="mt-6">
                  <label
                    className={`flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-all duration-300 ${
                      engravingEnabled ? "border-accent" : "border-accent/10 hover:border-accent/40"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={engravingEnabled}
                      onChange={(e) => setEngravingEnabled(e.target.checked)}
                      className="sr-only"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-[16px] font-light text-foreground">Case-back engraving</p>
                      <p className="mt-1 text-[16px] font-light text-foreground-muted">
                        Up to {engravingAddon.maxLength} characters. +€{engravingAddon.price.toLocaleString()}
                      </p>
                    </div>
                    <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${engravingEnabled ? "border-accent bg-accent" : "border-accent/30"}`}>
                      {engravingEnabled && <span className="text-[14px] font-semibold text-background">&#10003;</span>}
                    </div>
                  </label>
                  {engravingEnabled && (
                    <div className="mt-4">
                      <input
                        type="text"
                        value={engravingText}
                        maxLength={engravingAddon.maxLength}
                        onChange={(e) => setEngravingText(e.target.value)}
                        placeholder="Your engraving"
                        className="w-full rounded-lg border border-accent/15 bg-white/[0.04] px-5 py-3 text-sm font-light text-foreground outline-none placeholder:text-foreground-muted/50"
                      />
                      <div className="mt-2 flex items-center justify-between">
                        {hasDisallowedEngravingChars(engravingText) ? (
                          <p className="text-[14px] font-light text-red-400">
                            Only letters, numbers, spaces and basic punctuation ( . , &apos; &amp; - ) can be engraved.
                          </p>
                        ) : (
                          <p className="text-[14px] font-light text-foreground-muted/50">
                            Letters, numbers and basic punctuation.
                          </p>
                        )}
                        <p className="text-[14px] font-light text-foreground-muted/50">
                          {engravingText.length}/{engravingAddon.maxLength}
                        </p>
                      </div>
                      {engravingClean.length > 0 && (
                        <div className="mt-3 rounded-lg border border-accent/10 bg-background-alt px-5 py-4 text-center">
                          <p className="text-[11px] tracking-[2px] uppercase text-accent/50">Preview</p>
                          <p className="mt-2 font-mono text-[16px] tracking-[3px] text-foreground">{engravingClean}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* CTA */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mt-8 flex flex-col items-start gap-4 border-t border-accent/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                {selectedVariant && (
                  <p className="text-[16px] font-light tracking-[1px] text-foreground-muted">
                    Selected: <span className="text-foreground">{selectedVariant.name}{selectedNumeral ? ` · ${selectedNumeral}` : ""}</span>
                  </p>
                )}
                <p className="mt-1 font-serif text-[22px] font-light text-foreground">
                  &euro;{runningTotal.toLocaleString()}
                </p>
                {addOnsActive && addOnsTotal > 0 && (
                  <p className="mt-1 text-[15px] font-light tracking-[0.5px] text-foreground-muted/60 sm:text-[15px]">
                    €{(effectivePrice).toLocaleString()} watch
                    {selectedStrap ? ` · +€${selectedStrap.price.toLocaleString()} strap` : ""}
                    {engravingActive ? ` · +€${engravingAddon.price.toLocaleString()} engraving` : ""}
                  </p>
                )}
                {!c.isEnquiryOnly && (
                  <>
                    <p className="mt-1.5 text-[15px] font-light tracking-[0.5px] text-foreground-muted/60 sm:text-[15px]">
                      {SHIPPING_LINE}
                    </p>
                    <p className="mt-1 text-[15px] font-light tracking-[0.5px] text-foreground-muted/60 sm:text-[15px]">
                      {klarnaLine(effectivePrice)}
                    </p>
                  </>
                )}
                {c.nonRefundable && (
                  <p className="mt-2 text-[16px] font-light leading-[1.7] text-foreground-muted/60 sm:text-[15px]">
                    Pre-order · 3–6 months delivery · Non-refundable · Full payment upfront
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleReserve}
                  disabled={loading || (!c.isPreOrder && !selectedVariant) || (!!selectedVariant?.numeralOptions && !selectedNumeral) || (!!selectedNumeral && !!selectedVariant?.soldOutNumerals?.includes(selectedNumeral))}
                  className="w-full rounded-lg bg-accent px-10 py-4 text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
                >
                  {loading ? "Loading…" : c.isPreOrder ? `Reserve · €${c.depositAmount ?? 500}` : isSoldOut ? "Join Waitlist" : `${c.reserveButtonLabel ?? "Reserve Allocation"} · €${runningTotal.toLocaleString()}`}
                </button>
                {canAddToCart && (
                  <button
                    onClick={handleAddToCart}
                    className="w-full rounded-lg border border-accent/30 px-10 py-4 text-[11px] font-medium tracking-[3px] uppercase text-accent transition-colors hover:bg-accent hover:text-background sm:w-auto"
                  >
                    Add to Bag
                  </button>
                )}
              </div>
            </motion.div>

          </div>
        </section>
      )}

      {/* Description */}
      <section className="bg-background-alt py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
              The Watch
            </p>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-light text-foreground">
              {c.detailStrip.title.replace(/\.$/, "")}
            </h2>
            <div className="mt-6 h-px w-[60px] bg-accent" />
            <p className="mt-6 text-[16px] font-light leading-[1.9] text-foreground-muted">
              {c.description}
            </p>
            {c.descriptionExtra && (
              <p className="mt-5 text-[16px] font-light leading-[1.9] text-foreground-muted">
                {c.descriptionExtra}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* How it Wears */}
      {c.wristFit && (
        <section className="relative overflow-hidden bg-background pb-16 pt-16 md:pb-20 md:pt-20">
          <div className="relative z-10 mx-auto max-w-[900px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                Fit & Dimensions
              </p>
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-light text-foreground">
                How it wears.
              </h2>
              <div className="mt-6 h-px w-[60px] bg-accent" />
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="relative mt-10 h-[170px] w-full sm:h-[240px] md:h-[420px]"
          >
            {(c.wristFit.image || c.detailImage || c.heroImage || c.image) && (
              <Image
                src={c.wristFit.image || c.detailImage || c.heroImage || c.image}
                alt=""
                fill
                className={c.wristFit.image ? "object-cover object-top" : "object-cover"}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
          </motion.div>

          <div className="relative z-10 mx-auto -mt-[100px] max-w-[900px] px-6 sm:-mt-[140px] md:-mt-[260px] md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="rounded-lg border border-accent/10 bg-background/80 p-6 backdrop-blur-sm md:p-10"
            >
              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { label: "Case", value: c.wristFit.caseDiameter },
                  ...(c.wristFit.thickness ? [{ label: "Thickness", value: c.wristFit.thickness }] : []),
                  ...(c.wristFit.lugToLug ? [{ label: "Lug-to-Lug", value: c.wristFit.lugToLug }] : []),
                  ...(c.wristFit.lugWidth ? [{ label: "Strap / Bracelet", value: c.wristFit.lugWidth }] : []),
                  ...(c.wristFit.wristRange ? [{ label: "Wrist Range", value: c.wristFit.wristRange }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="border-t border-accent/[0.12] pt-4">
                    <p className="text-[13px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[2px] uppercase text-accent/70">{label}</p>
                    <p className="mt-1.5 font-serif text-[20px] font-light text-foreground">{value}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-[16px] font-light leading-[1.9] text-foreground-muted sm:text-[15px]">
                {c.wristFit.note}
              </p>
              {c.wristFit.noteExtra && (
                <p className="mt-4 text-[16px] font-light leading-[1.9] text-foreground-muted sm:text-[15px]">
                  {c.wristFit.noteExtra}
                </p>
              )}
              <p className="mt-4 text-[15px] font-light text-foreground-muted/60 sm:text-[16px] sm:text-foreground-muted/50">
                Unsure about fit? Write to Kevin directly — he&apos;ll give you an honest answer.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Detail Strip — Image + Text */}
      <section className="grid md:grid-cols-2">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInLeft}
          className="relative h-[400px] w-full md:h-[500px]"
        >
          {c.detailImage ? (
            <Image
              src={c.detailImage}
              alt={`${c.name} detail`}
              fill
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder
              label={`${c.name}\nDial Detail / Macro`}
              className="h-full w-full"
            />
          )}
        </motion.div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideInRight}
          className="flex flex-col justify-center px-6 py-12 md:px-16"
        >
          <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
            {c.detailStrip.eyebrow}
          </p>
          <h3 className="font-serif text-[26px] font-light text-foreground">
            {c.detailStrip.title}
          </h3>
          <div className="mt-4 h-px w-[60px] bg-accent" />
          <p className="mt-5 text-[16px] font-light leading-[1.85] text-foreground-muted">
            {c.detailStrip.text}
          </p>
        </motion.div>
      </section>

      {/* Designer Note */}
      <section className="relative bg-background py-16 md:py-24">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
              Kevin&apos;s Note
            </p>
            <div className="mt-4 h-px w-[60px] bg-accent" />
            <p className="mt-6 border-l-2 border-accent/30 pl-6 font-serif text-[22px] font-light italic leading-[1.6] text-foreground">
              &ldquo;{c.designerNote}&rdquo;
            </p>
            <p className="mt-4 pl-6 text-[15px] tracking-[2px] text-foreground-muted">
              Kevin Pedral, Stockholm
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Strip */}
      {(() => {
        const images = c.galleryImages && c.galleryImages.length > 0 ? c.galleryImages : [null, null, null];
        const cols = images.length;
        return (
          <>
            {/* Mobile: horizontal scroll */}
            <section className="flex gap-[2px] overflow-x-auto snap-x snap-mandatory scrollbar-none md:hidden">
              {images.map((src, i) => {
                const isWide = false;
                return (
                  <div key={i} className="relative h-[280px] w-[80vw] shrink-0 snap-start overflow-hidden bg-[#060a0b]">
                    {src ? (
                      <Image src={src} alt={`${c.name} angle ${i + 1}`} fill className={isWide ? "object-contain" : "object-cover"} style={{ filter: "contrast(1.06) saturate(0.92) brightness(0.97) sepia(0.05)" }} />
                    ) : (
                      <ImagePlaceholder label={`${c.name}\nAngle ${i + 1}`} className="h-full w-full" />
                    )}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,4,6,0.45)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,4,6,0.18)_0%,transparent_35%,transparent_65%,rgba(2,4,6,0.32)_100%)]" />
                  </div>
                );
              })}
            </section>
            {/* Desktop: 5-panel grid */}
            <section className="hidden gap-[2px] md:grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
              {images.map((src, i) => {
                const isWide = false;
                return (
                  <div key={i} className="relative h-[380px] w-full overflow-hidden group bg-[#060a0b]">
                    {src ? (
                      <Image src={src} alt={`${c.name} angle ${i + 1}`} fill className={`${isWide ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.04]`} style={{ filter: "contrast(1.06) saturate(0.92) brightness(0.97) sepia(0.05)" }} />
                    ) : (
                      <ImagePlaceholder label={`${c.name}\nAngle ${i + 1}`} className="h-full w-full" />
                    )}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(2,4,6,0.45)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,4,6,0.18)_0%,transparent_35%,transparent_65%,rgba(2,4,6,0.32)_100%)]" />
                  </div>
                );
              })}
            </section>
          </>
        );
      })()}

      {/* Specifications */}
      <section className="bg-background-alt py-20 md:py-28">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
              Specifications
            </p>
            <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-light text-foreground">
              {c.specsTitle}
            </h2>
            <div className="mt-6 h-px w-[60px] bg-accent" />
          </motion.div>

          <motion.table
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-8 w-full border-collapse"
          >
            <tbody>
              {Object.entries(displaySpecs).map(([label, value]) => (
                <motion.tr
                  key={label}
                  variants={fadeInUp}
                  className="border-b border-accent/10"
                >
                  <td className="w-[80px] py-3.5 pr-4 align-top text-[11px] font-medium tracking-[1.5px] uppercase text-accent sm:w-[120px] md:w-[180px] sm:pr-6 sm:tracking-[2.5px]">
                    {label}
                  </td>
                  <td className="py-3.5 text-[15px] font-light text-foreground-muted">
                    {value}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        </div>
      </section>

      {/* What's in the Box */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="rounded-lg border border-accent/10 bg-surface/50 p-8 md:p-10"
          >
            <p className="mb-2 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
              Complete Package
            </p>
            <h3 className="font-serif text-[20px] font-light text-foreground">
              What&apos;s in the Box
            </h3>
            <div className="mt-4 h-px w-[60px] bg-accent" />
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {c.boxContents.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-[15px] font-light text-foreground-muted"
                >
                  <span className="text-[9px] text-accent">&#10022;</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-accent/[0.08] pt-5 text-[15px] font-light leading-[1.8] text-foreground-muted/50">
              Tracked &amp; insured delivery included. Price is final — no hidden fees, no import charges within the EU.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Perspective */}
      {c.valueAnchor && !c.isEnquiryOnly && (
        <section className="bg-background-alt py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                Value Perspective
              </p>
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-light text-foreground">
                {c.valuePerspectiveTitle ?? "What this specification actually costs elsewhere."}
              </h2>
              <div className="mt-6 h-px w-[60px] bg-accent" />
              <p className="mt-6 text-[16px] font-light italic leading-[1.85] text-foreground-muted">
                {c.valueAnchor}
              </p>
              <div className="mt-6 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                {c.valueComparePrice && (
                  <>
                    <span className="font-serif text-[24px] font-light text-foreground-muted line-through">
                      {c.valueComparePrice}
                    </span>
                    <span className="text-[12px] tracking-[1.5px] uppercase text-foreground-muted">
                      Established Brands &rarr;
                    </span>
                  </>
                )}
                <span className="font-serif text-[36px] font-normal text-accent">
                  {!requestedVariant && hasVariants && c.variants!.some(v => v.price && v.price !== c.price) ? "From " : ""}&euro;{(requestedVariant?.price ?? c.price).toLocaleString()}
                </span>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Before You Commit */}
      <section className="bg-background py-16 md:py-20">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
              Before You Commit
            </p>
            <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-light text-foreground">
              The questions most people have.
            </h2>
            <div className="mt-6 h-px w-[60px] bg-accent" />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-8 divide-y divide-accent/[0.08]"
          >
            {[
              {
                q: "I've never heard of Pedral before.",
                a: "Kevin has been designing watches in Stockholm since 2015. Over 400 pieces delivered to collectors in 30+ countries. Reviewed by independent watch media and recommended by collectors who own dozens of other watches.",
              },
              {
                q: "What if it doesn't work on my wrist?",
                a: "Every piece ships with a 14-day return window after delivery. Case dimensions are listed in full in the specifications above. If you have doubts about sizing, write to Kevin directly — he responds personally.",
              },
              {
                q: "What about production delays?",
                a: "Timeline updates are sent directly from Kevin throughout production — not automated emails. If something changes, you hear it from the person responsible.",
              },
              {
                q: "I can't see it in person before buying.",
                a: "Most owners say the watch is better in person than in photos. High-resolution images and full specifications are available for every edition. The 14-day return policy exists precisely for this reason.",
              },
              ...(c.extraFaqs ?? []),
            ].map(({ q, a }) => (
              <motion.div key={q} variants={fadeInUp} className="py-4 md:py-5">
                <p className="font-serif text-[15px] font-light text-foreground md:text-[17px]">{q}</p>
                <p className="mt-2 text-[16px] font-light leading-[1.85] text-foreground-muted">{a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <TrustIcons />

      {/* Price CTA */}
      <section className="bg-[linear-gradient(180deg,var(--background)_0%,var(--background-alt)_100%)] py-16 text-center md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          {c.isEnquiryOnly ? (
            <>
              <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                {c.edition}
              </p>
              <p className="font-serif text-[clamp(28px,4vw,42px)] font-light text-foreground">
                If you already know — write directly.
              </p>
              <p className="mx-auto mt-4 max-w-[480px] text-[16px] font-light leading-[1.8] text-foreground-muted">
                Allocations are not guaranteed. Kevin reviews each request and confirms personally. A short note is enough.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-block rounded-lg bg-accent px-12 py-4 text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover"
              >
                Request an Allocation →
              </Link>
              <p className="mt-4 text-[16px] font-light tracking-[0.5px] text-foreground-muted/50">
                Edition of {c.maxStock} · No public announcement
              </p>
            </>
          ) : (
            <>
              <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                Edition of {c.maxStock} &middot; {c.edition}
              </p>
              <p className="font-serif text-[48px] font-light text-foreground">
                &euro;{(effectivePrice).toLocaleString()}
              </p>
              <p className="mt-2 text-[16px] font-light tracking-[0.5px] text-foreground-muted/70">
                {SHIPPING_LINE}
              </p>
              <p className="mt-1 text-[16px] font-light tracking-[0.5px] text-foreground-muted/70">
                {klarnaLine(effectivePrice)}
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={handleReserve}
                  disabled={loading || (!c.isPreOrder && !selectedVariant) || (!!selectedVariant?.numeralOptions && !selectedNumeral) || (!!selectedNumeral && !!selectedVariant?.soldOutNumerals?.includes(selectedNumeral))}
                  className="w-full max-w-[300px] rounded-lg bg-accent px-8 py-4 text-[12px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto sm:px-12 sm:text-[11px] sm:tracking-[3px]"
                >
                  {loading
                    ? "Loading…"
                    : c.isPreOrder
                    ? `Reserve your allocation · €${c.depositAmount ?? 500} deposit`
                    : isSoldOut
                    ? "Join Waitlist"
                    : `Reserve · €${(effectivePrice).toLocaleString()}`}
                </button>
                {canAddToCart && (
                  <button
                    onClick={handleAddToCart}
                    className="w-full max-w-[300px] rounded-lg border border-accent/30 px-8 py-4 text-[12px] font-medium tracking-[2px] uppercase text-accent transition-colors hover:bg-accent hover:text-background sm:w-auto sm:px-10 sm:text-[11px] sm:tracking-[3px]"
                  >
                    Add to Bag
                  </button>
                )}
              </div>
              {c.isPreOrder ? (
                <p className="mt-3 text-[16px] font-light leading-[1.7] text-foreground-muted/60">
                  €{c.depositAmount ?? 500} non-refundable deposit &middot; Balance invoiced before shipping
                </p>
              ) : (
                <p className="mt-3 text-[16px] font-light tracking-[0.5px] text-foreground-muted">
                  Pre-order &middot; Full payment secures your allocation &middot; {c.shipsBy ?? "Ships in 4–6 weeks"}
                </p>
              )}
              <div className="mx-auto mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-8">
                {[
                  { label: "24-month warranty", href: "/warranty" },
                  { label: "14-day return after delivery", href: "/returns" },
                  { label: "Secure payment · Klarna", href: undefined },
                  { label: "Insured express shipping", href: undefined },
                ].map(({ label, href }) => {
                  const inner = (
                    <>
                      <span className="font-semibold text-accent">&#10003;</span>
                      {label}
                    </>
                  );
                  return href ? (
                    <Link key={label} href={href} className="flex items-center gap-2 text-[11px] tracking-[1px] uppercase text-foreground-muted underline-offset-4 transition-colors hover:text-accent">
                      {inner}
                    </Link>
                  ) : (
                    <span key={label} className="flex items-center gap-2 text-[11px] tracking-[1px] uppercase text-foreground-muted">
                      {inner}
                    </span>
                  );
                })}
              </div>
              <p className="mt-5 text-[16px] font-light tracking-[0.5px] text-foreground-muted/50">
                More questions? See our{" "}
                <Link href="/faq" className="text-accent underline-offset-4 hover:underline">FAQ</Link>.
              </p>
            </>
          )}
        </motion.div>
      </section>

      {/* Product Testimonials */}
      {c.testimonials.length > 0 && (
        <section className="border-l-[3px] border-accent/20 bg-background py-16 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <motion.p
                variants={fadeInUp}
                className="mb-6 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent"
              >
                {c.testimonialsLabel ?? `From ${c.name} Owners`}
              </motion.p>
              {c.testimonials.map((t, i) => (
                <motion.div key={t.name} variants={fadeInUp}>
                  {i > 0 && (
                    <div className="my-8 h-px w-10 bg-accent/30" />
                  )}
                  <p className="font-serif text-[18px] font-light italic leading-[1.6] text-foreground">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="mt-2 text-[15px] font-normal tracking-[1.5px] text-accent">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-[14px] font-light text-foreground-muted">
                    {t.bio}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Coming Soon Editions */}
      {c.comingSoonEditions && c.comingSoonEditions.length > 0 && (
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                Coming Next
              </p>
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-light text-foreground">
                The next dial editions.
              </h2>
              <div className="mt-6 h-px w-[60px] bg-accent" />
              <p className="mt-5 text-[16px] font-light leading-[1.85] text-foreground-muted">
                These editions are not yet available. The list is notified first. They will not be announced publicly until they have sold through.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {c.comingSoonEditions.map((ed) => (
                <motion.div
                  key={ed.name}
                  variants={fadeInUp}
                  className="rounded-lg border border-accent/10 bg-background-alt overflow-hidden"
                >
                  {ed.image ? (
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={ed.image}
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder label={ed.name} className="aspect-[4/3] w-full" />
                  )}
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-lg border border-accent/20 px-2.5 py-1 text-[11px] tracking-[2px] uppercase text-accent">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="font-serif text-[22px] font-light text-foreground">{ed.name}</h3>
                    <p className="mt-2 text-[16px] font-light leading-[1.8] text-foreground-muted">{ed.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Bespoke cross-link + Related reading */}
      <section className="bg-background-alt py-16 md:py-24">
        <div className="mx-auto max-w-[900px] px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
              Beyond the Edition
            </p>
            <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-light text-foreground">
              One of twenty. Or one of one.
            </h2>
            <div className="mt-6 h-px w-[60px] bg-accent" />
            <p className="mt-6 text-[16px] font-light leading-[1.85] text-foreground-muted">
              When an edition is not quite yours, a bespoke commission begins from a blank sheet — designed with Kevin, made once, carrying only your name.
            </p>
            <Link
              href="/bespoke-pieces"
              className="mt-6 inline-block text-[12px] font-normal tracking-[1.5px] uppercase text-accent underline-offset-4 hover:underline"
            >
              Explore Bespoke Commissions &rarr;
            </Link>

            {relatedArticles.length > 0 && (
              <div className="mt-10 border-t border-accent/[0.08] pt-8">
                <p className="mb-4 text-[11px] font-normal tracking-[3px] uppercase text-accent/70">
                  From the Journal
                </p>
                <ul className="space-y-3">
                  {relatedArticles.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/journal/${a.slug}`}
                        className="text-[15px] font-light leading-[1.7] text-foreground-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                      >
                        Read: {a.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {crossSellCollections.length > 0 && (
        <section className="bg-background py-16 md:py-24">
          <div className="mx-auto max-w-[1100px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="mb-3 text-[14px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                Also From the Studio
              </p>
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-light text-foreground">
                Other pieces, if this isn&apos;t the one.
              </h2>
              <div className="mt-6 h-px w-[60px] bg-accent" />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="mt-10 grid gap-8 sm:grid-cols-3"
            >
              {crossSellCollections.map((other) => (
                <motion.div key={other.slug} variants={fadeInUp}>
                  <Link href={`/collections/${other.slug}`} className="group block">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-background-alt">
                      {other.image ? (
                        <Image
                          src={other.image}
                          alt=""
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <ImagePlaceholder label={other.name} className="h-full w-full" />
                      )}
                    </div>
                    <p className="mt-4 font-serif text-[20px] font-light text-foreground transition-colors group-hover:text-accent">
                      {other.name}
                    </p>
                    <p className="mt-1 text-[14px] font-light italic text-foreground-muted">
                      {other.hook}
                    </p>
                    <p className="mt-2 text-[14px] font-light tracking-[0.5px] text-foreground-muted/70">
                      From &euro;{other.price.toLocaleString()}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <Newsletter
        title={c.newsletterTitle}
        subtitle={c.newsletterSub}
      />

      {/* Sticky buy bar — appears once the hero (with the primary CTA) has
          scrolled out of view, so the purchase actions stay reachable from
          anywhere on the page. */}
      <AnimatePresence>
        {showStickyBar && !c.isEnquiryOnly && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            style={{ bottom: cookieBannerHeight }}
            className="fixed inset-x-0 z-40 border-t border-accent/10 bg-background/95 backdrop-blur-md"
          >
            <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-3 sm:px-8">
              <div className="relative hidden h-12 w-10 shrink-0 overflow-hidden rounded-md bg-[var(--surface)] sm:block">
                {(selectedVariantImage || c.image) && (
                  <Image src={selectedVariantImage || c.image} alt="" fill className="object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-serif text-[15px] font-normal text-foreground sm:text-[16px]">
                  {c.name}
                  {hasVariants && selectedVariant ? ` — ${selectedVariant.name}` : ""}
                </p>
                <p className="text-[16px] font-light text-foreground-muted">
                  &euro;{runningTotal.toLocaleString()}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {canAddToCart && (
                  <button
                    onClick={handleAddToCart}
                    className="rounded-lg border border-accent/30 px-4 py-2.5 text-[11px] font-medium tracking-[1.5px] uppercase text-accent transition-colors hover:bg-accent hover:text-background sm:px-6 sm:text-[11px] sm:tracking-[2px]"
                  >
                    Add to Bag
                  </button>
                )}
                <button
                  onClick={handleReserve}
                  disabled={loading || (!c.isPreOrder && !selectedVariant) || (!!selectedVariant?.numeralOptions && !selectedNumeral) || (!!selectedNumeral && !!selectedVariant?.soldOutNumerals?.includes(selectedNumeral))}
                  className="rounded-lg bg-accent px-4 py-2.5 text-[11px] font-medium tracking-[1.5px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60 sm:px-8 sm:text-[11px] sm:tracking-[2px]"
                >
                  {loading ? "…" : isSoldOut ? "Waitlist" : c.isPreOrder ? "Reserve" : c.reserveButtonLabel ?? "Reserve"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {clientSecret && (
        <PreOrderModal
          clientSecret={clientSecret}
          collectionName={c.name}
          isPreOrder={c.isPreOrder}
          depositAmount={c.depositAmount ?? 500}
          price={runningTotal}
          onClose={() => setClientSecret(null)}
        />
      )}
    </>
  );
}
