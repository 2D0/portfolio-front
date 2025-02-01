import { useEffect, useState, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@repo/commons/cn';

export interface LetterSpinProps
  extends Pick<HTMLAttributes<HTMLSpanElement>, 'className'> {
  inView: boolean;
  char: string;
  index: number;
}

export const LetterWave = ({
  inView,
  char,
  index,
  className,
}: LetterSpinProps) => {
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    if (inView) {
      setTimeout(() => setAnimationTrigger(true), index * 100);
    } else {
      setAnimationTrigger(false);
    }
  }, [inView, index]);

  return (
    <motion.span
      initial={{ y: 0, rotate: 0, opacity: 1 }}
      animate={
        animationTrigger
          ? {
              y: [0, -10, 0, 5, 0],
              rotate: [0, 10, -10, 5, 0],
              transition: {
                duration: 1.5,
                ease: 'easeInOut',
                delay: index * 0.1 + 0.4,
              },
            }
          : { y: 0, rotate: 0, opacity: 1 }
      }
      className={cn(className, 'inline-block')}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};
