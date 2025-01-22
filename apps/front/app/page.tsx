'use client';

import { HeroSection } from '@components/section-hero';
import { BackgroundStars } from '@components/background-stars';

export default function Page(): JSX.Element {
  return (
    <main className="min-h-screen h-fit relative">
      <div className="h-full relative z-10">
        <HeroSection />
        <HeroSection />
      </div>
    </main>
  );
}
