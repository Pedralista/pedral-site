"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import PreOrderModal from "@/components/ui/PreOrderModal";
import { gaEvent, fbqTrack, type AnalyticsItem } from "@/lib/analytics";
import { SHIPPING_LINE } from "@/lib/shipping";

export default function CartDrawer() {
  const { lines, isOpen, closeCart, removeLine, setQuantity, subtotal, count } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeCart();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, closeCart]);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    const analyticsItems: AnalyticsItem[] = lines.map((l) => ({
      item_id: l.slug,
      item_name: l.productName,
      price: l.unitPrice + (l.addOns?.strapPrice ?? 0) + (l.addOns?.engravingPrice ?? 0),
      quantity: l.quantity,
      item_variant: l.variantName,
    }));
    gaEvent("begin_checkout", { currency: "EUR", value: subtotal, items: analyticsItems });
    fbqTrack("InitiateCheckout", {
      currency: "EUR",
      value: subtotal,
      content_ids: lines.map((l) => l.slug),
      content_type: "product",
    });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({
            priceId: l.priceId,
            productName: l.productName,
            variantName: l.variantName,
            quantity: l.quantity,
            isPreOrder: l.nonRefundable ?? false,
            ...(l.addOns?.strapSlug || l.addOns?.engravingText
              ? {
                  addOns: {
                    ...(l.addOns?.strapSlug ? { strapSlug: l.addOns.strapSlug } : {}),
                    ...(l.addOns?.engravingText ? { engravingText: l.addOns.engravingText } : {}),
                  },
                }
              : {}),
          })),
        }),
      });
      const data = await res.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
        closeCart();
      } else {
        setError(data.error ?? "Could not load checkout. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex justify-end"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeCart();
            }}
          >
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeCart} />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              className="relative z-10 flex h-full w-full max-w-[440px] flex-col bg-background shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-accent/10 px-6 py-5">
                <p className="text-[12px] font-medium tracking-[2px] uppercase text-foreground">
                  Your Bag {count > 0 ? `(${count})` : ""}
                </p>
                <button
                  onClick={closeCart}
                  aria-label="Close cart"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-accent/10 hover:text-foreground"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                {lines.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <p className="text-[15px] font-light text-foreground-muted">Your bag is empty.</p>
                    <Link
                      href="/collections"
                      onClick={closeCart}
                      className="mt-4 text-[11px] font-medium tracking-[2px] uppercase text-accent underline underline-offset-4"
                    >
                      Browse the collection
                    </Link>
                  </div>
                ) : (
                  <ul className="flex flex-col gap-6">
                    {lines.map((l) => (
                      <li key={l.id} className="flex gap-4">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-md bg-[var(--surface)]">
                          {l.image && <Image src={l.image} alt={l.productName} fill className="object-cover" />}
                        </div>
                        <div className="flex flex-1 flex-col">
                          <p className="font-serif text-[16px] font-normal text-foreground">{l.productName}</p>
                          {l.variantName && (
                            <p className="mt-0.5 text-[15px] font-light text-foreground-muted">{l.variantName}</p>
                          )}
                          {l.addOns?.strapName && (
                            <p className="mt-0.5 text-[14px] font-light text-foreground-muted/70">
                              + {l.addOns.strapName}
                            </p>
                          )}
                          {l.addOns?.engravingText && (
                            <p className="mt-0.5 text-[14px] font-light text-foreground-muted/70">
                              Engraving: &ldquo;{l.addOns.engravingText}&rdquo;
                            </p>
                          )}
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-full border border-accent/15 px-2 py-1">
                              <button
                                onClick={() => setQuantity(l.id, l.quantity - 1)}
                                aria-label="Decrease quantity"
                                className="flex h-5 w-5 items-center justify-center text-foreground-muted transition-colors hover:text-foreground"
                              >
                                −
                              </button>
                              <span className="min-w-[1ch] text-center text-[15px] text-foreground">
                                {l.quantity}
                              </span>
                              <button
                                onClick={() => setQuantity(l.id, l.quantity + 1)}
                                aria-label="Increase quantity"
                                className="flex h-5 w-5 items-center justify-center text-foreground-muted transition-colors hover:text-foreground"
                              >
                                +
                              </button>
                            </div>
                            <p className="text-[16px] font-normal text-foreground">
                              &euro;
                              {(
                                (l.unitPrice + (l.addOns?.strapPrice ?? 0) + (l.addOns?.engravingPrice ?? 0)) *
                                l.quantity
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeLine(l.id)}
                          aria-label="Remove item"
                          className="self-start text-foreground-muted/50 transition-colors hover:text-foreground"
                        >
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {lines.length > 0 && (
                <div className="border-t border-accent/10 px-6 py-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium tracking-[1px] uppercase text-foreground-muted">
                      Subtotal
                    </span>
                    <span className="font-serif text-[22px] font-light text-foreground">
                      &euro;{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <p className="mt-1 text-[14px] font-light tracking-[0.3px] text-foreground-muted/60">
                    {SHIPPING_LINE}
                  </p>
                  {error && <p className="mt-2 text-[15px] text-red-400">{error}</p>}
                  <button
                    onClick={handleCheckout}
                    disabled={loading}
                    className="mt-4 w-full rounded-lg bg-accent px-8 py-4 text-[12px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60"
                  >
                    {loading ? "Loading…" : "Checkout"}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {clientSecret && (
        <PreOrderModal
          clientSecret={clientSecret}
          collectionName={count === 1 ? lines[0]?.productName ?? "Your order" : `Your order · ${count} items`}
          price={subtotal}
          onClose={() => setClientSecret(null)}
        />
      )}
    </>
  );
}
