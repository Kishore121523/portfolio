"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";

const HERO_IMAGES = ["/forestDark.png", "/left.svg", "/center.svg", "/right.svg"];
const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01アイウエオカキクケコ";
const MIN_DISPLAY_MS = 2800;

// "you really decoded this huh" in hex
const EASTER_EGG = "79 6f 75 20 72 65 61 6c 6c 79 20 64 65 63 6f 64 65 64 20 74 68 69 73 20 68 75 68";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<SVGSVGElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const [removed, setRemoved] = useState(false);
  const imagesLoaded = useRef(false);
  const minTimePassed = useRef(false);

  const tryExit = useCallback(() => {
    if (!imagesLoaded.current || !minTimePassed.current || !loaderRef.current) return;

    gsap.to(loaderRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => setRemoved(true),
    });
  }, []);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const total = HERO_IMAGES.length;

    const onLoad = () => {
      loaded++;
      if (loaded >= total) {
        imagesLoaded.current = true;
        tryExit();
      }
    };

    HERO_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = src;
    });

    setTimeout(() => {
      minTimePassed.current = true;
      tryExit();
    }, MIN_DISPLAY_MS);
  }, [tryExit]);

  // Scramble top text + glitch text-shadow on individual chars
  useEffect(() => {
    if (!topTextRef.current) return;

    const interval = setInterval(() => {
      const chars = topTextRef.current?.querySelectorAll(".glitch-char") as NodeListOf<HTMLSpanElement>;
      if (!chars) return;

      chars.forEach((c) => {
        c.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];

        // Random chance for a char to glitch with chromatic split
        if (Math.random() < 0.15) {
          c.style.textShadow = "-2px 0 rgba(255,0,50,0.8), 2px 0 rgba(0,200,255,0.8)";
          c.style.transform = `translateX(${Math.random() > 0.5 ? 2 : -2}px)`;
          setTimeout(() => {
            c.style.textShadow = "none";
            c.style.transform = "none";
          }, 60);
        }
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Aggressive glitch on spinner
  useEffect(() => {
    if (!spinnerRef.current) return;
    const el = spinnerRef.current;

    const tl = gsap.timeline({ repeat: -1 });
    // Short calm
    tl.to(el, { duration: 0.4 });
    // Glitch burst 1
    tl.to(el, {
      keyframes: [
        { filter: "drop-shadow(-6px 0 rgba(255,0,50,0.9)) drop-shadow(6px 0 rgba(0,200,255,0.9))", x: 5, duration: 0.04 },
        { filter: "drop-shadow(8px 0 rgba(255,0,50,1)) drop-shadow(-8px 0 rgba(0,200,255,1))", x: -6, duration: 0.04 },
        { filter: "none", x: 0, duration: 0.03 },
      ],
      ease: "none",
    });
    // Brief calm
    tl.to(el, { duration: 0.3 });
    // Glitch burst 2
    tl.to(el, {
      keyframes: [
        { filter: "drop-shadow(-4px 0 rgba(255,0,50,0.7)) drop-shadow(4px 0 rgba(0,200,255,0.7))", x: -3, duration: 0.03 },
        { filter: "drop-shadow(5px 0 rgba(255,0,50,0.8)) drop-shadow(-5px 0 rgba(0,200,255,0.8))", x: 4, duration: 0.04 },
        { filter: "none", x: 0, duration: 0.04 },
        { filter: "drop-shadow(-7px 0 rgba(255,0,50,1)) drop-shadow(7px 0 rgba(0,200,255,1))", x: -5, duration: 0.03 },
        { filter: "none", x: 0, duration: 0.05 },
      ],
      ease: "none",
    });
    // Calm
    tl.to(el, { duration: 0.6 });
    // Glitch burst 3 — intense
    tl.to(el, {
      keyframes: [
        { filter: "drop-shadow(-10px 0 rgba(255,0,50,1)) drop-shadow(10px 0 rgba(0,200,255,1))", x: 8, y: -2, duration: 0.03 },
        { filter: "drop-shadow(8px 0 rgba(255,0,50,0.9)) drop-shadow(-8px 0 rgba(0,200,255,0.9))", x: -6, y: 2, duration: 0.04 },
        { filter: "none", x: 0, y: 0, duration: 0.03 },
        { filter: "drop-shadow(-5px 0 rgba(255,0,50,0.6)) drop-shadow(5px 0 rgba(0,200,255,0.6))", x: 3, duration: 0.03 },
        { filter: "none", x: 0, duration: 0.06 },
      ],
      ease: "none",
    });

    return () => { tl.kill(); };
  }, []);

  if (removed) return null;

  const charCount = 24;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center gap-8"
    >
      {/* Scrambling glitch text above */}
      <div
        ref={topTextRef}
        className="flex gap-[3px] font-mono text-lg tracking-widest"
      >
        {Array.from({ length: charCount }).map((_, i) => (
          <span
            key={i}
            className="glitch-char inline-block text-emerald-400/40 transition-transform duration-75"
          >
            0
          </span>
        ))}
      </div>

      {/* Big circular spinner */}
      <svg
        ref={spinnerRef}
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        className="animate-spin"
        style={{ animationDuration: "1s" }}
      >
        {/* Outer faint ring */}
        <circle
          cx="60" cy="60" r="54"
          stroke="rgba(255,251,235,0.04)"
          strokeWidth="1"
          fill="none"
        />
        {/* Main track */}
        <circle
          cx="60" cy="60" r="46"
          stroke="rgba(255,251,235,0.06)"
          strokeWidth="3"
          fill="none"
        />
        {/* Emerald arc — primary */}
        <path
          d="M60 14 a46 46 0 0 1 46 46"
          stroke="rgba(16,185,129,0.6)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        {/* Red ghost arc — chromatic offset */}
        <path
          d="M60 14 a46 46 0 0 1 46 46"
          stroke="rgba(255,0,50,0.2)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          transform="translate(-4, 0)"
        />
        {/* Cyan ghost arc — chromatic offset */}
        <path
          d="M60 14 a46 46 0 0 1 46 46"
          stroke="rgba(0,200,255,0.2)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          transform="translate(4, 0)"
        />
        {/* Inner decorative ring */}
        <circle
          cx="60" cy="60" r="38"
          stroke="rgba(255,251,235,0.03)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="4 8"
        />
      </svg>

      {/* Easter egg binary below */}
      <p className="font-mono text-[11px] tracking-[0.3em] text-white/20">
        {EASTER_EGG}
      </p>
    </div>
  );
}
