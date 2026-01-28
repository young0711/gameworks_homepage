import { HeroSection } from '@/components/landing/HeroSection';
import { BrandStorySection } from '@/components/landing/BrandStorySection';
import { HistorySection } from '@/components/landing/HistorySection';
import { DevCategorySection } from '@/components/landing/DevCategorySection';
import { ForStudentsSection } from '@/components/landing/ForStudentsSection';
import { EventsCategorySection } from '@/components/landing/EventsCategorySection';
import { ExecutiveTeamSection } from '@/components/landing/ExecutiveTeamSection';

export default function Home() {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <BrandStorySection />
      <HistorySection />
      <DevCategorySection />
      <ForStudentsSection />
      <EventsCategorySection />
      <ExecutiveTeamSection />
    </main>
  );
}
