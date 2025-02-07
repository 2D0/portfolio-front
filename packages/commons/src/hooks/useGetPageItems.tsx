import { useCallback, useMemo, useState } from 'react';

interface UseGetPageItemsProps<T> {
  unit: number;
  itemList: Array<T>;
}
interface UseGetPageItems<T> {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  unit: number;
  getPageItems: Array<T>;
  handleDragPage: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } },
  ) => void;
}

export const useGetPageItems = <T,>({
  unit,
  itemList,
}: UseGetPageItemsProps<T>): UseGetPageItems<T> => {
  const [page, setPage] = useState(0);

  const getPageItems = useMemo(
    () => itemList.slice(page * unit, (page + 1) * unit),
    [page, unit, itemList],
  );

  const handleDragPage = useCallback(
    (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: { offset: { x: number } },
    ) => {
      const { x } = info.offset;
      const dragOffset = x;
      const totalPages = Math.ceil(itemList.length / unit);
      if (dragOffset > 50) {
        setPage(prev => (prev === 0 ? totalPages - 1 : prev - 1));
      } else if (dragOffset < -50) {
        setPage(prev => (prev === totalPages - 1 ? 0 : prev + 1));
      }
    },
    [itemList, unit],
  );

  return {
    page,
    setPage,
    unit,
    getPageItems,
    handleDragPage,
  };
};
