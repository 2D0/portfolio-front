'use client';
import { useEffect, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  menuOpenState,
  navSelectNameState,
  scrollNameNameState,
} from '@lib/constraints/atoms/nav.atom';
import { useInView } from 'react-intersection-observer';
import { cn } from '@repo/commons/cn';
import { SectionHero } from '@components/section-hero';
import { SectionInfo } from '@components/section-info';
import { SectionCareer } from '@components/section-career';
import { SectionStack } from '@/components/section-stack';
import { SectionProject } from '@/components/section-project';
import { SectionCode } from '@/components/section-code';
import { SectionContact } from '@/components/section-contact';
import type {
  CareerMap,
  StackMap,
  ProjectMap,
  CodeListType,
  ContactMapType,
  NavNames,
} from '@/interface';

interface UIProps {
  career: CareerMap[];
  stack: Record<string, StackMap[]>;
  project: ProjectMap[];
  code: CodeListType;
  contact: ContactMapType;
}

export const UI = ({ career, stack, project, code, contact }: UIProps) => {
  const setSelectName = useSetRecoilState(navSelectNameState);
  const scrollName = useRecoilValue(scrollNameNameState);
  const [isMenuOpen, setIsMenuOpen] = useRecoilState(menuOpenState);

  const { ref: homeInViewRef, inView: homeInView } = useInView({
    threshold: 0.3,
  });

  const { ref: itsMeInViewRef, inView: itsMeInView } = useInView({
    threshold: 0.3,
  });

  const { ref: workHistoryInViewRef, inView: workHistoryInView } = useInView({
    threshold: 0.3,
  });

  const { ref: stackInViewRef, inView: stackInView } = useInView({
    threshold: 0.3,
  });

  const { ref: projectInViewRef, inView: projectInView } = useInView({
    threshold: 0.3,
  });

  const { ref: codeLogicInViewRef, inView: codeLogicInView } = useInView({
    threshold: 0.3,
  });

  const { ref: pickMeInViewRef, inView: pickMeInView } = useInView({
    threshold: 0.3,
  });

  const sectionRefs: Record<NavNames, React.RefObject<HTMLDivElement>> = {
    HOME: useRef<HTMLDivElement>(null),
    'IT’S ME': useRef<HTMLDivElement>(null),
    'WORK HISTORY': useRef<HTMLDivElement>(null),
    STACK: useRef<HTMLDivElement>(null),
    PROJECT: useRef<HTMLDivElement>(null),
    'CODE LOGIC': useRef<HTMLDivElement>(null),
    'PICK ME': useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (!isMenuOpen) {
      if (homeInView) setSelectName('HOME');
      else if (itsMeInView) setSelectName('IT’S ME');
      else if (workHistoryInView) setSelectName('WORK HISTORY');
      else if (stackInView) setSelectName('STACK');
      else if (projectInView) setSelectName('PROJECT');
      else if (codeLogicInView) setSelectName('CODE LOGIC');
      else if (pickMeInView) setSelectName('PICK ME');
    }
  }, [
    homeInView,
    itsMeInView,
    workHistoryInView,
    stackInView,
    projectInView,
    codeLogicInView,
    pickMeInView,
    isMenuOpen,
  ]);

  useEffect(() => {
    if (!isMenuOpen) {
      const targetSection = sectionRefs[scrollName || 'HOME'].current;
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [scrollName]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  return (
    <main>
      <div
        className={cn(
          'w-full min-h-screen h-fit overflow-x-hidden !cursor-default',
          isMenuOpen && 'blur-md',
        )}
        onClick={e => {
          isMenuOpen && e.preventDefault();
          setIsMenuOpen(false);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsMenuOpen(false);
          }
        }}
      >
        <div ref={sectionRefs.HOME} />
        <div ref={homeInViewRef} />
        <SectionHero />
        <div ref={sectionRefs['IT’S ME']} />
        <div ref={itsMeInViewRef} />
        <SectionInfo />
        <div ref={sectionRefs['WORK HISTORY']} />
        <div ref={workHistoryInViewRef} />
        <SectionCareer textMap={career} />
        <div ref={sectionRefs.STACK} />
        <div ref={stackInViewRef} />
        <SectionStack textMap={stack} />
        <div ref={sectionRefs.PROJECT} />
        <div ref={projectInViewRef} />
        <SectionProject textMap={project} />
        <div ref={sectionRefs['CODE LOGIC']} />
        <div ref={codeLogicInViewRef} />
        <SectionCode textMap={code} />
        <div ref={sectionRefs['PICK ME']} />
        <div ref={pickMeInViewRef} />
        <SectionContact textMap={contact} />
      </div>
    </main>
  );
};
