"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroIntroText() {
  const introRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#hero-section",
            start: "top top",
            end: "+=150%",
            scrub: true,
          },
        });

        // Animate intro later in the scroll sequence (e.g., 80% in)
        tl.fromTo(
          introRef.current,
          {
            y: "60%",
            opacity: 0,
          },
          {
            y: "-50%",
            opacity: 1,
            duration: 1.8,
            ease: "power3.inOut",
          },
          4 // <-- this places the animation at 80% of the timeline duration
        );
      }, introRef);

      return () => ctx.revert();
    }, []);

  return (
    <div
  ref={introRef}
  className="absolute top-1/2 w-full flex flex-col items-center justify-center text-white text-center pointer-events-none z-5 opacity-0 -translate-y-1/2 px-4"
>
  {/* Subtle Greeting */}
  <p className="text-lg sm:text-xl text-white/70 mb-2 tracking-wide">Hi, I am</p>

  {/* Name - Main focal point */}
  <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-amber-100 mb-6">Kishore</h1>

  {/* Tagline or Subtext */}
  <p className="text-base sm:text-lg md:text-xl max-w-3xl text-white/90 leading-relaxed">
    Developer and Designer with solid experience building full-stack web applications using React, Next.js, Node.js, Firebase, and cloud platforms like Azure and AWS.
    <br /><br />
    Masters graduate with hands-on exposure to production systems and AI-driven tooling. My current focus is on building GenAI applications by integrating Azure OpenAI, LangChain-style pipelines, vector databases, and Neo4j knowledge graphs to deliver smart, scalable solutions that elevate user experience.
  </p>
</div>

  );
}
