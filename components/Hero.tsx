"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import HeroIntroText from "@/components/Intro";



gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgLayerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [bgY, setBgY] = useState("calc(50% - 70px)");

  // ---------- Responsive Background Position ----------
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      let newBgY = "center";

      if (width < 640) newBgY = "center";
      else if (width < 1300) newBgY = "center";
      else if (width < 1400) newBgY = "calc(50% - 20px)"
      else if (width < 1500) newBgY = "calc(50% - 95px)"
      else if (width < 1600) newBgY = "calc(50% - 70px)";
      else if (width < 1700) newBgY = "calc(50% - 90px)";
      else if (width < 1800) newBgY = "calc(50% - 120px)";
      else newBgY = "calc(50% - 180px)";
      
      setBgY(newBgY);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ---------- GSAP Scroll Animation ----------
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Set initial mask
      tl.set(centerRef.current, {
        WebkitMaskImage: "radial-gradient(ellipse 0px 0px at center, transparent 0px, black 0px)",
        maskImage: "radial-gradient(ellipse 0px 0px at center, transparent 0px, black 0px)",
        WebkitMaskComposite: "destination-out",
        maskComposite: "exclude",
      });


      // 2. Fade out background
      tl.to(bgLayerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });

      // 3. Expand mask hole
      tl.to(centerRef.current, {
        WebkitMaskImage: "radial-gradient(ellipse 180px 300px at center, transparent 100px, black 100px)",
        maskImage: "radial-gradient(ellipse 180px 300px at center, transparent 100px, black 100px)",
        duration: 1.4,
        ease: "power3.inOut",
      }, "-=0.6");

      // 4. Slide out sides
      tl.to([leftRef.current, rightRef.current], {
        y: "-120%",
        duration: 1.6,
        ease: "power3.inOut",
      }, ">-1.3");

      // 5. Scale center up
      tl.to(contentRef.current, {
        scale: 20,
        duration: 2,
        ease: "expo.in",
      }, ">-0.4");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // ---------- Shared Background Style ----------
  const bgLayerStyle = {
    backgroundRepeat: "no-repeat",
    backgroundPositionY: bgY,
    backgroundSize: "cover",
  };

  // ---------- JSX ----------
  return (
    <section
      ref={containerRef}
      id="hero-section"
      className="h-screen w-full flex items-center justify-center bg-background relative overflow-hidden"
    >
      <div
        ref={contentRef}
        className="w-full max-w-[95%] h-[90%] flex flex-col items-center justify-center rounded-2xl relative overflow-hidden z-10"
      >
        <div
          ref={bgLayerRef}
          className="absolute inset-0 z-0 bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: "url('/forestDark.png')", backgroundPositionY: bgY }}
        />

        <div className="absolute inset-0 flex w-full h-full gap-2 p-2 z-10">
          {[leftRef, centerRef, rightRef].map((ref, i) => (
            <div
              key={i}
              ref={ref}
              className="flex-1 border-1 border-white/60 rounded-2xl relative overflow-hidden"
              style={ref === centerRef ? {
                WebkitMaskComposite: "destination-out",
                maskComposite: "exclude",
              } : {}}
            >
              <div
                className="absolute inset-0 z-[-1] bg-cover bg-center"
                style={{
                  backgroundImage: `url('/${["left", "center", "right"][i]}.svg')`,
                  ...bgLayerStyle,
                }}
              />
            </div>
          ))}
        </div>

        <div className="text-white absolute bottom-[1.5rem] right-[1.5rem] z-20">
          <p className=" font-bold text-[4rem] sm:text-[6rem] md:text-[8rem]">Kishore</p> 
          <p className="text-[2rem] text-right md:mt-[-2.4rem]">portfolio.</p>
        </div>

        <div className="flex flex-col text-white absolute bottom-[2rem] left-[1.5rem] z-20 gap-6">
          <a
            href="https://github.com/Kishore121523"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hover:scale-110 transition-transform duration-200"
          >
            <Github className="w-8 h-8" />
          </a>

          <a
            href="https://www.linkedin.com/in/kishore-yogeswaran-7946291a6/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:scale-110 transition-transform duration-200"
          >
            <Linkedin className="w-8 h-8" />
          </a>

          <a
            href="https://www.instagram.com/_kishoredesigns_/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hover:scale-110 transition-transform duration-200"
          >
            <Instagram className="w-8 h-8" />
          </a>

          <a
            href="mailto:kishore231512@gmail.com"
            aria-label="Email"
            className="hover:scale-110 transition-transform duration-200"
          >
            <Mail className="w-8 h-8" />
          </a>
        </div>
      </div>

      <HeroIntroText />

    </section>
  );
}
