import Link from 'next/link';
import { cn } from '@repo/commons/cn';
import { montserrat } from '@/public/fonts';
import { StackBadge } from './stack-badge';
import { BlockContainer } from './block-container';
import { ImageBox } from '@repo/ui/components';
import type { ProjectMap } from '@/interface';

interface BlockProjectProps {
  text: ProjectMap;
}

export const BlockProject = ({ text }: BlockProjectProps) => {
  return (
    <BlockContainer
      variants={{
        variant: 'black',
      }}
      className="grid grid-rows-[max-content_max-content_max-content_max-content_auto_max-content_max-content] gap-4"
    >
      <ImageBox
        imagePorps={{
          src: text.imageUrl,
          width: 450,
          height: 450,
          alt: text.name,
        }}
        border="default"
        className="w-full h-48"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold leading-none">{text.name}</h3>
        <p className="text-gray-300 leading-none">
          {text.company !== '개인 프로젝트' ? '회사명: ' : null}
          {text.company}
        </p>
      </div>
      <div>
        <span>
          {text.startDate} ~ {text.endDate}
        </span>
        <span>&nbsp;({text.period})</span>
      </div>
      <ul className="flex gap-2">
        {text.scope.map(scope => (
          <StackBadge key={scope} variant={scope} size="sm" />
        ))}
      </ul>
      <div className="bg-[#363636] p-2 rounded-md">
        <p>{text.desc}</p>
      </div>
      <div className="flex gap-1 flex-wrap">
        {text.stack.map(stack => (
          <StackBadge key={stack} variant={stack} size="sm" />
        ))}
      </div>
      <div className={cn(montserrat.className, 'flex gap-2 text-center')}>
        {text.site ? (
          <Link
            href={text.site}
            className="grid place-content-center w-full h-9 rounded-md bg-gray-500 hover:bg-gray-600 transition-all duration-300"
            target="_blank"
          >
            Go Site
          </Link>
        ) : null}
        <Link
          href={text.href}
          className="grid place-content-center w-full h-9 rounded-md bg-gray-300 hover:bg-gray-100 transition-all duration-300 text-black"
          target="_blank"
        >
          Go Detail
        </Link>
      </div>
    </BlockContainer>
  );
};
