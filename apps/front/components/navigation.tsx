'use client';
import { cn } from '@repo/commons/cn';
import { montserrat } from '@/public/fonts';
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useNavEvent } from '@/contexts/nav.context';
import { NavList } from '@/lib/textStorage/navigation';

export const Navigation = () => {
  const { selectName, setSelectName, setNavScroll } = useNavEvent();

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 w-full z-30 bg-transparent backdrop-blur-md',
      )}
    >
      <nav className="flex items-center justify-end w-full h-16 px-4">
        <ul
          className={cn(
            montserrat.className,
            'flex items-center justify-between space-x-4',
          )}
        >
          {NavList.map(nav => (
            <li key={nav}>
              <button
                type="button"
                className={cn(
                  selectName === nav ? 'text-blue-200' : 'text-gray-500',
                  'cursor-pointer transition-all duration-300',
                )}
                onClick={() => {
                  setSelectName(nav);
                  setNavScroll(nav);
                }}
              >
                {nav}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
};
