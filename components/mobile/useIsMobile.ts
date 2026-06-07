"use client";

import { useEffect, useState } from "react";

// Returns null until mounted (avoids SSR/hydration mismatch), then a boolean.
// Mobile = viewport narrower than the desktop breakpoint (matches Tailwind `md`).
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}
