"use client";

import { useEffect, useState } from "react";
import { Monitor, X } from "lucide-react";

export default function MobileDesktopHint() {
  const [show, setShow] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Show shortly after the loader clears — every page load.
    const t = setTimeout(() => setShow(true), 3200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!show) return;
    const r = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(r);
  }, [show]);

  const dismiss = () => {
    setEntered(false);
    setTimeout(() => setShow(false), 350);
  };

  if (!show) return null;

  return (
    <div
      className={`fixed top-[4.5rem] left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm transition-all duration-300 ease-out ${
        entered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
    >
      <div className="flex items-center gap-3 rounded-2xl border border-white/[0.1] bg-background/90 backdrop-blur-xl px-4 py-3 shadow-lg shadow-black/40">
        <span className="w-9 h-9 rounded-xl bg-emerald-400/10 flex items-center justify-center flex-shrink-0">
          <Monitor className="w-4 h-4 text-emerald-400/80" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-foreground/90 text-[13px] font-medium leading-tight">
            Best viewed on desktop
          </p>
          <p className="text-foreground/40 text-[11px] leading-tight mt-0.5">
            The full experience has interactive animations.
          </p>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="w-7 h-7 rounded-lg flex items-center justify-center text-foreground/40 active:bg-white/[0.06] transition-colors focus:outline-none flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
