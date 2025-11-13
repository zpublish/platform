'use client'

import { InfiniteLoader, List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';
import Measure from 'react-measure';
import { useInfiniteQuery } from '@tanstack/react-query';
import zecPagesData from '@zpublish/components/data/zecpages_feed.json';

import FlatList from "@/components/FlatList";
import { ReplyValue, useZecPages } from '@/context/ZecPagesContext';
import { useEffect } from 'react';
import ZecPostFeedItem from '@/components/social/ZecPostFeedItem';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/hstack';
import getPosts from './actions';
import Link from 'next/link';

const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true
});

type FeedProps = {}

type BoardFeedItem = typeof zecPagesData[0];

type Board = BoardFeedItem & {
  id: number;
  name: string;
  reply_to_post: string | undefined;
}

type BoardQuery = {}

const useBoards = (query?: BoardQuery) =>
  useInfiniteQuery({
    queryKey: ["board"/*, query*/],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
      const isDev = false;
      // const url = isDev ? `http://test.local:9000/board/${pageParam}.json` : `https://be.zecpages.com/board/${pageParam}`;
      // const res = await fetch(url);
      // const data = await res.json();
      // const data = zecPagesData;
      const data = await getPosts({ pageParam, limit: 20 });
      if (!data.hasMore) {
        throw new Error('No more results')
      }

      return {
        results: data.posts,
        nextCursor: data.nextCursor,
        totalPages: data.totalPages,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // console.log('lastPage.nextCursor', lastPage.nextCursor);
      return lastPage.nextCursor && (lastPage.nextCursor < lastPage.totalPages) ? lastPage.nextCursor : undefined;
      // return (lastPage.nextCursor || lastPage.length > 0) ?? undefined;
    },
    refetchOnWindowFocus: false,
  });

export default function Feed(props: FeedProps) {
  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isRefetching,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useBoards();
  const { state: zecPagesState, addReply } = useZecPages();
  
  const results = (data?.pages.map(page => page.results).flat() || []);
  // console.log({ results })
  useEffect(() => {
    if (addReply) {
      results.forEach((result) => {
        if (result.reply_to_post && !zecPagesState[result.reply_to_post]) {
          // console.log('reply', { result })
          addReply(result as unknown as ReplyValue);
        }
      });
    }
  }, [results, addReply])

  const rowCount = hasNextPage ? results.length + 1 : results.length;
  const loadMoreRows = isFetchingNextPage
    ? () => {}
    : async ({ startIndex, stopIndex }: { startIndex: number, stopIndex: number }) => fetchNextPage();
  const isRowLoaded = ({ index }: { index: number }) => {
    // console.log({ hasNextPage })
    // console.log(!!results[index])
    // console.log({ index }, results.length)
    return !hasNextPage || !!results[index] || index < results.length;
  }

  return (
    <FlatList
      data={results}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      isRefetching={isRefetching}
      onEndReached={async (res: { startIndex: number, stopIndex: number }) => {
        await loadMoreRows(res);
      }}
      renderItem={({ item, index }: { item: Board, index: number }) => {
        const { datetime, memo, txid, reply_to_post, reply_count: replyCount, id, likes, amount } = item;
        const isLoaded = isRowLoaded({ index });

        // Line
        // See all replies
        // Line

        if (reply_to_post) { return null; }
        if (replyCount > 0) {
          console.log(replyCount > 0 && zecPagesState?.[id] && Object.keys(zecPagesState[id]).slice(0,2))
        }

        return isLoaded && datetime && !reply_to_post ? (
          <div className="my-2">
            <ZecPostFeedItem
              key={`id-${item?.id}` || `index-${index}`}
              createdAt={new Date(Number(datetime))}
              replyToPostId={reply_to_post}
              text={memo}
              replyCount={replyCount ? replyCount : 0}
              likeCount={likes}
              id={id}
              amount={amount}
              txid={txid}
              // mb={16}
              onPressLike={() => {}}
              onPressReply={() => {}}
              // onPressLike={() => {
              //   setModalState({
              //     ...modalState,
              //     isOpen: true,
              //     memo: encodeMemo(`LIKE::${id}`),
              //     type: 'like_post'
              //   });
              // }}
              // onPressReply={() => {
              //   setModalState({
              //     isOpen: true,
              //     type: 'reply_post',
              //     post: item
              //   })
              // }}
              // bg="#E9F7F9"
            />
            {replyCount > 0 && zecPagesState?.[id] && Object.keys(zecPagesState[id]).slice(0,2).map((k, i) => {
              const replyPost = zecPagesState[id][k];
              let _replyCount = Number(replyCount);
              const textContent = replyPost.memo?.replace(/^REPLY::\w+ /, '').trim();

              return !!textContent && (
                <div className="ml-10">
                  {_replyCount > 3 && i === 0 && (
                    <VStack>
                      <VStack className="bg-black dark:bg-[#00FF7F] w-[1px] h-8" />
                      <HStack className="my-2">
                        <a href={`https://zecpublish.com/archive/z/${id}/`} target="_blank" rel="noopener noreferrer">
                          <Text className="text-blue-500 font-sans underline">See all replies</Text>
                        </a>
                      </HStack>
                      <VStack className="bg-black dark:bg-[#00FF7F] w-[1px] h-8" />
                    </VStack>
                  )}
                  <ZecPostFeedItem
                    // textContent={textContent}
                    // // @ts-expect-error 123
                    createdAt={new Date(Number(replyPost?.datetime))}
                    replyToPostId={id}
                    text={textContent}
                    replyCount={i === 0 ? _replyCount : 0}
                    likeCount={likes}
                    id={replyPost.id}
                    // mt={0}
                    // mb={16}
                    onPressLike={() => {}}
                    onPressReply={() => {}}
                    // onPressLike={() => {
                    //   setModalState({
                    //     ...modalState,
                    //     isOpen: true,
                    //     memo: encodeMemo(`LIKE::${id}`),
                    //     type: 'like_post'
                    //   });
                    // }}
                    // onPressReply={() => {
                    //   setModalState({
                    //     isOpen: true,
                    //     type: 'reply_post',
                    //     post: replyPost
                    //   })
                    // }}
                    // bg="#E9F7F9"
                  />
                </div>
              )
            })}
          </div>
        ) : (
          <VStack>
            <Text>Loading...</Text>
          </VStack>
        );
      }}
    />
  )
}