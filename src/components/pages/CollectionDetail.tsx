"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, slideInLeft, slideInRight, staggerContainer } from "@/lib/animations";
import Link from "next/link";
import type { Collection } from "@/lib/collections";
import Newsletter from "@/components/sections/Newsletter";
import TrustIcons from "@/components/sections/TrustIcons";
import PreOrderModal from "@/components/ui/PreOrderModal";

function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-[linear-gradient(135deg,rgba(201,168,76,0.06)_0%,rgba(201,168,76,0.02)_50%,rgba(201,168,76,0.08)_100%)] ${className}`}
    >
      <span className="text-center text-[10px] tracking-[3px] uppercase text-accent/30">
        {label}
      </span>
    </div>
  );
}


export default function CollectionDetail({ collection }: { collection: Collection }) {
  const c = collection;
  const isSoldOut = c.stock === 0 && !c.isEnquiryOnly;
  const hasVariants = c.variants && c.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? (c.variants!.find(v => v.stock > 0) ?? c.variants![0]) : null
  );
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [preOrderError, setPreOrderError] = useState<string | null>(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifyStatus, setNotifyStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const firstVariant = hasVariants ? c.variants![0] : null;
  const [selectedNumeral, setSelectedNumeral] = useState<string | null>(
    firstVariant?.numeralOptions?.[0] ?? null
  );

  async function handleReserve() {
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
    if (!selectedVariant?.stripePriceId) return;
    setLoading(true);
    setPreOrderError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: selectedVariant.stripePriceId,
          productName: c.name,
          variantName: selectedVariant.numeralOptions
            ? `${selectedVariant.name} · ${selectedNumeral}`
            : selectedVariant.name,
          isPreOrder: c.nonRefundable ?? false,
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
      <section className={`relative flex items-center overflow-hidden ${c.heroFit === "contain" ? "min-h-[70vh] sm:min-h-[80vh]" : "min-h-[60vh] sm:min-h-screen"}`}>
        <div className="absolute inset-0">
          {(c.heroImage || c.image) ? (
            <Image
              src={c.heroImage ?? c.image}
              alt={c.name}
              fill
              className={c.heroFit === "contain" ? "object-contain object-right" : "object-contain sm:object-cover"}
              priority
            />
          ) : (
            <ImagePlaceholder label={`${c.name}\nHero / Lifestyle Image`} className="h-full w-full" />
          )}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,10,12,0.95)_0%,rgba(5,10,12,0.6)_50%,rgba(5,10,12,0.1)_100%)]" />
        </div>
        <div className="relative z-10 max-w-[500px] px-6 py-20 sm:py-24 md:py-32 md:px-24">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-5 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent"
          >
            {isSoldOut
              ? `The Original · Since ${c.year}`
              : `Limited Edition · 20 Pieces`}
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
          {!c.isEnquiryOnly && !c.hidePriceOnCard && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-4 font-serif text-[28px] font-light text-foreground"
            >
              &euro;{c.price.toLocaleString()}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-5 flex w-fit items-center gap-3 border border-accent/25 px-4 py-2 rounded-lg"
          >
            <span className="h-[7px] w-[7px] animate-pulse rounded-full bg-accent" />
            <span className="text-[11px] tracking-[1.5px] uppercase text-accent">
              Edition of {c.maxStock} &middot; {c.edition}
            </span>
          </motion.div>
          {!c.isEnquiryOnly && !isSoldOut && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-3 text-[11px] font-light tracking-[0.5px] text-foreground-muted/50"
            >
              Once this edition closes, it never returns.
            </motion.p>
          )}
          {/* Selected variant name */}
          {hasVariants && selectedVariant && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.95 }}
              className="mt-4 text-[13px] font-light tracking-[1px] text-foreground-muted"
            >
              {selectedVariant.name}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6"
          >
            {c.isEnquiryOnly ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="inline-block w-full rounded-lg bg-accent px-8 py-4 text-center text-[12px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover sm:w-auto sm:px-12 sm:text-[11px] sm:tracking-[3px]"
                >
                  Request an Allocation →
                </Link>
                <p className="text-[11px] font-light leading-[1.7] text-foreground-muted/60">
                  Kevin reviews each request personally. Not all are confirmed.
                </p>
              </div>
            ) : (
              <>
                <button
                  onClick={handleReserve}
                  disabled={loading || (!c.isPreOrder && !selectedVariant) || (!!selectedVariant?.numeralOptions && !selectedNumeral)}
                  className="w-full rounded-lg bg-accent px-8 py-4 text-[12px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto sm:px-12 sm:text-[11px] sm:tracking-[3px]"
                >
                  {loading
                    ? "Loading…"
                    : c.isPreOrder
                    ? `Reserve your allocation · €${c.depositAmount ?? 500} deposit`
                    : isSoldOut
                    ? "Join Waitlist"
                    : `Reserve Allocation · €${(selectedVariant?.price ?? c.price).toLocaleString()}`}
                </button>
                {c.isPreOrder && (
                  <p className="mt-3 text-[11px] font-light leading-[1.7] text-foreground-muted/60">
                    €{c.depositAmount ?? 500} non-refundable deposit &middot; Secures your place in the production queue &middot; Balance invoiced before shipping
                  </p>
                )}
                {preOrderError && (
                  <p className="mt-2 text-[12px] text-red-400">{preOrderError}</p>
                )}
              </>
            )}
          </motion.div>

          {/* Reassurance strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 border-t border-accent/[0.08] pt-6 flex flex-col gap-2"
          >
            {[
              "Sapphire crystal · Swiss automatic movement · HV1200 steel",
              "Direct communication with Kevin — not a support team",
              "Ships tracked & insured from Stockholm",
            ].map((item) => (
              <p key={item} className="text-[12px] font-light leading-[1.9] text-foreground-muted/50 md:text-[11px]">
                {item}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dial Variants Browser */}
      {hasVariants && (
        <section className="bg-background py-14 md:py-20">
          <div className="mx-auto max-w-[1200px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-8"
            >
              <p className="mb-2 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                {c.variantLabel ?? "Dial Editions"}
              </p>
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-light text-foreground">
                {c.variantLabel === "Movement" ? "Choose your calibre." : "Choose your expression."}
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
              {c.variants!.map((v) => {
                const isSelected = selectedVariant?.name === v.name;
                const isSoldOutVariant = v.stock === 0;
                return (
                  <motion.div
                    key={v.name}
                    variants={fadeInUp}
                    onClick={() => { if (!isSoldOutVariant) { setSelectedVariant(v); setSelectedNumeral(null); } }}
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
                          <Image src={imgSrc} alt={v.name} fill className="object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
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
                            <p className="mt-1.5 text-[14px] font-light leading-[1.8] text-foreground-muted">{v.description}</p>
                          )}
                        </div>
                        {!isSoldOutVariant && <div className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 transition-colors ${isSelected ? "border-accent bg-accent" : "border-accent/30"}`} />}
                      </div>
                      <p className="mt-3 text-[11px] tracking-[1px] uppercase text-accent/60">
                        {isSoldOutVariant ? "Sold out" : `${v.stock} ${v.stock === 1 ? "piece" : "pieces"} remaining`}
                      </p>
                      {/* Numeral options inline when this variant is selected */}
                      {isSelected && v.numeralOptions && v.numeralOptions.length > 0 && (
                        <div className="mt-4 border-t border-accent/[0.12] pt-4" onClick={(e) => e.stopPropagation()}>
                          <p className="mb-3 text-[11px] font-normal tracking-[3px] uppercase text-accent">
                            Numeral Style
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {v.numeralOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => setSelectedNumeral(opt)}
                                className={`border px-4 py-2.5 text-[11px] tracking-[2px] uppercase transition-colors ${
                                  selectedNumeral === opt
                                    ? "border-accent bg-accent text-background"
                                    : "border-accent/30 text-accent hover:border-accent"
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                          {!selectedNumeral && (
                            <p className="mt-2 text-[11px] font-light text-foreground-muted/50">
                              Select a numeral style to continue.
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
            {c.variants!.some(v => v.stock === 0) && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="mt-6 rounded-lg border border-accent/10 bg-background-alt p-6"
              >
                <p className="text-[12px] font-normal tracking-[3px] uppercase text-accent">
                  Sold-out editions
                </p>
                <p className="mt-2 text-[14px] font-light leading-[1.8] text-foreground-muted">
                  Some editions above are closed. Join the list to be notified when a new expression opens — or if a sold-out edition ever returns.
                </p>
                {notifyStatus === "success" ? (
                  <p className="mt-4 text-[13px] font-light text-accent">
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
                  <p className="mt-2 text-[12px] font-light text-red-400">Something went wrong. Please try again.</p>
                )}
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
                  <p className="text-[12px] font-light tracking-[1px] text-foreground-muted">
                    Selected: <span className="text-foreground">{selectedVariant.name}{selectedNumeral ? ` · ${selectedNumeral}` : ""}</span>
                  </p>
                )}
                <p className="mt-1 font-serif text-[22px] font-light text-foreground">
                  &euro;{(selectedVariant?.price ?? c.price).toLocaleString()}
                </p>
                {c.nonRefundable && (
                  <p className="mt-2 text-[11px] font-light leading-[1.7] text-foreground-muted/60">
                    Pre-order · 3–6 months delivery · Non-refundable · Full payment upfront
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleReserve}
                  disabled={loading || (!c.isPreOrder && !selectedVariant) || (!!selectedVariant?.numeralOptions && !selectedNumeral)}
                  className="w-full rounded-lg bg-accent px-10 py-4 text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
                >
                  {loading ? "Loading…" : c.isPreOrder ? `Reserve · €${c.depositAmount ?? 500}` : isSoldOut ? "Join Waitlist" : `Reserve Allocation · €${(selectedVariant?.price ?? c.price).toLocaleString()}`}
                </button>
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
            <p className="mb-3 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
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
        <section className="bg-background py-16 md:py-20">
          <div className="mx-auto max-w-[900px] px-6 md:px-12">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <p className="mb-3 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                Fit & Dimensions
              </p>
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-light text-foreground">
                How it wears.
              </h2>
              <div className="mt-6 h-px w-[60px] bg-accent" />

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                {[
                  { label: "Case", value: c.wristFit.caseDiameter },
                  ...(c.wristFit.thickness ? [{ label: "Thickness", value: c.wristFit.thickness }] : []),
                  ...(c.wristFit.lugToLug ? [{ label: "Lug-to-Lug", value: c.wristFit.lugToLug }] : []),
                  ...(c.wristFit.lugWidth ? [{ label: "Strap / Bracelet", value: c.wristFit.lugWidth }] : []),
                  ...(c.wristFit.wristRange ? [{ label: "Wrist Range", value: c.wristFit.wristRange }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="border-t border-accent/[0.12] pt-4">
                    <p className="text-[11px] font-normal tracking-[2px] uppercase text-accent/70">{label}</p>
                    <p className="mt-1.5 font-serif text-[18px] font-light text-foreground md:text-[20px]">{value}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 text-[15px] font-light leading-[1.9] text-foreground-muted">
                {c.wristFit.note}
              </p>
              <p className="mt-4 text-[13px] font-light text-foreground-muted/50">
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
          <p className="mb-3 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
            {c.detailStrip.eyebrow}
          </p>
          <h3 className="font-serif text-[26px] font-light text-foreground">
            {c.detailStrip.title}
          </h3>
          <div className="mt-4 h-px w-[60px] bg-accent" />
          <p className="mt-5 text-[15px] font-light leading-[1.85] text-foreground-muted">
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
            <p className="mb-3 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
              Kevin&apos;s Note
            </p>
            <div className="mt-4 h-px w-[60px] bg-accent" />
            <p className="mt-6 border-l-2 border-accent/30 pl-6 font-serif text-[22px] font-light italic leading-[1.6] text-foreground">
              &ldquo;{c.designerNote}&rdquo;
            </p>
            <p className="mt-4 pl-6 text-[12px] tracking-[2px] text-foreground-muted">
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
            <p className="mb-3 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
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
              {Object.entries(c.specs).map(([label, value]) => (
                <motion.tr
                  key={label}
                  variants={fadeInUp}
                  className="border-b border-accent/10"
                >
                  <td className="w-[80px] py-3.5 pr-4 align-top text-[11px] font-medium tracking-[1.5px] uppercase text-accent sm:w-[120px] md:w-[180px] sm:pr-6 sm:tracking-[2.5px]">
                    {label}
                  </td>
                  <td className="py-3.5 text-[14px] font-light text-foreground-muted">
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
            <p className="mb-2 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
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
                  className="flex items-center gap-3 text-[14px] font-light text-foreground-muted"
                >
                  <span className="text-[9px] text-accent">&#10022;</span>
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 border-t border-accent/[0.08] pt-5 text-[12px] font-light leading-[1.8] text-foreground-muted/50">
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
              <p className="mb-3 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                Value Perspective
              </p>
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-light text-foreground">
                {c.valuePerspectiveTitle ?? "What this specification actually costs elsewhere."}
              </h2>
              <div className="mt-6 h-px w-[60px] bg-accent" />
              <p className="mt-6 text-[15px] font-light italic leading-[1.85] text-foreground-muted">
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
                  {hasVariants && c.variants!.some(v => v.price && v.price !== c.price) ? "From " : ""}&euro;{c.price.toLocaleString()}
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
            <p className="mb-3 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
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
            ].map(({ q, a }) => (
              <motion.div key={q} variants={fadeInUp} className="py-4 md:py-5">
                <p className="font-serif text-[15px] font-light text-foreground md:text-[17px]">{q}</p>
                <p className="mt-2 text-[13px] font-light leading-[1.85] text-foreground-muted md:text-[14px]">{a}</p>
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
              <p className="mb-3 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                {c.edition}
              </p>
              <p className="font-serif text-[clamp(28px,4vw,42px)] font-light text-foreground">
                If you already know — write directly.
              </p>
              <p className="mx-auto mt-4 max-w-[480px] text-[15px] font-light leading-[1.8] text-foreground-muted">
                Allocations are not guaranteed. Kevin reviews each request and confirms personally. A short note is enough.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-block rounded-lg bg-accent px-12 py-4 text-[11px] font-medium tracking-[3px] uppercase text-background transition-colors hover:bg-accent-hover"
              >
                Request an Allocation →
              </Link>
              <p className="mt-4 text-[11px] font-light tracking-[0.5px] text-foreground-muted/50">
                Edition of {c.maxStock} · No public announcement
              </p>
            </>
          ) : (
            <>
              <p className="mb-3 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                Edition of {c.maxStock} &middot; {c.edition}
              </p>
              <p className="font-serif text-[48px] font-light text-foreground">
                &euro;{c.price.toLocaleString()}
              </p>
              <button
                onClick={handleReserve}
                disabled={loading || (!c.isPreOrder && !selectedVariant) || (!!selectedVariant?.numeralOptions && !selectedNumeral)}
                className="mt-6 w-full max-w-[300px] rounded-lg bg-accent px-8 py-4 text-[12px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto sm:px-12 sm:text-[11px] sm:tracking-[3px]"
              >
                {loading
                  ? "Loading…"
                  : c.isPreOrder
                  ? `Reserve your allocation · €${c.depositAmount ?? 500} deposit`
                  : isSoldOut
                  ? "Join Waitlist"
                  : `Reserve · €${c.price.toLocaleString()}`}
              </button>
              {c.isPreOrder ? (
                <p className="mt-3 text-[11px] font-light leading-[1.7] text-foreground-muted/60">
                  €{c.depositAmount ?? 500} non-refundable deposit &middot; Balance invoiced before shipping
                </p>
              ) : (
                <p className="mt-3 text-[12px] font-light tracking-[0.5px] text-foreground-muted">
                  Pre-order &middot; Full payment secures your allocation &middot; Ships in 4–6 weeks
                </p>
              )}
              <div className="mx-auto mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-8">
                {["Cancel anytime before dispatch", "14-day return after delivery", "24-month warranty", "Insured shipping"].map((item) => (
                  <span key={item} className="flex items-center gap-2 text-[11px] tracking-[1px] uppercase text-foreground-muted">
                    <span className="font-semibold text-accent">&#10003;</span>
                    {item}
                  </span>
                ))}
              </div>
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
                className="mb-6 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent"
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
                  <p className="mt-2 text-[12px] font-normal tracking-[1.5px] text-accent">
                    {t.name}
                  </p>
                  <p className="mt-0.5 text-[11px] font-light text-foreground-muted">
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
              <p className="mb-3 text-[12px] font-normal tracking-[1.5px] sm:text-[11px] sm:tracking-[4px] uppercase text-accent">
                Coming Next
              </p>
              <h2 className="font-serif text-[clamp(28px,3vw,40px)] font-light text-foreground">
                The next dial editions.
              </h2>
              <div className="mt-6 h-px w-[60px] bg-accent" />
              <p className="mt-5 text-[15px] font-light leading-[1.85] text-foreground-muted">
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
                        alt={ed.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <ImagePlaceholder label={ed.name} className="aspect-[4/3] w-full" />
                  )}
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="rounded-lg border border-accent/20 px-2.5 py-1 text-[10px] tracking-[2px] uppercase text-accent">
                        Coming Soon
                      </span>
                    </div>
                    <h3 className="font-serif text-[22px] font-light text-foreground">{ed.name}</h3>
                    <p className="mt-2 text-[14px] font-light leading-[1.8] text-foreground-muted">{ed.description}</p>
                  </div>
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

      {clientSecret && (
        <PreOrderModal
          clientSecret={clientSecret}
          collectionName={c.name}
          isPreOrder={c.isPreOrder}
          depositAmount={c.depositAmount ?? 500}
          price={c.price}
          onClose={() => setClientSecret(null)}
        />
      )}
    </>
  );
}
