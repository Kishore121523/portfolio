"use client";

import { useRef, useLayoutEffect, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Instagram, Linkedin, Mail, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const greetings = [
  "Hello", "Bonjour", "Hola", "こんにちは", "Привет",
  "Ciao", "안녕하세요", "Olá", "Namaste", "Merhaba",
  "Hej", "Salut", "Hallo", "Γεια σου",
];

const scrambleChars = "!<>-_\\/[]{}—=+*^?#アイウエオカキク";
const nameChars = "KISHORE".split("");

const techStack = [
  "Python", "TypeScript", "Next.js",
  "LangChain", "LLM", "RAG",
  "React", "Azure", "Agents",
];

export default function HeroIntroText() {
  const introRef = useRef<HTMLDivElement>(null);
  const nameBlockRef = useRef<HTMLDivElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const techRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const isSettledRef = useRef(false);
  const greetingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const greetingIndexRef = useRef(0);

  // ── Text scramble effect ──
  const scrambleText = useCallback((element: HTMLElement, targetText: string, duration = 0.8) => {
    const chars = scrambleChars;
    let frame = 0;
    const totalFrames = Math.ceil(duration * 60);
    let rafId: number;

    const update = () => {
      let output = "";
      const progress = frame / totalFrames;

      for (let i = 0; i < targetText.length; i++) {
        const charProgress = (progress * targetText.length - i) / (targetText.length * 0.3);
        if (charProgress > 1) {
          output += targetText[i];
        } else if (charProgress > 0) {
          output += Math.random() > 0.5
            ? targetText[i]
            : chars[Math.floor(Math.random() * chars.length)];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.textContent = output;
      frame++;

      if (frame <= totalFrames) {
        rafId = requestAnimationFrame(update);
      } else {
        element.textContent = targetText;
      }
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // ── Greeting cycle + character scatter ──
  useEffect(() => {
    // Glitch + swap animation for tech grid
    const glitchAndSwapTech = () => {
      const refs = techRefs.current;

      // Phase 1: Glitch all items
      refs.forEach((el, i) => {
        if (!el) return;
        const delay = i * 0.03;
        gsap.timeline({ delay })
          .to(el, {
            textShadow: "2px 0 #ff003c, -2px 0 #00f0ff",
            borderColor: "rgba(255, 0, 60, 0.3)",
            background: "rgba(255, 0, 60, 0.06)",
            skewX: gsap.utils.random(-10, 10),
            duration: 0.06,
            ease: "steps(1)",
          })
          .to(el, {
            textShadow: "-1px 0 #00f0ff, 1px 0 #ff003c",
            borderColor: "rgba(0, 240, 255, 0.2)",
            background: "rgba(0, 240, 255, 0.04)",
            skewX: gsap.utils.random(-6, 6),
            duration: 0.06,
            ease: "steps(1)",
          })
          .to(el, {
            textShadow: "none",
            borderColor: "rgba(253, 230, 138, 0.1)",
            background: "rgba(253, 230, 138, 0.02)",
            skewX: 0,
            duration: 0.3,
            ease: "power2.out",
          });
      });

      // Phase 2: Pick 2 random pairs to swap positions
      const numSwaps = 2;
      const indices = [...Array(refs.length).keys()];
      for (let s = 0; s < numSwaps; s++) {
        if (indices.length < 2) break;
        const aIdx = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];
        const bIdx = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];
        const elA = refs[aIdx];
        const elB = refs[bIdx];
        if (!elA || !elB) continue;

        const rectA = elA.getBoundingClientRect();
        const rectB = elB.getBoundingClientRect();
        const dx = rectB.left - rectA.left;
        const dy = rectB.top - rectA.top;

        // Animate A to B's position and B to A's position
        gsap.timeline({ delay: 0.2 })
          .to(elA, {
            x: `+=${dx}`, y: `+=${dy}`,
            duration: 0.5, ease: "power3.inOut",
          }, 0)
          .to(elB, {
            x: `-=${dx}`, y: `-=${dy}`,
            duration: 0.5, ease: "power3.inOut",
          }, 0)
          .call(() => {
            // Swap text content and reset transforms
            const textA = elA.textContent;
            const textB = elB.textContent;
            gsap.set(elA, { x: 0, y: 0 });
            gsap.set(elB, { x: 0, y: 0 });
            elA.textContent = textB;
            elB.textContent = textA;
          });
      }
    };

    let techIntervalId: ReturnType<typeof setInterval> | null = null;

    const glitchChars = () => {
      charRefs.current.forEach((char, i) => {
        if (!char) return;
        const delay = i * 0.03;
        gsap.timeline({ delay })
          .to(char, {
            textShadow: "2px 0 #ff003c, -2px 0 #00f0ff, 0 0 12px rgba(255,0,60,0.3)",
            borderColor: "rgba(255, 0, 60, 0.25)",
            background: "rgba(255, 0, 60, 0.04)",
            duration: 0.06,
            ease: "steps(1)",
          })
          .to(char, {
            textShadow: "-2px 0 #00f0ff, 2px 0 #ff003c, 0 0 12px rgba(0,240,255,0.25)",
            borderColor: "rgba(0, 240, 255, 0.2)",
            background: "rgba(0, 240, 255, 0.03)",
            duration: 0.06,
            ease: "steps(1)",
          })
          .to(char, {
            y: gsap.utils.random(-6, 6),
            x: gsap.utils.random(-2, 2),
            skewX: gsap.utils.random(-12, 12),
            rotateZ: gsap.utils.random(-5, 5),
            textShadow: "none",
            borderColor: "rgba(253, 230, 138, 0.12)",
            background: "rgba(253, 230, 138, 0.02)",
            duration: 0.35,
            ease: "power2.out",
          });
      });
    };

    const checker = setInterval(() => {
      if (isSettledRef.current && !greetingIntervalRef.current && greetingRef.current) {
        greetingIndexRef.current = 0;
        scrambleText(greetingRef.current, greetings[0], 0.8);
        glitchChars();
        glitchAndSwapTech();

        // Tech grid on its own slower cycle (5s)
        if (!techIntervalId) {
          techIntervalId = setInterval(() => {
            if (!isSettledRef.current) {
              if (techIntervalId) { clearInterval(techIntervalId); techIntervalId = null; }
              return;
            }
            glitchAndSwapTech();
          }, 5000);
        }

        greetingIntervalRef.current = setInterval(() => {
          if (!greetingRef.current || !isSettledRef.current) {
            if (greetingIntervalRef.current) {
              clearInterval(greetingIntervalRef.current);
              greetingIntervalRef.current = null;
            }
            return;
          }
          greetingIndexRef.current = (greetingIndexRef.current + 1) % greetings.length;
          scrambleText(greetingRef.current, greetings[greetingIndexRef.current], 0.8);
          glitchChars();
        }, 2500);
      } else if (!isSettledRef.current && greetingIntervalRef.current) {
        clearInterval(greetingIntervalRef.current);
        greetingIntervalRef.current = null;
        if (techIntervalId) { clearInterval(techIntervalId); techIntervalId = null; }
        if (greetingRef.current) greetingRef.current.textContent = "Hi";
        greetingIndexRef.current = 0;
      }
    }, 300);

    return () => {
      clearInterval(checker);
      if (greetingIntervalRef.current) clearInterval(greetingIntervalRef.current);
      if (techIntervalId) clearInterval(techIntervalId);
    };
  }, [scrambleText]);

  // ── Main scroll-driven timeline ──
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero-section",
          start: "top top",
          end: "+=400%",
          scrub: 0.6,
          onUpdate: (self) => {
            isSettledRef.current = self.progress > 0.6;
          },
        },
      });

      // Hide content initially
      gsap.set(contentRef.current, { autoAlpha: 0 });

      // Char boxes: transparent borders initially
      gsap.set(".kishore-char", {
        borderColor: "rgba(253, 230, 138, 0)",
        background: "transparent",
      });

      // Name starts small, centered
      gsap.set(nameBlockRef.current, { xPercent: -50, yPercent: -50, scale: 0.6 });

      // ── Phase 1: Name slides up through hole ──
      tl.fromTo(
        nameBlockRef.current,
        { yPercent: 180, opacity: 1, scale: 0.6 },
        { yPercent: -50, opacity: 1, scale: 0.6, duration: 4, ease: "none" },
        12
      );

      // ── Phase 2: Glitch activation + Move to top-left ──
      tl.addLabel("glitchStart", ">+0.5");

      tl.to(".kishore-char", {
        borderColor: "rgba(253, 230, 138, 0.3)",
        background: "rgba(253, 230, 138, 0.04)",
        duration: 0.3,
        stagger: 0.04,
        ease: "steps(3)",
      }, "glitchStart");

      charRefs.current.forEach((char, i) => {
        if (!char) return;
        tl.fromTo(char, { textShadow: "none" }, {
          textShadow: "2px 0 #ff003c, -2px 0 #00f0ff",
          duration: 0.15, yoyo: true, repeat: 3, ease: "steps(2)",
        }, `glitchStart+=${i * 0.03}`);

        tl.fromTo(char, { y: 0, x: 0, skewX: 0 }, {
          y: "random(-12, 12)", x: "random(-5, 5)", skewX: "random(-25, 25)",
          duration: 0.08, yoyo: true, repeat: 5, ease: "steps(1)",
        }, `glitchStart+=${i * 0.02}`);
      });

      tl.fromTo(".greeting-line", { textShadow: "none" }, {
        textShadow: "1px 0 #ff003c, -1px 0 #00f0ff",
        duration: 0.2, yoyo: true, repeat: 3, ease: "steps(2)",
      }, "glitchStart");

      tl.addLabel("moveToLeft", "glitchStart+=0.3");

      tl.to(nameBlockRef.current, {
        x: () => {
          const el = nameBlockRef.current;
          if (!el) return 0;
          const maxW = Math.min(window.innerWidth - 48, 1152);
          const gridLeft = (window.innerWidth - maxW) / 2 + 24;
          return gridLeft - window.innerWidth / 2 + (el.offsetWidth * 0.85) / 2;
        },
        y: () => {
          const el = nameBlockRef.current;
          if (!el) return 0;
          const targetTop = 80;
          return targetTop - window.innerHeight / 2 + (el.offsetHeight * 0.85) / 2;
        },
        scale: 0.85,
        duration: 2.5,
        ease: "power3.inOut",
      }, "moveToLeft");

      charRefs.current.forEach((char) => {
        if (!char) return;
        tl.to(char, {
          y: gsap.utils.random(-6, 6), x: gsap.utils.random(-2, 2),
          skewX: gsap.utils.random(-12, 12), rotateZ: gsap.utils.random(-5, 5),
          textShadow: "none",
          borderColor: "rgba(253, 230, 138, 0.12)",
          background: "rgba(253, 230, 138, 0.02)",
          duration: 0.4, ease: "power2.out",
        }, "moveToLeft+=1.8");
      });

      tl.to(".greeting-line", {
        textShadow: "none", duration: 0.3, ease: "power2.out",
      }, "moveToLeft+=1.8");

      // ── Phase 3: Editorial content appears ──
      tl.to(contentRef.current, {
        autoAlpha: 1, duration: 0.5, ease: "power2.out",
      }, "moveToLeft+=3");

      // Big statement lines slide in
      tl.fromTo(".hero-line-1", {
        x: -200, opacity: 0, skewX: -8,
      }, {
        x: 0, opacity: 1, skewX: 0,
        duration: 2, ease: "power3.out",
      }, "moveToLeft+=3.2");

      tl.fromTo(".hero-line-2", {
        x: 200, opacity: 0, skewX: 8,
      }, {
        x: 0, opacity: 1, skewX: 0,
        duration: 2, ease: "power3.out",
      }, "moveToLeft+=4");

      tl.fromTo(".hero-line-3", {
        x: -150, opacity: 0, skewX: -5,
      }, {
        x: 0, opacity: 1, skewX: 0,
        duration: 2, ease: "power3.out",
      }, "moveToLeft+=4.8");

      // Scattered elements float in
      tl.fromTo(".scatter-el", {
        opacity: 0, scale: 0.5, rotation: "random(-30, 30)",
      }, {
        opacity: 1, scale: 1, rotation: 0,
        duration: 1.2, stagger: 0.15, ease: "back.out(1.4)",
      }, "moveToLeft+=4.5");

      // Social links slide up
      tl.fromTo(".social-float", {
        y: 40, opacity: 0,
      }, {
        y: 0, opacity: 1,
        duration: 1, stagger: 0.12, ease: "power3.out",
      }, "moveToLeft+=5.5");

      // Wireframe globe spin in
      tl.fromTo(".wireframe-globe", {
        scale: 0, rotation: -180, opacity: 0,
      }, {
        scale: 1, rotation: 0, opacity: 1,
        duration: 2, ease: "power3.out",
      }, "moveToLeft+=4");

      // Tech grid glitch in
      tl.fromTo(".tech-grid-item", {
        opacity: 0, y: 20, skewX: "random(-15, 15)",
        textShadow: "2px 0 #ff003c, -2px 0 #00f0ff",
      }, {
        opacity: 1, y: "random(-2, 2)", skewX: "random(-3, 3)",
        textShadow: "none",
        duration: 1, stagger: 0.08, ease: "power2.out",
      }, "moveToLeft+=5");

      // Crosshair targets
      tl.fromTo(".crosshair", {
        scale: 3, opacity: 0,
      }, {
        scale: 1, opacity: 0.2,
        duration: 1.2, stagger: 0.2, ease: "power2.out",
      }, "moveToLeft+=5");

    }, introRef);

    return () => ctx.revert();
  }, [scrambleText]);

  return (
    <div ref={introRef} className="absolute inset-0 z-[5] pointer-events-none">
      {/* ── Name Block ── */}
      <div
        ref={nameBlockRef}
        className="absolute top-1/2 left-1/2 text-center text-white whitespace-nowrap"
      >
        <p className="greeting-line text-lg sm:text-xl text-white/50 mb-3 tracking-[0.25em] uppercase font-light">
          <span ref={greetingRef} className="inline-block min-w-[2.5ch] text-right">Hi</span>
          <span>, I am</span>
        </p>
        <div className="flex items-center justify-center gap-[2px] sm:gap-[3px]">
          {nameChars.map((char, i) => (
            <span
              key={i}
              ref={(el) => { charRefs.current[i] = el; }}
              className="kishore-char inline-flex items-center justify-center text-5xl sm:text-6xl md:text-7xl font-extrabold text-amber-100 leading-none px-[5px] py-[6px] sm:px-[7px] sm:py-[8px] md:px-[8px] md:py-[10px] border border-transparent rounded-[3px]"
              style={{ willChange: "transform" }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* ── Editorial Content ── */}
      <div
        ref={contentRef}
        className="absolute inset-0 pointer-events-auto overflow-hidden"
      >
        {/* ── Big Statement Typography ── */}
        <div className="absolute top-[28%] left-[8%] md:left-[12%] max-w-[80%] md:max-w-[65%]">
          <p className="hero-line-1 text-[clamp(2rem,5.5vw,5rem)] font-extrabold text-white leading-[1.05] tracking-tight">
            Somewhere between
          </p>
          <p className="hero-line-2 text-[clamp(2rem,5.5vw,5rem)] font-extrabold text-white leading-[1.05] tracking-tight mt-1">
            <span className="italic font-light text-white/40" style={{ fontFamily: "Georgia, serif" }}>design</span>{" "}
            and{" "}
            <span className="text-amber-100 relative inline-block">
              algorithms
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-amber-100/50 to-transparent" />
            </span>
            <span className="text-white/20">,</span>
          </p>
          <p className="hero-line-3 text-[clamp(2rem,5.5vw,5rem)] font-extrabold text-white leading-[1.05] tracking-tight mt-1">
            I found my{" "}
            <span className="text-emerald-400">thing</span>
            <span className="text-white/20">.</span>
          </p>
        </div>

        {/* ── Role + Location row ── */}
        <div className="scatter-el absolute top-[15%] right-[8%] md:right-[12%] flex items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="relative w-2.5 h-2.5 mb-0.5">
              <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-40" />
              <div className="absolute inset-0 rounded-full bg-emerald-400" />
            </div>
            <span className="text-sm text-white/50 font-mono uppercase tracking-wider">India</span>
          </div>
          <span className="text-white/10">|</span>
          <span className="text-sm text-white/30 font-mono uppercase tracking-wider">AI Developer & Designer</span>
        </div>

        {/* ── Wireframe Globe ── */}
        <div className="wireframe-globe absolute bottom-[17%] left-[6%] md:left-[10%] w-28 h-28 md:w-48 md:h-48 opacity-0">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5">
            <circle cx="50" cy="50" r="45" />
            <ellipse cx="50" cy="50" rx="45" ry="18" />
            <ellipse cx="50" cy="50" rx="45" ry="18" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="45" ry="18" transform="rotate(120 50 50)" />
            <ellipse cx="50" cy="50" rx="18" ry="45" />
            <line x1="5" y1="50" x2="95" y2="50" />
            <line x1="50" y1="5" x2="50" y2="95" />
          </svg>
        </div>



        <div className="crosshair absolute bottom-[30%] right-[25%] w-8 h-8 opacity-0">
          <svg viewBox="0 0 48 48" className="w-full h-full" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" fill="none">
            <circle cx="24" cy="24" r="12" />
            <line x1="24" y1="8" x2="24" y2="16" />
            <line x1="24" y1="32" x2="24" y2="40" />
            <line x1="8" y1="24" x2="16" y2="24" />
            <line x1="32" y1="24" x2="40" y2="24" />
          </svg>
        </div>


        {/* ── Description Block ── */}
        <div className="scatter-el absolute bottom-[12%] right-[6%] md:right-[8%] max-w-[320px] border-l border-white/10 pl-5">
          {/* ── Crosshair Targets ── */}
          <div className="crosshair absolute top-[-50%] right-[-5%] w-18 h-18 opacity-0">
            <svg viewBox="0 0 48 48" className="w-full h-full" stroke="rgba(253,230,138,0.9)" strokeWidth="0.5" fill="none">
              <circle cx="24" cy="24" r="12" />
              <circle cx="24" cy="24" r="2" fill="rgba(253,230,138,0.3)" />
              <line x1="24" y1="4" x2="24" y2="16" />
              <line x1="24" y1="32" x2="24" y2="44" />
              <line x1="4" y1="24" x2="16" y2="24" />
              <line x1="32" y1="24" x2="44" y2="24" />
            </svg>
          </div>
          <p className="text-[14px] text-white/30 leading-relaxed font-light">
            From foundation models to full-stack applications —
            building intelligent systems with Python, TypeScript,
            React, and cloud platforms. Focused on Generative AI,
            LangChain, and autonomous agents.
          </p>
        </div>

        {/* ── Social Links — Vertical Stack ── */}
        <div className="absolute bottom-[15%] md:bottom-[45%] right-[6%] md:right-[10%] flex flex-col gap-3">
          {[
            { href: "https://github.com/Kishore121523", icon: Github, label: "GH" },
            { href: "https://www.linkedin.com/in/kishore-yogeswaran-7946291a6/", icon: Linkedin, label: "LI" },
            { href: "https://www.instagram.com/_kishoredesigns_/", icon: Instagram, label: "IG" },
            { href: "mailto:kishore231512@gmail.com", icon: Mail, label: "EM" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={label !== "EM" ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={label}
              className="social-float group flex items-center gap-3 opacity-0"
            >
              <span className="text-[14px] text-white/20 font-mono tracking-widest group-hover:text-white/50 transition-colors duration-300">{label}</span>
              <div className="w-11 h-11 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-amber-100/30 group-hover:bg-amber-100/5 transition-all duration-300">
                <Icon className="w-5 h-5 text-white/30 group-hover:text-amber-100 transition-colors duration-300" />
              </div>
            </a>
          ))}
        </div>

        {/* ── CTA Buttons ── */}
        <div className="scatter-el absolute bottom-[8%] left-[8%] md:left-[12%] flex items-center gap-6">
          <a
            href="mailto:kishore231512@gmail.com"
            className="group flex items-center gap-2 bg-amber-100 text-background px-6 py-3 rounded-full text-sm font-semibold hover:shadow-[0_0_30px_rgba(253,230,138,0.25)] transition-all duration-300 active:scale-95"
          >
            Let&apos;s Talk
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
          <a
            href="/Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-white/40 text-sm font-mono hover:text-white/70 transition-colors duration-300 underline underline-offset-4 decoration-white/10 hover:decoration-white/30"
          >
            Resume.pdf
          </a>
        </div>

        {/* ── Corner Markers ── */}
        <div className="scatter-el absolute bottom-[5%] right-[6%] md:right-[10%] text-[9px] text-white/40 font-mono">
          ┘ Home
        </div>

        {/* ── Tech Stack Grid — glitching 3x3 ── */}
        <div className="absolute bottom-[22%] md:bottom-[22%] left-[26%] md:left-[28%] right-[36%] md:right-[34%]">
          <div className="grid grid-cols-3 gap-x-3 gap-y-2">
            {techStack.map((tech, i) => (
              <span
                key={tech}
                ref={(el) => { techRefs.current[i] = el; }}
                className="tech-grid-item text-[10px] md:text-xs font-mono text-white/25 uppercase tracking-wider border border-white/[0.06] rounded-[2px] px-2 py-1.5 text-center opacity-0 hover:text-amber-100/50 hover:border-amber-100/20 transition-colors duration-300"
                style={{ willChange: "transform" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
