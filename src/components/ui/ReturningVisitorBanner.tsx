"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useVisitCount } from "@/lib/useVisitCount";

const DISMISS_FLAG = "pedral-returning-banner-dismissed";

function copyFor(count: number): { text: string; cta: string; href: string } | null {
  if (count === 2) {
    return {
      text: "Welcome back. Still deciding? Our size guide and FAQ answer the questions collectors ask most.",
      cta: "Read the FAQ",
      href: "/faq",
    };
  }
  if (count === 3) {
    return {
      text: "You've been here before — each edition is produced in limited numbers and doesn't return once sold out.",
      cta: "View collections",
      href: "/collections",
    };
  }
  if (count >= 4) {
    return {
      text: "Have a question before you order? We reply personally, usually within a day.",
      cta: "Contact us",
      href: "/contact",
    };
  }
  return null;
}

export default function ReturningVisitorBanner() {
  const visitCount = useVisitCount();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_FLAG)) return;
    if (copyFor(visitCount)) {
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [visitCount]);

  function dismiss() {
    sessionStorage.setItem(DISMISS_FLAG, "1");
    setVisible(false);
  }

  const copy = copyFor(visitCount);

  return (
    <AnimatePresence>
      {visible && copy && (
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-accent/[0.12] bg-[rgba(10,18,20,0.97)] backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-4 px-6 py-3 text-center md:px-12">
            <p className="text-[13px] font-light leading-snug text-foreground-muted">
              {copy.text}{" "}
              <Link
                href={copy.href}
                onClick={dismiss}
                className="text-accent underline underline-offset-2 hover:text-accent-hover"
              >
                {copy.cta}
              </Link>
            </p>
            <button
              onClick={dismiss}
              className="shrink-0 text-foreground-muted/40 hover:text-foreground-muted transition-colors text-[16px] leading-none"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
