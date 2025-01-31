import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@repo/commons/cn';
import { cantique } from '@/public/fonts';
import type { LetterSpinProps } from './letter-wave';
import { useRef } from 'react';

interface BlockTitleProps {
  title: string;
}

const DynamicLetterWave = dynamic<LetterSpinProps>(
  () => import('./letter-wave').then(mod => mod.LetterWave),
  {
    ssr: false,
  },
);

export const BlockTitle = ({ title }: BlockTitleProps) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 0.25, 1], ['50vw', '0vw', '0vw']);

  const letters = title.split('');

  return (
    <motion.h2
      ref={titleRef}
      className={cn(
        cantique.className,
        'text-center leading-loose text-[7vw] sm:text-4xl md:text-6xl',
      )}
      style={{
        x,
      }}
    >
      {letters.map((letter, index) => (
        <DynamicLetterWave
          key={`${letter}-${index}`}
          scrollYProgress={scrollYProgress}
          index={index}
          char={letter}
        />
      ))}
    </motion.h2>
  );
};
