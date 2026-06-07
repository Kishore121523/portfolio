"use client";

import { useEffect, useState } from "react";

const links = ["home", "about", "work", "skills", "contact"];

export default function MobileNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the overlay menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top bar */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
          scrolled && !open ? "bg-background/80 backdrop-blur-xl border-b border-white/[0.06]" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <a
            href="#home"
            onClick={(e) => go(e, "home")}
            className="text-foreground font-semibold text-xl tracking-tight focus:outline-none"
          >
            K<span className="text-amber-100">.</span>
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative w-7 h-5 text-foreground focus:outline-none"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span
              className={`absolute left-0 w-full h-[1.5px] bg-foreground transition-all duration-300 ${
                open ? "top-1/2 rotate-45 -translate-y-1/2" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px] bg-foreground transition-opacity duration-300 ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 w-full h-[1.5px] bg-foreground transition-all duration-300 ${
                open ? "top-1/2 -rotate-45 -translate-y-1/2" : "bottom-0"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 bg-background transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* subtle texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.5) 3px, rgba(255,255,255,0.5) 4px)",
          }}
        />

        <div className="relative h-full flex flex-col justify-center px-8">
          <span className="text-[10px] font-mono text-emerald-400/50 tracking-[0.4em] uppercase mb-8">
            // navigation
          </span>

          <ul className="flex flex-col">
            {links.map((link, i) => (
              <li key={link}>
                <a
                  href={`#${link}`}
                  onClick={(e) => go(e, link)}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                  className={`group flex items-baseline gap-4 py-4 border-b border-white/[0.06] transition-all duration-500 ${
                    open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                >
                  <span className="text-[11px] font-mono text-emerald-400/60 w-6">0{i + 1}</span>
                  <span className="text-4xl font-extrabold text-foreground/70 group-active:text-amber-100 capitalize tracking-tight transition-colors">
                    {link}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-[11px] font-mono text-white/25 tracking-wider">
            kishore231512@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}
