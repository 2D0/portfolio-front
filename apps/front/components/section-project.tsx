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
  const [stack, setStack] = useState<ProjectMap['stack'] | string>('All');
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
    stack === 'All'
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
        {/* <select
          onChange={e => {
            setStack(e.target.value as ProjectMap['stack'] | 'All');
          }}
        >
          {['All', ...[...new Set(textMap.map(text => text.stack).flat())]].map(
            stack => (
              <option key={stack} value={stack}>
                {stack}
              </option>
            ),
          )}
          <option value="all">All</option>
          <option value="Next.js14">Next.js14</option>
          <option value="React">React</option>
          <option value="Vue">Vue</option>
          <option value="JavaScript">JavaScript</option>
          <option value="TypeScript">TypeScript</option>
          <option value="Supabase">Supabase</option>
          <option value="Turborepo">Turborepo</option>
          <option value="TailwindCSS">TailwindCSS</option>
          <option value="StyledComponents">StyledComponents</option>
          <option value="SCSS">StyledComponents</option>
        </select> */}
        <div>
          <input type="text" value={stack} />
          <ul className="flex gap-2">
            {['All', ...setText].map(stackName => (
              <li key={String(stackName)} value={stackName}>
                <button
                  type="button"
                  onClick={() => {
                    setStack(stackName);
                  }}
                  className={cn(
                    stack === stackName ? 'bg-blue-500' : 'bg-blue-300',
                  )}
                >
                  {stackName}
                </button>
              </li>
            ))}
          </ul>
        </div>
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
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
