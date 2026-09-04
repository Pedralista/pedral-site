"use client";

import { useEffect, useState } from "react";
import { useCookieConsent } from "./useCookieConsent";

const STORAGE_KEY = "pedral-visits";
const SESSION_FLAG = "pedral-visit-counted";

/**
 * Counts distinct visits (browser sessions) across time, gated on cookie
 * consent since it identifies a returning visitor the same way an
 * analytics cookie would. Increments at most once per sessionStorage
 * lifetime so refreshes/SPA navigation within one visit don't inflate it.
 */
export function useVisitCount(): number {
  const consented = useCookieConsent();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!consented) return;

    const stored = Number(localStorage.getItem(STORAGE_KEY) ?? "0");

    if (sessionStorage.getItem(SESSION_FLAG)) {
      const id = setTimeout(() => setCount(stored), 0);
      return () => clearTimeout(id);
    }

    const next = stored + 1;
    localStorage.setItem(STORAGE_KEY, String(next));
    sessionStorage.setItem(SESSION_FLAG, "1");
    const id = setTimeout(() => setCount(next), 0);
    return () => clearTimeout(id);
  }, [consented]);

  return count;
}
