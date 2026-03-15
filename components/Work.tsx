"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  desc: string;
  image: string;
  tag: string;
}

const projects: Project[] = [
  {
    tag: "AI",
    title: "Allocatr",
    desc: "AI-powered budget tracker with natural language expense entry and real-time analytics",
    image: "/assets/WebDev/allocatr.png",
  },
  {
    tag: "AI",
    title: "Nestle AI Chatbot",
    desc: "AI Chatbot with Hybrid RAG, Graph Reasoning, and Geolocation-based Product Search",
    image: "/assets/WebDev/nestle.png",
  },
  {
    tag: "AI",
    title: "WIST",
    desc: "AI Enhanced Goal Planning System with Context Aware Suggestions",
    image: "/assets/WebDev/wist.png",
  },
  {
    tag: "Full Stack",
    title: "Vaultic",
    desc: "A cloud storage solution for efficient file organization and secure sharing",
    image: "/assets/WebDev/vaultic.png",
  },
  {
    tag: "Full Stack",
    title: "WealthSimple",
    desc: "Modern Banking and real-time Money Transfer Website",
    image: "/assets/WebDev/wealthSimple.png",
  },
  {
    tag: "Full Stack",
    title: "Notezy",
    desc: "CRUD Based Note Taking Extension with modern UI",
    image: "/assets/WebDev/notezy.jpg",
  },
  {
    tag: "Full Stack",
    title: "Math Conference",
    desc: "Developed website for International Math Conference",
    image: "/assets/WebDev/MathConf.jpg",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-title",
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
        ".work-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: ".work-grid", start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="work-title text-4xl md:text-5xl font-bold text-foreground mb-12">
        My <span className="text-amber-100">Portfolio</span>
      </h2>

      {/* Project grid */}
      <div className="work-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => (
          <div
            key={project.title}
            className="work-card group bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all duration-500"
          >
            <div className="overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-6">
              <span className="text-[11px] uppercase tracking-widest text-amber-100/80 font-medium">
                {project.tag}
              </span>
              <h3 className="text-lg font-semibold text-foreground mt-2 mb-2">{project.title}</h3>
              <p className="text-foreground/50 text-sm leading-relaxed">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
