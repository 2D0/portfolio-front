'use client';
import { cn } from '@repo/commons/cn';
import { montserrat } from '@/public/fonts';
import { motion } from 'framer-motion';
import { useNavEvent } from '@/contexts/nav.context';
import { ImageBox } from '@repo/ui/components';
import { NavList } from '@lib/textStorage/navigation';

const letters = '프론트엔드·이다영'.split('');
const movingLetters = letters.filter(letter => letter !== '·');
const letterVariants = {
  initial: { y: 0 },
  animate: (index: number) => ({
    y: [-5, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: movingLetters.length * 0.2 + 1.5,
      delay: index * 0.2,
    },
  }),
};

export const Navigation = () => {
  const { selectName, setSelectName, setNavScroll, isMenuOpen, setIsMenuOpen } =
    useNavEvent();

  return (
    <motion.header
      className={cn(
        montserrat.className,
        'flex items-center justify-between h-16 px-4 fixed top-0 left-0 w-full z-30 bg-transparent backdrop-blur-md',
      )}
    >
      <div className="flex items-center gap-x-1">
        <ImageBox
          imagePorps={{
            src: '/images/source/char-diane.png',
            alt: 'char-diane',
            width: 40,
            height: 40,
          }}
          rounded="none"
          className="relative w-6 h-6"
        />
        <motion.h1 className="text-lg text-nowrap leading-none">
          {letters.map((letter, index) =>
            letter === '·' ? (
              <span key={`${letter}-${index}`} className="inline-block">
                {letter}
              </span>
            ) : (
              <motion.span
                key={`${letter}-${index}`}
                className="inline-block"
                variants={letterVariants}
                initial="initial"
                animate="animate"
                custom={movingLetters.indexOf(letter)}
              >
                {letter}
              </motion.span>
            ),
          )}
        </motion.h1>
      </div>
      <button
        type="button"
        className="grid lg:!hidden place-content-center w-7 h-7"
        onClick={() => setIsMenuOpen(true)}
      >
        <span className="block w-4 h-[1.5px] rounded-full relative bg-gray-100 before:block before:content-[''] before:w-full before:h-full before:rounded-full before:absolute before:-top-[5px] before:bg-gray-100 after:block after:content-[''] after:w-full after:h-full after:rounded-full after:absolute after:-bottom-[5px] after:bg-gray-100" />
      </button>
      <nav
        className={cn(
          isMenuOpen ? 'right-0' : '-right-full',
          'flex items-center justify-end w-2/3 lg:w-full h-screen lg:h-fit absolute lg:!relative top-0 z-40 bg-black lg:!bg-transparent !bg-opacity-80 transition-all duration-300',
        )}
      >
        <ul
          className={cn(
            montserrat.className,
            'flex flex-col lg:!flex-row items-center gap-x-4 gap-y-4 lg:gap-y-0 absolute lg:!relative top-1/2 lg:!top-auto left-1/2 lg:!left-auto -translate-x-1/2 lg:!-translate-x-0 -translate-y-1/2 lg:!-translate-y-0',
          )}
        >
          {NavList.map(nav => (
            <li key={nav}>
              <button
                type="button"
                className={cn(
                  selectName === nav
                    ? 'text-blue-200'
                    : 'text-gray-100 lg:text-gray-500',
                  'cursor-pointer transition-all duration-300',
                )}
                onClick={() => {
                  setSelectName(nav);
                  setNavScroll(nav);
                  setIsMenuOpen(false);
                }}
              >
                {nav}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="grid lg:!hidden place-content-center w-7 h-7 absolute top-4 right-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="block relative w-4 h-0.5 before:block before:content-[''] before:w-full before:h-full before:absolute before:bg-gray-100 before:rounded-md before:-rotate-45 after:block after:content-[''] after:w-full after:h-full after:absolute after:bg-gray-100 after:rounded-md after:rotate-45" />
        </button>
      </nav>
    </motion.header>
  );
};
