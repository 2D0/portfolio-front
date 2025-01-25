'use client';

import { SectionHero } from '@components/section-hero';
import { SectionInfo } from '@components/section-info';
import { SectionCareer } from '@components/section-career';
import { SectionStack } from '@/components/section-stack';
import { SectionProject } from '@/components/section-project';
import type { CareerMap, StackMap, ProjectMap } from '@/interface';

interface UIProps {
  career: CareerMap[];
  stack: Record<string, StackMap[]>;
  project: ProjectMap[];
}

export const UI = ({ career, stack, project }: UIProps) => {
  return (
    <main className="w-full min-h-screen h-fit">
      <SectionHero />
      <SectionInfo />
      <SectionCareer textMap={career} />
      <SectionStack textMap={stack} />
      <SectionProject textMap={project} />
    </main>
  );
};
