"use client";

import MobileNav from "./MobileNav";
import MobileHero from "./MobileHero";
import MobileAbout from "./MobileAbout";
import MobileWork from "./MobileWork";
import MobileSkills from "./MobileSkills";
import MobileContact from "./MobileContact";
import MobileDesktopHint from "./MobileDesktopHint";
import MobileDivider from "./MobileDivider";
import Footer from "@/components/Footer";

export default function MobileSite() {
  return (
    <div className="overflow-x-clip">
      <MobileNav />
      <MobileHero />
      <MobileDivider />
      <MobileAbout />
      <MobileDivider />
      <MobileWork />
      <MobileDivider />
      <MobileSkills />
      <MobileDivider />
      <MobileContact />
      <Footer />
      <MobileDesktopHint />
    </div>
  );
}
