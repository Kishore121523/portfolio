"use client";

import { useRef, useLayoutEffect, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, GitBranch } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  desc: string;
  tag: string;
  liveUrl: string;
  githubUrl: string;
  image: string;
}

const projects: Project[] = [
  {
    tag: "where did my money go?",
    title: "Allocatr",
    desc: "AI-powered budget tracker with natural language expense entry and real-time analytics.",
    liveUrl: "#",
    githubUrl: "#",
    image: "/assets/WebDev/allocatr.png",
  },
  {
    tag: "it talks back now",
    title: "Nestle AI Chatbot",
    desc: "AI Chatbot with Hybrid RAG, Graph Reasoning, and Geolocation-based Product Search.",
    liveUrl: "#",
    githubUrl: "#",
    image: "/assets/WebDev/nestle.png",
  },
  {
    tag: "goals that actually stick",
    title: "WIST",
    desc: "AI Enhanced Goal Planning System with Context Aware Suggestions.",
    liveUrl: "#",
    githubUrl: "#",
    image: "/assets/WebDev/wist.png",
  },
  {
    tag: "ctrl+s but in the cloud",
    title: "Vaultic",
    desc: "A cloud storage solution for efficient file organization and secure sharing.",
    liveUrl: "#",
    githubUrl: "#",
    image: "/assets/WebDev/vaultic.png",
  },
  {
    tag: "monopoly but make it real",
    title: "WealthSimple",
    desc: "Modern Banking and real-time Money Transfer Website.",
    liveUrl: "#",
    githubUrl: "#",
    image: "/assets/WebDev/wealthSimple.png",
  },
];


const decryptLines = [
  { binary: "01101001 01110100", decoded: "it compiled" },
  { binary: "01100110 01101001", decoded: "first try" },
  { binary: "01101110 01101111", decoded: "nobody is" },
  { binary: "01101101 01101111", decoded: "more shocked" },
  { binary: "01110100 01101000", decoded: "than me" },
];
const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";

function DecryptCell() {
  const [lines, setLines] = useState(decryptLines.map((l) => l.binary));
  const [phase, setPhase] = useState<"binary" | "glitch" | "decoded">("binary");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const cycle = () => {
      // Binary phase: 3s
      setPhase("binary");
      setLines(decryptLines.map((l) => l.binary));

      timeout = setTimeout(() => {
        // Glitch phase: scramble rapidly for 1.2s
        setPhase("glitch");
        let glitchCount = 0;
        const glitchInterval = setInterval(() => {
          setLines(decryptLines.map((l) =>
            Array.from({ length: l.decoded.length }, () =>
              glitchChars[Math.floor(Math.random() * glitchChars.length)]
            ).join("")
          ));
          glitchCount++;
          if (glitchCount > 12) {
            clearInterval(glitchInterval);
            // Decoded phase: 3s
            setPhase("decoded");
            setLines(decryptLines.map((l) => l.decoded));
            timeout = setTimeout(cycle, 3000);
          }
        }, 100);
      }, 3000);
    };
    cycle();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
      {lines.map((line, i) => (
        <div key={i} className="font-mono text-[13px] md:text-[15px] tracking-[0.3em] text-center"
          style={{
            color: phase === "decoded" ? "rgba(16,185,129,0.6)" : phase === "glitch" ? "rgba(16,185,129,0.5)" : "rgba(16,185,129,0.3)",
            textShadow: phase === "glitch" ? "0 0 8px rgba(16,185,129,0.4)" : "none",
            transition: "color 0.3s",
          }}>
          {line}
        </div>
      ))}
    </div>
  );
}

