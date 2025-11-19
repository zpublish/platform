

import ZecPostFeedItem from "@/components/social/ZecPostFeedItem"

import CreatePost from "@/components/create-post"
import { Text } from "@/components/ui/text"

import zecPagesData from '@zpublish/components/data/zecpages_feed.json';
import FlatList from '@/components/FlatList';
import { useEffect, useState } from 'react';
import { ReplyValue, useZecPages } from '@/context/ZecPagesContext';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
// import { useRouter } from "next/navigation";
import getPost, { getReplies } from "./actions";
import { permanentRedirect } from "next/navigation";
// import Feed from "./feed";


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

export default async function IndexPage({ params, searchParams }: { params: { id: string }, searchParams: {} }) {
  const post = await getPost({ txid: params.id as string });
  if (post?.txid && !Number.isNaN(Number(params.id)) && Number(params.id) > 0 && Number(params.id) < 5000) {
    permanentRedirect(`/a/post/${post.txid}`);
    return null;
  }
  let replies;

  if (post?.reply_count > 0) {
    replies = await getReplies({ id: post?.id as number });
  }
  // useEffect(() => {
  //   async function fetchReplies() {
  //   }
  //   fetchReplies();
  // }, [post.reply_count]);


  return !post ? null : (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:pt-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Text as="h1" className="font-mono font-bold text-black text-2xl sm:text-5xl md:text-5xl mb-6 dark:text-primary">
            ZECPages Archive
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
        <div className="container max-w-[64rem]">
          <ZecPostFeedItem
            key={`id-${post?.id}` || `txid-${post.txid}`}
            createdAt={new Date(Number(post.datetime))}
            replyToPostId={post.reply_to_post}
            text={post.memo}
            replyCount={post.reply_count ? post.reply_count : 0}
            likeCount={post.likes}
            id={post.id}
            txid={post.txid}
            amount={post.amount}
            isArchive
            // mb={16}
          />
          {!!replies && (
                <div className="ml-10">
                  {(replies.map((_post: any) => (
                    <ZecPostFeedItem
                      key={`id-${_post?.id}` || `txid-${_post.txid}`}
                      createdAt={new Date(Number(_post.datetime))}
                      replyToPostId={_post.reply_to_post}
                      text={_post.memo}
                      replyCount={post.reply_count ? post.reply_count : 0}
                      likeCount={_post.likes}
                      id={_post.id}
                      txid={_post.id}
                      amount={_post.amount}
                      // mb={16}
                      isArchive
                  />
                  )))}
                </div>
          )}
          {/* <Feed /> */}
        </div>
        <div className="container flex max-w-[64rem] flex-col items-center gap-4">
          <div className="flex flex-1 w-full">
          </div>
        </div>
      </section>
    </>
  )
}