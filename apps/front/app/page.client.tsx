'use client';

import { SectionHero } from '@components/section-hero';
import { SectionInfo } from '@components/section-info';
import { SectionCareer } from '@components/section-career';
import { SectionStack } from '@/components/section-stack';
import { SectionProject } from '@/components/section-project';
import { SectionCode } from '@/components/section-code';
import type {
  CareerMap,
  StackMap,
  ProjectMap,
  CodeListType,
} from '@/interface';

interface UIProps {
  career: CareerMap[];
  stack: Record<string, StackMap[]>;
  project: ProjectMap[];
  code: CodeListType;
}

export const UI = ({ career, stack, project, code }: UIProps) => {
  return (
    <main className="w-full min-h-screen h-fit">
      <SectionHero />
      <SectionInfo />
      <SectionCareer textMap={career} />
      <SectionStack textMap={stack} />
      <SectionProject textMap={project} />
      <SectionCode textMap={code} />
    </main>
  );
};
