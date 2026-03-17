"use client";

import { useRef, useLayoutEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  title: string;
  org: string;
  type: "work" | "cert" | "edu";
  year: string;
}

const timeline = [
  {
    year: "2025",
    entries: [
      { title: "Generative AI Engineer", org: "Wadhwani Foundation", type: "work" as const },
      { title: "AI Developer (Freelance)", org: "AI RoundTable Inc.", type: "work" as const },
      { title: "Gen AI Models for NLP", org: "IBM - Coursera", type: "cert" as const },
      { title: "Generative AI and LLMs", org: "IBM - Coursera", type: "cert" as const },
      { title: "AWS Cloud Practitioner", org: "Udemy", type: "cert" as const },
    ],
  },
  {
    year: "2024",
    entries: [
      { title: "React - Complete Guide", org: "Udemy", type: "cert" as const },
      { title: "Masters in Computer Science", org: "Lakehead University", type: "edu" as const },
      { title: "Google DevFest Hackathon", org: "Runner Up - Google", type: "edu" as const },
    ],
  },
  {
    year: "2023",
    entries: [
      { title: "Advanced Learning Algorithms", org: "Stanford Online", type: "cert" as const },
      { title: "Bachelors in Computer Science", org: "SASTRA University", type: "edu" as const },
      { title: "Node.js Developer Course", org: "Udemy", type: "cert" as const },
      { title: "Supervised Machine Learning", org: "Stanford Online", type: "cert" as const },
      { title: "Full-Stack Developer", org: "Accenture", type: "work" as const },
    ],
  },
  {
    year: "2022",
    entries: [
      { title: "Machine Learning OnRamp", org: "MathWorks", type: "cert" as const },
      { title: "MERN Stack Developer", org: "Trinal Web Pvt Limited", type: "work" as const },
    ],
  },
  {
    year: "2021",
    entries: [
      { title: "Rotational Internship", org: "Web Dev / Design / Frontend", type: "work" as const },
      { title: "Web Development Intern", org: "Sparks Foundation", type: "work" as const },
    ],
  },
  {
    year: "2020",
    entries: [
      { title: "Adobe XD - UI/UX Design", org: "Udemy", type: "cert" as const },
      { title: "JavaScript ES6 & CSS", org: "Udemy", type: "cert" as const },
      { title: "Bootstrap-4 with Projects", org: "Udemy", type: "cert" as const },
    ],
  },
];

const allEntries: TimelineEntry[] = timeline.flatMap((yb) =>
  yb.entries.map((e) => ({ ...e, year: yb.year }))
);

const typeBorders: Record<string, string> = {
  work: "border-amber-400/25",
  cert: "border-emerald-400/25",
  edu: "border-blue-400/25",
};

const typeAccents: Record<string, string> = {
  work: "text-amber-400/70",
  cert: "text-emerald-400/70",
  edu: "text-blue-400/70",
};

const typeLabels: Record<string, string> = {
  work: "Work",
  cert: "Cert",
  edu: "Education",
};

