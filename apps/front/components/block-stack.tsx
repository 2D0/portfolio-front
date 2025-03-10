import { useRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';
import { montserrat } from '@/public/fonts';
import { Icon } from '@repo/ui/components';
import { BlockContainer } from './block-container';
import type { StackMap } from '@/interface';
import type { IconStack } from '@repo/ui/interface';

const stackBadgeVariants = cva('text-lg sm:text-xl md:text-2xl font-bold', {
  variants: {
    variant: {
      'Next.js14': 'text-[#FEABF1]',
      React: 'text-[#86D9F3]',
      Vue: 'text-[#D0F386]',
      Supabase: 'text-[#7BD78A]',
      Turborepo: 'text-[#FE778E]',
      JavaScript: 'text-[#F3DB86]',
      TypeScript: 'text-[#74A7FF]',
      StyledComponents: 'text-[#FFC0AD]',
      SCSS: 'text-[#CFFFEE]',
      TailwindCSS: 'text-[#C770FD]',
      Figma: 'text-[#FFAED5]',
      PHP: 'text-[#F38686]',
      HTML: 'text-[#EB9753]',
      CSS: 'text-[#B7B0FF]',
      jQuery: 'text-[#E5B885]',
      GitHub: 'text-[#FFB1BE]',
      Jira: 'text-[#B0C9FF]',
      'Nuxt.js': 'text-[#1DCA5F]',
      '프론트 개발': 'bg-gray-400 text-white',
      퍼블리싱: 'bg-gray-500 text-white',
      'UI/UX 디자인': 'bg-gray-600 text-white',
    },
  },
});

export const StackBlock = ({ text }: { text: StackMap }) => {
  const [tooltipPosition, setTooltipPosition] = useState({
    x: -9999,
    y: -9999,
  });
  const [isVisiable, setIsVisiable] = useState<boolean>(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const tooltipOffset = 10;
    const tooltip = tooltipRef.current;

    if (!tooltip) return;

    const tolltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const screenWith = window.innerWidth;
    const screenHeight = window.innerHeight;

    let x = e.clientX + tooltipOffset;
    let y = e.clientY + tooltipOffset;

    if (x + tolltipWidth > screenWith) {
      x = screenWith - tolltipWidth - tooltipOffset;
    }

    if (y + tooltipHeight > screenHeight) {
      y = screenHeight - tooltipHeight - tooltipOffset;
    }

    if (x < 0) {
      x = e.clientX + tooltipOffset;
    }

    if (y < 0) {
      y = e.clientY + tooltipOffset;
    }

    setTooltipPosition({ x, y });
  };

  return (
    <BlockContainer
      className="grid grid-cols-[max-content_1fr] items-center gap-x-2 sm:gap-x-3 gap-y-0 sm:gap-y-1 w-full relative"
      variants={{ height: 'fit', padding: 'md' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsVisiable(true);
      }}
      onMouseLeave={() => {
        setIsVisiable(false);
      }}
    >
      <div className="grid place-content-center w-12 sm:w-14 h-12 sm:!h-14 rounded-full overflow-hidden row-span-2 bg-black !bg-opacity-60 border border-white border-opacity-40">
        <div className="w-6 sm:!w-10 h-6 sm:h-10 relative">
          <Icon
            name={text.name as IconStack}
            width={28}
            height={28}
            alt={text.name}
            className="w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>
      </div>
      <h3
        className={cn(
          stackBadgeVariants({ variant: text.name }),
          'text-blue-200',
          montserrat.className,
        )}
      >
        {text.name}
      </h3>
      <p>{text.title}</p>
      {isVisiable ? (
        <div
          ref={tooltipRef}
          className="w-3/4 sm:w-1/3 p-3 fixed z-10 text-base sm:text-lg text-wrap rounded-md text-blue-200 border border-white border-opacity-20 bg-black bg-opacity-80"
          style={{
            top: `${tooltipPosition.y + 10}px`,
            left: `${tooltipPosition.x + 10}px`,
            pointerEvents: 'none',
          }}
        >
          {text.desc}
        </div>
      ) : null}
    </BlockContainer>
  );
};
