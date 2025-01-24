import { useRef, useState, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@repo/commons/cn';
import { BackgroundStars } from '@components/background-stars';
import { cantique, montserrat } from '@/public/fonts';
import { WaveLetter } from './letter-wave';
import { StackBlock } from './stack-block';
import type { StackMap } from '@/interface';
import { object } from 'framer-motion/client';
import { cva } from 'class-variance-authority';

type StackType = 'language' | 'frontend' | 'backend' | 'etc';
interface CareerSectionProps extends HTMLAttributes<HTMLDivElement> {
  textMap: Record<string, StackMap[]>;
}

const letters = 'Stack'.split('');

export const StackSection = ({ textMap, ...props }: CareerSectionProps) => {
  const [stackType, setStackType] = useState<StackType>('language');
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
    'w-[2px] h-14 bg-blue-200 absolute top-0 left-0 transition-translate duration-200',
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
    <section
      {...props}
      className="flex flex-col gap-20 w-full min-h-screen h-fit pb-10 relative"
    >
      <motion.h2
        ref={titleRef}
        className={cn(cantique.className, 'text-6xl text-center')}
        style={{
          x,
        }}
      >
        {letters.map((letter, index) => (
          <WaveLetter
            key={`${letter}-${index}`}
            scrollYProgress={scrollYProgress}
            index={index}
            char={letter}
          />
        ))}
      </motion.h2>
      <article className="grid grid-cols-[max-content_1fr] gap-8 w-full">
        <div className="h-fit relative">
          <div className={cn(stackTypeVariants({ variant: stackType }))}></div>
          {Object.keys(textMap).map(text => (
            <div key={text} className="border-l border-slate-500 pl-4">
              <input
                type="radio"
                name="stack"
                id={text}
                checked={text === stackType}
                onChange={() => {
                  setStackType(text as StackType);
                }}
                hidden
              />
              <label
                htmlFor={text}
                className={cn(
                  montserrat.className,
                  'flex items-center h-14 px-4 text-xl cursor-pointer transition-all duration-200',
                  text === stackType ? 'text-blue-200' : 'text-slate-400',
                )}
              >
                {text}
              </label>
            </div>
          ))}
        </div>
        <ul className="grid gap-4">
          {textMap[stackType].map((text, index) => (
            <motion.li
              key={text.name}
              // initial={{ opacity: 0, y: -50 }}
              // animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
              // transition={{ duration: 0.5, delay: 0.2 * index }}
            >
              <StackBlock text={text} />
            </motion.li>
          ))}
        </ul>
      </article>
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
