"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillIcons = [
  { name: "Azure", src: "/assets/skills/azure.png" },
  { name: "AWS", src: "/assets/skills/aws.png" },
  { name: "Python", src: "/assets/skills/python.png" },
  { name: "OpenAI", src: "/assets/skills/openai.png" },
  { name: "Claude", src: "/assets/skills/claude.png" },
  { name: "MCP", src: "/assets/skills/mcp.png" },
  { name: "Pydantic", src: "/assets/skills/pydantic.png" },
  { name: "n8n", src: "/assets/skills/n8n.png" },
  { name: "Cursor", src: "/assets/skills/cursor.png" },
  { name: "TypeScript", src: "/assets/skills/typescript.png" },
  { name: "Next.js", src: "/assets/skills/next.png" },
  { name: "React", src: "/assets/skills/react.png" },
  { name: "Tailwind", src: "/assets/skills/tailwind.png" },
  { name: "Node.js", src: "/assets/skills/node.png" },
  { name: "Express", src: "/assets/skills/express.png" },
  { name: "JavaScript", src: "/assets/skills/javascript.png" },
  { name: "Git", src: "/assets/skills/git.png" },
  { name: "Figma", src: "/assets/skills/figma.png" },
];

interface TimelineEntry {
  title: string;
  org: string;
  type: "work" | "cert" | "edu";
}

interface TimelineYear {
  year: string;
  entries: TimelineEntry[];
}

const timeline: TimelineYear[] = [
  {
    year: "2025",
    entries: [
      { title: "Generative AI Engineer", org: "Wadhwani Foundation", type: "work" },
      { title: "AI Developer (Freelance Contract)", org: "AI RoundTable Inc.", type: "work" },
      { title: "Gen AI Foundational Models for NLP", org: "IBM - Coursera", type: "cert" },
      { title: "Generative AI and LLMs", org: "IBM - Coursera", type: "cert" },
      { title: "AWS Certified Cloud Practitioner", org: "Udemy", type: "cert" },
    ],
  },
  {
    year: "2024",
    entries: [
      { title: "React - The Complete Guide 2024", org: "Udemy", type: "cert" },
      { title: "Masters in Computer Science", org: "Lakehead University", type: "edu" },
      { title: "Google DevFest Hackathon - Runner Up", org: "Google", type: "edu" },
    ],
  },
  {
    year: "2023",
    entries: [
      { title: "Advanced Learning Algorithms", org: "Stanford Online", type: "cert" },
      { title: "Bachelors in Computer Science", org: "SASTRA University", type: "edu" },
      { title: "The Complete Node.js Developer Course", org: "Udemy", type: "cert" },
      { title: "Supervised Machine Learning", org: "Stanford Online", type: "cert" },
      { title: "Full-Stack Developer – AI & Cloud", org: "Accenture", type: "work" },
    ],
  },
  {
    year: "2022",
    entries: [
      { title: "Machine Learning OnRamp", org: "MathWorks", type: "cert" },
      { title: "Full-stack Developer - MERN Stack", org: "Trinal Web Pvt Limited", type: "work" },
    ],
  },
  {
    year: "2021",
    entries: [
      { title: "Graduate Rotational Internship Program", org: "Web Developer / Graphic Designer / Frontend Developer", type: "work" },
      { title: "Web Development Intern", org: "Sparks Foundation", type: "work" },
    ],
  },
  {
    year: "2020",
    entries: [
      { title: "Adobe XD - UI/UX Designing", org: "Udemy", type: "cert" },
      { title: "JavaScript-ES6, Advanced CSS", org: "Udemy", type: "cert" },
      { title: "Bootstrap-4 with Projects", org: "Udemy", type: "cert" },
    ],
  },
];

const typeColors: Record<string, string> = {
  work: "bg-amber-100/20 text-amber-100",
  cert: "bg-blue-400/20 text-blue-300",
  edu: "bg-emerald-400/20 text-emerald-300",
};

const typeLabels: Record<string, string> = {
  work: "Work",
  cert: "Cert",
  edu: "Education",
};

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-title",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      // Timeline entries stagger
      gsap.fromTo(
        ".timeline-entry",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="skills-title text-4xl md:text-5xl font-bold text-foreground mb-16">
        Skills & <span className="text-amber-100">Timeline</span>
      </h2>

      {/* Skill icons marquee */}
      <div className="relative mb-20 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-8 animate-marquee">
          {[...skillIcons, ...skillIcons].map((skill, i) => (
            <div
              key={`${skill.name}-${i}`}
              className="flex-shrink-0 w-16 h-16 bg-white/[0.04] border border-white/[0.06] rounded-xl flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-300 group"
              title={skill.name}
            >
              <img
                src={skill.src}
                alt={skill.name}
                className="w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="timeline-container relative">
        {/* Vertical line */}
        <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[1px] bg-white/[0.08]" />

        {timeline.map((yearBlock) => (
          <div key={yearBlock.year} className="mb-12">
            {/* Year marker */}
            <div className="timeline-entry flex items-center gap-4 mb-6">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-amber-100 flex items-center justify-center text-background font-bold text-sm z-10 flex-shrink-0">
                {yearBlock.year.slice(2)}
              </div>
              <h3 className="text-2xl font-bold text-foreground">{yearBlock.year}</h3>
            </div>

            {/* Entries */}
            <div className="ml-[18px] md:ml-[22px] pl-8 border-l border-transparent space-y-3">
              {yearBlock.entries.map((entry, i) => (
                <div
                  key={i}
                  className="timeline-entry bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4 hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-foreground font-medium text-sm">{entry.title}</p>
                      <p className="text-foreground/40 text-xs mt-1">{entry.org}</p>
                    </div>
                    <span
                      className={`flex-shrink-0 text-[10px] uppercase tracking-wider font-medium px-2.5 py-1 rounded-full ${typeColors[entry.type]}`}
                    >
                      {typeLabels[entry.type]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
