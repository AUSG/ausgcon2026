import { AboutSection } from "@/components/ausgcon/AboutSection";
import { CloudSection } from "@/components/ausgcon/CloudSection";
import { FAQSection } from "@/components/ausgcon/FAQSection";
import { Footer } from "@/components/ausgcon/Footer";
import { Header } from "@/components/ausgcon/Header";
import { HeroSection } from "@/components/ausgcon/HeroSection";
import { JumpSection } from "@/components/ausgcon/JumpSection";
import { MentoringSection } from "@/components/ausgcon/MentoringSection";
import { ScheduleSection } from "@/components/ausgcon/ScheduleSection";
import { SpeakersSection } from "@/components/ausgcon/SpeakersSection";
import { TechSection } from "@/components/ausgcon/TechSection";
import { VenueSection } from "@/components/ausgcon/VenueSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <div className="journey-flow">
          <CloudSection />
          <TechSection />
          <JumpSection />
        </div>
        <ScheduleSection />
        <SpeakersSection />
        <MentoringSection />
        <VenueSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
