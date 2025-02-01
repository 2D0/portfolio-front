import { type HTMLAttributes } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { cn } from '@repo/commons/cn';
import { cantique, montserrat } from '@/public/fonts';
import { BackgroundStars } from '@components/background-stars';
import { LetterSpin } from '@components/letter-spin';
import { Icon, ImageBox } from '@repo/ui/components';
import type { ContactMapType } from '@/interface';

interface SectionContactProps extends HTMLAttributes<HTMLDivElement> {
  textMap: ContactMapType;
}

const topLetters = 'LEE DAYOUNG'.split('');

export const SectionContact = ({ textMap, ...props }: SectionContactProps) => {
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: false,
  });

  return (
    <section
      {...props}
      ref={ref}
      className="w-full h-screen flex items-center justify-center relative"
    >
      <div className="absolute grid gird-cols-1 sm:grid-cols-[max-content_1fr] place-items-center sm:place-items-start  gap-x-20 md:gap-x-32 gap-y-10 sm:gap-y-14 md:gap-y-24">
        <motion.div
          className={cn(
            cantique.className,
            'text-3xl md:text-4xl leading-loose text-center',
          )}
        >
          {topLetters.map((letter, index) => (
            <LetterSpin
              key={`${letter}-${index}`}
              inView={inView}
              index={index}
              char={letter}
              total={topLetters.length}
              reverse
            />
          ))}
        </motion.div>
        <motion.div
          className="row-span-2 w-full"
          initial={{ opacity: 0, x: 250, scale: 0.5 }}
          animate={
            inView
              ? { opacity: 1, x: 0, scale: 1 }
              : { opacity: 0, x: 250, scale: 0.5 }
          }
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <ImageBox
            imagePorps={{
              src: '/images/source/qr-code.svg',
              alt: 'QR코드',
              width: 200,
              height: 200,
            }}
            className="w-[130px] md:w-[200px] h-[130px] md:h-[200px] mx-auto sm:mx-0"
          />
        </motion.div>
        <ul
          className={cn(
            cantique.className,
            'flex flex-col text-center sm:text-left text-base md:text-xl',
          )}
        >
          {textMap.info.map((info, index) => (
            <motion.li
              key={info.name}
              initial={{ opacity: 0, x: -250, scale: 0.5 }}
              animate={
                inView
                  ? { opacity: 1, x: 0, scale: 1 }
                  : { opacity: 0, x: -250, scale: 0.5 }
              }
              transition={{ duration: 0.7, delay: 0.2 * index + 0.4 }}
              className={cn(montserrat.className)}
            >
              {info.name}:&nbsp;
              <span>{info.content}</span>
            </motion.li>
          ))}
        </ul>
        <ul className="flex gap-5">
          {textMap.sns.map((sns, index) => (
            <motion.li
              key={sns.name}
              initial={{ opacity: 0, x: -250, y: 150, scale: 0.5 }}
              animate={
                inView
                  ? { opacity: 1, x: 0, y: 0, scale: 1 }
                  : { opacity: 0, x: -250, y: 150, scale: 0.5 }
              }
              transition={{ duration: 0.7, delay: 0.2 * index + 0.4 }}
              className={cn(montserrat.className)}
            >
              <Link
                href={sns.href}
                target="_blank"
                className="block w-11 md:w-14 h-11 md:h-14 relative"
              >
                <Icon
                  name={sns.name}
                  alt={sns.name}
                  className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center',
                  }}
                />
              </Link>
            </motion.li>
          ))}
        </ul>
        <motion.div
          initial={{ opacity: 0, x: 250, y: 150, scale: 0.5 }}
          animate={
            inView
              ? { opacity: 1, x: 0, y: 0, scale: 1 }
              : { opacity: 0, x: 250, y: 150, scale: 0.5 }
          }
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <Link
            href={textMap.resumeUrl}
            className="underline underline-offset-4 text-center my-auto"
          >
            노션 이력서 바로가기
          </Link>
        </motion.div>
      </div>
      <BackgroundStars className="w-screen h-screen" />
    </section>
  );
};
