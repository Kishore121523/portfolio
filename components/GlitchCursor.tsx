"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function GlitchCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const inner = innerRef.current;
    if (!cursor || !inner) return;

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
        overwrite: true,
      });
    };

    // Circle with periodic glitch
    const jitterTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    jitterTl
      .to(inner, {
        skewX: 12,
        scaleX: 1.15,
        boxShadow: "2px 0 rgba(255,0,60,0.2), -2px 0 rgba(0,240,255,0.2)",
        borderColor: "rgba(255, 0, 60, 0.2)",
        background: "rgba(255, 0, 60, 0.04)",
        duration: 0.05,
        ease: "steps(1)",
      })
      .to(inner, {
        skewX: -8,
        scaleX: 0.85,
        scaleY: 1.1,
        boxShadow: "-2px 0 rgba(0,240,255,0.2), 2px 0 rgba(255,0,60,0.2)",
        borderColor: "rgba(0, 240, 255, 0.18)",
        background: "rgba(0, 240, 255, 0.03)",
        duration: 0.05,
        ease: "steps(1)",
      })
      .to(inner, {
        skewX: 0,
        scaleX: 1,
        scaleY: 1,
        boxShadow: "none",
        borderColor: "rgba(255, 255, 255, 0.5)",
        background: "rgba(255, 255, 255, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      jitterTl.kill();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[9999]"
      style={{ willChange: "transform" }}
    >
      <div
        ref={innerRef}
        className="w-5 h-5 rounded-full border border-white/50 bg-white/10"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
