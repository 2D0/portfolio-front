import { useState, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BackgroundStars } from '@components/background-stars';
import { Pagination, SelectBox } from '@repo/ui/components';
import { useGetPageItems } from '@repo/commons/hooks';
import { BlockTitle } from './block-title';
import { BlockProject } from './block-project';
import type { Stack } from '@repo/ui/interface';
import type { ProjectMap, UseGetPageItems } from '@/interface';

interface SectionProjectProps extends HTMLAttributes<HTMLDivElement> {
  textMap: Array<ProjectMap>;
}
type SetText = Stack | 'All Stacks';

export const SectionProject = ({ textMap, ...props }: SectionProjectProps) => {
  const [stack, setStack] = useState<Stack | 'All Stacks'>('All Stacks');
  const [selected, setSelected] = useState<boolean>(false);
  const { ref, inView } = useInView({
    threshold: 0.3,
    rootMargin: '0px 0px 50% 0px',
    triggerOnce: false,
  });

  const filterMap =
    stack === 'All Stacks'
      ? textMap
      : textMap.filter(text => text.stack.includes(stack));

  const {
    page,
    setPage,
    getPageItems,
    unit,
    handleDragPage,
  }: UseGetPageItems<ProjectMap> = useGetPageItems<ProjectMap>({
    unit: 3,
    itemList: filterMap,
  });
  const setText: SetText[] = [
    'All Stacks',
    ...Array.from(new Set<Stack>(textMap.map(text => text.stack).flat())),
  ];

  return (
    <section {...props} className="flex flex-col w-full h-fit relative">
      <div className="h-24" />
      <div
        ref={ref}
        className="grid place-items-center gap-10 sm:gap-20 page-inner min-h-screen pb-10"
      >
        <BlockTitle title="PROJECT" inView={inView} />
        <div className="flex flex-col gap-2 w-full">
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
                onClick={() => setPage(0)}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Pagination
                length={filterMap.length}
                unit={unit}
                page={page}
                setPage={setPage}
              />
            </motion.div>
          </div>
          <motion.ul
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragPage}
          >
            {getPageItems.map((text, index) => (
              <motion.li
                key={text.name}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.4 * (index + 1) }}
              >
                <BlockProject text={text} />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
      <div className="h-48" />
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
