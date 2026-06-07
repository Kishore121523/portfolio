"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, ArrowUpRight, Check } from "lucide-react";
import Reveal from "./Reveal";

const circles = [
  { label: "THE APPROACH", n: "01", text: "Understand the mess. Untangle it. Ship it clean. Pretend it was obvious." },
  { label: "THE CRAFT", n: "02", text: "From model weights to font weights — every detail gets the same unhealthy attention." },
  { label: "THE VISION", n: "03", text: "Code that actually works. Interfaces that don't suck. Deadlines that... we'll get there!" },
];

const bioLines = [
  "// fluent in Python, TypeScript & PromptScript!",
  "// RAG, agents, fine-tuning — the usual suspects",
  "// ships code that works (most of the time)",
];

const devPuns = [
  "Trained a model. It trained me back.",
  "git commit -m 'it works, don't ask why'",
  "Gradient descent into madness.",
  "Works in localhost. Ships in hopelost.",
  "99.9% accuracy. 100% overfit.",
  "My vector db remembers more than I do.",
];

export default function MobileAbout() {
  const [copied, setCopied] = useState(false);
  const [punIdx, setPunIdx] = useState(0);
  const [active, setActive] = useState(0);
  const punRef = useRef(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      punRef.current = (punRef.current + 1) % devPuns.length;
      setPunIdx(punRef.current);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const copy = () => {
    navigator.clipboard.writeText("kishore231512@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const onSliderScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const kids = Array.from(el.children) as HTMLElement[];
    let best = 0, bd = Infinity;
    kids.forEach((c, i) => {
      const cc = c.offsetLeft + c.offsetWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bd) { bd = d; best = i; }
    });
    setActive(best);
  };

  const goTo = (i: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const kid = el.children[i] as HTMLElement | undefined;
    if (kid) el.scrollTo({ left: kid.offsetLeft, behavior: "smooth" });
  };

  return (
    <section id="about" className="relative bg-background px-6 pt-8 pb-8 scroll-mt-24">
      {/* Heading — clean, stacked */}
      <Reveal>
        <span className="text-[10px] font-mono text-emerald-400/60 tracking-[0.4em] uppercase">
          // about
        </span>
        <h2 className="mt-5 text-[clamp(2.25rem,11vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight">
          <span className="block">
            <span className="text-white/35 font-extralight">How I </span>
            <span className="text-emerald-400">think</span>
            <span className="text-white/20">.</span>
          </span>
          <span className="block mt-1">
            <span className="text-white/35 font-extralight">What I </span>
            <span className="text-amber-100">ship</span>
            <span className="text-white/20">...</span>
          </span>
        </h2>
        <p
          className="mt-3 text-white/30 italic text-2xl"
          style={{ fontFamily: "var(--font-caveat)" }}
        >
          don&apos;t ask why
        </p>
      </Reveal>

      {/* Terminal bio */}
      <Reveal delay={80} className="mt-10">
        <div
          className="border border-white/[0.06] rounded-lg overflow-hidden"
          style={{ background: "linear-gradient(135deg, rgba(0,240,255,0.02) 0%, transparent 60%)" }}
        >
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06]">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400/40" />
              <span className="w-2 h-2 rounded-full bg-amber-400/40" />
              <span className="w-2 h-2 rounded-full bg-green-400/40" />
            </div>
            <span className="text-[9px] font-mono text-emerald-400/70 tracking-[0.3em] uppercase ml-1">
              SYS.LOG
            </span>
          </div>
          <div className="relative">
            <div className="px-4 py-3.5 font-mono text-[12px] leading-[1.9] overflow-x-auto no-scrollbar">
              {bioLines.map((l, i) => (
                <div key={i} className="flex gap-3 whitespace-nowrap">
                  <span className="text-white/15 select-none w-3 text-right shrink-0 sticky left-0">{i + 1}</span>
                  <span className="text-white/80">{l}</span>
                </div>
              ))}
              <div className="flex gap-3 whitespace-nowrap">
                <span className="text-white/15 select-none w-3 text-right shrink-0 sticky left-0">4</span>
                <span className="text-emerald-400/70 animate-pulse">▋</span>
              </div>
            </div>
            {/* right-edge fade hint */}
            <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l from-[#151515] to-transparent" />
          </div>
        </div>
      </Reveal>

      {/* Dev pun + email/resume in a tighter group */}
      <Reveal delay={120} className="mt-3">
        <div className="border border-white/[0.06] rounded-lg px-4 py-3.5">
          <span className="text-[9px] font-mono text-emerald-400/70 tracking-[0.3em] uppercase block mb-2">
            DEV.LOG
          </span>
          <p className="text-[12.5px] font-mono text-white/80 leading-relaxed min-h-[2.4em]">
            <span className="text-emerald-400/70 mr-1.5">&gt;</span>
            {devPuns[punIdx]}
          </p>
        </div>
      </Reveal>

      <Reveal delay={160} className="mt-3 flex flex-col gap-3">
        <button
          onClick={copy}
          className="w-full border border-white/[0.06] rounded-lg px-4 py-3 text-left active:border-emerald-400/25 transition-colors focus:outline-none"
        >
          <span className="text-[9px] font-mono text-emerald-400/70 tracking-[0.3em] uppercase block mb-1.5">
            EMAIL
          </span>
          <span className="text-white/80 text-[12px] font-mono flex items-center justify-between gap-2">
            {copied ? (
              <span className="text-emerald-400 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> copied to clipboard!
              </span>
            ) : (
              <>
                <span className="truncate">kishore231512@gmail.com</span>
                <Copy className="w-3.5 h-3.5 text-white/60 shrink-0" />
              </>
            )}
          </span>
        </button>
        <a
          href="/Resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="w-full border border-white/[0.06] rounded-lg px-4 py-3 active:border-emerald-400/25 transition-colors"
        >
          <span className="text-[9px] font-mono text-emerald-400/70 tracking-[0.3em] uppercase block mb-1.5">
            RESUME
          </span>
          <span className="text-white/80 text-[12px] font-mono flex items-center justify-between gap-2">
            <span>Resume.pdf</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white/60 shrink-0" />
          </span>
        </a>
      </Reveal>

      {/* Principle cards — horizontal slider */}
      <Reveal delay={120} className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono text-emerald-400/60 tracking-[0.4em] uppercase">
            // principles
          </span>
          <span className="text-[10px] font-mono text-white/25 tracking-wider flex items-center gap-1">
            swipe <span className="text-emerald-400/50">→</span>
          </span>
        </div>

        <div
          ref={sliderRef}
          onScroll={onSliderScroll}
          className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-6 px-6 pb-1"
          style={{ scrollPaddingLeft: "24px", scrollPaddingRight: "24px" }}
        >
          {circles.map((c) => (
            <div
              key={c.label}
              className="snap-start shrink-0 w-[78%] min-h-[230px] relative rounded-2xl border border-white/[0.1] px-6 py-7 overflow-hidden flex flex-col"
              style={{ background: "radial-gradient(circle at 50% 0%, rgba(30,28,25,0.95) 0%, var(--background) 85%)" }}
            >
              <span className="absolute top-5 right-5 text-[11px] font-mono text-emerald-400/60">{c.n}</span>
              <span className="text-[11px] font-mono text-amber-100/70 tracking-[0.3em] uppercase">{c.label}</span>
              <div
                className="w-10 h-[1px] my-4"
                style={{ background: "linear-gradient(90deg, rgba(0,240,255,0.2), rgba(253,230,138,0.25))" }}
              />
              <p className="text-[15px] text-white/65 leading-relaxed font-light">{c.text}</p>
              <div className="mt-auto pt-6 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/50" />
                <span className="h-[1px] flex-1 bg-white/[0.07]" />
                <span className="text-[9px] font-mono text-emerald-400/40 tracking-[0.25em] uppercase whitespace-nowrap">
                  {c.n} / 03
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="flex items-center gap-2 mt-4">
          {circles.map((c, i) => (
            <button
              key={c.label}
              onClick={() => goTo(i)}
              aria-label={`Go to ${c.label}`}
              className="focus:outline-none py-1"
            >
              <span
                className={`block h-[3px] rounded-full transition-all duration-300 ${
                  active === i ? "w-7 bg-emerald-400/70" : "w-3 bg-white/15"
                }`}
              />
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
