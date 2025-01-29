import { useRef, type HTMLAttributes } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@repo/commons/cn';
import { cantique, montserrat } from '@/public/fonts';
import { BackgroundStars } from '@components/background-stars';
import { LetterSpin } from '@components/letter-spin';
import { Icon, ImageBox } from '@repo/ui/components';
import type { ContactMapType } from '@/interface';
import Link from 'next/link';
import { div } from 'framer-motion/client';
import { LetterMove } from './letter-move';

interface SectionContactProps extends HTMLAttributes<HTMLDivElement> {
  textMap: ContactMapType;
}

const topLetters = 'LEE DAYOUNG'.split('');

export const SectionContact = ({ textMap, ...props }: SectionContactProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['10vh 50vh', 'end'],
  });
  const rightX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['50vw', '0vw', '0vw'],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 1, 1]);

  return (
    <section
      {...props}
      ref={sectionRef}
      className="w-full h-screen flex items-center justify-center relative"
    >
      <div className="absolute grid grid-cols-[max-content_1fr] gap-x-32 gap-y-24">
        <motion.div
          className={cn(
            cantique.className,
            'text-4xl leading-loose text-center',
          )}
        >
          {topLetters.map((char, index) => (
            <LetterSpin
              key={`${char}${index}`}
              scrollYProgress={scrollYProgress}
              index={index}
              char={char}
              total={topLetters.length}
              reverse
            />
          ))}
        </motion.div>
        <motion.div
          className="row-span-2 w-full"
          style={{
            x: rightX,
            scale,
          }}
        >
          <ImageBox
            imagePorps={{
              src: '/images/source/qr-code.svg',
              alt: 'QR코드',
              aspectSize: { size: 200 },
            }}
            className="w-full"
          />
        </motion.div>
        <div className={cn(cantique.className, 'flex flex-col text-xl')}>
          {textMap.info.map((info, index) => (
            <LetterMove
              key={info.name}
              scrollYProgress={scrollYProgress}
              index={index}
              total={textMap.info.length}
              className={cn(montserrat.className)}
            >
              {info.name}:{' '}
              <span className={cn(montserrat.className)}>{info.content}</span>
            </LetterMove>
          ))}
        </div>
        <div className="flex gap-5">
          {textMap.sns.map((sns, index) => (
            <LetterMove
              key={sns.name}
              scrollYProgress={scrollYProgress}
              styleY
              index={index}
              total={textMap.info.length}
              className={cn(montserrat.className)}
            >
              <Link href={sns.href} target="_blank">
                <Icon name={sns.name} alt={sns.name} />
              </Link>
            </LetterMove>
          ))}
        </div>
        <motion.div>
          <LetterMove
            scrollYProgress={scrollYProgress}
            rightX
            styleY
            index={0}
            total={textMap.info.length}
          >
            <Link
              href={textMap.resumeUrl}
              className="underline underline-offset-4 text-center my-auto"
            >
              노션 이력서 바로가기
            </Link>
          </LetterMove>
        </motion.div>
      </div>
      <BackgroundStars className="w-screen h-screen" />
    </section>
  );
};
