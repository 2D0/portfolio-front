'use client';
import { cn } from '@repo/commons/cn';
import { montserrat } from '@/public/fonts';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

export const Navigation = () => {
  const { scrollY } = useScroll();
  const blurValue: MotionValue<string> = useTransform(
    scrollY,
    [0, 100],
    ['0px', '10px'],
  );

  return (
    <motion.header
      className="fixed top-0 left-0 w-full"
      style={{
        backdropFilter: blurValue,
        WebkitBackdropFilter: blurValue,
      }}
    >
      <nav className="flex items-center justify-end w-full h-16 px-4">
        <ul
          className={cn(
            montserrat.className,
            'flex items-center justify-between space-x-4',
          )}
        >
          <li>IT’S ME</li>
          <li>STACK</li>
          <li>PROJECT</li>
          <li>CODE LOGIC</li>
          <li>PICK ME</li>
        </ul>
      </nav>
    </motion.header>
  );
};
