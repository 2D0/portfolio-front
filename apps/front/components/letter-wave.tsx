import type { HTMLAttributes } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@repo/commons/cn';

interface LetterSpinProps
  extends Pick<HTMLAttributes<HTMLSpanElement>, 'className'> {
  scrollYProgress: MotionValue<number>;
  char: string;
  index: number;
}

export const LetterWave = ({
  scrollYProgress,
  char,
  index,
  className,
}: LetterSpinProps) => {
  const waveOffset = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, 0]);
  const rotate = useTransform(
    waveOffset,
    offset =>
      Math.sin((index + offset) * 0.5) * (scrollYProgress.get() < 0.5 ? 15 : 0),
  );
  const y = useTransform(
    waveOffset,
    offset =>
      Math.sin((index + offset) * 0.5) * (scrollYProgress.get() < 0.5 ? 10 : 0),
  );

  return (
    <motion.span
      style={{
        rotate,
        y,
      }}
      className={cn(className, 'inline-block')}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};
