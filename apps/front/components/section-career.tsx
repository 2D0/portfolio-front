import { useRef, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@repo/commons/cn';
import { BackgroundStars } from '@components/background-stars';
import { cantique } from '@/public/fonts';
import { CareerBlock } from './block-career';
import { LetterWave } from './letter-wave';
import type { CareerMap } from '@/interface';

interface SectionCareerProps extends HTMLAttributes<HTMLDivElement> {
  textMap: CareerMap[];
}

const letters = 'WORK HISTORY'.split('');

export const SectionCareer = ({ textMap, ...props }: SectionCareerProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 0.25, 1], ['50vw', '0vw', '0vw']);
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  return (
    <section
      {...props}
      className="grid place-items-center gap-20 w-full min-h-screen h-fit pb-10 relative"
    >
      <div className="h-72" />
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
      <ul ref={ref} className="grid grid-cols-2 gap-4">
        {textMap.map((text, index) => (
          <motion.li
            key={text.name}
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
          >
            <CareerBlock text={text} />
          </motion.li>
        ))}
      </ul>
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
