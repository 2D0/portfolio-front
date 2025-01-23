'use client';

import { HeroSection } from '@components/section-hero';
import { InfoSection } from '@components/section-info';
import { CareerSection } from '@components/section-career';
import type { CareerMap } from '@/interface';

interface UIProps {
  career: CareerMap[];
}

export const UI = ({ career }: UIProps) => {
  return (
    <main className="w-full min-h-screen h-fit">
      <HeroSection />
      <InfoSection />
      <CareerSection textMap={career} />
    </main>
  );
};
