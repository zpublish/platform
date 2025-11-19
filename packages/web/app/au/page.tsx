'use client'
// import Link from "next/link"

// import { env } from "@/env.mjs"
// import { siteConfig } from "@/config/site"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import { Textarea } from "@/components/ui/textarea"
// import { useEffect, useRef, useState } from "react"
// import EllipsisBox from "@/components/ellipsis-box"
// import { Icons } from "@/components/icons"
import ZecPostFeedItem from "@/components/social/ZecPostFeedItem"

import CreatePost from "@/components/create-post"
import { Text } from "@/components/ui/text"

import zecPagesData from '@zpublish/components/data/zecpages_feed.json';
import FlatList from '@/components/FlatList';
import { useEffect } from 'react';
import { ReplyValue, useZecPages } from '@/context/ZecPagesContext';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
// import Feed from "./feed";
import ZaddrCard from "@/components/user/ZaddrCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import getUsers from "./actions";


// async function getGitHubStars(): Promise<string | null> {
//   try {
//     const response = await fetch(
//       "https://api.github.com/repos/shadcn/taxonomy",
//       {
//         headers: {
//           Accept: "application/vnd.github+json",
//           Authorization: `Bearer ${env.GITHUB_ACCESS_TOKEN}`,
//         },
//         next: {
//           revalidate: 60,
//         },
//       }
//     )

//     if (!response?.ok) {
//       return null
//     }

//     const json = await response.json()

//     return parseInt(json["stargazers_count"]).toLocaleString()
//   } catch (error) {
//     return null
//   }
// }

const tileWidth = 246;

type UserQuery = {}

const useDirectory = (query?: UserQuery) =>
  useInfiniteQuery({
    queryKey: ["archivedusers"/*, query*/],
    queryFn: async ({ pageParam = 1 }: { pageParam: number }) => {
      const isDev = false;
      // const url = isDev ? `http://test.local:9000/board/${pageParam}.json` : `https://be.zecpages.com/board/${pageParam}`;
      // const res = await fetch(url);
      // const data = await res.json();
      // const data = zecPagesData;
      const data = await getUsers({ pageParam, limit: 20 });
      if (!data.hasMore) {
        throw new Error('No more results')
      }

      return {
        results: data.users,
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

export default function IndexPage() {
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
  } = useDirectory();

  const results = (data?.pages.map(page => page.results).flat() || []);

  const rowCount = hasNextPage ? results.length + 1 : results.length;
  const loadMoreRows = isFetchingNextPage
    ? () => {}
    : async ({ startIndex, stopIndex }: { startIndex: number, stopIndex: number }) => fetchNextPage();
  const isRowLoaded = ({ index }: { index: number }) => {
    return !hasNextPage || !!results[index] || index < results.length;
  }

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-4 md:pt-12">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Text as="h1" className="font-mono font-bold text-black text-2xl sm:text-5xl md:text-5xl mb-6 dark:text-primary">
            ZECpages Users Archive
          </Text>
          {/* <CreatePost /> */}
        </div>
        {/* <HStack spacing={3} alignment="trailing" className="h-24 bg-slate-800">
          <div className="p-4 bg-primary h-12">Test</div>
          <div className="p-4 bg-primary h-12">Test</div>
        </HStack>
        <VStack spacing={3} alignment="center" className="h-40 bg-slate-800">
          <div className="p-4 bg-primary w-20">Test</div>
          <div className="p-4 bg-primary w-20">Test</div>
        </VStack> */}
      </section>
      <section id="post-feed" className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10">
        <div className="container max-w-[64rem] flex flex-col gap-1">
          {/* <Feed /> */}
          {/* {users.map((user) => (
            <ZaddrCard key={user.id} user={user} />
          ))} */}
          <FlatList
            data={results}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isRefetching={isRefetching}
            isFetching={isFetching}
            fetchNextPage={fetchNextPage}
            onEndReached={async (res: { startIndex: number, stopIndex: number }) => {
              await loadMoreRows(res);
            }}
            renderItem={({ item, index }: { item: any, index: number }) => {
              // const { datetime, memo, txid, reply_to_post, reply_count: replyCount, id, likes, amount } = item || {};
              const isLoaded = isRowLoaded({ index });

              return (isLoaded && item?.id) ? (
                <div className="my-2">
                  <ZaddrCard key={item.id} user={item} />
                </div>
              ) : (
                <div className="my-2">
                  <ZaddrCard key={`index-${index}`} isLoading />
                </div>
              );
            }}
          />
        </div>
        <div className="container flex max-w-[64rem] flex-col items-center gap-4">
          <div className="flex flex-1 w-full">
          </div>
        </div>
      </section>
    </>
  )
}