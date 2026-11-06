import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Trajectory } from "@/components/sections/Trajectory";
import { JourneyBreadcrumb, JourneyReturn } from "@/components/ui/TrajectoryPageNavigation";
import { Tr } from "@/components/ui/Tr";

export const metadata: Metadata = {
  title: "Nossa trajetória | CLER",
  description: "Conheça a trajetória do CLER entre 2024 e 2026, nossos marcos, incentivos e próximos passos.",
};

export default function TrajectoryPage() {
  return (
    <>
      <a className="skip-link" href="#top">
        <Tr id="skip-link" />
      </a>
      <Header />
      <main id="top" tabIndex={-1}>
        <JourneyBreadcrumb />
        <Trajectory />
        <JourneyReturn />
      </main>
      <Footer />
      <SiteChrome />
    </>
  );
}
