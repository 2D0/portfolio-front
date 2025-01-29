import type { HTMLAttributes } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@repo/commons/cn';

interface LetterSpinProps
  extends Pick<HTMLAttributes<HTMLSpanElement>, 'className'> {
  scrollYProgress: MotionValue<number>;
  char: string;
  index: number;
  total: number;
  reverse?: boolean;
}

export const LetterSpin = ({
  scrollYProgress,
  char,
  index,
  total,
  className,
  reverse,
}: LetterSpinProps) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const reverseScale = useTransform(scrollYProgress, [0, 0.5, 1], [3, 1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const reverseRotate = useTransform(scrollYProgress, [0, 0.5, 1], [360, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const reverseOpacity = useTransform(scrollYProgress, [0, 0, 1], [0, 1, 1]);

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (index - total / 2) * 100],
  );

  const reverseX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [(index - total / 2) * 100, 1, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -50 * (1 - Math.abs((index - total / 2) / (total / 2))), -100],
  );
  const reverseY = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 1],
    [-100, -50 * (1 - Math.abs((index - total / 2) / (total / 2))), 0, 0],
  );

  return (
    <motion.span
      style={
        reverse
          ? {
              scale: reverseScale,
              rotate: reverseRotate,
              opacity: reverseOpacity,
              x: reverseX,
              y: reverseY,
            }
          : {
              scale,
              rotate,
              opacity,
              x,
              y,
            }
      }
      className={cn(className, 'inline-block')}
    >
      {char}
    </motion.span>
  );
};
