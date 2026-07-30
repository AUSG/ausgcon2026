import { ChallengeSection } from "@/components/ausgcon/ChallengeSection";
import { CloudSection } from "@/components/ausgcon/CloudSection";
import { EventOverview } from "@/components/ausgcon/EventOverview";
import { FAQSection } from "@/components/ausgcon/FAQSection";
import { FinalCTA } from "@/components/ausgcon/FinalCTA";
import { FloatingJourneyIndicator } from "@/components/ausgcon/FloatingJourneyIndicator";
import { Footer } from "@/components/ausgcon/Footer";
import { Header } from "@/components/ausgcon/Header";
import { HeroSection } from "@/components/ausgcon/HeroSection";
import { JourneyIntro } from "@/components/ausgcon/JourneyIntro";
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
        <JourneyIntro />
        <CloudSection />
        <TechSection />
        <ChallengeSection />
        <JumpSection />
        <EventOverview />
        <ScheduleSection />
        <SpeakersSection />
        <VenueSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
