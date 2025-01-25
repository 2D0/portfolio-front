import { montserrat } from '@/public/fonts';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';

const stackBadgeVariants = cva(
  'w-fit h-fit py-1 px-2 rounded-md border-white border border-opacity-20 whitespace-nowrap text-black',
  {
    variants: {
      variant: {
        'Next.js14': 'bg-[#FEABF1]',
        React: 'bg-[#86D9F3]',
        Vue: 'bg-[#D0F386]',
        Supabase: 'bg-[#7BD78A]',
        Turborepo: 'bg-[#FE778E]',
        JavaScript: 'bg-[#F3DB86]',
        TypeScript: 'bg-[#74A7FF]',
        StyledComponents: 'bg-[#FFC0AD]',
        SCSS: 'bg-[#CFFFEE]',
        TailwindCSS: 'bg-[#C770FD]',
        Figma: 'bg-[#FFAED5]',
        PHP: 'bg-[#F38686]',
        HTML: 'bg-[#EB9753]',
        CSS: 'bg-[#B7B0FF]',
        jQuery: 'bg-[#E5B885]',
        GitHub: 'bg-[#FFB1BE]',
        Jira: 'bg-[#B0C9FF]',
        Cafe24Module: 'bg-[#F4D87C]',
        'Nuxt.js': 'bg-[#1DCA5F]',
        '기획 및 총괄': 'bg-gray-800 text-white',
        '백엔드 개발': 'bg-gray-600 text-white',
        '프론트 개발': 'bg-gray-500 text-white',
        퍼블리싱: 'bg-gray-600 text-white',
        'UI/UX 디자인': 'bg-gray-700 text-white',
      },
      size: {
        sm: 'text-sm py-0.5 px-1',
      },
    },
  },
);

export const StackBadge = ({
  variant,
  size,
  className,
}: VariantProps<typeof stackBadgeVariants> &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>) => {
  return (
    <div
      className={cn(
        stackBadgeVariants({ variant, size }),
        montserrat.className,
        className,
      )}
    >
      {variant}
    </div>
  );
};
