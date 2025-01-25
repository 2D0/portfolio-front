import { useRef, useState, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cva } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';
import { BackgroundStars } from '@components/background-stars';
import { cantique, montserrat } from '@/public/fonts';
import { LetterWave } from './letter-wave';
import { StackBlock } from './block-stack';
import type { StackMap } from '@/interface';

type StackType = 'language' | 'frontend' | 'backend' | 'etc';
interface SectionStackProps extends HTMLAttributes<HTMLDivElement> {
  textMap: Record<string, StackMap[]>;
}

const letters = 'Stack'.split('');

export const SectionStack = ({ textMap, ...props }: SectionStackProps) => {
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
          className="grid grid-cols-[max-content_1fr] gap-8 w-full"
        >
          <div className="h-fit relative">
            <span className={cn(stackTypeVariants({ variant: stackType }))} />
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
                initial={{ opacity: 0, x: 50 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <StackBlock text={text} />
              </motion.li>
            ))}
          </ul>
        </article>
      </div>
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
