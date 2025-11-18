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
import { useEffect, useState } from 'react';
import { ReplyValue, useZecPages } from '@/context/ZecPagesContext';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import Feed from "../feed";
import { Input } from "@/components/ui/input";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { fetchBoardNames } from "../actions";


const tileWidth = 246;

export default function IndexPage({ params, searchParams }: { params: { boardname: string }, searchParams: {} }) {
  const router = useRouter();
  const [board_names, setBoardNames] = useState<string[]>([]);

  useEffect(() => {
    async function getBoardNames() {
      const names = await fetchBoardNames();
      if (names) {
        setBoardNames(names);
      }
    }
    getBoardNames();
  }, [])

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:pt-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Text as="h1" className="font-mono font-bold text-black text-2xl sm:text-5xl md:text-5xl mb-6 dark:text-primary">
            ZECpublish Posts
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
          <HStack className="w-full gap-2">
            {/* <Input placeholder="Search" className="w-auto" /> */}
            <NativeSelect className="text-black dark:text-white" value={params.boardname} onChange={e => router.push(`/z/${e.target.value}`)}>
              <NativeSelectOption value="">z/all</NativeSelectOption>
              {board_names.map((board_name) => (
                <NativeSelectOption key={board_name} value={board_name}>{`z/${board_name}`}</NativeSelectOption>
              ))}
            </NativeSelect>
            {/* <HStack alignment="center" className="gap-3 justify-self-end">
              <Checkbox
                id="toggleReplies"
                defaultChecked
                className="data-[state=checked]:border-white h-4 w-4 text-lg data-[state=checked]:bg-white data-[state=checked]:text-blue-600 dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
              />
              <Label className="text-black" htmlFor="toggleReplies">Toggle Replies</Label>
            </HStack> */}
          </HStack>
          <Feed boardname={params.boardname} />
        </div>
        <div className="container flex max-w-[64rem] flex-col items-center gap-4">
          <div className="flex flex-1 w-full">
          </div>
          {/* {zecPagesData.map(({ datetime, memo, id }, i) => (
            <ZecPostFeedItem
              key={id || `index-${i}`}
              createdAt={new Date(Number(datetime))}
              likeCount={0}
              text={memo}
              onPressLike={null as unknown as () => void}
              onPressReply={null as unknown as () => void}
            />
          ))} */}
          {/* <ZecPostFeedItem
            id="123"
            likeCount={0}
            onPressLike={null as unknown as () => void}
            onPressReply={null as unknown as () => void}
            text="I see so many friends who need not concern themselves with a seemingly grey sky"
          /> */}
        </div>
      </section>
      {/* <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-white sm:text-lg sm:leading-7">
            ZECpages is open source and powered by open source software. <br />{" "}
            The code is available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            .{" "}
          </p>
        </div>
      </section> */}
    </>
  )
}