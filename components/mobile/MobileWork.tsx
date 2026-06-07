"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, GitBranch } from "lucide-react";
import Reveal from "./Reveal";

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

export default function MobileWork() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = () => {
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
    <section id="work" className="relative bg-background pt-8 pb-8 scroll-mt-24">
      <Reveal className="px-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] font-mono text-emerald-400/60 tracking-[0.4em] uppercase">
              // portfolio
            </span>
            <h2 className="mt-3 text-[clamp(3rem,16vw,5rem)] font-extrabold text-amber-100 leading-[0.95] tracking-tight">
              W<span className="text-emerald-400">O</span>RK
            </h2>
          </div>
          <span className="text-[10px] font-mono text-white/25 tracking-wider flex items-center gap-1 pb-2">
            swipe <span className="text-emerald-400/50">→</span>
          </span>
        </div>
      </Reveal>

      {/* Horizontal project slider */}
      <div
        ref={sliderRef}
        onScroll={onScroll}
        className="no-scrollbar mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory px-6 pb-1"
        style={{ scrollPaddingLeft: "24px", scrollPaddingRight: "24px" }}
      >
        {projects.map((p, i) => (
          <article
            key={p.title}
            className="snap-start shrink-0 w-[82%] rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden flex flex-col"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                className="w-full aspect-[16/10] object-cover object-top"
              />
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.4) 2px, rgba(0,0,0,0.4) 4px)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              <span
                className="absolute bottom-1 right-3 text-[3.25rem] font-black font-mono leading-none select-none italic"
                style={{
                  color: "rgba(25,25,25,1)",
                  WebkitTextStroke: "2px rgba(16,185,129,0.5)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Text */}
            <div className="p-5 flex flex-col flex-1">
              <span className="text-[10px] font-mono text-emerald-400/80 tracking-[0.25em] uppercase">
                {p.tag}
              </span>
              <h3 className="text-2xl font-extrabold text-amber-100 leading-tight tracking-tight mt-2">
                {p.title}
              </h3>
              <div
                className="w-12 h-[1px] my-3"
                style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.4), rgba(253,230,138,0.2), transparent)" }}
              />
              <p className="text-amber-100/70 text-[13.5px] leading-relaxed flex-1">{p.desc}</p>
              <div className="flex items-center gap-3 mt-5">
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-white/[0.1] px-4 py-2 rounded-full text-xs font-mono text-emerald-400/80 active:border-amber-100/30 active:text-amber-100 transition-colors"
                >
                  Live <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-white/[0.1] px-4 py-2 rounded-full text-xs font-mono text-emerald-400/80 active:border-amber-100/30 active:text-amber-100 transition-colors"
                >
                  Code <GitBranch className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dot indicators */}
      <div className="px-6 flex items-center gap-2 mt-5">
        {projects.map((p, i) => (
          <button
            key={p.title}
            onClick={() => goTo(i)}
            aria-label={`Go to ${p.title}`}
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
    </section>
  );
}
