"use client";

import { useCallback, useEffect, useRef } from "react";
import { Github, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const greetings = [
  "Hello", "Bonjour", "Hola", "こんにちは", "Привет",
  "Ciao", "안녕하세요", "Olá", "Namaste",
];

const scrambleChars = "!<>-_\\/[]{}—=+*^?#アイウエオカキク";
const nameChars = "Kishore".split("");

const techStack = [
  "Python", "TypeScript", "Next.js",
  "LangChain", "LLM", "RAG",
  "React", "Azure", "Agents",
];

const socials = [
  { href: "https://github.com/Kishore121523", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/kishore-yogeswaran-7946291a6/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/_kishoredesigns_/", icon: Instagram, label: "Instagram" },
  { href: "mailto:kishore231512@gmail.com", icon: Mail, label: "Email" },
];

export default function MobileHero() {
  const greetingRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const greetIdxRef = useRef(0);

  // ── Scramble text effect ──
  const scrambleText = useCallback((el: HTMLElement, target: string, duration = 0.8) => {
    let frame = 0;
    const totalFrames = Math.ceil(duration * 60);
    let rafId: number;
    const update = () => {
      let out = "";
      const progress = frame / totalFrames;
      for (let i = 0; i < target.length; i++) {
        const cp = (progress * target.length - i) / (target.length * 0.3);
        if (cp > 1) out += target[i];
        else if (cp > 0) out += Math.random() > 0.5 ? target[i] : scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        else out += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      }
      el.textContent = out;
      frame++;
      if (frame <= totalFrames) rafId = requestAnimationFrame(update);
      else el.textContent = target;
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Chromatic glitch flicker on a set of elements ──
  const glitch = useCallback((els: (HTMLElement | null)[]) => {
    els.forEach((el, i) => {
      if (!el) return;
      setTimeout(() => {
        el.style.transition = "none";
        el.style.textShadow = "2px 0 #ff003c, -2px 0 #00f0ff";
        el.style.transform = `translateX(${Math.random() > 0.5 ? 2 : -2}px) skewX(${(Math.random() - 0.5) * 16}deg)`;
        setTimeout(() => {
          el.style.textShadow = "-1px 0 #00f0ff, 1px 0 #ff003c";
          el.style.transform = `translateX(${Math.random() > 0.5 ? 1 : -1}px)`;
        }, 60);
        setTimeout(() => {
          el.style.transition = "transform 0.3s ease, text-shadow 0.3s ease";
          el.style.textShadow = "none";
          el.style.transform = "none";
        }, 120);
      }, i * 35);
    });
  }, []);

  // ── Greeting cycle + glitch loop ──
  useEffect(() => {
    // initial glitch
    const intro = setTimeout(() => glitch(charRefs.current), 400);

    const greetId = setInterval(() => {
      greetIdxRef.current = (greetIdxRef.current + 1) % greetings.length;
      if (greetingRef.current) scrambleText(greetingRef.current, greetings[greetIdxRef.current], 0.8);
      glitch(charRefs.current);
    }, 2800);

    const chipId = setInterval(() => glitch(chipRefs.current), 4000);

    return () => {
      clearTimeout(intro);
      clearInterval(greetId);
      clearInterval(chipId);
    };
  }, [scrambleText, glitch]);

  return (
    <section id="home" className="relative min-h-[100svh] w-full overflow-hidden flex flex-col">
      {/* Background image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/forestDark.png')" }}
      />
      {/* Contrast scrims — vertical fade + left darkening under text + vignette */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-background/85 via-background/65 to-background" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background/90 via-background/40 to-transparent" />
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(120% 80% at 30% 35%, transparent 35%, rgba(21,21,21,0.55) 100%)" }}
      />
      {/* Scanlines */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.6) 2px, rgba(0,0,0,0.6) 4px)",
        }}
      />

      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 pt-24 pb-10">
        {/* Greeting */}
        <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-light mb-4">
          <span
            ref={greetingRef}
            className="inline-block min-w-[5ch] text-emerald-400"
            style={{ textShadow: "0 0 12px rgba(16,185,129,0.25)" }}
          >
            Hola
          </span>
          <span className="text-white/40">, I am</span>
        </p>

        {/* Name — per-char for glitch */}
        <h1 className="flex text-[clamp(3.5rem,18vw,5.5rem)] font-extrabold text-amber-100 leading-[0.95] tracking-tight">
          {nameChars.map((c, i) => (
            <span
              key={i}
              ref={(el) => { charRefs.current[i] = el; }}
              className="inline-block"
              style={{ willChange: "transform" }}
            >
              {c}
            </span>
          ))}
        </h1>

        <p className="text-white/55 text-sm font-mono tracking-[0.2em] mt-3">
          AI Engineer <span className="text-emerald-400/70">//</span> Designer
        </p>

        {/* Location */}
        <div className="flex items-center gap-2.5 mt-3">
          <span className="relative w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
            <span className="absolute inset-0 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs text-white/60 font-mono uppercase tracking-wider">India</span>
        </div>

        {/* Statement */}
        <p className="mt-8 text-[clamp(1.5rem,7.5vw,2.1rem)] font-extrabold text-white leading-[1.12] tracking-tight">
          Somewhere between{" "}
          <span className="italic font-light text-emerald-400" style={{ fontFamily: "Georgia, serif" }}>
            design
          </span>{" "}
          and <span className="text-amber-100">algorithms</span>
          <span className="text-white/30">,</span> I found my{" "}
          <span className="text-white/35">thing.</span>
        </p>

        <p className="mt-6 text-[13px] text-white/65 leading-relaxed font-light max-w-[36ch]">
          Full-stack across Next.js, Python &amp; cloud — sharp focus on Generative AI,
          LangChain &amp; RAG pipelines people actually use.
        </p>

        {/* Tech chips */}
        <div className="mt-7 flex flex-wrap gap-2">
          {techStack.map((t, i) => (
            <span
              key={t}
              ref={(el) => { chipRefs.current[i] = el; }}
              className="text-[10px] font-mono text-white/55 uppercase tracking-wider border border-white/15 bg-white/[0.04] backdrop-blur-sm rounded-[3px] px-2.5 py-1.5"
              style={{ willChange: "transform" }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-9 flex items-center gap-5">
          <a
            href="mailto:kishore231512@gmail.com"
            className="group flex items-center gap-2 bg-amber-100 text-background px-6 py-3 rounded-full text-sm font-semibold active:scale-95 transition-transform shadow-[0_0_30px_rgba(253,230,138,0.15)]"
          >
            Let&apos;s Talk
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-white/55 text-sm font-mono underline underline-offset-4 decoration-white/20"
          >
            Resume.pdf
          </a>
        </div>

        {/* Socials */}
        <div className="mt-8 flex items-center gap-3.5">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="w-11 h-11 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm flex items-center justify-center active:border-amber-100/40 active:bg-amber-100/5 transition-colors"
            >
              <Icon className="w-5 h-5 text-white/55" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="relative z-10 pb-12 flex flex-col items-center gap-2">
        <span className="text-[9px] font-mono text-white/35 tracking-[0.3em] uppercase">scroll</span>
        <span className="w-[1px] h-8 bg-gradient-to-b from-emerald-400/50 to-transparent" />
      </div>
    </section>
  );
}
