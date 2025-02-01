import { type HTMLAttributes } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { cn } from '@repo/commons/cn';
import { cantique } from '@/public/fonts';
import { BackgroundStars } from '@components/background-stars';
import { LetterSpin } from '@components/letter-spin';

const topLetters = 'FRONTEND'.split('');
const bottomLetters = 'DIANE'.split('');

export const SectionHero = (props: HTMLAttributes<HTMLDivElement>) => {
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: false,
  });

  return (
    <section
      {...props}
      className="w-full h-screen flex items-center justify-center relative"
    >
      <motion.div
        ref={ref}
        className={cn(
          cantique.className,
          'page-inner absolute !leading-loose text-[8vw] sm:text-5xl md:text-6xl text-center',
        )}
      >
        {topLetters.map((letter, index) => (
          <LetterSpin
            key={`${letter}-${index}`}
            inView={inView}
            index={index}
            char={letter}
            total={topLetters.length}
          />
        ))}
        <br />
        {bottomLetters.map((letter, index) => (
          <LetterSpin
            key={`${letter}-${index}`}
            inView={inView}
            index={index}
            char={letter}
            total={bottomLetters.length}
          />
        ))}
      </motion.div>
      <BackgroundStars className="w-screen h-screen" />
    </section>
  );
};
