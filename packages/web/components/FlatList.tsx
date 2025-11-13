'use client'
import React, { useState } from 'react';
import { InfiniteLoader, List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';
import Measure from 'react-measure';

export const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true
});

const FlatList = ({ onEndReached, data, renderItem, hasNextPage, isFetchingNextPage, isRefetching }: {
  onEndReached: (_: { startIndex: number, stopIndex: number }) => Promise<({ pages: any[] }) | void>, data: { [key: string]: any }[], renderItem?: any, hasNextPage?: boolean, isFetchingNextPage: boolean, isRefetching: boolean
}) => {
  // const [hasMoreRows, setHasMoreRows] = useState(true);
  // const isRowLoaded = ({ index }: { index: number }) => !hasNextPage || !!data[index] || index < data.length;
  const isRowLoaded = ({ index }: { index: number }) => !hasNextPage || !!data[index] || index < data.length;
  // const rowCount = hasNextPage ? data.length + 1 : data.length;
  const rowCount = hasNextPage ? data.length + 1 : data.length;

  const loadMoreRows = async ({ startIndex, stopIndex }: { startIndex: number, stopIndex: number }) => {
    if (hasNextPage && !(isFetchingNextPage || isRefetching)) {
      // const pageParams = {
      //   _start: props.startIndex,
      //   _end: props.stopIndex + 1 - props.startIndex,
      // } as any;
      // console.log("handleLoadMoreRows", pageParams);
      await onEndReached({ startIndex, stopIndex });
    }
    // const result = await onEndReached({ startIndex, stopIndex });
    // const lastPage = result.pages[result.pages.length - 1];
    // if (lastPage.length === 0) {
    //   setHasMoreRows(false);
    // }
  }

  const rowRenderer = ({ index, key, style, parent }: { index: number, key?: string, style?: any, parent?: any }) => {
    let isLoaded = false;
    let content;
    let item: any;

    if (!isRowLoaded({ index })) {
      item = {};
    } else {
      isLoaded = true;
      item = data[index];
    }

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure, registerChild }: { measure: Function, registerChild: any }) => (
          // 'style' attribute required to position cell (within parent List)
          <div ref={registerChild} style={style}>
            <Measure
              bounds
              onResize={(contentRect: any) => {
                measure({ height: contentRect.bounds.height, width: contentRect.bounds.width })
                // this.setState({ dimensions: contentRect.bounds })
              }}
            >
              {({ measureRef }: { measureRef: any }) => (
                <div ref={measureRef}>
                  {renderItem({ item, index })}
                </div>
              )}
            </Measure>
          </div>
        )}
      </CellMeasurer>
    );
  };

  return (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
    >
      {({ onRowsRendered, registerChild: registerChildLoader }) => (
        <WindowScroller
          // ref={this._setRef}
          scrollElement={typeof window !== 'undefined' ? window : undefined}
          // scrollElement={isScrollingCustomElement ? customElement : window}
        >
          {({ height, width, isScrolling, onChildScroll, scrollTop, registerChild }) => {
            // console.log('WindowScroller height:', height);
            // console.log('WindowScroller width:', width);
            return (
            <AutoSizer disableHeight>
              {({ width: autoWidth }) => {
                // console.log('AutoSizer width:', autoWidth);
                
                if (!height || !autoWidth) {
                  // console.warn('Missing height or width, cannot render List');
                  return null; // Prevent rendering if height or width is not available
                }
                return (
                  <List
                    ref={registerChildLoader}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={rowRenderer}
                    deferredMeasurementCache={cache}
                    rowHeight={cache.rowHeight}
                    rowCount={rowCount}
                    height={height}
                    autoHeight
                    width={autoWidth}
                    scrollTop={scrollTop}
                    // {...otherProps}
                  />
                );
              }}
            </AutoSizer>
          )}}
        </WindowScroller>
      )}
    </InfiniteLoader>
  );
};

export default FlatList;
