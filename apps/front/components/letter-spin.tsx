import { HTMLAttributes } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@repo/commons/cn';

interface AnimationLetterProps
  extends Pick<HTMLAttributes<HTMLSpanElement>, 'className'> {
  scrollYProgress: MotionValue<number>;
  char: string;
  index: number;
  total: number;
}

export const AnimationLetter = ({
  scrollYProgress,
  char,
  index,
  total,
  className,
}: AnimationLetterProps) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (index - total / 2) * 100],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, -50 * (1 - Math.abs((index - total / 2) / (total / 2))), -100],
  );

  return (
    <motion.span
      style={{
        scale,
        rotate,
        opacity,
        x,
        y,
      }}
      className={cn(className, 'inline-block')}
    >
      {char}
    </motion.span>
  );
};
