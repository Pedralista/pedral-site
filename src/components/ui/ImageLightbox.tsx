"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Full-screen viewer for a product gallery (Kevin, 2026-11-16: "enlarge the
// pictures"). Tap/click a gallery tile to open; arrows, swipe or the
// keyboard move between shots; Esc, ✕, a tap anywhere else or a swipe down closes.
// Pinch-zoom on phones is left to the browser.
export default function ImageLightbox({
  images,
  index,
  alt,
  onClose,
  onIndex,
}: {
  images: string[];
  index: number | null;
  alt: string;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const open = index !== null;
  const touchX = useRef<number | null>(null);
  const touchY = useRef<number | null>(null);

  const go = (step: number) => {
    if (index === null) return;
    onIndex((index + step + images.length) % images.length);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#040607]"
          role="dialog"
          aria-modal="true"
          aria-label={`${alt} — image ${index + 1} of ${images.length}`}
          onClick={onClose}
          onTouchStart={(e) => {
            if (e.touches.length !== 1) return;
            touchX.current = e.touches[0].clientX;
            touchY.current = e.touches[0].clientY;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null || touchY.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            const dy = e.changedTouches[0].clientY - touchY.current;
            touchX.current = touchY.current = null;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
            else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
          }}
        >
          <div className="relative h-full w-full">
            <Image
              key={images[index]}
              src={images[index]}
              alt={`${alt} ${index + 1}`}
              fill
              sizes="100vw"
              quality={90}
              className="object-contain"
              priority
            />
          </div>

          <button
            type="button"
            aria-label="Close"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-[22px] leading-none text-white/90 transition-colors hover:bg-black/80 sm:right-6 sm:top-6"
          >
            ✕
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  go(-1);
                }}
                className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-[26px] leading-none text-white/90 transition-colors hover:bg-black/80 sm:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  go(1);
                }}
                className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-[26px] leading-none text-white/90 transition-colors hover:bg-black/80 sm:right-6"
              >
                ›
              </button>
              <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[13px] tracking-[0.2em] text-white/60">
                {index + 1} / {images.length}
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
