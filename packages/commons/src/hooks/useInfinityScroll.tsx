'use client';
import { useCallback, useEffect, useRef } from 'react';
import { useInfiniteQuery, type QueryKey } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import {
  useVirtualizer,
  type VirtualizerOptions,
} from '@tanstack/react-virtual';
import { useDebounce } from '@repo/commons/hooks';

interface InfiniteScrollOptions<T>
  extends Pick<
    VirtualizerOptions<HTMLDivElement, HTMLDivElement>,
    'overscan' | 'gap'
  > {
  queryKey: QueryKey;
  fetchData: (
    pageParam: number,
    limit: number,
  ) => Promise<{ rows: Array<T>; hasMore: boolean }>;
  limit: number;
  maxPages?: number;
  debounceDelay?: number;
  refSize?: number;
  dynamicHeight?: boolean;
}

export const useInfiniteScroll = <T,>({
  queryKey,
  fetchData,
  limit,
  overscan,
  gap,
  debounceDelay = 500,
  maxPages,
  refSize = 800,
  dynamicHeight = false,
}: InfiniteScrollOptions<T>) => {
  const sizeRef = useRef<number>(refSize);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const { ref: bottomRef, inView: inViewBottom } = useInView({
    threshold: 1,
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam = 1 }) => fetchData(pageParam, limit ?? 10),
    getNextPageParam: (lastPage, allPages) =>
      (!maxPages || allPages.length < maxPages) && lastPage.hasMore
        ? allPages.length + 1
        : undefined,
    initialPageParam: 1,
  });
  const items = data ? data.pages.flatMap(page => page.rows) : [];

  const virtualizer = useVirtualizer({
    count: items.length + (hasNextPage ? 1 : 0),
    getScrollElement: () => parentRef.current,
    estimateSize: () => sizeRef.current,
    overscan,
    gap,
  });

  const measureElement = useCallback(
    (element: HTMLElement | null, index: number) => {
      if (element) {
        const height = element.getBoundingClientRect().height;
        const virtualItems = virtualizer.getVirtualItems();
        const virtualItem = virtualItems.find(item => item.index === index);

        if (dynamicHeight && virtualItem && virtualItem.size !== height) {
          Promise.resolve().then(() => {
            element.setAttribute('data-index', index.toString());
            virtualizer.measureElement(element);
          });
        } else if (sizeRef.current !== height) {
          sizeRef.current = height;
          virtualizer.measure();
        }
      }
    },
    [dynamicHeight, virtualizer],
  );

  const debouncedFetchData = useDebounce(
    useCallback(() => {
      if (inViewBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }, [inViewBottom, hasNextPage, isFetchingNextPage, fetchNextPage]),
    debounceDelay,
  );

  useEffect(() => {
    debouncedFetchData();
  }, [debouncedFetchData, inViewBottom]);

  return {
    parentRef,
    virtualizer,
    items,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    bottomRef,
    measureElement,
  };
};
