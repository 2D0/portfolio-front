'use client';
import React from 'react';
import { useInfiniteScroll } from '@repo/commons/hooks';
import { cn } from '@repo/commons/cn';

interface InfinityScrollContainerProps<T> {
  fetchData: (
    pageParam: number,
    limit: number,
  ) => Promise<{ rows: Array<T>; hasMore: boolean }>;
  queryKey: string;
  children: (
    item: T,
    ref?: (el: HTMLElement | null) => void,
  ) => React.ReactNode;
  className?: string;
  limit?: number;
  overscan?: number;
  gap?: number;
  maxPages?: number;
  refSize?: number;
  dynamicHeight?: boolean;
}

export const InfinityScrollContainer = <T,>({
  fetchData,
  queryKey,
  children,
  className,
  limit = 10,
  overscan = 10,
  gap = 16,
  maxPages,
  refSize,
  dynamicHeight,
}: InfinityScrollContainerProps<T>) => {
  const {
    parentRef,
    virtualizer,
    items,
    hasNextPage,
    isFetchingNextPage,
    bottomRef,
    measureElement,
  } = useInfiniteScroll<T>({
    queryKey: [queryKey],
    fetchData,
    limit: limit,
    overscan: overscan,
    gap: gap,
    maxPages: maxPages,
    refSize,
    dynamicHeight,
  });

  return (
    <article
      ref={parentRef}
      className={cn([
        'overflow-y-auto',
        className ?? 'h-screen bg-back-section p-6 rounded-2xl',
      ])}
    >
      <div
        className="flex gap-4 relative"
        style={{ height: virtualizer.getTotalSize() }}
      >
        {virtualizer.getVirtualItems().map(virtualItem => {
          const actualIndex = virtualItem.index;
          const item = items[actualIndex];
          return (
            <div
              key={actualIndex}
              data-index={actualIndex}
              ref={el => {
                if (el) {
                  if (actualIndex === items.length - 1) bottomRef(el);
                  measureElement(el, actualIndex);
                }
              }}
              className="w-full absolute top-0 left-0 transform"
              style={{
                transform: `translateY(${virtualItem.start}px)`,
                height: dynamicHeight ? 'auto' : virtualItem.size,
              }}
            >
              {item &&
                children(
                  item,
                  actualIndex === 0
                    ? el => {
                        el && measureElement(el, actualIndex);
                      }
                    : undefined,
                )}
            </div>
          );
        })}
      </div>
      {isFetchingNextPage && <p>Loading more...</p>}
      {!hasNextPage && <p>You've reached the end!</p>}
    </article>
  );
};
