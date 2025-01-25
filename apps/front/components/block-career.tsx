import Link from 'next/link';
import { StackBadge } from './stack-badge';
import type { CareerMap } from '@/interface';

interface CareerBlockProps {
  text: CareerMap;
}

export const CareerBlock = ({ text }: CareerBlockProps) => {
  return (
    <Link
      href={text.href}
      target="_blank"
      className="grid grid-rows-[max-content_max-content_max-content_max-content_1fr] gap-2 w-full h-full bg-white bg-opacity-10 p-4 rounded-xl border border-white border-opacity-20 hover:transform hover:-translate-y-1 transition-transform duration-300"
    >
      <div className="flex items-end gap-2 py-1 px-2 rounded-lg border border-white border-opacity-20 bg-black bg-opacity-60">
        <h4 className="text-xl font-bold">{text.name}</h4>
        <p className="text-gray-300">{text.position}</p>
      </div>
      <ul className="flex gap-2 flex-wrap">
        {text.scope.map(scope => (
          <li key={scope}>
            <StackBadge variant={scope} size="sm" />
          </li>
        ))}
      </ul>
      <div className="flex py-1 px-2 rounded-lg border border-white border-opacity-20 whitespace-nowrap bg-black bg-opacity-60">
        <span>
          {text.startDate} ~ {text.endDate}
        </span>
      </div>
      <ul className="flex gap-2 flex-wrap">
        {text.stack.map(stack => (
          <li key={stack}>
            <StackBadge variant={stack} size="sm" />
          </li>
        ))}
      </ul>
      <ul className="p-2 rounded-lg border border-white border-opacity-20 bg-black bg-opacity-60">
        {text.work.map(work => (
          <li key={work}>{work}</li>
        ))}
      </ul>
    </Link>
  );
};
