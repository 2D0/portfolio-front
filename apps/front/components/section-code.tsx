import React, { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cva } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';
import { BackgroundStars } from '@components/background-stars';
import { cantique, montserrat } from '@/public/fonts';
import { LetterWave } from './letter-wave';
import type { CodeListType, CodeName } from '@/interface';
import {
  CodeEditor,
  RadioGroup,
  InputTab,
  CheckboxGroup,
  Icon,
} from '@repo/ui/components';
import { BlockContainer } from './block-container';

interface SectionCodekProps extends HTMLAttributes<HTMLDivElement> {
  textMap: CodeListType;
}

const letters = 'CODE LOGIC'.split('');

export const SectionCode = ({ textMap, ...props }: SectionCodekProps) => {
  const [codeName, setCodeName] = useState<CodeName>('input');

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
        <article
          ref={ref}
          className="grid grid-rows-[max-content_1fr] gap-8 w-full"
        >
          <div className="grid grid-cols-2 gap-2 w-full">
            {textMap[codeName].map(text => (
              <BlockContainer
                key={text.name}
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
                <CodeEditor value={text.code} />
              </BlockContainer>
            ))}
          </div>
          <div>
            <BlockContainer
              className="flex justify-center space-x-8 max-h-96 overflow-y-auto"
              variants={{ height: 'fit' }}
            >
              <div className="flex flex-col space-y-4">
                <CheckboxGroup
                  name="기본체크박스"
                  className="flex gap-2"
                  allSelect={{
                    position: 'top',
                    children: (
                      <>
                        <Icon name="Global" size="md" alt="인풋" />
                        기본 체크박스 전체선택
                      </>
                    ),
                  }}
                >
                  <InputTab value="사과" checked>
                    사과
                  </InputTab>
                  <InputTab value="배">배</InputTab>
                  <InputTab value="바나나" checked>
                    바나나
                  </InputTab>
                </CheckboxGroup>
                <CheckboxGroup
                  name="버튼체크박스"
                  className="flex gap-2"
                  allSelect={{
                    position: 'top',
                    children: (
                      <>
                        <Icon name="Global" size="md" alt="인풋" />
                        버튼 체크박스 전체선택
                      </>
                    ),
                    labelProps: {},
                  }}
                  labelProps
                >
                  <InputTab value="사과">사과</InputTab>
                  <InputTab value="배" checked>
                    배
                  </InputTab>
                  <InputTab value="바나나">바나나</InputTab>
                </CheckboxGroup>
              </div>
              <div className="flex flex-col space-y-4">
                <RadioGroup
                  name="기본라디오"
                  selectvalue="전체"
                  className="flex gap-2"
                >
                  <InputTab value="전체">전체</InputTab>
                  <InputTab value="하트">❤️ 하트</InputTab>
                  <InputTab value="병아리">🐥 병아리</InputTab>
                  <InputTab value="별">⭐️ 별</InputTab>
                </RadioGroup>
                <RadioGroup
                  name="버튼라디오"
                  selectvalue="전체"
                  className="flex gap-2"
                  labelProps={{
                    variant: 'disabled',
                  }}
                >
                  <InputTab value="전체">전체</InputTab>
                  <InputTab value="하트">❤️ 하트</InputTab>
                  <InputTab value="병아리">🐥 병아리</InputTab>
                  <InputTab value="별">⭐️ 별</InputTab>
                </RadioGroup>
              </div>
            </BlockContainer>
          </div>
        </article>
      </div>
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
