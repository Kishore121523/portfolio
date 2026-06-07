"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";

interface Entry {
  title: string;
  org: string;
  type: "work" | "cert" | "edu";
}

const timeline: { year: string; entries: Entry[] }[] = [
  {
    year: "2026",
    entries: [
      { title: "AI Solutions Engineer", org: "Wadhwani Foundation", type: "work" },
    ],
  },
  {
    year: "2025",
    entries: [
      { title: "Generative AI Engineer", org: "Wadhwani Foundation", type: "work" },
      { title: "AI Developer (Freelance)", org: "AI RoundTable Inc.", type: "work" },
      { title: "Gen AI Models for NLP", org: "IBM - Coursera", type: "cert" },
      { title: "Generative AI and LLMs", org: "IBM - Coursera", type: "cert" },
      { title: "AWS Cloud Practitioner", org: "Udemy", type: "cert" },
    ],
  },
  {
    year: "2024",
    entries: [
      { title: "React - Complete Guide", org: "Udemy", type: "cert" },
      { title: "Masters in Computer Science", org: "Lakehead University", type: "edu" },
      { title: "Google DevFest Hackathon", org: "Runner Up - Google", type: "edu" },
    ],
  },
  {
    year: "2023",
    entries: [
      { title: "Advanced Learning Algorithms", org: "Stanford Online", type: "cert" },
      { title: "Bachelors in Computer Science", org: "SASTRA University", type: "edu" },
      { title: "Node.js Developer Course", org: "Udemy", type: "cert" },
      { title: "Supervised Machine Learning", org: "Stanford Online", type: "cert" },
      { title: "Full-Stack Developer", org: "Accenture", type: "work" },
    ],
  },
  {
    year: "2022",
    entries: [
      { title: "Machine Learning OnRamp", org: "MathWorks", type: "cert" },
      { title: "MERN Stack Developer", org: "Trinal Web Pvt Limited", type: "work" },
    ],
  },
  {
    year: "2021",
    entries: [
      { title: "Rotational Internship", org: "Web Dev / Design / Frontend", type: "work" },
      { title: "Web Development Intern", org: "Sparks Foundation", type: "work" },
    ],
  },
  {
    year: "2020",
    entries: [
      { title: "Adobe XD - UI/UX Design", org: "Udemy", type: "cert" },
      { title: "JavaScript ES6 & CSS", org: "Udemy", type: "cert" },
      { title: "Bootstrap-4 with Projects", org: "Udemy", type: "cert" },
    ],
  },
];

const dot: Record<Entry["type"], string> = {
  work: "bg-amber-400/70",
  cert: "bg-emerald-400/70",
  edu: "bg-blue-400/70",
};
const accent: Record<Entry["type"], string> = {
  work: "text-amber-400/70",
  cert: "text-emerald-400/70",
  edu: "text-blue-400/70",
};
const labelText: Record<Entry["type"], string> = {
  work: "Work",
  cert: "Cert",
  edu: "Education",
};

// Flatten into a single horizontal lane: a year marker followed by its entries.
type Step =
  | { kind: "year"; year: string; count: number; yearIndex: number }
  | { kind: "entry"; year: string; entry: Entry };

const steps: Step[] = timeline.flatMap((block, yi) => [
  { kind: "year", year: block.year, count: block.entries.length, yearIndex: yi } as Step,
  ...block.entries.map((entry) => ({ kind: "entry", year: block.year, entry }) as Step),
]);

export default function MobileSkills() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const yearRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const onScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const probe = el.scrollLeft + 60;
    let cur = 0;
    yearRefs.current.forEach((y, i) => {
      if (y && y.offsetLeft <= probe) cur = i;
    });
    setActive(cur);
  };

  const goTo = (i: number) => {
    const el = sliderRef.current;
    const y = yearRefs.current[i];
    if (!el || !y) return;
    el.scrollTo({ left: Math.max(0, y.offsetLeft - 24), behavior: "smooth" });
  };

  return (
    <section id="skills" className="relative bg-background pt-8 pb-8 scroll-mt-24">
      {/* Heading — left aligned, editorial */}
      <Reveal className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono text-emerald-400/60 tracking-[0.4em] uppercase">
            // timeline
          </span>
          <span className="text-[10px] font-mono text-white/25 tracking-wider flex items-center gap-1">
            swipe <span className="text-emerald-400/50">→</span>
          </span>
        </div>

        <h2 className="mt-2 text-[clamp(2.25rem,11vw,3.25rem)] font-extrabold leading-[1.02] tracking-tight">
          <span className="text-white/35 font-extralight">the </span>
          <span className="text-amber-100">origin</span>
          <span className="text-white/20">.</span>
        </h2>
        <p className="text-emerald-400/40 italic text-2xl mt-2" style={{ fontFamily: "var(--font-caveat)" }}>
          &amp; the bugs along the way...
        </p>
        <div
          className="mt-5 h-[1px] w-full"
          style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.25), rgba(253,230,138,0.12), transparent)" }}
        />
      </Reveal>

      {/* Year slider */}
      <div
        ref={sliderRef}
        onScroll={onScroll}
        className="no-scrollbar flex items-start overflow-x-auto px-6 pb-1"
      >
        {steps.map((s) =>
          s.kind === "year" ? (
            <div
              key={`y-${s.year}`}
              ref={(el) => { yearRefs.current[s.yearIndex] = el; }}
              className="shrink-0 relative h-[210px] pr-4"
            >
              {/* rail line through */}
              <div
                className="absolute top-[26px] left-0 right-0 h-[1.5px]"
                style={{ background: "linear-gradient(90deg, rgba(16,185,129,0.1), rgba(16,185,129,0.45))" }}
              />
              {/* milestone node + year, centered on the rail */}
              <div className="relative z-10 inline-flex items-center bg-background pr-3 mt-[14px]">
                <span className="w-6 h-6 rounded-full border-2 border-emerald-400/60 bg-background flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
                </span>
                <span className="ml-2.5 text-amber-100 font-black text-3xl tracking-tight tabular-nums">
                  {s.year}
                </span>
              </div>
            </div>
          ) : (
            <div key={`e-${s.year}-${s.entry.title}`} className="shrink-0 w-[235px] relative h-[210px]">
              {/* rail line through top */}
              <div
                className="absolute top-[26px] left-0 right-0 h-[1.5px]"
                style={{ background: "rgba(16,185,129,0.25)" }}
              />
              {/* node on the rail */}
              <span className={`absolute top-[26px] left-0 -translate-y-1/2 w-2.5 h-2.5 rounded-full z-10 ${dot[s.entry.type]}`} />
              {/* vertical stub to card */}
              <span className="absolute top-[31px] left-[4px] w-[1.5px] h-[21px] bg-white/[0.12]" />
              {/* card */}
              <div className="absolute top-[52px] left-0 right-4 h-[140px] rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 flex flex-col justify-center">
                <span className={`text-[9px] font-mono uppercase tracking-[0.25em] ${accent[s.entry.type]}`}>
                  {labelText[s.entry.type]}
                </span>
                <p className="text-amber-100 font-bold text-[16.5px] leading-snug mt-2">
                  {s.entry.title}
                </p>
                <p className="text-amber-100/40 text-[13px] leading-snug mt-1.5">{s.entry.org}</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Dot indicators */}
      <div className="px-6 flex items-center gap-2 mt-5">
        {timeline.map((block, i) => (
          <button
            key={block.year}
            onClick={() => goTo(i)}
            aria-label={`Go to ${block.year}`}
            className="focus:outline-none py-1 flex items-center"
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
