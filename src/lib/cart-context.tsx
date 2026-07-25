"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";

export interface CartLineAddOns {
  strapSlug?: string;
  strapName?: string;
  strapPrice?: number;
  engravingText?: string;
  engravingPrice?: number;
}

export interface CartLine {
  id: string;
  slug: string;
  productName: string;
  variantName?: string;
  priceId: string;
  unitPrice: number;
  image?: string;
  quantity: number;
  nonRefundable?: boolean;
  addOns?: CartLineAddOns;
}

const STORAGE_KEY = "pedral-cart-v1";
const EMPTY_LINES: CartLine[] = [];

// ── External store: the cart lives in localStorage, a system outside React,
// so it's synced via useSyncExternalStore rather than useState+useEffect —
// that avoids both the "setState during an effect" anti-pattern and any
// SSR/client hydration mismatch (getServerSnapshot always returns the same
// empty array reference the server rendered with).
let cartLines: CartLine[] = EMPTY_LINES;
let storeInitialized = false;
type Listener = () => void;
let listeners: Listener[] = [];

function ensureInitialized(): void {
  if (storeInitialized || typeof window === "undefined") return;
  storeInitialized = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) cartLines = JSON.parse(raw);
  } catch {
    // Corrupt or blocked storage — cart just starts empty.
  }
}

function setCartLines(next: CartLine[]): void {
  cartLines = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage full/blocked — cart still works for the rest of this session.
  }
  for (const listener of listeners) listener();
}

function subscribe(listener: Listener): () => void {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}

function getSnapshot(): CartLine[] {
  ensureInitialized();
  return cartLines;
}

function getServerSnapshot(): CartLine[] {
  return EMPTY_LINES;
}

// Two cart lines are "the same" (and should merge quantities) only when
// product, variant, and add-ons all match exactly — a different strap or
// engraving text is a genuinely different purchase, not a quantity bump.
function buildLineId(line: { slug: string; variantName?: string; addOns?: CartLineAddOns }): string {
  return [
    line.slug,
    line.variantName ?? "",
    line.addOns?.strapSlug ?? "",
    line.addOns?.engravingText ?? "",
  ].join("::");
}

interface CartContextValue {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addLine: (line: Omit<CartLine, "id" | "quantity"> & { quantity?: number }) => void;
  removeLine: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);

  const addLine = useCallback((line: Omit<CartLine, "id" | "quantity"> & { quantity?: number }) => {
    const id = buildLineId(line);
    const qty = line.quantity ?? 1;
    const existing = cartLines.find((l) => l.id === id);
    const next = existing
      ? cartLines.map((l) => (l.id === id ? { ...l, quantity: l.quantity + qty } : l))
      : [...cartLines, { ...line, id, quantity: qty }];
    setCartLines(next);
    setIsOpen(true);
  }, []);

  const removeLine = useCallback((id: string) => {
    setCartLines(cartLines.filter((l) => l.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setCartLines(
      quantity <= 0
        ? cartLines.filter((l) => l.id !== id)
        : cartLines.map((l) => (l.id === id ? { ...l, quantity } : l))
    );
  }, []);

  const clearCart = useCallback(() => setCartLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const count = useMemo(() => lines.reduce((sum, l) => sum + l.quantity, 0), [lines]);
  const subtotal = useMemo(
    () =>
      lines.reduce(
        (sum, l) =>
          sum + (l.unitPrice + (l.addOns?.strapPrice ?? 0) + (l.addOns?.engravingPrice ?? 0)) * l.quantity,
        0
      ),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart,
    closeCart,
    addLine,
    removeLine,
    setQuantity,
    clearCart,
    count,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