// Arc config — full 360° circle, evenly spaced
const ARC_RADIUS = 1000;
const TOTAL_CARDS = allEntries.length;
const CARD_ANGLE_GAP = 360 / TOTAL_CARDS; // 18° for 20 cards
const LAST_INDEX = TOTAL_CARDS - 1;

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=900%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Arc visible immediately
      gsap.set(arcRef.current, { opacity: 1 });

      // Cinematic staggered text reveal
      const wordThe = headingRef.current?.querySelector(".word-the") as HTMLElement;
      const originLetters = headingRef.current?.querySelectorAll(".origin-letter") as NodeListOf<HTMLElement>;
      const subtitleEl = headingRef.current?.querySelector(".origin-subtitle") as HTMLElement;

      if (wordThe && originLetters?.length && subtitleEl) {
        gsap.set(wordThe, { x: -80, opacity: 0 });
        gsap.set(originLetters, { y: 120, opacity: 0, rotateX: -90 });
        gsap.set(subtitleEl, { clipPath: "inset(0 100% 0 0)", opacity: 1 });

        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 20%",
            scrub: 0.4,
          },
        });

        revealTl.to(wordThe, {
          x: 0, opacity: 1, duration: 0.6, ease: "power3.out",
        }, 0);

        revealTl.to(originLetters, {
          y: 0, opacity: 1, rotateX: 0, duration: 0.8, stagger: 0.08, ease: "back.out(1.4)",
        }, 0.2);

        revealTl.to(subtitleEl, {
          clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power2.inOut",
        }, 0.8);
      }

      // Rotate the arc
      const totalRotation = (TOTAL_CARDS - 1) * CARD_ANGLE_GAP;

      tl.to(arcRef.current, {
        rotation: -totalRotation,
        duration: 10,
        ease: "none",
      }, 0);

      // Progress bar synced with rotation
      tl.fromTo(
        ".timeline-progress-fill",
        { scaleX: 0 },
        { scaleX: 1, duration: 10, ease: "none" },
        0
      );

      // Hold briefly after last card reaches center
      tl.to({}, { duration: 0.5 });

      // === Morph: last card grows into contact ===
      const morphLabel = "morphStart";
      tl.add(morphLabel);

      // Get all card wrappers and the last one
      const allCardWrappers = arcRef.current?.querySelectorAll(".timeline-card-wrapper") as NodeListOf<HTMLElement>;
      const lastCardWrapper = arcRef.current?.querySelector(".last-timeline-card") as HTMLElement;
      const lastCardInner = lastCardWrapper?.querySelector(".timeline-card-inner") as HTMLElement;

      if (allCardWrappers && lastCardWrapper && lastCardInner) {
        const timelineContent = lastCardInner.querySelector(".card-timeline-content") as HTMLElement;
        const morphIllustration = lastCardInner.querySelector(".morph-illustration") as HTMLElement;
        const contactContent = lastCardInner.querySelector(".contact-inner-content") as HTMLElement;

        // Fade out heading and progress bar
        tl.to([headingRef.current, ".timeline-progress-bar"], {
          opacity: 0, duration: 1, ease: "power2.in",
        }, morphLabel);

        // Fade out all cards EXCEPT the last one
        const otherCards = Array.from(allCardWrappers).filter((_, i) => i !== LAST_INDEX);
        tl.to(otherCards, {
          opacity: 0, duration: 1.2, ease: "power2.in",
        }, morphLabel);

        // Phase 1: Spider-Verse glitch effect on text elements
        if (timelineContent) {
          const scatterEls = timelineContent.querySelectorAll(".scatter-el") as NodeListOf<HTMLElement>;

          // Glitch keyframes — rapid jitter with chromatic split
          scatterEls.forEach((el, idx) => {
            const delay = idx * 0.05;
            const glitchTl = gsap.timeline();

            // Step 1: rapid position jitter + text-shadow chromatic aberration
            glitchTl.to(el, {
              keyframes: [
                { x: 4, y: -2, textShadow: "-3px 0 rgba(255,0,50,0.7), 3px 0 rgba(0,200,255,0.7)", duration: 0.06 },
                { x: -6, y: 3, textShadow: "4px 0 rgba(255,0,50,0.8), -4px 0 rgba(0,200,255,0.8)", duration: 0.06 },
                { x: 2, y: -1, textShadow: "-2px 0 rgba(255,0,50,0.5), 2px 0 rgba(0,200,255,0.5)", duration: 0.06 },
                { x: -8, y: 4, textShadow: "6px 0 rgba(255,0,50,0.9), -6px 0 rgba(0,200,255,0.9)", duration: 0.06 },
                { x: 0, y: 0, textShadow: "none", duration: 0.04 },
                { x: 5, y: -3, textShadow: "-5px 0 rgba(255,0,50,0.7), 5px 0 rgba(0,200,255,0.7)", duration: 0.06 },
                { x: -3, y: 2, textShadow: "3px 0 rgba(255,0,50,0.6), -3px 0 rgba(0,200,255,0.6)", duration: 0.06 },
              ],
              ease: "none",
            });

            // Step 2: flicker opacity and scale out
            glitchTl.to(el, {
              keyframes: [
                { opacity: 0.2, y: -3, duration: 0.04 },
                { opacity: 0.8, y: 2, duration: 0.04 },
                { opacity: 0, y: 0, textShadow: "-8px 0 rgba(255,0,50,1), 8px 0 rgba(0,200,255,1)", duration: 0.06 },
              ],
              ease: "none",
            });

            tl.add(glitchTl, `${morphLabel}+=0.15` + (delay > 0 ? `+=${delay}` : ""));
          });

          tl.set(timelineContent, { visibility: "hidden" }, `${morphLabel}+=0.9`);
        }

        // Disable mouse tilt on last card + reset any existing tilt
        tl.call(() => {
          lastCardInner.classList.add("morph-active");
          gsap.to(lastCardInner, { rotateY: 0, rotateX: 0, duration: 0.3, overwrite: "auto" });
        }, [], morphLabel);

        // Border: set inline immediately so GSAP can animate it smoothly
        tl.set(lastCardInner, {
          borderColor: "rgba(16,185,129,0.25)",
        }, morphLabel);

        // Transition border from emerald → amber-100
        tl.to(lastCardInner, {
          borderColor: "rgba(255,251,235,0.2)",
          duration: 1.2,
          ease: "power2.inOut",
        }, `${morphLabel}+=0.2`);

        // Reveal the illustration with continuous glitch effect
        if (morphIllustration) {
          const glitchIn = gsap.timeline();

          // Initial glitch entrance
          glitchIn.set(morphIllustration, { opacity: 1, scale: 1 });
          glitchIn.fromTo(morphIllustration, { opacity: 0 }, {
            keyframes: [
              { opacity: 0.3, x: 5, y: -2, filter: "drop-shadow(-3px 0 rgba(255,0,50,0.7)) drop-shadow(3px 0 rgba(0,200,255,0.7))", duration: 0.06 },
              { opacity: 0, x: -4, y: 3, filter: "none", duration: 0.04 },
              { opacity: 0.6, x: -6, y: -1, filter: "drop-shadow(4px 0 rgba(255,0,50,0.8)) drop-shadow(-4px 0 rgba(0,200,255,0.8))", duration: 0.06 },
              { opacity: 0, x: 3, y: 2, filter: "none", duration: 0.04 },
              { opacity: 0.8, x: 2, y: -3, filter: "drop-shadow(-5px 0 rgba(255,0,50,0.6)) drop-shadow(5px 0 rgba(0,200,255,0.6))", duration: 0.06 },
              { opacity: 0.2, x: -2, y: 1, filter: "none", duration: 0.04 },
              { opacity: 1, x: 0, y: 0, filter: "drop-shadow(-2px 0 rgba(255,0,50,0.3)) drop-shadow(2px 0 rgba(0,200,255,0.3))", duration: 0.06 },
              { opacity: 1, x: 0, y: 0, filter: "none", duration: 0.1 },
            ],
            ease: "none",
          });

          // Ongoing glitch pulses — keep it unstable as you scroll
          for (let i = 0; i < 8; i++) {
            // Calm hold
            glitchIn.to(morphIllustration, {
              x: 0, y: 0, filter: "none", opacity: 1, duration: 0.3,
            });
            // Glitch burst
            glitchIn.to(morphIllustration, {
              keyframes: [
                { x: -4, y: 2, filter: "drop-shadow(-3px 0 rgba(255,0,50,0.6)) drop-shadow(3px 0 rgba(0,200,255,0.6))", opacity: 0.7, duration: 0.04 },
                { x: 6, y: -1, filter: "drop-shadow(4px 0 rgba(255,0,50,0.8)) drop-shadow(-4px 0 rgba(0,200,255,0.8))", opacity: 0.4, duration: 0.04 },
                { x: -2, y: -2, filter: "none", opacity: 1, duration: 0.03 },
                { x: 3, y: 1, filter: "drop-shadow(-2px 0 rgba(255,0,50,0.5)) drop-shadow(2px 0 rgba(0,200,255,0.5))", opacity: 0.8, duration: 0.04 },
                { x: 0, y: 0, filter: "none", opacity: 1, duration: 0.05 },
              ],
              ease: "none",
            });
          }

          tl.add(glitchIn, `${morphLabel}+=0.7`);
        }

        // Phase 2: Card grows, illustration fades, contact reveals
        tl.to(lastCardWrapper, {
          scale: 3,
          width: 400,
          marginLeft: -200,
          height: 230,
          marginTop: -115,
          duration: 3,
          ease: "power3.inOut",
        }, `${morphLabel}+=1.5`);

        // Illustration dissolves as card grows
        if (morphIllustration) {
          tl.to(morphIllustration, {
            scale: 0.3, x: -90, y: 78, opacity: 0.50,
            duration: 1.5, ease: "power3.inOut",
          }, `${morphLabel}+=4.5`);
        }

        // Contact content fades in
        if (contactContent) {
          tl.to(contactContent, {
            opacity: 1, y: 0, duration: 1.5, ease: "power2.out",
          }, `${morphLabel}+=5`);
        }
      }

      // Hold at end
      tl.to({}, { duration: 1.5 });

      // Persistent subtle glitch on card text elements
      const allCards = sectionRef.current?.querySelectorAll(".card-timeline-content") as NodeListOf<HTMLElement>;
      allCards?.forEach((content, i) => {
        const texts = content.querySelectorAll("span, p") as NodeListOf<HTMLElement>;
        texts.forEach((el, j) => {
          const glitchLoop = gsap.timeline({ repeat: -1, delay: i * 0.7 + j * 0.3 });

          // Long calm hold
          glitchLoop.to(el, { duration: 2 + Math.random() * 4 });

          // Subtle text-shadow chromatic split
          glitchLoop.to(el, {
            keyframes: [
              { textShadow: "-1.5px 0 rgba(255,0,50,0.35), 1.5px 0 rgba(0,200,255,0.35)", duration: 0.05 },
              { textShadow: "1px 0 rgba(255,0,50,0.25), -1px 0 rgba(0,200,255,0.25)", duration: 0.04 },
              { textShadow: "none", duration: 0.06 },
              { textShadow: "-1px 0 rgba(255,0,50,0.2), 1px 0 rgba(0,200,255,0.2)", duration: 0.04 },
              { textShadow: "none", duration: 0.08 },
            ],
            ease: "none",
          });
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse-tracking: each card's tilt-wrapper responds based on distance from cursor
  const handleSectionMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!arcRef.current) return;
    const tilts = arcRef.current.querySelectorAll(".card-tilt") as NodeListOf<HTMLElement>;

    tilts.forEach((tilt) => {
      if (tilt.classList.contains("morph-active")) return;
      const rect = tilt.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const maxDist = 1600;
      const strength = Math.max(0, 1 - distance / maxDist);

      gsap.to(tilt, {
        rotateY: (dx / maxDist) * 60 * strength,
        rotateX: -(dy / maxDist) * 15 * strength,
        duration: 0.2,
        ease: "none",
        overwrite: "auto",
      });
    });
  }, []);

  const handleSectionMouseLeave = useCallback(() => {
    if (!arcRef.current) return;
    const tilts = arcRef.current.querySelectorAll(".card-tilt") as NodeListOf<HTMLElement>;
    tilts.forEach((tilt) => {
      gsap.to(tilt, {
        rotateY: 0, rotateX: 0,
        duration: 1.2, ease: "power2.out", overwrite: "auto",
      });
    });
  }, []);

  return (
    <div className="relative">
      {/* Curved top — overlays on last project, upward glow only */}
      <div
        className="absolute left-0 right-0 z-30"
        style={{
          top: "-3rem",
          height: "6rem",
          clipPath: "inset(-120px -10px 0px -10px)",
          zIndex: "0"
        }}
      >
        <div
          className="w-full h-full bg-background"
          style={{
            borderRadius: "0px 0px 0 0",
            borderTop: "2px solid rgba(255,251,235,0.3)",
            boxShadow: "0 -10px 60px rgba(255,251,235,0.03), 0 -10px 30px rgba(255,251,235,0.02)",
          }}
        />
      </div>

      <section
        ref={sectionRef}
        id="skills"
        className="relative h-screen w-full bg-background overflow-hidden"
        style={{}}
        onMouseMove={handleSectionMouseMove}
        onMouseLeave={handleSectionMouseLeave}
      >

        {/* Heading — cinematic staggered reveal */}
        <div ref={headingRef} className="absolute top-[3.5%] left-0 right-0 text-center px-8 z-20" style={{ perspective: "800px" }}>
          <h2 className="leading-[1]" style={{ fontSize: "clamp(3rem, 9vw, 9rem)" }}>
            <span
              className="word-the inline-block text-amber-100/50 mr-[0.35em] mt-8"
              style={{ fontFamily: "var(--font-space-mono)", fontWeight: 600, fontSize: "0.35em", verticalAlign: "middle", letterSpacing: "0.01em" }}
            >
              the
            </span>
            <span className="inline-block" style={{ fontFamily: "var(--font-playfair)", fontSize: "1.15em", fontWeight: 900, fontStyle: "italic" }}>
              {"origin".split("").map((char, i) => (
                <span
                  key={i}
                  className="origin-letter inline-block text-amber-100"
                  style={{ transformOrigin: "center top" }}
                >
                  {char}
                </span>
              ))}
            </span>
            <span
              className="origin-subtitle inline-block ml-[0.25em] text-emerald-400/50"
              style={{ fontFamily: "var(--font-caveat)", fontSize: "0.35em", verticalAlign: "baseline", clipPath: "inset(0 100% 0 0)" }}
            >
              & the bugs along the way...
            </span>
          </h2>
        </div>

        {/* Semi-circle arc */}
        <div
          ref={arcRef}
          className="absolute z-10"
          style={{
            width: 0,
            height: 0,
            left: "50%",
            top: `calc(100% + ${ARC_RADIUS - 430}px)`,
            opacity: 1,
          }}
        >
          {allEntries.map((entry, i) => {
            const angleDeg = i * CARD_ANGLE_GAP;
            const isLast = i === LAST_INDEX;

            return (
              <div
                key={i}
                className={`absolute timeline-card-wrapper ${isLast ? "last-timeline-card" : ""}`}
                style={{
                  width: "240px",
                  height: "300px",
                  marginLeft: "-120px",
                  marginTop: "-150px",
                  transform: `rotate(${angleDeg}deg) translateY(-${ARC_RADIUS}px)`,
                  transformOrigin: "center center",
                  perspective: "600px",
                }}
              >
                <div
                  className={`timeline-card-inner card-tilt w-full h-full rounded-2xl border ${typeBorders[entry.type]} bg-white/[0.04] backdrop-blur-sm overflow-hidden shadow-xl relative`}
                >
                  {/* Timeline content */}
                  <div className="card-timeline-content absolute inset-0 flex flex-col justify-between">
                    <div className="p-5">
                      <span
                        className={`scatter-el inline-block text-[14px] font-mono uppercase tracking-[0.2em] ${typeAccents[entry.type]}`}
                      >
                        {typeLabels[entry.type]}
                      </span>
                      <p className="scatter-el text-amber-100 font-bold text-[24px] leading-tight mt-3">
                        {entry.title}
                      </p>
                      <p className="scatter-el text-amber-100/35 text-[16px] mt-2 leading-snug">
                        {entry.org}
                      </p>
                    </div>
                    <div className="p-5 pt-0">
                      <span className="scatter-el inline-block text-amber-100/10 font-black text-[3.5rem] leading-none select-none">
                        {entry.year}
                      </span>
                    </div>
                  </div>

                  {/* Morph illustration — centered icon, appears during transition */}
                  {isLast && (
                    <div
                      className="morph-illustration absolute inset-0 flex items-center justify-center"
                      style={{ opacity: 0, transform: "scale(0.4)" }}
                    >
                      {/* Stylized envelope icon — amber-100 palette */}
                      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="40" cy="40" r="36" stroke="rgba(255,251,235,0.12)" strokeWidth="1" />
                        <circle cx="40" cy="40" r="28" stroke="rgba(255,251,235,0.06)" strokeWidth="0.5" />
                        <rect x="22" y="28" width="36" height="26" rx="3" stroke="rgba(255,251,235,0.4)" strokeWidth="1.5" fill="rgba(255,251,235,0.03)" />
                        <path d="M22 31 L40 43 L58 31" stroke="rgba(255,251,235,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="40" cy="21" r="1.5" fill="rgba(16,185,129,0.35)" />
                        <circle cx="30" cy="60" r="1" fill="rgba(255,251,235,0.15)" />
                        <circle cx="52" cy="58" r="1" fill="rgba(255,251,235,0.15)" />
                        <line x1="62" y1="24" x2="66" y2="20" stroke="rgba(255,251,235,0.2)" strokeWidth="0.8" strokeLinecap="round" />
                        <line x1="16" y1="36" x2="12" y2="34" stroke="rgba(255,251,235,0.12)" strokeWidth="0.8" strokeLinecap="round" />
                      </svg>
                    </div>
                  )}

                  {/* Contact content — only in last card, hidden initially */}
                  {/* All sizes at ~1/3 since card scales 3x */}
                  {isLast && (
                    <div
                      className="contact-inner-content absolute inset-0 flex flex-col justify-between p-4"
                      style={{ opacity: 0, transform: "translateY(4px)" }}
                    >
                      {/* Top — big statement typography spanning full width */}
                      <div>
                        <p
                          className="text-amber-100/25 uppercase"
                          style={{ fontFamily: "var(--font-space-mono)", fontSize: "6px", letterSpacing: "0.2em" }}
                        >
                          // don&apos;t be a stranger
                        </p>
                        <h2 className="mt-1 leading-[1.05]" style={{ fontSize: "30px" }}>
                          <span className="text-amber-100/60" style={{ fontWeight: 500 }}>
                            Got a{" "}
                          </span>
                          <span
                            className="text-amber-100"
                            style={{ fontFamily: "var(--font-playfair)", fontWeight: 900, fontStyle: "italic" }}
                          >
                            project
                          </span>
                          <span className="text-amber-100/60" style={{ fontWeight: 500 }}>
                            {" "}in mind?
                          </span>
                          <br />
                          <span className="text-amber-100/60" style={{ fontWeight: 500 }}>
                            Let&apos;s make it{" "}
                          </span>
                          <span
                            className="text-emerald-400"
                            style={{ fontWeight: 700 }}
                          >
                            happen
                          </span>
                          <span className="text-amber-100/20" style={{ fontWeight: 300 }}>.</span>
                        </h2>
                        <p
                          className="text-emerald-400/40"
                          style={{ fontFamily: "var(--font-caveat)", fontSize: "14px" }}
                        >
                          I reply faster than my builds!
                        </p>
                      </div>

                      {/* Bottom — minimal links */}
                      <div className="flex flex-col gap-1 ml-auto">
                        <p style={{ fontSize: "7px" }}>
                          <a href="mailto:kishore231512@gmail.com" className="text-amber-100/80 hover:text-amber-100 transition-opacity">kishore231512@gmail.com</a>
                          <span className="text-amber-100/10 mx-1">·</span>
                          <a href="tel:+917373219696" className="text-amber-100/50 hover:text-amber-100/60 transition-opacity">+91 7373219696</a>
                          <span className="text-amber-100/10 mx-1">·</span>
                          <a href="https://github.com/Kishore121523" target="_blank" rel="noreferrer" className="text-amber-100/50 hover:text-amber-100/60 transition-colors">GitHub</a>
                          <span className="text-amber-100/10 mx-1">·</span>
                          <a href="https://www.linkedin.com/in/kishore-yogeswaran-7946291a6/" target="_blank" rel="noreferrer" className="text-amber-100/50 hover:text-amber-100/60 transition-colors">LinkedIn</a>
                          <span className="text-amber-100/10 mx-1">·</span>
                          <a href="https://www.instagram.com/_kishoredesigns_/" target="_blank" rel="noreferrer" className="text-amber-100/50 hover:text-amber-100/60 transition-colors">Instagram</a>
                        </p>
                        <p
                          className="text-emerald-400/40 -mt-1 ml-auto"
                          style={{ fontFamily: "var(--font-space-mono)", fontSize: "7px" }}
                        >
                          git commit -m &quot;reached the end, hire me&quot;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="timeline-progress-bar absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          <span className="text-[9px] font-mono text-emerald-400/40 tracking-[0.3em] uppercase">
            2025
          </span>
          <div className="w-24 h-[2px] bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="timeline-progress-fill h-full origin-left rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, rgba(16,185,129,0.5), rgba(253,230,138,0.4))",
                transform: "scaleX(0)",
              }}
            />
          </div>
          <span className="text-[9px] font-mono text-emerald-400/40 tracking-[0.3em] uppercase">
            2020
          </span>
        </div>
      </section>
    </div>
  );
}
