import { useState, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cva } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';
import { BackgroundStars } from '@components/background-stars';
import { montserrat } from '@/public/fonts';
import { BlockTitle } from './block-title';
import { StackBlock } from './block-stack';
import type { StackMap } from '@/interface';
type StackType = 'language' | 'frontend' | 'backend' | 'etc';
interface SectionStackProps extends HTMLAttributes<HTMLDivElement> {
  textMap: Record<string, StackMap[]>;
}

export const SectionStack = ({ textMap, ...props }: SectionStackProps) => {
  const [stackType, setStackType] = useState<StackType>('language');
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: false,
  });

  const stackTypeVariants = cva(
    'block w-[25%] sm:w-[2px] h-[2px] sm:h-12 md:h-14 bg-blue-200 absolute bottom-0 sm:bottom-auto top-auto sm:top-0 left-0 transition-translate duration-200',
    {
      variants: {
        variant: {
          language: 'translate-x-0 translate-y-0',
          frontend:
            'translate-x-[100%] sm:translate-x-0 translate-y-0 sm:translate-y-14',
          backend:
            'translate-x-[200%] sm:translate-x-0 translate-y-0 sm:translate-y-28',
          etc: 'translate-x-[300%] sm:translate-x-0 translate-y-0 sm:translate-y-[10.5rem]',
        },
      },
      defaultVariants: {
        variant: 'language',
      },
    },
  );

  return (
    <section {...props} className="flex flex-col w-full h-fit relative top-">
      <div className="h-24" />
      <div
        ref={ref}
        className="flex flex-col gap-10 sm:gap-20 page-inner min-h-screen pb-10"
      >
        <BlockTitle title="STACK" inView={inView} />
        <article className="flex flex-col gap-2">
          <motion.p
            className="text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="hidden md:!block">
              블록에 마우스를 올려보세요.
            </span>
            <span className="block md:!hidden">블록을 터치해 보세요.</span>
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-[max-content_1fr] gap-6 md:gap-8 w-full">
            <motion.div
              initial={{ opacity: 0, x: -150 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -150 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-4 sm:grid-cols-1 h-fit relative"
            >
              <span className={cn(stackTypeVariants({ variant: stackType }))} />
              {Object.keys(textMap).map((text, index) => (
                <motion.div
                  key={text}
                  className="border-b sm:border-b-0 border-l-0 sm:border-l border-slate-500 pl-2 md:pl-4"
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 * (index + 1) + 0.2 }}
                >
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
                      'flex items-center justify-center sm:justify-start h-12 md:h-14 px-4 text:lg md:text-xl cursor-pointer transition-all duration-200',
                      text === stackType ? 'text-blue-200' : 'text-slate-400',
                    )}
                  >
                    {text}
                  </label>
                </motion.div>
              ))}
            </motion.div>
            <ul className="grid gap-4">
              {textMap[stackType].map((text, index) => (
                <motion.li
                  key={`${text.name}-${index}`}
                  initial={{ opacity: 0, x: 150 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 150 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                >
                  <StackBlock text={text} />
                </motion.li>
              ))}
            </ul>
          </div>
        </article>
      </div>
      <div className="h-48" />
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
