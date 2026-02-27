"use client";

import { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PreOrderModalProps {
  clientSecret: string;
  collectionName: string;
  depositAmount?: number;
  price?: number;
  isPreOrder?: boolean;
  onClose: () => void;
}

export default function PreOrderModal({
  clientSecret,
  collectionName,
  depositAmount,
  price,
  isPreOrder = true,
  onClose,
}: PreOrderModalProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-[560px] mx-0 sm:mx-4 max-h-[92vh] overflow-y-auto rounded-t-[6px] sm:rounded-[4px] bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-5 py-4">
          <div>
            <p className="text-[10px] font-medium tracking-[2px] uppercase text-gray-400">
              {isPreOrder ? "Reserve your place" : "Complete your order"}
            </p>
            <p className="text-[14px] font-medium text-gray-800">
              {collectionName} — {isPreOrder ? `€${depositAmount} deposit` : `€${price?.toLocaleString()}`}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Stripe Embedded Checkout */}
        <div className="p-2">
          <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </div>
  );
}
