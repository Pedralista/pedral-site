"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("pedral-cookies");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("pedral-cookies", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("pedral-cookies", "declined");
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-accent/[0.08] bg-[rgba(10,18,20,0.97)] backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-6 py-5 sm:flex-row sm:justify-between md:px-12">
            <p className="text-[13px] font-light text-foreground-muted">
              We use essential cookies to make this site work. Analytics cookies are optional.{" "}
              <Link href="/cookies" className="text-accent underline underline-offset-2 hover:text-accent-hover">
                Learn more
              </Link>
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={decline}
                className="rounded-[2px] border border-accent/20 px-5 py-2 text-[10px] font-medium tracking-[2px] uppercase text-foreground-muted transition-colors hover:border-accent/40 hover:text-foreground cursor-pointer"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="rounded-[2px] bg-accent px-5 py-2 text-[10px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover cursor-pointer"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
