"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

export default function Footer() {
  return (
    <footer className="border-t border-accent/[0.06] bg-background">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeInUp}
        className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-20"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Pedral"
              width={420}
              height={56}
              className="h-[22px] w-auto invert md:h-[28px]"
            />
          </Link>
        </div>

        <p className="mt-4 text-center text-xs font-light text-foreground-muted">
          Designed in Stockholm. Limited by conviction.
        </p>

        {/* Navigation links */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4 sm:gap-7">
          <Link
            href="/collections"
            className="text-[12px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Collection
          </Link>
          <Link
            href="/story"
            className="text-[12px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Story
          </Link>
          <a
            href="https://shop.pedral.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Shop
          </a>
          <Link
            href="/journal"
            className="text-[12px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            The Rounded Square
          </Link>
          <Link
            href="/contact"
            className="text-[12px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Contact
          </Link>
          <Link
            href="/account"
            className="text-[12px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            My Account
          </Link>
          <a
            href="https://www.instagram.com/pedralwatches"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-normal tracking-[1.5px] uppercase text-foreground-muted transition-colors hover:text-accent"
          >
            Instagram
          </a>
        </div>

        {/* Legal links */}
        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-3 sm:gap-7">
          <Link
            href="/privacy"
            className="text-[11px] font-normal tracking-[1px] uppercase text-foreground-muted/60 transition-colors hover:text-accent"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-[11px] font-normal tracking-[1px] uppercase text-foreground-muted/60 transition-colors hover:text-accent"
          >
            Terms
          </Link>
          <Link
            href="/shipping"
            className="text-[11px] font-normal tracking-[1px] uppercase text-foreground-muted/60 transition-colors hover:text-accent"
          >
            Shipping
          </Link>
          <Link
            href="/cookies"
            className="text-[11px] font-normal tracking-[1px] uppercase text-foreground-muted/60 transition-colors hover:text-accent"
          >
            Cookies
          </Link>
          <Link
            href="/withdrawal"
            className="text-[11px] font-normal tracking-[1px] uppercase text-foreground-muted/60 transition-colors hover:text-accent"
          >
            Withdrawal
          </Link>
        </div>

        {/* Payment icons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {/* Visa */}
          <svg className="h-8 w-auto" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="47" height="31" rx="3.5" fill="#1A1F71" stroke="rgba(255,255,255,0.15)" />
            <path d="M19.5 21H17L18.75 11H21.25L19.5 21ZM15.5 11L13.1 18.1L12.8 16.6L11.9 12C11.9 12 11.8 11 10.5 11H6.1L6 11.2C6 11.2 7.5 11.5 9.2 12.5L11.4 21H14L18 11H15.5ZM35 21H37.5L35.3 11H33.3C32.2 11 31.9 11.8 31.9 11.8L28 21H30.5L31 19.6H34.1L35 21ZM31.8 17.6L33.2 13.8L34 17.6H31.8ZM29 13.5L29.4 11.3C29.4 11.3 28.1 10.8 26.7 10.8C25.2 10.8 21.7 11.5 21.7 14.5C21.7 17.3 25.7 17.3 25.7 18.8C25.7 20.3 22.2 20 21 19.1L20.6 21.4C20.6 21.4 21.9 22 23.9 22C25.9 22 29 20.9 29 18.1C29 15.2 25 14.9 25 13.7C25 12.5 27.8 12.6 29 13.5Z" fill="white" />
          </svg>
          {/* Mastercard */}
          <svg className="h-8 w-auto" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="47" height="31" rx="3.5" fill="#1A1A1A" stroke="rgba(255,255,255,0.15)" />
            <circle cx="19" cy="16" r="7" fill="#EB001B" />
            <circle cx="29" cy="16" r="7" fill="#F79E1B" />
            <path fillRule="evenodd" clipRule="evenodd" d="M24 10.536a7 7 0 0 1 0 10.928A7 7 0 0 1 24 10.536z" fill="#FF5F00" />
          </svg>
          {/* Amex */}
          <svg className="h-8 w-auto" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="47" height="31" rx="3.5" fill="#016FD0" stroke="rgba(255,255,255,0.15)" />
            <text x="24" y="21" fontFamily="Arial, sans-serif" fontSize="11" fontWeight="700" fill="white" textAnchor="middle" letterSpacing="1">AMEX</text>
          </svg>
          {/* Apple Pay */}
          <svg className="h-8 w-auto" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="47" height="31" rx="3.5" fill="#000000" stroke="rgba(255,255,255,0.15)" />
            <path d="M15.2 12.8C15.6 12.3 15.9 11.6 15.8 10.9C15.2 10.9 14.5 11.3 14.1 11.8C13.7 12.2 13.4 12.9 13.5 13.6C14.1 13.6 14.8 13.3 15.2 12.8ZM15.8 13.7C14.9 13.7 14.2 14.2 13.7 14.2C13.3 14.2 12.6 13.8 11.9 13.8C11 13.8 10.1 14.3 9.6 15.2C8.6 16.9 9.4 19.4 10.3 20.8C10.8 21.5 11.3 22.2 12 22.2C12.7 22.2 13 21.8 13.8 21.8C14.6 21.8 14.8 22.2 15.6 22.2C16.3 22.2 16.8 21.5 17.3 20.8C17.8 20 18 19.3 18 19.2C18 19.2 16.6 18.6 16.6 17.1C16.6 15.8 17.7 15.2 17.7 15.2C17.1 14.3 16.2 13.7 15.8 13.7Z" fill="white" />
            <path d="M22.4 11.5C24.5 11.5 26 13 26 15.1C26 17.2 24.5 18.7 22.3 18.7H20.4V22H18.8V11.5H22.4ZM20.4 17.3H22C23.5 17.3 24.4 16.4 24.4 15.1C24.4 13.8 23.5 12.9 22 12.9H20.4V17.3ZM29.3 22.1C28 22.1 27 21.4 27 20.3C27 19.2 27.8 18.6 29.5 18.5L31.3 18.4V17.9C31.3 17.1 30.7 16.6 29.8 16.6C29 16.6 28.4 17 28.3 17.6H26.8C26.9 16.3 28 15.3 29.8 15.3C31.7 15.3 32.8 16.3 32.8 17.8V22H31.4V20.9H31.3C30.9 21.7 30.2 22.1 29.3 22.1ZM29.7 21C30.6 21 31.3 20.4 31.3 19.6V19.1L29.7 19.2C28.9 19.3 28.5 19.6 28.5 20.1C28.5 20.6 29 21 29.7 21ZM35.5 23.8C35.3 23.8 34.9 23.8 34.7 23.7V22.4C34.9 22.4 35.2 22.5 35.4 22.5C36.1 22.5 36.5 22.2 36.7 21.5L36.8 21.2L34 15.4H35.7L37.6 20L39.5 15.4H41.1L38.2 22C37.6 23.3 36.9 23.8 35.5 23.8Z" fill="white" />
          </svg>
          {/* Google Pay */}
          <svg className="h-8 w-auto" viewBox="0 0 70 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="69" height="31" rx="5.5" fill="white" stroke="rgba(0,0,0,0.10)" />
            {/* Google G — 4 colored pie sectors, center (14,16), r=8 */}
            <path d="M14 16 L20.13 21.14 A8 8 0 0 1 8.34 21.66 Z" fill="#4285F4" />
            <path d="M14 16 L8.34 21.66 A8 8 0 0 1 8.86 9.87 Z" fill="#EA4335" />
            <path d="M14 16 L8.86 9.87 A8 8 0 0 1 16.74 8.48 Z" fill="#FBBC05" />
            <path d="M14 16 L16.74 8.48 A8 8 0 0 1 20.13 10.86 Z" fill="#34A853" />
            {/* G bar + white donut to create ring + open G shape */}
            <rect x="14" y="14.25" width="8" height="3.5" fill="#4285F4" />
            <circle cx="14" cy="16" r="4.5" fill="white" />
            <text x="30" y="21" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="500" fill="#3c4043">Pay</text>
          </svg>
          {/* Klarna */}
          <svg className="h-8 w-auto" viewBox="0 0 68 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="68" height="32" rx="4" fill="#FFB3C7"/>
            <text x="34" y="21" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="700" fill="#17120F" textAnchor="middle" letterSpacing="-0.3">klarna</text>
          </svg>
        </div>

        {/* Business details */}
        <div className="mt-8 border-t border-accent/[0.06] pt-6 text-center">
          <p className="text-[11px] font-light leading-relaxed tracking-[0.5px] text-foreground-muted/40">
            Pedral Design Studio AB &middot; Org.nr 559484-4275 &middot; VAT
            SE559484427501
          </p>
          <p className="mt-1 text-[11px] font-light tracking-[0.5px] text-foreground-muted/40">
            Sveavägen 117A, 113 49 Stockholm, Sweden &middot; &copy;{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
