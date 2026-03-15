import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import SectionWrapper from "@/components/Wrapper";
import SmoothScroller from "@/components/SmoothScroller";
import GlitchCursor from "@/components/GlitchCursor";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
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

      {/* Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
