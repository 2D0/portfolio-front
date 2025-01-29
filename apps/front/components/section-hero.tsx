import { useRef, type HTMLAttributes } from 'react';
import { motion, useScroll } from 'framer-motion';
import { cn } from '@repo/commons/cn';
import { cantique } from '@/public/fonts';
import { BackgroundStars } from '@components/background-stars';
import { LetterSpin } from '@components/letter-spin';

const topLetters = 'FRONTEND'.split('');
const bottomLetters = 'DIANE'.split('');

export const SectionHero = (props: HTMLAttributes<HTMLDivElement>) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start', '100vh 50vh'],
  });

  return (
    <section
      {...props}
      ref={sectionRef}
      className="w-full h-screen flex items-center justify-center relative"
    >
      <motion.div
        className={cn(
          cantique.className,
          'absolute text-6xl leading-loose text-center',
        )}
      >
        {topLetters.map((char, index) => (
          <LetterSpin
            key={`${char}${index}`}
            scrollYProgress={scrollYProgress}
            index={index}
            char={char}
            total={topLetters.length}
          />
        ))}
        <br />
        {bottomLetters.map((char, index) => (
          <LetterSpin
            key={`${char}${index}`}
            scrollYProgress={scrollYProgress}
            index={index}
            char={char}
            total={bottomLetters.length}
          />
        ))}
      </motion.div>
      <BackgroundStars className="w-screen h-screen" />
    </section>
  );
};
