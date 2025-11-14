import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query';
// import { faker } from '@faker-js/faker';

import { useWindowVirtualizer } from '@tanstack/react-virtual';

// const randomNumber = (min: number, max: number) =>
//   faker.number.int({ min, max });

// const sentences = new Array(10000)
//   .fill(true)
//   .map(() => faker.lorem.sentence(randomNumber(20, 70)));

const queryClient = new QueryClient();

// async function fetchServerPage(
//   limit: number,
//   offset: number = 0
// ): Promise<{ rows: Array<string>; nextOffset: number }> {
//   const rows = new Array(limit)
//     .fill(0)
//     .map((_, i) => `Async loaded row #${i + offset * limit} ${sentences[i]}`);

//   await new Promise((r) => setTimeout(r, 500));

//   return { rows, nextOffset: offset + 1 };
// }

const FlatList = ({ onEndReached, isFetching, fetchNextPage, data, renderItem, hasNextPage, isFetchingNextPage, isRefetching, status }: {
  onEndReached: (_: { startIndex: number, stopIndex: number }) => Promise<({ pages: any[] }) | void>, data: { [key: string]: any }[], renderItem?: any, hasNextPage?: boolean, isFetchingNextPage: boolean, isRefetching: boolean, fetchNextPage: any, isFetching: boolean, status?: string,
}) => {

  const allRows = data;

  const parentRef = React.useRef<HTMLDivElement>(null);
  // const listRef = React.useRef<HTMLDivElement | null>(null);

  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    // getScrollElement: () => parentRef.current,
    estimateSize: () => 100,
    overscan: 5,
    // scrollMargin: parentRef.current?.offsetTop ?? 0,
  });
  

  React.useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allRows.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allRows.length,
    isFetchingNextPage,
    virtualizer.getVirtualItems(),
  ]);

  return (
    <div>
      {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <></>
      ) : (
        <div
          ref={parentRef}
          className="List"
          // style={{
          //   height: `500px`,
          //   width: `100%`,
          //   overflow: 'auto',
          // }}
        >
          <div
            style={{
              height: `${virtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative',
            }}
          >
            {virtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1;
              const item = allRows[virtualRow.index];

              return (
                <div
                  key={virtualRow.index}
                  data-index={virtualRow.index}
                  className={
                    virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'
                  }
                  ref={virtualizer.measureElement}
                  style={{
                    position: 'absolute',
                    transform: `translateY(${virtualRow.start}px)`,
                    width: '100%',
                  }}
                  // style={{
                  //   position: 'absolute',
                  //   top: 0,
                  //   left: 0,
                  //   height: '100%',
                  //   transform: `translateX(${virtualRow.start}px)`,
                  // }}
                >
                  {isLoaderRow
                    ? hasNextPage
                      ? 'Loading more...'
                      : 'Nothing more to load'
                    : (
                      <div>
                        {renderItem({ item, index: virtualRow.index })}
                      </div>
                      )}
                </div>
              );
            })}
          </div>
        </div>
      )}
      <div>
        {isFetching && !isFetchingNextPage ? 'Background Updating...' : null}
      </div>
      <br />
      <br />
      {process.env.NODE_ENV === 'development' ? (
        <p>
          <strong>Notice:</strong> You are currently running React in
          development mode. Rendering performance will be slightly degraded
          until this application is built for production.
        </p>
      ) : null}
    </div>
  );
}

export default FlatList;
