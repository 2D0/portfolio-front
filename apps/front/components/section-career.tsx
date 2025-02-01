import { type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BackgroundStars } from '@components/background-stars';
import { useGetPageItems } from '@repo/commons/hooks';
import { BlockTitle } from './block-title';
import { CareerBlock } from './block-career';
import type { CareerMap } from '@/interface';
import { Pagination } from '@repo/ui/components';

interface SectionCareerProps extends HTMLAttributes<HTMLDivElement> {
  textMap: Array<CareerMap>;
}

export const SectionCareer = ({ textMap, ...props }: SectionCareerProps) => {
  const { page, setPage, getPageItems, unit } = useGetPageItems<CareerMap>({
    unit: 4,
    itemList: textMap,
  });
  const { ref, inView } = useInView({
    threshold: 0.4,
    rootMargin: '0px 0px 40% 0px',
    triggerOnce: false,
  });

  return (
    <section
      {...props}
      className="grid place-items-center w-full min-h-screen h-fit pb-10 relative"
    >
      <div className="h-24" />
      <div ref={ref} className="flex flex-col gap-10 sm:gap-20 page-inner">
        <BlockTitle title="WORK HISTORY" inView={inView} />
        <article className="flex flex-col gap-2">
          <div className="flex flex-col gap-5">
            <motion.p
              className="text-right"
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              블록을 <span className="hidden md:!inline-block">클릭</span>
              <span className="md:hidden inline-block">터치</span>해 보세요.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Pagination
                length={textMap.length}
                unit={unit}
                page={page}
                setPage={setPage}
              />
            </motion.div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getPageItems.map((text, index) => (
              <motion.li
                key={text.name}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.4 * (index + 1) }}
              >
                <CareerBlock text={text} />
              </motion.li>
            ))}
          </ul>
        </article>
      </div>
      <div className="h-48" />
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
