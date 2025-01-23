import type { CareerMap } from '@/interface';
import { StackBadge } from './stack-badge';

interface CareerBlockProps {
  text: CareerMap;
}

export const CareerBlock = ({ text }: CareerBlockProps) => {
  return (
    <div className="grid grid-rows-[max-content_max-content_max-content_max-content_1fr] gap-2 bg-white bg-opacity-10 p-4 rounded-lg border border-white border-opacity-20">
      <div className="flex items-end gap-2 mb-2  py-1 px-2 rounded-md border border-white border-opacity-20 bg-black bg-opacity-60">
        <h4 className="text-xl font-bold">{text.name}</h4>
        <p className="text-gray-300">{text.position}</p>
      </div>
      <ul className="flex gap-2 flex-wrap">
        {text.scope.map(scope => (
          <li key={scope}>
            <StackBadge variant={scope} />
          </li>
        ))}
      </ul>
      <div className="flex py-1 px-2 rounded-md border border-white border-opacity-20 whitespace-nowrap bg-black bg-opacity-60">
        <span>
          {text.startDate} ~ {text.endDate}
        </span>
      </div>
      <ul className="flex gap-2 flex-wrap">
        {text.stack.map(stack => (
          <li key={stack}>
            <StackBadge variant={stack} />
          </li>
        ))}
      </ul>
      <ul className="p-2 rounded-md border border-white border-opacity-20 bg-black bg-opacity-60">
        {text.work.map(work => (
          <li key={work} className="">
            {work}
          </li>
        ))}
      </ul>
    </div>
  );
};
