import React, { useState, type HTMLAttributes } from 'react';
import { track } from '@vercel/analytics';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { montserrat } from '@/public/fonts';
import { cn } from '@repo/commons/cn';
import { CodeEditor, Pagination, SelectBox } from '@repo/ui/components';
import { BackgroundStars } from '@components/background-stars';
import { useGetPageItems } from '@repo/commons/hooks';
import { BlockTitle } from './block-title';
import { BlockContainer } from './block-container';
import { ViewComponent, ViewContext, ViewTimer } from './block-code-view';
import type {
  CodeListType,
  CodeName,
  CodeType,
  UseGetPageItems,
} from '@/interface';

interface SectionCodekProps extends HTMLAttributes<HTMLDivElement> {
  textMap: CodeListType;
}
const codeNameList = [
  'Component',
  'Next.js14',
  'Atomic System',
  'Custom Hook',
  'Context',
];

export const SectionCode = ({ textMap, ...props }: SectionCodekProps) => {
  const [codeName, setCodeName] = useState<CodeName>('Component');
  const [selected, setSelected] = useState<boolean>(false);
  const {
    page,
    setPage,
    getPageItems,
    unit,
    handleDragPage,
  }: UseGetPageItems<CodeType> = useGetPageItems<CodeType>({
    unit: 1,
    itemList: textMap[codeName].codeMap,
  });
  const { ref, inView } = useInView({
    threshold: 0.4,
    rootMargin: '0px 0px 40% 0px',
    triggerOnce: false,
  });

  return (
    <section {...props} className="flex flex-col w-full h-fit relative">
      <div className="h-24" />
      <div
        ref={ref}
        className="flex flex-col gap-10 sm:gap-20 page-inner min-h-screen pb-10"
      >
        <BlockTitle title="CODE LOGIC" inView={inView} />
        <div className="flex flex-col gap-5">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SelectBox<CodeName>
              textMap={codeNameList}
              name={codeName}
              setName={setCodeName}
              selected={selected}
              setSelected={setSelected}
              onClick={() => {
                setPage(0);
                track('코드 로직 종류 선택', { name: codeName });
              }}
              height="h-40"
            />
          </motion.div>
          <article
            ref={ref}
            className="grid grid-cols-1 grid-rows-[max-content_1fr] gap-4 w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full"
            >
              <BlockContainer
                variants={{ height: 'fit', variant: 'black' }}
                className="flex flex-col gap-2 pt-2"
              >
                <h4
                  className={cn(
                    montserrat.className,
                    'leading-none text-center text-lg text-blue-200',
                  )}
                >
                  Code Stack
                </h4>
                <BlockContainer
                  variants={{
                    height: 'fit',
                    border: 'none',
                    padding: 'sm',
                    rounded: 'md',
                  }}
                  className="flex items-center justify-center gap-x-8 gap-y-2 flex-wrap"
                >
                  {textMap[codeName].stack.map(stack => (
                    <span
                      key={stack}
                      className={cn(
                        montserrat.className,
                        'leading-none text-md',
                      )}
                    >
                      {stack}
                    </span>
                  ))}
                </BlockContainer>
              </BlockContainer>
            </motion.div>
            {textMap[codeName].view ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <BlockContainer
                  variants={{ height: 'fit', variant: 'black' }}
                  className="flex flex-col gap-2 pt-2"
                >
                  <h4
                    className={cn(
                      montserrat.className,
                      'leading-none text-center text-lg text-blue-200',
                    )}
                  >
                    View Run Code
                  </h4>
                  <BlockContainer
                    variants={{
                      height: 'fit',
                      border: 'none',
                      padding: 'sm',
                      rounded: 'md',
                    }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-h-96 overflow-y-auto"
                  >
                    {codeName === 'Component' ? <ViewComponent /> : null}
                    {codeName === 'Custom Hook' ? <ViewTimer /> : null}
                    {codeName === 'Context' ? <ViewContext /> : null}
                  </BlockContainer>
                </BlockContainer>
              </motion.div>
            ) : null}
            <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {textMap[codeName].codeMap.map((text, index) => (
                <motion.div
                  key={`${codeName}-${text.name}`}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 * (index + 1) + 0.4 }}
                >
                  <BlockContainer
                    variants={{ variant: 'black' }}
                    className="flex flex-col gap-2 pt-2"
                  >
                    <h4
                      className={cn(
                        montserrat.className,
                        'leading-none text-center text-lg text-blue-200',
                      )}
                    >
                      {text.name}
                    </h4>
                    <CodeEditor value={text.code} height="400px" />
                  </BlockContainer>
                </motion.div>
              ))}
            </div>
            <div className="flex md:hidden flex-col gap-2 w-full">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Pagination
                  length={textMap[codeName].codeMap.length}
                  unit={unit}
                  page={page}
                  setPage={setPage}
                />
              </motion.div>
              <motion.ul
                className="grid grid-cols-1 w-full cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragPage}
              >
                {getPageItems.map(text => (
                  <motion.li
                    key={`${codeName}-${text.name}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={
                      inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                    }
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="w-full"
                  >
                    <BlockContainer
                      variants={{ variant: 'black' }}
                      className="flex flex-col gap-2 w-full pt-2"
                    >
                      <h4
                        className={cn(
                          montserrat.className,
                          'leading-none text-center text-lg text-blue-200',
                        )}
                      >
                        {text.name}
                      </h4>
                      <CodeEditor value={text.code} height="400px" />
                    </BlockContainer>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </article>
        </div>
      </div>
      <div className="h-48" />
      <BackgroundStars className="absolute -z-10 w-screen h-full" />
    </section>
  );
};
