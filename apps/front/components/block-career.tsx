import Link from 'next/link';
import { track } from '@vercel/analytics';
import { cn } from '@repo/commons/cn';
import { montserrat } from '@/public/fonts';
import { StackBadge } from './stack-badge';
import { BlockContainer } from './block-container';
import type { CareerMap } from '@/interface';

interface CareerBlockProps {
  text: CareerMap;
}

export const CareerBlock = ({ text }: CareerBlockProps) => {
  return (
    <BlockContainer className="grid grid-rows-[max-content_max-content_max-content_max-content_1fr] gap-2 hover:transform hover:-translate-y-1 transition-transform duration-300">
      <BlockContainer
        variants={{
          height: 'fit',
          variant: 'black',
          padding: 'sm',
          rounded: 'lg',
        }}
        className="flex items-end gap-2"
      >
        <h4 className="text-xl font-bold">{text.name}</h4>
        <p className="text-gray-300">{text.position}</p>
      </BlockContainer>
      <ul className="flex gap-2 flex-wrap">
        {text.scope.map(scope => (
          <li key={scope}>
            <StackBadge variant={scope} size="sm" />
          </li>
        ))}
      </ul>

      <BlockContainer
        variants={{
          height: 'fit',
          variant: 'black',
          padding: 'sm',
          rounded: 'lg',
        }}
      >
        {text.startDate} ~ {text.endDate}
      </BlockContainer>
      <ul className="flex gap-2 flex-wrap">
        {text.stack.map(stack => (
          <li key={stack}>
            <StackBadge variant={stack} size="sm" />
          </li>
        ))}
      </ul>
      <BlockContainer
        variants={{
          variant: 'black',
          padding: 'sm',
          rounded: 'lg',
        }}
      >
        {text.work.map(work => (
          <p key={work}>{work}</p>
        ))}
      </BlockContainer>
      <Link
        href={text.href}
        className={cn(
          montserrat.className,
          'grid place-content-center w-full h-9 rounded-md bg-gray-300 hover:bg-gray-100 transition-all duration-300 text-black',
        )}
        target="_blank"
        onClick={() =>
          track('회사 경력 디테일 클릭', {
            name: text.name,
          })
        }
      >
        Go Detail
      </Link>
    </BlockContainer>
  );
};
