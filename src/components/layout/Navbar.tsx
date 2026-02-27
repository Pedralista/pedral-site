"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const leftLinks = [
  { href: "/collections", label: "Collection" },
  { href: "/story", label: "Story" },
  { href: "/contact", label: "Contact" },
];

const rightLinks = [
  { href: "/journal", label: "The Rounded Square" },
  { href: "https://www.instagram.com/pedralwatches", label: "Instagram", external: true },
  { href: "/account", label: "My Account" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(10,18,20,0.95)] backdrop-blur-md shadow-[0_1px_0_rgba(201,168,76,0.08)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-6 sm:py-4 md:px-12">
          {/* Left links (desktop) */}
          <div className="hidden items-center gap-8 md:flex">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[11px] font-normal tracking-[2.5px] uppercase text-foreground-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Spacer on mobile */}
          <div className="md:hidden" />

          {/* Center Logo */}
          <Link href="/" className="relative z-10 justify-self-center">
            <Image
              src="/logo.png"
              alt="Pedral"
              width={420}
              height={56}
              className="h-[22px] w-auto invert md:h-[26px]"
              priority
            />
          </Link>

          {/* Right links (desktop) + mobile toggle */}
          <div className="flex items-center justify-end gap-8">
            <div className="hidden items-center gap-8 md:flex">
              {rightLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-normal tracking-[2.5px] uppercase text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[11px] font-normal tracking-[2.5px] uppercase text-foreground-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-foreground"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block h-px w-6 bg-foreground"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                className="block h-px w-6 bg-foreground"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background"
          >
            <nav className="flex flex-col items-center gap-8">
              {[...leftLinks, ...rightLinks].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-4xl font-light tracking-[0.1em] text-foreground"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-serif text-4xl font-light tracking-[0.1em] text-foreground"
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
