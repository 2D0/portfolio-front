import { useRef, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BackgroundStars } from '@components/background-stars';
import type { CareerMap } from '@/interface';
import { CareerBlock } from './career-block';
import { useInView } from 'react-intersection-observer';

interface CareerSectionProps extends HTMLAttributes<HTMLDivElement> {
  textMap: CareerMap[];
}

export const CareerSection = ({ textMap, ...props }: CareerSectionProps) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
  });

  return (
    <section
      {...props}
      ref={ref}
      className="w-full min-h-screen h-fit py-10 flex justify-center relative"
    >
      <ul className="grid grid-cols-2 gap-4">
        {textMap.map((text, index) => (
          <motion.li
            key={text.name}
            initial={{ opacity: 0, y: -50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: 0.2 * index }}
          >
            <CareerBlock text={text} />
          </motion.li>
        ))}
      </ul>
      <BackgroundStars className="absolute -z-10 w-screen h-fit" />
    </section>
  );
};
