"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ExitIntentModal() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const triggered = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("exit-intent-shown")) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (triggered.current) return;
      if (e.clientY <= 0) {
        triggered.current = true;
        sessionStorage.setItem("exit-intent-shown", "1");
        // Small delay so it doesn't feel instant
        setTimeout(() => setVisible(true), 200);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setStatus(data.success || data.alreadySubscribed ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setVisible(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 -translate-y-1/2 border border-accent/20 bg-background p-10 shadow-2xl"
          >
            <button
              onClick={() => setVisible(false)}
              className="absolute right-4 top-4 text-foreground-muted/40 hover:text-foreground-muted transition-colors text-[18px] leading-none"
            >
              ×
            </button>

            {status === "success" ? (
              <div className="text-center">
                <p className="font-serif text-[22px] font-light text-foreground">You&apos;re on the list.</p>
                <p className="mt-3 text-[13px] font-light leading-[1.8] text-foreground-muted">
                  New editions are notified here first — before any public announcement.
                </p>
                <button
                  onClick={() => setVisible(false)}
                  className="mt-6 text-[11px] tracking-[2px] uppercase text-accent hover:text-accent-hover transition-colors"
                >
                  Continue browsing
                </button>
              </div>
            ) : (
              <>
                <p className="text-[11px] tracking-[3px] uppercase text-accent mb-4">Before you go</p>
                <p className="font-serif text-[24px] font-light leading-[1.3] text-foreground">
                  New editions sell out in hours.
                </p>
                <p className="mt-3 text-[13px] font-light leading-[1.8] text-foreground-muted">
                  Collectors on the list are notified first — before Instagram, before the public. No noise in between.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full border border-accent/15 bg-white/[0.04] px-5 py-3.5 text-sm font-light text-foreground outline-none placeholder:text-foreground-muted/50 sm:flex-1 sm:border-r-0"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full border border-accent bg-accent px-6 py-3.5 text-[11px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto"
                  >
                    {status === "loading" ? "..." : "Get Access"}
                  </button>
                </form>
                {status === "error" && (
                  <p className="mt-2 text-[11px] text-red-400">Something went wrong. Please try again.</p>
                )}
                <button
                  onClick={() => setVisible(false)}
                  className="mt-4 text-[11px] tracking-[1px] text-foreground-muted/40 hover:text-foreground-muted/70 transition-colors"
                >
                  No thanks
                </button>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
