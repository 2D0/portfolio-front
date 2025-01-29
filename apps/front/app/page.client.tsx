'use client';
import { useEffect, useRef, useState } from 'react';
import {
  useInView,
  type InViewHookResponse,
} from 'react-intersection-observer';
import { SectionHero } from '@components/section-hero';
import { SectionInfo } from '@components/section-info';
import { SectionCareer } from '@components/section-career';
import { SectionStack } from '@/components/section-stack';
import { SectionProject } from '@/components/section-project';
import { SectionCode } from '@/components/section-code';
import { SectionContact } from '@/components/section-contact';
import { useNavEvent } from '@/contexts/nav.context';
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
  const { setSelectName, navScroll } = useNavEvent();

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
    if (homeInView) setSelectName('HOME');
    else if (itsMeInView) setSelectName('IT’S ME');
    else if (workHistoryInView) setSelectName('WORK HISTORY');
    else if (stackInView) setSelectName('STACK');
    else if (projectInView) setSelectName('PROJECT');
    else if (codeLogicInView) setSelectName('CODE LOGIC');
    else if (pickMeInView) setSelectName('PICK ME');
  }, [
    homeInView,
    itsMeInView,
    workHistoryInView,
    stackInView,
    projectInView,
    codeLogicInView,
    pickMeInView,
  ]);

  useEffect(() => {
    const targetSection = sectionRefs[navScroll || 'HOME'].current;
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [navScroll]);

  return (
    <main className="w-full min-h-screen h-fit">
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
    </main>
  );
};
