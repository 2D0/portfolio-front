import type { HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/commons/cn';

interface LetterSpinProps
  extends Pick<HTMLAttributes<HTMLSpanElement>, 'className'> {
  inView: boolean;
  char: string;
  index: number;
  total: number;
  reverse?: boolean;
}

export const LetterSpin = ({
  inView,
  char,
  index,
  total,
  className,
  reverse,
}: LetterSpinProps) => {
  const xOffset = (index - total / 2) * 100;
  const midY = -50 * (1 - Math.abs((index - total / 2) / (total / 2)));

  const delay = index * 0.1;
  const variants = {
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.5, delay },
    },
    hidden: {
      scale: 3,
      rotate: 360,
      opacity: 0,
      x: xOffset,
      y: reverse ? [-100, midY, 0] : [0, midY, -100],
      transition: { duration: 0.5, delay },
    },
  };

  return (
    <motion.span
      variants={variants}
      animate={inView ? 'visible' : 'hidden'}
      initial="hidden"
      className={cn(className, 'inline-block')}
    >
      {char}
    </motion.span>
  );
};
