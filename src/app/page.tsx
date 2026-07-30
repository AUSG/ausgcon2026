import { CloudSection } from "@/components/ausgcon/CloudSection";
import { FAQSection } from "@/components/ausgcon/FAQSection";
import { FloatingJourneyIndicator } from "@/components/ausgcon/FloatingJourneyIndicator";
import { Footer } from "@/components/ausgcon/Footer";
import { Header } from "@/components/ausgcon/Header";
import { HeroSection } from "@/components/ausgcon/HeroSection";
import { JumpSection } from "@/components/ausgcon/JumpSection";
import { ScheduleSection } from "@/components/ausgcon/ScheduleSection";
import { SpeakersSection } from "@/components/ausgcon/SpeakersSection";
import { TechSection } from "@/components/ausgcon/TechSection";
import { VenueSection } from "@/components/ausgcon/VenueSection";

export default function Home() {
  return (
    <>
      <Header />
      <FloatingJourneyIndicator />
      <main>
        <HeroSection />
        <CloudSection />
        <TechSection />
        <JumpSection />
        <ScheduleSection />
        <SpeakersSection />
        <VenueSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
