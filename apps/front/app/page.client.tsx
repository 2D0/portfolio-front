'use client';

import { HeroSection } from '@components/section-hero';
import { InfoSection } from '@components/section-info';
import { CareerSection } from '@components/section-career';
import { StackSection } from '@/components/section-stack';
import type { CareerMap, StackMap } from '@/interface';

interface UIProps {
  career: CareerMap[];
  stack: Record<string, StackMap[]>;
}

export const UI = ({ career, stack }: UIProps) => {
  return (
    <main className="w-full min-h-screen h-fit">
      <HeroSection />
      <InfoSection />
      <CareerSection textMap={career} />
      <StackSection textMap={stack} />
    </main>
  );
};
