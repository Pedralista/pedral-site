"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";

// A completed checkout session means whatever was in the bag has been
// bought — safe to clear even for a single-item purchase made directly from
// a product page, since the bag was never touched by that flow anyway.
export default function ClearCartOnSuccess() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
