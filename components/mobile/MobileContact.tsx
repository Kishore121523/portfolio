"use client";

import { Phone, Mail, Github, Linkedin, Instagram } from "lucide-react";
import Reveal from "./Reveal";

const cards = [
  { href: "tel:+917373219696", icon: Phone, label: "Phone", value: "+91 7373219696" },
  { href: "mailto:kishore231512@gmail.com", icon: Mail, label: "Email", value: "kishore231512@gmail.com" },
];

const socials = [
  { href: "https://github.com/Kishore121523", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/kishore-yogeswaran-7946291a6/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/_kishoredesigns_/", icon: Instagram, label: "Instagram" },
];

export default function MobileContact() {
  return (
    <section id="contact" className="relative bg-background px-6 pt-8 pb-16 scroll-mt-24">
      <Reveal>
        <p
          className="text-amber-100/25 uppercase tracking-[0.2em] mb-3"
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "10px" }}
        >
          // don&apos;t be a stranger
        </p>
        <h2 className="text-[clamp(2rem,9vw,3rem)] font-medium leading-[1.1] text-amber-100/60">
          Got a{" "}
          <span className="text-amber-100" style={{ fontFamily: "var(--font-playfair)", fontWeight: 900, fontStyle: "italic" }}>
            project
          </span>{" "}
          in mind?
          <br />
          Let&apos;s make it <span className="text-emerald-400 font-bold">happen</span>
          <span className="text-amber-100/20">.</span>
        </h2>
        <p className="text-emerald-400/40 text-base mt-3" style={{ fontFamily: "var(--font-caveat)" }}>
          I reply faster than my builds!
        </p>
      </Reveal>

      <div className="mt-10 flex flex-col gap-3">
        {cards.map(({ href, icon: Icon, label, value }, i) => (
          <Reveal key={label} delay={i * 80}>
            <a
              href={href}
              className="flex items-center gap-4 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 active:bg-white/[0.06] transition-colors"
            >
              <span className="w-11 h-11 rounded-xl bg-amber-100/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-amber-100" />
              </span>
              <span className="min-w-0">
                <span className="block text-foreground/40 text-[10px] uppercase tracking-[0.2em] mb-1">{label}</span>
                <span className="block text-foreground font-medium text-sm truncate">{value}</span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120} className="mt-5 flex gap-3">
        {socials.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center active:bg-white/[0.08] transition-colors"
          >
            <Icon className="w-5 h-5 text-foreground/50" />
          </a>
        ))}
      </Reveal>

      <Reveal delay={160}>
        <p
          className="text-emerald-400/40 mt-8"
          style={{ fontFamily: "var(--font-space-mono)", fontSize: "10px" }}
        >
          git commit -m &quot;reached the end, hire me&quot;
        </p>
      </Reveal>
    </section>
  );
}
