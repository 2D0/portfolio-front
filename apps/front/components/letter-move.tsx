import type { HTMLAttributes, PropsWithChildren } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { cn } from '@repo/commons/cn';

interface LetterSpinProps
  extends Pick<HTMLAttributes<HTMLSpanElement>, 'className'>,
    PropsWithChildren {
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
  styleY?: boolean;
  rightX?: boolean;
}

export const LetterMove = ({
  scrollYProgress,
  children,
  index,
  styleY,
  rightX,
  className,
}: LetterSpinProps) => {
  const delay = index * 0.05;
  const start = 0 + delay;
  const end = 0.5 + delay;
  const x = useTransform(
    scrollYProgress,
    [start, end, 1],
    rightX ? ['50vw', '0vw', '0vw'] : ['-50vw', '0vw', '0vw'],
  );
  const y = useTransform(
    scrollYProgress,
    [start, end, 1],
    ['50vw', '0vw', '0vw'],
  );

  return (
    <motion.div
      style={{
        x,
        y: styleY ? y : 0,
      }}
      className={cn(className, 'inline-block')}
    >
      {children}
    </motion.div>
  );
};
