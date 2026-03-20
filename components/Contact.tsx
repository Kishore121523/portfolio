"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, Mail, Github, Linkedin, Instagram } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-title",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".contact-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-grid", start: "top 80%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="contact-title text-4xl md:text-5xl font-bold text-foreground mb-16">
        Get in <span className="text-amber-100">Touch</span>
      </h2>

      <div className="contact-grid grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
        {/* Phone */}
        <a
          href="tel:+917373219696"
          className="contact-card flex items-center gap-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100/20 transition-colors">
            <Phone className="w-5 h-5 text-amber-100" />
          </div>
          <div>
            <p className="text-foreground/40 text-xs uppercase tracking-widest mb-1">Phone</p>
            <p className="text-foreground font-medium">+1 (807) 358-1508</p>
          </div>
        </a>

        {/* Email */}
        <a
          href="mailto:kishore231512@gmail.com"
          className="contact-card flex items-center gap-5 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-300 group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100/20 transition-colors">
            <Mail className="w-5 h-5 text-amber-100" />
          </div>
          <div>
            <p className="text-foreground/40 text-xs uppercase tracking-widest mb-1">Email</p>
            <p className="text-foreground font-medium">kishore231512@gmail.com</p>
          </div>
        </a>
      </div>

      {/* Socials */}
      <div className="flex gap-4 mt-10">
        {[
          { href: "https://github.com/Kishore121523", icon: Github, label: "GitHub" },
          { href: "https://www.linkedin.com/in/kishore-yogeswaran-7946291a6/", icon: Linkedin, label: "LinkedIn" },
          { href: "https://www.instagram.com/_kishoredesigns_/", icon: Instagram, label: "Instagram" },
        ].map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="contact-card w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 group"
          >
            <Icon className="w-5 h-5 text-foreground/50 group-hover:text-foreground transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
}
