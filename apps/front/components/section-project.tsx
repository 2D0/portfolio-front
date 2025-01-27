import { useRef, useState, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@repo/commons/cn';
import { BackgroundStars } from '@components/background-stars';
import { cantique } from '@/public/fonts';
import { BlockProject } from './block-project';
import { LetterWave } from './letter-wave';
import type { Stack } from '@repo/ui/interface';
import type { ProjectMap } from '@/interface';
import { SelectBox } from '@repo/ui/components';

interface SectionProjectProps extends HTMLAttributes<HTMLDivElement> {
  textMap: ProjectMap[];
}
type SetText = Stack | 'All Stacks';

const letters = 'PROJECT'.split('');

export const SectionProject = ({ textMap, ...props }: SectionProjectProps) => {
  const [stack, setStack] = useState<Stack | 'All Stacks'>('All Stacks');
  const [selected, setSelected] = useState<boolean>(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 0.25, 1], ['50vw', '0vw', '0vw']);
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  const filterText =
    stack === 'All Stacks'
      ? textMap
      : textMap.filter(text => text.stack.includes(stack));

  const setText: SetText[] = [
    'All Stacks',
    ...Array.from(new Set<Stack>(textMap.map(text => text.stack).flat())),
  ];

  return (
    <section
      ref={ref}
      {...props}
      className="flex flex-col w-full h-fit relative"
    >
      <div className="h-72" />
      <div className="grid place-items-center gap-20 min-h-screen pb-10">
        <motion.h2
          ref={titleRef}
          className={cn(cantique.className, 'text-6xl')}
          style={{
            x,
          }}
        >
          {letters.map((letter, index) => (
            <LetterWave
              key={`${letter}-${index}`}
              scrollYProgress={scrollYProgress}
              index={index}
              char={letter}
            />
          ))}
        </motion.h2>
        <div className="flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SelectBox<Stack | 'All Stacks'>
              textMap={setText}
              name={stack}
              setName={setStack}
              selected={selected}
              setSelected={setSelected}
            />
          </motion.div>
          <ul className="grid grid-cols-3 gap-4">
            {filterText.map((text, index) => (
              <motion.li
                key={text.name}
                initial={{ opacity: 0, y: -50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: 0.4 * index }}
              >
                <BlockProject text={text} />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
