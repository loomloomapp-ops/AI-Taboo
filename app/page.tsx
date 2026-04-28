import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Verticals } from "@/components/sections/Verticals";
import { Cases } from "@/components/sections/Cases";
import { Advantages } from "@/components/sections/Advantages";
import { Reviews } from "@/components/sections/Reviews";
import { LeadForm } from "@/components/form/LeadForm";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { MobileStickyCTA } from "@/components/layout/MobileStickyCTA";
import { DesktopFloatingWidget } from "@/components/layout/DesktopFloatingWidget";
import { ExitIntentPopup } from "@/components/layout/ExitIntentPopup";
import { ScrollToTop } from "@/components/layout/ScrollToTop";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Manifesto />
        <Verticals />
        <Cases />
        <LeadForm />
        <Advantages />
        <Reviews />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
      <DesktopFloatingWidget />
      <ScrollToTop />
      <ExitIntentPopup />
    </>
  );
}
