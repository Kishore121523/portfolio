// app/page.tsx
import Hero from "@/components/Hero";
import About from "@/components/About";
import SectionWrapper from "@/components/Wrapper";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero section */}
      <SectionWrapper className="bg-background">
        <Hero />
      </SectionWrapper>

      {/* Spacer section (important for full scroll range) */}
      <SectionWrapper heightClass="h-[150vh]" isSpacer className="bg-background" />

      {/* About section */}
      <SectionWrapper className="bg-background">
        <About />
      </SectionWrapper>
    </main>
  );
}
