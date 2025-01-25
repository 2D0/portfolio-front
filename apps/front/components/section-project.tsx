import { useRef, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@repo/commons/cn';
import { BackgroundStars } from '@components/background-stars';
import { cantique } from '@/public/fonts';
import { BlockProject } from './block-project';
import { LetterWave } from './letter-wave';
import type { ProjectMap } from '@/interface';

interface SectionProjectProps extends HTMLAttributes<HTMLDivElement> {
  textMap: ProjectMap[];
}

const letters = 'PROJECT'.split('');

export const SectionProject = ({ textMap, ...props }: SectionProjectProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 0.25, 1], ['50vw', '0vw', '0vw']);
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  return (
    <section
      ref={ref}
      {...props}
      className="flex flex-col w-full h-fit relative"
    >
      <div className="h-72" />
      <div className="grid place-items-center gap-20 min-h-screen pb-10">
        <motion.h2
          ref={titleRef}
          className={cn(cantique.className, 'text-6xl')}
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
        <ul className="grid grid-cols-3 gap-4">
          {textMap.map((text, index) => (
            <motion.li
              key={text.name}
              initial={{ opacity: 0, y: -50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
              transition={{ duration: 0.5, delay: 0.4 * index }}
            >
              <BlockProject text={text} />
            </motion.li>
          ))}
        </ul>
      </div>
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
