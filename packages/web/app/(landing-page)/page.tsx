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
import HomePosts from "./posts";



export default async function IndexPage() {
  

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:pt-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Text as="h1" className="font-mono font-bold text-black text-2xl sm:text-5xl md:text-5xl mb-6 dark:text-primary">
            ZEC-powered Anonymous Memo Board
          </Text>
          <Text as="h2" className="font-mono font-bold text-black text-lg mb-2 dark:text-[#a0f]">
            (experimental/alpha)
          </Text>
          <CreatePost />
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
      <HomePosts />
    </>
  )
}
