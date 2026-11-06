import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { HealthProfile } from "@/components/sections/HealthProfile";
import { RealCase } from "@/components/sections/RealCase";
import { Audience } from "@/components/sections/Audience";
import { Stories } from "@/components/sections/Stories";
import { GetStarted } from "@/components/sections/GetStarted";
import { LegalStrip } from "@/components/sections/LegalStrip";
import { Partnerships } from "@/components/sections/Partnerships";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Tr } from "@/components/ui/Tr";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#top">
        <Tr id="skip-link" />
      </a>
      <Header />
      <main id="top" tabIndex={-1}>
        <Hero />
        <About />
        <HowItWorks />
        <Benefits />
        <HealthProfile />
        <RealCase />
        <Audience />
        <Stories />
        <GetStarted />
        <LegalStrip />
        <Partnerships />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <SiteChrome />
    </>
  );
}
