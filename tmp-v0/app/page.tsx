import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { BrandStorySection } from "@/components/sections/brand-story-section";
import { HistorySection } from "@/components/sections/history-section";
import { DevSection } from "@/components/sections/dev-section";
import { StudentsSection } from "@/components/sections/students-section";
import { EventsSection } from "@/components/sections/events-section";
import { TeamSection } from "@/components/sections/team-section";
import { FooterSection } from "@/components/sections/footer-section";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Header />
      <HeroSection />
      <BrandStorySection />
      <HistorySection />
      <DevSection />
      <StudentsSection />
      <EventsSection />
      <TeamSection />
      <FooterSection />
    </main>
  );
}
