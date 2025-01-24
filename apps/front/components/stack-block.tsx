import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@repo/commons/cn';
import { montserrat } from '@/public/fonts';
import { StackMap } from '@/interface';
import { Icon } from '@repo/ui/components';
import type { Stack } from '@repo/ui/interface';

const stackBadgeVariants = cva('text-2xl font-bold', {
  variants: {
    variant: {
      'Next.js14': 'text-[#FEABF1]',
      React: 'text-[#86D9F3]',
      Vue: 'text-[#D0F386]',
      Supabase: 'text-[#7BD78A]',
      Turborepo: 'text-[#FE778E]',
      JavaScript: 'text-[#F3DB86]',
      TypeScript: 'text-[#74A7FF]',
      'Styled Components': 'text-[#FFC0AD]',
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
  return (
    <div className="grid grid-cols-[max-content_1fr] items-center gap-x-3 gap-y-1 w-full h-fit p-3 rounded-md border-white border border-opacity-20 whitespace-nowrap bg-white bg-opacity-10">
      <div className="grid place-content-center w-14 h-14 rounded-full overflow-hidden row-span-2 bg-black bg-opacity-60 border border-white border-opacity-40">
        <Icon
          name={text.name as Stack}
          width={28}
          height={28}
          alt={text.name}
        />
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
      {/* <p className="text-lg text-center">{text.desc}</p> */}
    </div>
  );
};
