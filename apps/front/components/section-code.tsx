import React, { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cva } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';
import {
  CodeEditor,
  RadioGroup,
  InputTab,
  CheckboxGroup,
  Icon,
  SelectBox,
} from '@repo/ui/components';
import { BackgroundStars } from '@components/background-stars';
import { cantique, montserrat } from '@/public/fonts';
import { LetterWave } from './letter-wave';
import { BlockContainer } from './block-container';
import {
  useTimer,
  useDate,
  type FormatTimeReturnType,
  type DateReturnType,
  type TimerProps,
  type TimerReturnType,
  useFormatTime,
} from '@repo/commons/hooks';
import type { CodeListType, CodeName } from '@/interface';
import { ViewComponent, ViewInfinitScroll, ViewTimer } from './block-code-view';

interface SectionCodekProps extends HTMLAttributes<HTMLDivElement> {
  textMap: CodeListType;
}

const letters = 'CODE LOGIC'.split('');
const codeNameList = [
  'Component',
  'Next.js14',
  'Atomic System',
  'Custom Hook1',
  'Custom Hook2',
];

export const SectionCode = ({ textMap, ...props }: SectionCodekProps) => {
  const [codeName, setCodeName] = useState<CodeName>('Component');
  const [selected, setSelected] = useState<boolean>(false);
  const [switchTimerMode, setSwitchTimerMode] =
    useState<TimerProps['timerMode']>('STOPWATCH');
  const { hours }: DateReturnType = useDate();
  const [itemData, setItemData] = useState<number>(hours);
  const { eighteenHours }: FormatTimeReturnType = useFormatTime(itemData);
  const { time, timerHandler }: TimerReturnType = useTimer({
    timerMode: switchTimerMode,
    timeValue: eighteenHours,
  });

  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 0.25, 1], ['50vw', '0vw', '0vw']);
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  const stackTypeVariants = cva(
    'block w-[2px] h-14 bg-blue-200 absolute top-0 left-0 transition-translate duration-200',
    {
      variants: {
        variant: {
          language: 'translate-y-0',
          frontend: 'translate-y-14',
          backend: 'translate-y-28',
          etc: ' translate-y-[10.5rem]',
        },
      },
      defaultVariants: {
        variant: 'language',
      },
    },
  );

  return (
    <section {...props} className="flex flex-col w-full h-fit relative">
      <div className="h-72" />
      <div className="flex flex-col gap-20 min-h-screen pb-10">
        <motion.h2
          ref={titleRef}
          className={cn(cantique.className, 'text-6xl text-center')}
          style={{
            x,
          }}
        >
          {letters.map((letter, index) => (
            <LetterWave
              key={`${letter}-${index}`}
              scrollYProgress={scrollYProgress}
              index={index}
              char={letter}
            />
          ))}
        </motion.h2>
        <div className="flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SelectBox<CodeName>
              textMap={codeNameList}
              name={codeName}
              setName={setCodeName}
              selected={selected}
              setSelected={setSelected}
              height="h-40"
            />
          </motion.div>
          <article
            ref={ref}
            className="grid grid-rows-[max-content_1fr] gap-4 w-full"
          >
            <div>
              <BlockContainer
                variants={{ height: 'fit', variant: 'black' }}
                className="flex flex-col gap-2 pt-2"
              >
                <h4
                  className={cn(
                    montserrat.className,
                    'leading-none text-center text-lg text-blue-200',
                  )}
                >
                  Code Stack
                </h4>
                <BlockContainer
                  variants={{
                    height: 'fit',
                    border: 'none',
                    padding: 'sm',
                    rounded: 'md',
                  }}
                  className="flex justify-center space-x-8 max-h-96 overflow-y-auto"
                >
                  {textMap[codeName].stack.map(stack => (
                    <span
                      key={stack}
                      className={cn(
                        montserrat.className,
                        'leading-none text-md',
                      )}
                    >
                      {stack}
                    </span>
                  ))}
                </BlockContainer>
              </BlockContainer>
            </div>
            {textMap[codeName].view ? (
              <BlockContainer
                variants={{ height: 'fit', variant: 'black' }}
                className="flex flex-col gap-2 pt-2"
              >
                <h4
                  className={cn(
                    montserrat.className,
                    'leading-none text-center text-lg text-blue-200',
                  )}
                >
                  View Run Code
                </h4>
                <BlockContainer
                  variants={{
                    height: 'fit',
                    border: 'none',
                    padding: 'sm',
                    rounded: 'md',
                  }}
                  className="flex justify-center space-x-8 max-h-96 overflow-y-auto"
                >
                  {codeName === 'Component' ? <ViewComponent /> : null}
                  {codeName === 'Custom Hook1' ? <ViewTimer /> : null}
                  {codeName === 'Custom Hook2' ? <ViewInfinitScroll /> : null}
                </BlockContainer>
              </BlockContainer>
            ) : null}
            <div className="grid grid-cols-2 gap-4 w-full">
              {textMap[codeName].codeMap.map(text => (
                <BlockContainer
                  key={`${codeName}-${text.name}`}
                  variants={{ variant: 'black' }}
                  className="flex flex-col gap-2 pt-2"
                >
                  <h4
                    className={cn(
                      montserrat.className,
                      'leading-none text-center text-lg text-blue-200',
                    )}
                  >
                    {text.name}
                  </h4>
                  <CodeEditor value={text.code} height="400px" />
                </BlockContainer>
              ))}
            </div>
          </article>
        </div>
      </div>
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
