import { cn } from '@repo/commons/cn';
interface PaginationProps {
  length: number;
  unit: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const Pagination = ({
  length,
  unit,
  page,
  setPage,
}: PaginationProps) => {
  return (
    <ul className="flex justify-center gap-3">
      {Array.from({ length: Math.ceil(length / unit) }).map((_, index) => (
        <li key={index}>
          <button
            type="button"
            onClick={() => setPage(index)}
            className={cn(
              'w-4 h-4 rounded-full',
              page === index ? '!bg-blue-200' : '!bg-white !bg-opacity-20',
            )}
          />
        </li>
      ))}
    </ul>
  );
};
