"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroller() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => 1 - Math.pow(2, -6 * t),
      wheelMultiplier: 0.5,
      touchMultiplier: 1.2,
    });

    function raf(time: DOMHighResTimeStamp) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length && value !== undefined ? lenis.scrollTo(value) : lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.body.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => {
      // No lenis.update() needed; Lenis does not have an update method
    });
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.removeEventListener("refresh", () => {
        // No lenis.update() needed; Lenis does not have an update method
      });
      lenis.destroy();
    };
  }, []);

  return null;
}
