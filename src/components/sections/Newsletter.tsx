"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface NewsletterProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function Newsletter({
  title = "Join 1,200+ collectors who see new editions first.",
  subtitle = "Priority access. No spam. Just watches — and they sell out fast.",
  buttonText = "Get Priority Access",
}: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "exists" | "error">("idle");

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

      if (data.success) {
        setStatus("success");
        setEmail("");
      } else if (data.alreadySubscribed) {
        setStatus("exists");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="border-t border-accent/[0.06] bg-background py-14 md:py-20 lg:py-[80px]">
      <div className="mx-auto max-w-[520px] px-6 text-center md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="font-serif text-[24px] font-light text-foreground">
            {title}
          </h2>
          <p className="mt-2 text-[14px] font-light text-foreground-muted">
            {subtitle}
          </p>

          {status === "success" ? (
            <p className="mt-7 text-[14px] font-light text-accent">
              You&apos;re on the list. We&apos;ll be in touch before the next edition drops.
            </p>
          ) : status === "exists" ? (
            <p className="mt-7 text-[14px] font-light text-foreground-muted">
              You&apos;re already subscribed.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto mt-7 flex max-w-[420px] flex-col gap-3 sm:flex-row sm:gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="w-full rounded-[2px] border border-accent/15 bg-white/[0.04] px-5 py-3.5 text-sm font-light text-foreground outline-none placeholder:text-foreground-muted/50 sm:flex-1 sm:rounded-none sm:border-r-0"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full rounded-[2px] border border-accent bg-accent px-7 py-3.5 text-[12px] font-medium tracking-[2px] uppercase text-background transition-colors hover:bg-accent-hover disabled:opacity-60 sm:w-auto sm:rounded-none sm:text-[11px] sm:tracking-[2.5px]"
              >
                {status === "loading" ? "..." : buttonText}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="mt-3 text-[12px] font-light text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
