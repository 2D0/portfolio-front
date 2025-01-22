import { type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BackgroundStars } from './background-stars';

const letters = 'GALAXYDIANE'.split('');
export const HeroSection = (props: HTMLAttributes<HTMLDivElement>) => {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div
      {...props}
      className="w-full h-screen flex items-center justify-center relative"
    >
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        {letters.map((char, index) => (
          <motion.span
            key={`${char}${index}`}
            custom={index}
            className="animated-letter text-6xl"
            style={{
              rotate,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
      <BackgroundStars className="w-screen h-screen" />
    </div>
  );
};
