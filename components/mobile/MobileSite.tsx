"use client";

import MobileNav from "./MobileNav";
import MobileHero from "./MobileHero";
import MobileAbout from "./MobileAbout";
import MobileWork from "./MobileWork";
import MobileSkills from "./MobileSkills";
import MobileContact from "./MobileContact";
import Footer from "@/components/Footer";

export default function MobileSite() {
  return (
    <div className="overflow-x-clip">
      <MobileNav />
      <MobileHero />
      <MobileAbout />
      <MobileWork />
      <MobileSkills />
      <MobileContact />
      <Footer />
    </div>
  );
}
