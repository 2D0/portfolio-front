import { useRef, useState, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { cn } from '@repo/commons/cn';
import { BackgroundStars } from '@components/background-stars';
import { cantique } from '@/public/fonts';
import { BlockProject } from './block-project';
import { LetterWave } from './letter-wave';
import type { ProjectMap } from '@/interface';

interface SectionProjectProps extends HTMLAttributes<HTMLDivElement> {
  textMap: ProjectMap[];
}

const letters = 'PROJECT'.split('');

export const SectionProject = ({ textMap, ...props }: SectionProjectProps) => {
  const [stack, setStack] = useState<ProjectMap['stack'] | string>(
    'All Stacks',
  );
  const [slected, setSelected] = useState<boolean>(false);
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

  const setText = Array.from(
    new Set<string>(textMap.map(text => text.stack).flat()),
  );

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
            <button
              type="button"
              className="flex justify-between items-center w-40 h-8 px-2 rounded-md !bg-white !bg-opacity-20 border border-white border-opacity-20"
              onClick={() => setSelected(!slected)}
            >
              {stack}
              <i className="block w-2.5 h-[1.5px] relative before:block before:content-[''] before:w-full before:h-full before:absolute before:left-[3px] before:rounded-full before:rotate-[-45deg] before:bg-[#EBEBEB] after:block after:content-[''] after:w-full after:h-full after:absolute after:right-[3px] after:rounded-full after:rotate-[45deg] after:bg-[#EBEBEB]" />
            </button>
            <ul
              className={cn(
                slected ? 'h-60 mt-1' : 'h-0',
                'flex flex-col gap-1 w-40 overflow-y-auto absolute z-10 rounded-md transition-All Stacks duration-200 bg-black bg-opacity-80',
              )}
            >
              {['All Stacks', ...setText].map(stackName => (
                <li key={String(stackName)} value={stackName}>
                  <button
                    type="button"
                    onClick={() => {
                      setStack(stackName);
                      setSelected(false);
                    }}
                    className="w-full h-7 px-2 text-left hover:bg-blue-200 hover:text-black"
                  >
                    {stackName}
                  </button>
                </li>
              ))}
            </ul>
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
