import { useState } from 'react';

interface UseGetPageItemsProps<T> {
  unit: number;
  itemList: Array<T>;
}
interface UseGetPageItems<T> {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  unit: number;
  getPageItems: Array<T>;
}

export const useGetPageItems = <T,>({
  unit,
  itemList,
}: UseGetPageItemsProps<T>): UseGetPageItems<T> => {
  const [page, setPage] = useState(0);

  const getPageItems = itemList.slice(page * unit, (page + 1) * unit);

  return {
    page,
    setPage,
    unit,
    getPageItems,
  };
};
