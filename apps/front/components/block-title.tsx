import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { cn } from '@repo/commons/cn';
import { cantique } from '@/public/fonts';
import type { LetterSpinProps } from './letter-wave';

interface BlockTitleProps {
  title: string;
  inView: boolean;
}

const DynamicLetterWave = dynamic<LetterSpinProps>(
  () => import('./letter-wave').then(mod => mod.LetterWave),
  { ssr: false },
);

export const BlockTitle = ({ title, inView }: BlockTitleProps) => {
  const letters = title.split('');

  return (
    <motion.h2
      className={cn(
        cantique.className,
        'text-center leading-loose text-[7vw] sm:text-4xl md:text-6xl',
      )}
      initial={{ opacity: 0, x: 250 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 250 }}
      transition={{ duration: 0.7, delay: 0.4 }}
    >
      {letters.map((letter, index) => (
        <DynamicLetterWave
          key={`${letter}-${index}`}
          inView={inView}
          index={index}
          char={letter}
        />
      ))}
    </motion.h2>
  );
};