function UptimeCell() {
  const [seconds, setSeconds] = useState(0);
  const baseHours = 4291;

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const totalSec = baseHours * 3600 + seconds;
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
      <div className="text-[8px] font-mono text-amber-100/30 tracking-[0.4em] uppercase">system uptime</div>
      <div className="font-mono text-[clamp(1.4rem,3.5vw,2.2rem)] font-bold text-emerald-400/50 tracking-wider tabular-nums">
        {hrs.toLocaleString()}
        <span className="text-amber-100/30 text-[0.6em]">h </span>
        {String(mins).padStart(2, "0")}
        <span className="text-amber-100/30 text-[0.6em]">m </span>
        {String(secs).padStart(2, "0")}
        <span className="text-amber-100/30 text-[0.6em]">s</span>
        <span className="text-emerald-400/60 animate-pulse ml-1">▋</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50 animate-pulse" />
        <span className="text-[7px] font-mono text-amber-100/30 tracking-[0.25em] uppercase">all systems nominal</span>
      </div>
    </div>
  );
}

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<(HTMLDivElement | null)[]>([]);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const grid = gridRef.current;
      const showcase = document.querySelector(".work-showcase") as HTMLElement;
      const centerCell = cellRefs.current[3];
      if (!grid || !showcase || !centerCell) return;

      gsap.set(showcase, { autoAlpha: 0 });

      // Calculate transform-origin so zoom centers on the center cell
      const gridRect = grid.getBoundingClientRect();
      const cellRect = centerCell.getBoundingClientRect();
      const originX = ((cellRect.left + cellRect.width / 2) - gridRect.left) / gridRect.width * 100;
      const originY = ((cellRect.top + cellRect.height / 2) - gridRect.top) / gridRect.height * 100;
      gsap.set(grid, { transformOrigin: `${originX}% ${originY}%` });

      // How much to zoom the grid so the center cell fills the viewport
      const zoomScale = Math.max(
        window.innerWidth / cellRect.width,
        window.innerHeight / cellRect.height
      ) * 1.1;

      // ── Pinned timeline ──
      // Total timeline: 0–6 intro/zoom, 6–16 horizontal scroll
      const hStart = 6;
      const hDuration = 10;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=600%",
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Phase 1: Zoom entire grid into center cell
      tl.to(grid, {
        scale: zoomScale,
        duration: 4,
        ease: "power2.inOut",
      }, 0);

      // Fade out center deco extras first (brackets, tags, subtitle, status)
      tl.to(".center-deco-extra", {
        autoAlpha: 0, duration: 1,
      }, 1.5);

      // WORK heading — characters morph through random symbols then vanish
      const heading = document.querySelector(".center-deco-heading") as HTMLElement;
      const workChars = document.querySelectorAll(".work-char") as NodeListOf<HTMLElement>;
      if (heading && workChars.length) {
        const morphChars = "ΞΨΩΔΣΠΛΦ₿∞◊※†‡¥£€$∑∂∆ΩΘ¢∏≈≠±×÷ƒ⌐¬¤¶§";
        const colors = ["#10b981", "#fde68a", "#f87171", "#60a5fa", "#c084fc", "#fb923c"];
        const glitchTl = gsap.timeline();

        // Store original colors from the class (O is emerald, rest are amber-100)
        const originalTexts = Array.from(workChars).map((el) =>
          el.getAttribute("data-original") || el.textContent || ""
        );

        // Helper to restore a char to its original state
        const restoreChar = (charEl: HTMLElement, idx: number) => {
          charEl.textContent = originalTexts[idx];
          charEl.style.color = "";
          charEl.style.transform = "";
          charEl.style.opacity = "1";
          charEl.style.visibility = "visible";
        };

        // Single tween for the whole glitch — we control all chars in onUpdate
        const glitchObj = { progress: 0 };
        const totalDuration = 1; // normalized 0→1

        glitchTl.to(glitchObj, {
          progress: 1,
          duration: totalDuration,
          ease: "none",
          onUpdate: function () {
            const p = glitchObj.progress;

            // Make sure heading is visible while animating
            heading.style.opacity = "1";
            heading.style.visibility = "visible";

            workChars.forEach((charEl, idx) => {
              // Each char has its own window within the overall progress
              const charStart = idx * 0.12; // stagger
              const charEnd = charStart + 0.55;
              // Normalize progress for this char
              const localP = Math.max(0, Math.min(1, (p - charStart) / (charEnd - charStart)));

              if (localP <= 0) {
                // Not yet started — show original
                restoreChar(charEl, idx);
              } else if (localP >= 1) {
                // Done — hidden
                charEl.textContent = "";
                charEl.style.opacity = "0";
                charEl.style.visibility = "hidden";
              } else {
                // Scrambling — show random chars with jitter and color shifts
                charEl.style.visibility = "visible";
                charEl.textContent = morphChars[Math.floor(Math.random() * morphChars.length)];
                charEl.style.color = colors[Math.floor(Math.random() * colors.length)];
                charEl.style.transform = `translate(${(Math.random() - 0.5) * 8}px, ${(Math.random() - 0.5) * 8}px)`;
                // Fade out in the last 30% of this char's window
                charEl.style.opacity = localP > 0.7 ? String(1 - ((localP - 0.7) / 0.3)) : "1";
              }
            });

            // If fully reversed, restore everything
            if (p <= 0) {
              workChars.forEach((charEl, idx) => restoreChar(charEl, idx));
            }
            // If fully complete, hide heading
            if (p >= 1) {
              heading.style.opacity = "0";
              heading.style.visibility = "hidden";
            }
          },
        });

        tl.add(glitchTl, 3);
      }

      // Showcase container fades in
      gsap.set(".work-project-item-0", { autoAlpha: 0, y: 40 });
      tl.to(showcase, {
        autoAlpha: 1, duration: 0.8,
      }, 3.8);

      // First project items stagger in
      tl.to(".work-project-item-0", {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      }, 4.2);

      // Phase 2: Horizontal scroll through projects
      const horizontalEl = horizontalRef.current;
      if (horizontalEl) {
        const totalScrollWidth = (projects.length - 1) * window.innerWidth;

        tl.to(horizontalEl, {
          x: -totalScrollWidth,
          duration: hDuration,
          ease: "none",
        }, hStart);

        tl.fromTo(".work-progress-fill", {
          scaleX: 0,
        }, {
          scaleX: 1,
          duration: hDuration,
          ease: "none",
        }, hStart);
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative h-screen w-full bg-background overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      {/* ── 7-cell grid: 2 top, 3 middle, 2 bottom ── */}
      <div ref={gridRef} className="absolute inset-0 p-4 flex flex-col gap-3">

        {/* Top row: 2 cells */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {/* Cell 0: Uptime counter */}
          <div
            ref={(el) => { cellRefs.current[0] = el; }}
            className="relative bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden"
          >
            <UptimeCell />
            <div className="absolute bottom-3 left-3">
              <span className="text-[9px] font-mono text-emerald-400/20 tracking-[0.3em] uppercase">SYS.UP</span>
            </div>
          </div>

          {/* Cell 1: Pulse grid */}
          <div
            ref={(el) => { cellRefs.current[1] = el; }}
            className="relative bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div className="grid gap-[4px]" style={{ gridTemplateColumns: "repeat(13, 14px)" }}>
                {[
                  0, 0, 1, 0, 1, 2, 0, 1, 0, 0, 1, 0, 0,
                  0, 1, 2, 1, 0, 3, 1, 2, 1, 0, 0, 1, 0,
                  1, 2, 3, 2, 1, 4, 3, 2, 1, 1, 2, 0, 1,
                  0, 3, 4, 3, 2, 4, 4, 3, 2, 1, 3, 2, 0,
                  1, 2, 3, 4, 3, 4, 3, 4, 3, 2, 2, 1, 1,
                  0, 1, 2, 3, 2, 3, 2, 3, 1, 1, 0, 1, 0,
                  0, 0, 1, 1, 0, 2, 1, 1, 0, 0, 1, 0, 0,
                ].map((level, i) => {
                  const colors = [
                    "rgba(255,255,255,0.04)",
                    "rgba(16,185,129,0.15)",
                    "rgba(16,185,129,0.3)",
                    "rgba(16,185,129,0.5)",
                    "rgba(16,185,129,0.7)",
                  ];
                  return (
                    <span
                      key={i}
                      className="rounded-sm"
                      style={{
                        width: "14px",
                        height: "14px",
                        background: colors[level],
                        animation: level >= 3 ? `dotGlow 4s ease-in-out ${(i * 0.05).toFixed(2)}s infinite` : "none",
                      }}
                    />
                  );
                })}
              </div>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="text-[9px] font-mono text-emerald-400/20 tracking-[0.3em] uppercase">PULSE.GRID</span>
            </div>
          </div>
        </div>

        {/* Middle row: 3 cells */}
        <div className="grid grid-cols-3 gap-3 flex-[1.4]">
          {/* Cell 2: Circuit pattern */}
          <div
            ref={(el) => { cellRefs.current[2] = el; }}
            className="relative bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden"
          >
            <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 200 200" fill="none" stroke="rgba(16,185,129,0.4)" strokeWidth="0.8">
              <line x1="20" y1="40" x2="180" y2="40" />
              <line x1="40" y1="40" x2="40" y2="120" />
              <line x1="40" y1="120" x2="160" y2="120" />
              <line x1="160" y1="80" x2="160" y2="160" />
              <line x1="80" y1="80" x2="160" y2="80" />
              <line x1="80" y1="40" x2="80" y2="80" />
              <circle cx="40" cy="40" r="4" fill="rgba(16,185,129,0.3)" />
              <circle cx="80" cy="80" r="4" fill="rgba(16,185,129,0.3)" />
              <circle cx="160" cy="120" r="4" fill="rgba(253,230,138,0.3)" />
              <circle cx="40" cy="120" r="4" fill="rgba(16,185,129,0.3)" />
              <circle cx="160" cy="80" r="4" fill="rgba(253,230,138,0.3)" />
            </svg>
            <div className="absolute bottom-3 left-3">
              <span className="text-[9px] font-mono text-emerald-400/20 tracking-[0.3em] uppercase">ARCH.MAP</span>
            </div>
          </div>

          {/* Cell 3: CENTER — the hero cell */}
          <div
            ref={(el) => { cellRefs.current[3] = el; }}
            className="relative border border-emerald-400/20 rounded-xl overflow-hidden"
            style={{
              zIndex: 10,
              background: "rgba(21,21,21,0.95)",
            }}
          >
            {/* Decorative content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
              {/* Corner brackets */}
              <div className="center-deco-extra absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-emerald-400/40" />
              <div className="center-deco-extra absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-emerald-400/40" />
              <div className="center-deco-extra absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-emerald-400/40" />
              <div className="center-deco-extra absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-emerald-400/40" />

              {/* Top tag */}
              <div className="center-deco-extra absolute top-5 left-1/2 -translate-x-1/2">
                <span className="text-[9px] font-mono text-amber-100/50 tracking-[0.4em] uppercase">Portfolio</span>
              </div>

              {/* Big typography — stays longer */}
              <div className="text-center">
                <h2 className="center-deco-heading text-[clamp(2rem,5vw,4rem)] text-amber-100 font-extrabold leading-[1] tracking-tight">
                  <span className="work-char inline-block" data-original="W">W</span>
                  <span className="work-char inline-block text-emerald-400" data-original="O">O</span>
                  <span className="work-char inline-block" data-original="R">R</span>
                  <span className="work-char inline-block" data-original="K">K</span>
                </h2>
                <p className="center-deco-extra text-[11px] font-mono text-white/30 tracking-[0.15em] mt-1">
                  <span className="text-emerald-400/60">&gt;</span> sudo show-off<span className="text-emerald-400/70 animate-pulse">▋</span>
                </p>
              </div>

              {/* Bottom status */}
              <div className="center-deco-extra absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
                <span className="text-[8px] font-mono text-emerald-400/40 tracking-[0.3em] uppercase">permission: granted</span>
              </div>
            </div>

          </div>

          {/* Cell 4: Tech marquee vertical */}
          <div
            ref={(el) => { cellRefs.current[4] = el; }}
            className="relative bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="animate-marquee-vertical">
                {[...Array(4)].map((_, r) => (
                  <div key={r} className="flex flex-col items-center">
                    {["Python", "TypeScript", "Next.js", "LangChain", "React", "Node", "Azure", "FastAPI", "Neo4j", "GSAP",
                      "Docker", "Redis", "PostgreSQL", "TailwindCSS", "Prisma", "GraphQL"].map((t, i) => (
                        <span key={`${r}-${i}`} className="text-[11px] font-mono text-emerald-400/35 tracking-[0.25em] uppercase text-center whitespace-nowrap leading-[2.4]">
                          {t}
                        </span>
                      ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute bottom-3 right-3">
              <span className="text-[9px] font-mono text-emerald-400/20 tracking-[0.3em] uppercase">STACK.DB</span>
            </div>
          </div>
        </div>

        {/* Bottom row: 2 cells */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {/* Cell 5: Data stream */}
          <div
            ref={(el) => { cellRefs.current[5] = el; }}
            className="relative bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 flex flex-col justify-center gap-3 overflow-hidden">
              {[
                { text: "0x4B1F ── NEURAL.INIT ── λ:0.003 ── EPOCH:247 ── ██████░░ 78% ── LOSS:0.0012 ── ACC:99.1 ── 0xA3E7 ── DEPLOYING ── ", dir: "left", speed: "25s" },
                { text: "▸ INGEST → CHUNK → EMBED → INDEX → RETRIEVE → RANK → GENERATE → VALIDATE → SHIP ▸ REPEAT ── ∞ ── ", dir: "right", speed: "32s" },
                { text: "ssh root@prod ── building... ── ✓ tests passed ── ✓ lint clean ── pushing 4f2a9c1 ── live in 3..2..1 ── ", dir: "left", speed: "28s" },
                { text: "┌ TRANSFORMER ┐ ── attention(Q,K,V) ── softmax(QKᵀ/√d) ── FFN ── LayerNorm ── ∂L/∂θ ── backprop ── ", dir: "right", speed: "35s" },
                { text: "fetch → parse → transform → cache → render → hydrate → interact → log → optimize → repeat → ", dir: "left", speed: "22s" },
              ].map((line, i) => (
                <div key={i} className={`flex whitespace-nowrap ${line.dir === "left" ? "animate-stream-left" : "animate-stream-right"}`}
                  style={{ animationDuration: line.speed }}>
                  <span className="text-[9px] md:text-[10px] font-mono text-emerald-400/30 tracking-wider">{line.text}</span>
                  <span className="text-[9px] md:text-[10px] font-mono text-emerald-400/30 tracking-wider">{line.text}</span>
                </div>
              ))}
            </div>
            <div className="absolute bottom-3 left-3">
              <span className="text-[9px] font-mono text-emerald-400/20 tracking-[0.3em] uppercase">SYS.STREAM</span>
            </div>
          </div>

          {/* Cell 6: Decrypt animation */}
          <div
            ref={(el) => { cellRefs.current[6] = el; }}
            className="relative bg-white/[0.03] border border-white/[0.06] rounded-xl overflow-hidden"
          >
            <DecryptCell />
            <div className="absolute bottom-3 right-3">
              <span className="text-[9px] font-mono text-emerald-400/20 tracking-[0.3em] uppercase">DECRYPT.BIN</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Project showcase — separate layer on top of grid ── */}
      <div className="work-showcase absolute inset-0 z-30 bg-background overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.04] z-10">
          <div className="work-progress-fill h-full origin-left"
            style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.5), rgba(253,230,138,0.4))", transform: "scaleX(0)" }} />
        </div>

        {/* Horizontal track */}
        <div ref={horizontalRef} className="flex h-full" style={{ width: `${projects.length * 100}vw` }}>
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="w-screen h-full flex items-center shrink-0 relative"
            >
              <div className="w-full px-[8%] md:px-[12%] flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="max-w-[600px]">
                  <span className={`work-project-item-${i} text-[10px] font-mono text-emerald-400/60 tracking-[0.3em] uppercase block mb-4`}>
                    {project.tag}
                  </span>
                  <h3 className={`work-project-item-${i} text-[clamp(2rem,5vw,4.5rem)] font-extrabold text-foreground leading-[1] tracking-tight mb-4`}>
                    {project.title}
                  </h3>
                  <div className={`work-project-item-${i} w-16 h-[1px] mb-5`}
                    style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.4), rgba(253,230,138,0.2), transparent)" }} />
                  <p className={`work-project-item-${i} text-foreground/40 text-sm md:text-base leading-relaxed max-w-[440px] mb-8`}>
                    {project.desc}
                  </p>
                  <div className={`work-project-item-${i} flex items-center gap-4`}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 border border-white/[0.08] px-5 py-2.5 rounded-full text-xs font-mono text-white/50 hover:border-emerald-400/30 hover:text-emerald-400 transition-all duration-300"
                    >
                      Live
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-2 border border-white/[0.08] px-5 py-2.5 rounded-full text-xs font-mono text-white/50 hover:border-amber-100/30 hover:text-amber-100 transition-all duration-300"
                    >
                      GitHub
                      <GitBranch className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                {/* Project image with cursor-following glitch */}
                <div className={`work-project-item-${i} relative`}>
                  <div
                    className="project-img-wrap relative w-[320px] h-[230px] md:w-[500px] md:h-[360px]"
                    onMouseMove={(e) => {
                      const wrap = e.currentTarget;
                      const rect = wrap.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      // Position glitch shapes around cursor
                      const shapes = wrap.querySelectorAll(".glitch-shape") as NodeListOf<HTMLElement>;
                      shapes.forEach((shape, si) => {
                        const angle = (si / shapes.length) * Math.PI * 2 + Date.now() * 0.005;
                        const radius = 15 + Math.random() * 25;
                        const shapeSize = parseFloat(shape.style.width) || 30;
                        const sx = x + Math.cos(angle) * radius - shapeSize / 2;
                        const sy = y + Math.sin(angle) * radius - shapeSize / 2;
                        shape.style.left = `${sx}px`;
                        shape.style.top = `${sy}px`;
                        shape.style.opacity = "1";
                      });
                    }}
                    onMouseEnter={(e) => {
                      const shapes = e.currentTarget.querySelectorAll(".glitch-shape") as NodeListOf<HTMLElement>;
                      shapes.forEach((s) => { s.style.display = "block"; });
                    }}
                    onMouseLeave={(e) => {
                      const shapes = e.currentTarget.querySelectorAll(".glitch-shape") as NodeListOf<HTMLElement>;
                      shapes.forEach((s) => { s.style.display = "none"; });
                    }}
                  >
                    {/* Emerald accent border — offset for depth */}
                    <div className="absolute -top-3 -left-3 w-full h-full border border-emerald-400/20 rounded-lg" />

                    {/* Main image */}
                    <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/[0.08]">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                      />
                      {/* Scan lines */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-[0.04]"
                        style={{
                          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
                        }}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                    </div>

                    {/* Glitch shapes — triangles, circles, pentagons, hexagons, diamonds */}
                    {[
                      { type: "triangle", size: 35, color: "#10b981" },
                      { type: "circle", size: 28, color: "#f87171" },
                      { type: "pentagon", size: 32, color: "#a78bfa" },
                      { type: "diamond", size: 30, color: "#fb923c" },
                      { type: "hexagon", size: 34, color: "#60a5fa" },
                      { type: "circle", size: 26, color: "#10b981" },
                      { type: "triangle", size: 30, color: "#fde68a" },
                      { type: "hexagon", size: 28, color: "#f87171" },
                      { type: "diamond", size: 32, color: "#10b981" },
                      { type: "pentagon", size: 30, color: "#60a5fa" },
                    ].map((s, si) => {
                      const sz = s.size;
                      const common: React.CSSProperties = { display: "none", width: `${sz}px`, height: `${sz}px` };
                      if (s.type === "circle") {
                        return <div key={si} className="glitch-shape" style={{ ...common, borderRadius: "50%", background: s.color }} />;
                      }
                      if (s.type === "diamond") {
                        return <div key={si} className="glitch-shape" style={{ ...common, background: s.color, transform: "rotate(45deg)" }} />;
                      }
                      // triangle, pentagon, hexagon via clip-path
                      const clips: Record<string, string> = {
                        triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
                        pentagon: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                        hexagon: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                      };
                      return <div key={si} className="glitch-shape" style={{ ...common, background: s.color, clipPath: clips[s.type] }} />;
                    })}

                    {/* Number — dark, bold, half outside at bottom-right */}
                    <span
                      className="absolute text-[clamp(5rem,12vw,10rem)] font-black font-mono leading-none select-none z-20 italic"
                      style={{
                        bottom: "-3rem",
                        right: "-2rem",
                        color: "rgba(21,21,21,0.9)",
                        WebkitTextStroke: "3px rgba(16,185,129,0.6)",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Corner accents */}
                    <div className="absolute -bottom-1 -left-1 w-5 h-5 border-b border-l border-emerald-400/30" />
                    <div className="absolute -top-1 -right-1 w-5 h-5 border-t border-r border-emerald-400/15" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-6 right-8 text-[9px] font-mono text-white/20">
                {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom corner */}
      {/* <div className="absolute bottom-3 right-6 text-[9px] text-white/40 font-mono z-20">
        ┘ work
      </div> */}
    </section>
  );
}
