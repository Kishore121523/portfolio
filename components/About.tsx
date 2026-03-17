"use client";

import { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copy, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const scrambleChars = "!<>-_\\/[]{}—=+*^?#アイウエオカキク";

const circles = [
  {
    label: "THE APPROACH",
    text: "Understand the mess. Untangle it. Ship it clean. Pretend it was obvious.",
  },
  {
    label: "THE CRAFT",
    text: "From model weights to font weights - every detail gets the same unhealthy attention.",
  },
  {
    label: "THE VISION",
    text: "Code that actually works. Interfaces that don't suck. Deadlines that... we'll get there!",
  },
];

const bioBlock = {
  tag: "SYS.LOG",
  lines: [
    "// fluent in Python, TypeScript & PromptScript!😛",
    "// builds full-stack apps & half-stack excuses",
    "// ships code that works (most of the time)",
  ],
};

const devPuns = [
  "Trained a model. It trained me back.",
  "Can explain transformers, not my life choices",
  "Overfitting to deadlines since 2024.",
  "git commit -m 'it works, don't ask why'",
  "Gradient descent into madness.",
  "Deploying to prod on a Friday. Again.",
  "My model's confidence is higher than mine.",
  "Works in localhost. Ships in hopelost.",
  "My RAG pipeline retrieves everything except my sanity.",
  "Fine-tuned the model. Broke everything else.",
  "99.9% accuracy. 100% overfit.",
  "The AI passed the test. I didn't.",
  "My vector db remembers more than I do.",
];

const stackBlock = {
  tag: "STACK.NOW",
  items: ["Python", "TypeScript", "Next.js", "LangChain", "VectorDB"],
};



export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const punIndexRef = useRef(0);
  const punRef = useRef<HTMLSpanElement>(null);
  const infoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const handleCopy = () => {
    navigator.clipboard.writeText("kishore231512@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Scramble text effect (same style as hero)
  const scrambleText = useCallback((element: HTMLElement, targetText: string, duration = 0.6) => {
    let frame = 0;
    const totalFrames = Math.ceil(duration * 60);
    let rafId: number;
    const update = () => {
      let output = "";
      const progress = frame / totalFrames;
      for (let i = 0; i < targetText.length; i++) {
        const charProgress = (progress * targetText.length - i) / (targetText.length * 0.3);
        if (charProgress > 1) output += targetText[i];
        else if (charProgress > 0) output += Math.random() > 0.5 ? targetText[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        else output += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }
      element.textContent = output;
      frame++;
      if (frame <= totalFrames) rafId = requestAnimationFrame(update);
      else element.textContent = targetText;
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Periodic glitch on info items
  useEffect(() => {
    const glitchInfo = () => {
      infoRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.timeline({ delay: i * 0.06 })
          .to(el, {
            skewX: gsap.utils.random(-8, 8),
            x: gsap.utils.random(-3, 3),
            borderColor: "rgba(255, 0, 60, 0.15)",
            duration: 0.05, ease: "steps(1)",
          })
          .to(el, {
            skewX: gsap.utils.random(-4, 4),
            borderColor: "rgba(0, 240, 255, 0.12)",
            duration: 0.05, ease: "steps(1)",
          })
          .to(el, {
            skewX: 0, x: 0,
            borderColor: "rgba(255,255,255,0.04)",
            duration: 0.3, ease: "power2.out",
          });
      });
      // Scramble the tag labels
      tagRefs.current.forEach((el) => {
        if (!el) return;
        const original = el.dataset.text || el.textContent || "";
        scrambleText(el, original, 0.4);
      });
    };
    const id = setInterval(glitchInfo, 4000);
    return () => clearInterval(id);
  }, [scrambleText]);

  // Rotate dev puns with scramble effect
  useEffect(() => {
    const id = setInterval(() => {
      punIndexRef.current = (punIndexRef.current + 1) % devPuns.length;
      if (punRef.current) scrambleText(punRef.current, devPuns[punIndexRef.current], 0.8);
    }, 3500);
    return () => clearInterval(id);
  }, [scrambleText]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // ── Words fly in ──
      gsap.set(".about-word", { autoAlpha: 0 });
      const words = gsap.utils.toArray<HTMLElement>(".about-word");
      words.forEach((word, i) => {
        const dirs = [
          { y: 80, x: -60, rotation: 8 },
          { y: -50, x: 80, rotation: -6 },
          { y: 60, x: -40, rotation: 12 },
          { y: -70, x: 50, rotation: -10 },
          { y: 50, x: -80, rotation: 5 },
          { y: -40, x: 60, rotation: -8 },
        ];
        gsap.set(word, { ...dirs[i % dirs.length] });
      });

      // ── Left panel items ──
      const leftItems = gsap.utils.toArray<HTMLElement>(".about-left-item");
      leftItems.forEach((el, i) => {
        const angle = (i / leftItems.length) * Math.PI * 2;
        gsap.set(el, {
          autoAlpha: 0,
          x: Math.cos(angle) * 80,
          y: Math.sin(angle) * 60 + 40,
          rotation: gsap.utils.random(-15, 15),
          scale: 0.7,
        });
      });

      // ── Decorative elements ──
      gsap.set(".about-deco", { autoAlpha: 0, scale: 0, rotation: "random(-180, 180)" });

      // ── Circles ──
      const circleEls = gsap.utils.toArray<HTMLElement>(".circle-node");
      circleEls.forEach((el) => gsap.set(el, { autoAlpha: 0, y: 500, scale: 0.9 }));

      // ── Pre-pin: Everything animates as section enters viewport ──
      const preTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 95%",
          end: "top 5%",
          scrub: 0.5,
        },
      });

      // Words fly in
      words.forEach((word, i) => {
        preTl.to(word, {
          autoAlpha: 1, x: 0, y: 0, rotation: 0,
          duration: 0.5, ease: "back.out(1.2)",
        }, 0.05 + i * 0.08);
      });

      // Left panel items scatter in
      leftItems.forEach((el, i) => {
        preTl.to(el, {
          autoAlpha: 1, x: 0, y: 0, rotation: 0, scale: 1,
          duration: 0.5, ease: "back.out(1.4)",
        }, 0.25 + i * 0.08);
      });

      // Decorative elements
      preTl.to(".about-deco", {
        autoAlpha: 1, scale: 1, rotation: 0,
        duration: 0.5, stagger: 0.05, ease: "elastic.out(1, 0.6)",
      }, 0.35);

      // Strikethrough draws across after words land
      preTl.to(".strike-line", {
        width: "100%", duration: 0.4, ease: "power2.inOut",
      }, 0.8);

      // First circle slides in during pre-pin
      preTl.to(circleEls[0], {
        autoAlpha: 1, y: 0, scale: 1,
        duration: 0.6, ease: "power2.out",
      }, 0.6);

      // ── Pinned timeline: remaining circles stack ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Circle 0 shrinks back as Circle 1 arrives
      tl.to(circleEls[0], {
        scale: 0.88, autoAlpha: 0.3,
        duration: 0.5, ease: "power2.inOut",
      }, 0.1);
      tl.to(circleEls[1], {
        autoAlpha: 1, y: 0, scale: 1,
        duration: 0.5, ease: "power2.out",
      }, 0.1);

      // Circle 1 shrinks back as Circle 2 arrives
      tl.to(circleEls[1], {
        scale: 0.88, autoAlpha: 0.3,
        duration: 0.5, ease: "power2.inOut",
      }, 0.55);
      tl.to(circleEls[2], {
        autoAlpha: 1, y: 0, scale: 1,
        duration: 0.5, ease: "power2.out",
      }, 0.55);

      // ── Scroll progress bar fills across entire pinned duration ──
      tl.to(".scroll-progress", {
        scaleY: 1, duration: 1, ease: "none",
      }, 0);
      tl.to(".scroll-dot", {
        top: "100%", duration: 1, ease: "none",
      }, 0);
      // Chevrons fade out as you reach the end
      tl.to(".scroll-chevron", {
        autoAlpha: 0, y: 4, duration: 0.3, stagger: 0.05,
      }, 0.8);
      // Top dot pulses brighter at start
      tl.fromTo(".scroll-top-dot", {
        boxShadow: "0 0 0px rgba(0,240,255,0)",
      }, {
        boxShadow: "0 0 6px rgba(0,240,255,0.4)",
        duration: 0.2, yoyo: true, repeat: 1,
      }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section ref={sectionRef} id="about" className="relative bg-background h-screen overflow-hidden">
      <div className="absolute inset-0 px-6">
        <div className="max-w-7xl mx-auto h-full relative">

          {/* ── Top: Right-aligned headline ── */}
          <div className="pt-10 md:pt-14">
            <p className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight">
              <span className="about-word inline-block text-white/30 font-extralight">How</span>{" "}
              <span className="about-word inline-block text-white/30 font-extralight">I</span>{" "}
              <span className="about-word inline-block text-emerald-400 relative">
                think
                <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-emerald-400/50 to-transparent" />
              </span>
              <span className="about-word inline-block text-white/15 text-[0.8em] font-mono">.</span>
              <span className="about-word inline-block text-white/30 font-extralight">What</span>{" "}
              <span className="about-word inline-block text-white/30 font-extralight">I</span>{" "}
              <span className="about-word inline-block text-amber-100">ship</span>
              <span className="about-word inline-block text-white/15 text-[0.8em] font-mono">...</span>
              <br />
              <span className="about-word inline-block relative">
                <span className="text-white/30 italic text-[1.15em]" style={{ fontFamily: "var(--font-caveat)" }}>don&apos;t ask why</span>
                <span className="strike-line absolute left-2 top-1/2 h-[3px] w-0 mt-1"
                  style={{ background: "rgba(0,240,255,0.5)", filter: "drop-shadow(0 0 6px rgba(0,240,255,0.4))" }} />
              </span>
            </p>
          </div>

          {/* ── Scroll progress indicator ── */}
          <div className="about-deco absolute right-8 top-[14%] bottom-[14%] flex flex-col items-center">
            {/* Top dot */}
            <div className="scroll-top-dot w-1.5 h-1.5 rounded-full bg-emerald-400/30 mb-3" />
            {/* Track (dashed) */}
            <div className="flex-1 w-[1px] relative" style={{
              background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 4px, transparent 4px, transparent 10px)",
            }}>
              {/* Fill (solid, grows with scroll) */}
              <div className="scroll-progress absolute top-0 left-0 w-full origin-top" style={{
                background: "linear-gradient(to bottom, rgba(0,240,255,0.4), rgba(253,230,138,0.2))",
                height: "100%",
                transform: "scaleY(0)",
              }} />
              {/* Moving dot on the progress line */}
              <div className="scroll-dot absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{ background: "rgba(0,240,255,0.5)", boxShadow: "0 0 8px rgba(0,240,255,0.3)", top: 0 }} />
            </div>
            {/* Bottom chevrons */}
            <div className="mt-3 flex flex-col items-center gap-1">
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="scroll-chevron">
                <path d="M1 1L6 6L11 1" stroke="rgba(0,240,255,0.3)" strokeWidth="1" strokeLinecap="round" />
              </svg>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="scroll-chevron">
                <path d="M1 1L6 6L11 1" stroke="rgba(0,240,255,0.15)" strokeWidth="1" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* ── Content: Centered two-column layout ── */}
          <div className="absolute inset-x-0 top-[18%] bottom-[4%] flex items-center justify-center">
            <div className="flex items-center gap-8 md:gap-14 w-full max-w-5xl mx-auto">

              {/* ── Left column ── */}
              <div className="w-[280px] md:w-[420px] shrink-0 relative">

                {/* ── Block 1: Terminal bio ── */}
                <div
                  ref={(el) => { infoRefs.current[0] = el; }}
                  className="about-left-item border border-white/[0.04] relative overflow-hidden group"
                  style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.02) 0%, transparent 60%)" }}
                >
                  {/* Scan-line overlay on hover */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.015) 2px, rgba(0,240,255,0.015) 4px)" }} />
                  {/* Top bar */}
                  <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/[0.04]">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400/30" />
                      <div className="w-1.5 h-1.5 rounded-full bg-amber-400/30" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400/30" />
                    </div>
                    <span
                      ref={(el) => { tagRefs.current[0] = el; }}
                      data-text={bioBlock.tag}
                      className="text-[8px] font-mono text-emerald-400/70 tracking-[0.3em] uppercase"
                    >
                      {bioBlock.tag}
                    </span>
                  </div>
                  {/* Code lines */}
                  <div className="px-3 py-3 font-mono text-[11px] md:text-[12px] leading-[1.7]">
                    {bioBlock.lines.map((line, li) => (
                      <div key={li} className="flex gap-2">
                        <span className="text-white/10 select-none w-4 text-right shrink-0">{li + 1}</span>
                        <span className="text-white/80">{line}</span>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-0.5">
                      <span className="text-white/10 select-none w-4 text-right shrink-0">4</span>
                      <span className="text-emerald-400/70 animate-pulse">▋</span>
                    </div>
                  </div>
                  {/* Corner accents */}
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-emerald-400/10" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-emerald-400/10" />
                </div>

                {/* ── Block 2: Rotating dev pun ── */}
                <div
                  ref={(el) => { infoRefs.current[1] = el; }}
                  className="about-left-item mt-2.5 border border-white/[0.04] px-4 py-3 relative overflow-hidden group"
                  style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.01) 0%, transparent 60%)" }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.015) 2px, rgba(0,240,255,0.015) 4px)" }} />
                  <span
                    ref={(el) => { tagRefs.current[1] = el; }}
                    data-text="DEV.LOG"
                    className="text-[8px] font-mono text-emerald-400/70 tracking-[0.3em] uppercase block mb-2"
                  >
                    DEV.LOG
                  </span>
                  <p className="text-[12px] md:text-[13px] font-mono text-white/80 leading-relaxed">
                    <span className="text-emerald-400/70 mr-1.5">&gt;</span>
                    <span ref={punRef}>{devPuns[0]}</span>
                  </p>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-emerald-400/10" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-emerald-400/10" />
                </div>

                {/* ── Block 3: Stack ticker ── */}
                {/* <div
                  ref={(el) => { infoRefs.current[2] = el; }}
                  className="about-left-item mt-2.5 border border-white/[0.04] px-4 py-2.5 relative overflow-hidden group"
                  style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.01) 0%, transparent 60%)" }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.015) 2px, rgba(0,240,255,0.015) 4px)" }} />
                  <span
                    ref={(el) => { tagRefs.current[2] = el; }}
                    data-text={stackBlock.tag}
                    className="text-[8px] font-mono text-emerald-400/70 tracking-[0.3em] uppercase block mb-2"
                  >
                    {stackBlock.tag}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stackBlock.items.map((item, ti) => (
                      <span key={ti} className="text-[10px] md:text-[11px] font-mono text-white/80 border border-white/[0.06] px-2 py-0.5 hover:border-emerald-400/20 hover:text-emerald-400/70 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-emerald-400/10" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-emerald-400/10" />
                </div> */}

                {/* ── Block 4: Email + CV row ── */}
                <div className="mt-2.5 flex gap-2.5">
                  <button
                    onClick={handleCopy}
                    className="about-left-item flex-1 border border-white/[0.04] px-3 py-2.5 text-left relative overflow-hidden group hover:border-emerald-400/15 transition-colors"
                  >
                    <span className="text-[8px] font-mono text-emerald-400/70 tracking-[0.3em] uppercase block mb-1">EMAIL</span>
                    <span className="text-white/80 text-[10px] font-mono flex items-center gap-2">
                      {copied ? (
                        <span className="text-emerald-400">copied!</span>
                      ) : (
                        <>kishore...<Copy className="w-2.5 h-2.5 text-white/80 group-hover:text-emerald-400/70 transition-colors" /></>
                      )}
                    </span>
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-emerald-400/10" />
                  </button>
                  <a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="about-left-item flex-1 border border-white/[0.04] px-3 py-2.5 relative overflow-hidden group hover:border-emerald-400/15 transition-colors"
                  >
                    <span className="text-[8px] font-mono text-emerald-400/70 tracking-[0.3em] uppercase block mb-1">RESUME</span>
                    <span className="text-white/80 text-[10px] font-mono flex items-center gap-2">
                      .pdf<ArrowUpRight className="w-2.5 h-2.5 text-white/80 group-hover:text-emerald-400/70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </span>
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-emerald-400/10" />
                  </a>
                </div>

                {/* Decorative elements around left column */}
                <div className="about-deco absolute -top-6 -right-8 w-10 h-10 border border-emerald-400/[0.04] rounded-full" />
                <div className="about-deco absolute -bottom-4 -left-4 w-[1px] h-8"
                  style={{ background: "linear-gradient(to bottom, rgba(0,240,255,0.08), transparent)" }} />
                <div className="about-deco absolute top-1/2 -right-6">
                  <div className="w-1 h-1 rounded-full bg-emerald-400/20" />
                </div>
                <div className="about-deco absolute -bottom-6 right-8 text-[10px] font-mono text-emerald-400/[0.06] tracking-widest">
                  {"{//}"}
                </div>
              </div>

              {/* ── Right column: Stacking circles ── */}
              <div className="flex-1 flex items-center justify-center relative">
                <div className="relative w-[280px] md:w-[350px] aspect-square">
                  {circles.map((c, i) => (
                    <div key={c.label} className="circle-node absolute inset-0 rounded-full flex flex-col items-center justify-center text-center px-8 md:px-14"
                      style={{
                        zIndex: i,
                        background: "radial-gradient(circle at 50% 35%, rgba(30,28,25,1) 0%, var(--background) 70%)",
                        boxShadow: "inset 0 0 80px rgba(0,240,255,0.015), 0 0 0 1px rgba(255,255,255,0.06), 0 0 40px rgba(0,240,255,0.01)",
                        border: "1px solid rgba(255,255,255,0.16)",
                      }}>
                      <span className="absolute top-6 md:top-10 right-6 md:right-10 text-[10px] md:text-xs font-mono text-emerald-400/70">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* Bottom amber accent */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30%] h-[1px]"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(253,230,138,0.08), transparent)" }} />
                      <span className="text-[9px] md:text-[12px] font-mono text-amber-100/70 tracking-[0.3em] uppercase mb-4">{c.label}</span>
                      <div className="w-8 md:w-12 h-[1px] mb-4"
                        style={{ background: "linear-gradient(90deg, rgba(0,240,255,0.15), rgba(253,230,138,0.2))" }} />
                      <p className="text-[11px] md:text-[14px] text-white/60 leading-relaxed font-light max-w-[100%]">{c.text}</p>
                    </div>
                  ))}
                </div>
                {/* Circle decorations */}
                <div className="about-deco absolute -top-4 -left-4 w-6 h-6">
                  <svg viewBox="0 0 24 24" fill="none" stroke="rgba(0,240,255,0.04)" strokeWidth="0.5">
                    <path d="M12 2L22 22H2Z" />
                  </svg>
                </div>
                <div className="about-deco absolute -bottom-3 right-4">
                  <div className="w-6 h-[1px] bg-gradient-to-r from-emerald-400/10 to-transparent" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Infinite scroll typography — full width at bottom ── */}
          <div className="about-left-item absolute bottom-15 left-0 right-15 overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10" style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10" style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />
            <div className="flex whitespace-nowrap animate-marquee mb-2">
              {Array.from({ length: 2 }, (_, k) => (
                <span key={k} className="text-[10px] font-mono tracking-[0.4em] uppercase text-white/25 mr-2">
                  think · build · ship · iterate · refine · obsess · repeat · think · build · ship · iterate · refine · obsess · repeat ·{" "}
                </span>
              ))}
            </div>
            <div className="flex whitespace-nowrap" style={{ animation: "marquee 25s linear infinite reverse" }}>
              {Array.from({ length: 2 }, (_, k) => (
                <span key={k} className="text-[10px] font-mono tracking-[0.5em] uppercase mr-2">
                  <span className="text-emerald-400/80">AI</span>
                  <span className="text-white/20"> · deploy · code · </span>
                  <span className="text-emerald-400/80">break</span>
                  <span className="text-white/20"> · design · craft · </span>
                  <span className="text-emerald-400/80">learn</span>
                  <span className="text-white/20"> · iterate · ship · </span>
                  <span className="text-emerald-400/80">fix</span>
                  <span className="text-white/20"> · debug · push · </span>
                  <span className="text-emerald-400/80">repeat</span>
                  <span className="text-white/20"> · build · test · </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
