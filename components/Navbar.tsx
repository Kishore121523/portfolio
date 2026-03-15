"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const links = ["home", "about", "work", "skills", "contact"];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    // Start fully hidden
    gsap.set(navRef.current, { yPercent: -100, opacity: 0 });

    // Reveal after hero animation is mostly done (~65% scroll progress)
    ScrollTrigger.create({
      trigger: "#hero-section",
      start: "top top",
      end: "+=400%",
      onUpdate: (self) => {
        if (self.progress > 0.62 && navRef.current) {
          gsap.to(navRef.current, {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            overwrite: true,
          });
        } else if (self.progress < 0.55 && navRef.current) {
          gsap.to(navRef.current, {
            yPercent: -100,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            overwrite: true,
          });
        }
      },
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 w-full z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/70 backdrop-blur-xl shadow-lg shadow-black/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => handleClick(e, "home")}
          className="text-foreground font-semibold text-2xl tracking-tight"
        >
          K<span className="text-amber-100">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex gap-10">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={(e) => handleClick(e, link)}
              className="text-foreground/50 hover:text-foreground transition-colors duration-300 capitalize text-sm tracking-widest"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground relative w-7 h-5"
          aria-label="Toggle menu"
        >
          <span
            className={`absolute left-0 w-full h-[1.5px] bg-foreground transition-all duration-300 ${
              menuOpen ? "top-1/2 rotate-45 -translate-y-1/2" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1.5px] bg-foreground transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`absolute left-0 w-full h-[1.5px] bg-foreground transition-all duration-300 ${
              menuOpen ? "top-1/2 -rotate-45 -translate-y-1/2" : "bottom-0"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        } bg-background/95 backdrop-blur-xl`}
      >
        <div className="px-6 pb-6 pt-2 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              onClick={(e) => handleClick(e, link)}
              className="py-3 text-foreground/60 hover:text-foreground transition-colors capitalize text-sm tracking-widest border-b border-white/5 last:border-0"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
