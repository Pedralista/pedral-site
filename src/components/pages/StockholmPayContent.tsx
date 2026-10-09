"use client";

import { useState } from "react";
import Link from "next/link";

type Locale = "en" | "sv";

const ITEMS = {
  artefact: { label: { en: "Artefact", sv: "Artefact" }, amountSek: 5500 },
  okapiQuartz: { label: { en: "Okapi — Quartz", sv: "Okapi — Kvarts" }, amountSek: 2500 },
} as const;

// Both together is a flat discounted bundle, not the sum of the two.
const BUNDLE_AMOUNT_SEK = 7000;

type ItemKey = keyof typeof ITEMS;

const content = {
  en: {
    langSwitchHref: "/stockholm-time/pay/sv",
    langSwitchLabel: "Svenska",
    eyebrow: "Pedral · Stockholm Time 2026",
    title: "Pay at the Table",
    total: "Total",
    payNow: "Pay Now",
    redirecting: "Redirecting…",
    error: "Something went wrong — try again, or take payment another way.",
    footer: "Swish payment via Stripe. Confirm the watch is in hand before paying.",
  },
  sv: {
    langSwitchHref: "/stockholm-time/pay",
    langSwitchLabel: "English",
    eyebrow: "Pedral · Stockholm Time 2026",
    title: "Betala vid Bordet",
    total: "Totalt",
    payNow: "Betala Nu",
    redirecting: "Omdirigerar…",
    error: "Något gick fel — försök igen, eller ta betalt på annat sätt.",
    footer: "Swish-betalning via Stripe. Bekräfta att klockan är i handen innan betalning.",
  },
} as const;

export default function StockholmPayContent({ locale = "en" }: { locale?: Locale }) {
  const t = content[locale];
  const [selected, setSelected] = useState<Set<ItemKey>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const total =
    selected.size === 2
      ? BUNDLE_AMOUNT_SEK
      : [...selected].reduce((sum, key) => sum + ITEMS[key].amountSek, 0);

  function toggle(key: ItemKey) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  async function handlePay() {
    if (selected.size === 0) return;
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/checkout-stockholm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [...selected] }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
      window.location.href = data.url;
    } catch {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-20">
      <div className="w-full max-w-[420px]">
        <div className="mb-4 flex justify-end">
          <Link
            href={t.langSwitchHref}
            className="text-[11px] font-medium tracking-[1.5px] uppercase text-foreground-muted/60 transition-colors hover:text-accent"
          >
            {t.langSwitchLabel}
          </Link>
        </div>
        <p className="mb-1 text-center text-[11px] font-normal tracking-[3px] uppercase text-accent/70">
          {t.eyebrow}
        </p>
        <h1 className="text-center font-serif text-[28px] font-light text-foreground">
          {t.title}
        </h1>

        <div className="mt-8 flex flex-col gap-3">
          {(Object.keys(ITEMS) as ItemKey[]).map((key) => {
            const item = ITEMS[key];
            const checked = selected.has(key);
            return (
              <button
                key={key}
                type="button"
                onClick={() => toggle(key)}
                className={`flex items-center justify-between rounded-lg border px-5 py-4 text-left transition-colors ${
                  checked ? "border-accent bg-accent/10" : "border-accent/20 bg-background-alt hover:border-accent/40"
                }`}
              >
                <span className="text-[16px] font-light text-foreground">{item.label[locale]}</span>
                <span className="text-[15px] font-light text-foreground-muted">
                  {item.amountSek.toLocaleString()} SEK
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-accent/15 pt-5">
          <span className="text-[13px] font-light uppercase tracking-[1px] text-foreground-muted/70">{t.total}</span>
          <span className="font-serif text-2xl font-light text-foreground">
            {total.toLocaleString()} SEK
          </span>
        </div>

        <button
          type="button"
          onClick={handlePay}
          disabled={selected.size === 0 || loading}
          className="mt-6 w-full rounded-lg bg-accent px-8 py-4 text-center text-[11px] font-medium tracking-[2.5px] uppercase text-background transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? t.redirecting : t.payNow}
        </button>

        {error && <p className="mt-4 text-center text-[13px] font-light text-accent-secondary">{t.error}</p>}

        <p className="mt-6 text-center text-[13px] font-light leading-[1.7] text-foreground-muted/60">
          {t.footer}
        </p>
      </div>
    </section>
  );
}
