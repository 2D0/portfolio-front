'use client';

import { BackgroundStars } from '@components/background-stars';

export default function Page(): JSX.Element {
  return (
    <main className="min-h-screen relative">
      <div className="relative z-10">
        <h1 className="">GALAXYDIANE</h1>
        <div className="w-full h-32 bg-white"></div>
      </div>
      <BackgroundStars className="absolute top-0 left-0 w-full h-full" />
    </main>
  );
}
