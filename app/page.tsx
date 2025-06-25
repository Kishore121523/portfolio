import Hero from "@/components/Hero";
import About from "@/components/About";
import SectionWrapper from "@/components/Wrapper";

export default function Home() {
  return (
    <main className="min-h-screen">
      <SectionWrapper className="bg-background">
        <Hero />
      </SectionWrapper>

      <SectionWrapper className="bg-background">
        <About />
      </SectionWrapper>
    </main>
  );
}
