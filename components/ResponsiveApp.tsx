"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";
import SmoothScroller from "@/components/SmoothScroller";
import GlitchCursor from "@/components/GlitchCursor";

import MobileSite from "@/components/mobile/MobileSite";
import { useIsMobile } from "@/components/mobile/useIsMobile";

// Desktop experience — identical to the original layout, untouched.
function DesktopSite() {
  return (
    <>
      <SmoothScroller />
      <GlitchCursor />
      {/* Hero */}
      <div id="home">
        <div className="h-screen bg-background">
          <Hero />
        </div>
        <div className="h-[400vh] bg-background" />
      </div>

      {/* About */}
      <About />

      {/* Work / Portfolio */}
      <Work />

      {/* Skills & Timeline */}
      <Skills />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default function ResponsiveApp() {
  const isMobile = useIsMobile();

  // null until mounted — the Loader covers this brief moment.
  if (isMobile === null) return null;

  return isMobile ? <MobileSite /> : <DesktopSite />;
}
