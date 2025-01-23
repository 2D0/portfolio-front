import { montserrat } from '@/public/fonts';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';

const stackBadgeVariants = cva(
  'w-fit h-fit py-1 px-2 rounded-md border-white border border-opacity-20 whitespace-nowrap text-white',
  {
    variants: {
      variant: {
        'Next.js14': 'bg-gray-700',
        React: 'bg-blue-600',
        Vue: 'bg-green-700',
        Supabase: 'bg-teal-700',
        JavaScript: 'bg-yellow-400 text-black',
        TypeScript: 'bg-blue-700',
        'Styled Components': 'bg-pink-700',
        SCSS: 'bg-fuchsia-600',
        'Tailwind CSS': 'bg-cyan-600',
        Figma: 'bg-purple-800',
        PHP: 'bg-indigo-800',
        HTML: 'bg-orange-800',
        CSS: 'bg-blue-500',
        jQuery: 'bg-orange-600',
        Nuxt: 'bg-green-800',
        '프론트 개발': 'bg-gray-400',
        퍼블리싱: 'bg-gray-500',
        'UI/UX 디자인': 'bg-gray-600',
      },
    },
  },
);

export const StackBadge = ({
  variant,
  className,
}: VariantProps<typeof stackBadgeVariants> &
  Pick<React.HTMLAttributes<HTMLDivElement>, 'className'>) => {
  return (
    <div
      className={cn(
        stackBadgeVariants({ variant }),
        montserrat.className,
        className,
      )}
    >
      {variant}
    </div>
  );
};
