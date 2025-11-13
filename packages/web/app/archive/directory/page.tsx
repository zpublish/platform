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

export default async function IndexPage() {
  const users = [{
        "id": 1,
        "username": "bigben",
        "zaddr": null,
        "proofposturl": null,
        "website": null,
        "twitter": null,
        "description": null,
        "email": null
    },
    {
        "id": 2,
        "username": "michaelharms70",
        "zaddr": "zs1pgwafaxn5jphrnvvacxr9xty9tpfn94k5um42najdy5mua69camd9edw7dqsz2qeuwvsqhyum0c",
        "proofposturl": "https://github.com/michaelharms6010/zecpages/issues/11",
        "website": null,
        "twitter": "michaelharms70",
        "description": "ZECpages creator. Chill dude.",
        "email": null
    },
    {
        "id": 3,
        "username": "zcashvr",
        "zaddr": "zs1jg237ugl980vs74dleral5jnczvzprjcmnxn5gcvqg8vswhldetdwadjvxmh8nrd2wq5ql3pwxn",
        "proofposturl": "https://twitter.com/ZcashVR",
        "website": "z2z.to/zcashvr/?referrer=zcashvr",
        "twitter": "ZcashVR",
        "description": "🦓 A cypherpunk is any individual advocating widespread use of strong cryptography and privacy-enhancing technologies as a route to social and political change. 🛡️ Subscribe to my newsletter to learn new ways to protect our good ol' privacy",
        "email": null,
    },];

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-4 md:pt-12">
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
        <div className="container max-w-[64rem] flex flex-col gap-1">
          {/* <Feed /> */}
          {users.map((user) => (
            <ZaddrCard key={user.id} user={user} />
          ))}
        </div>
        <div className="container flex max-w-[64rem] flex-col items-center gap-4">
          <div className="flex flex-1 w-full">
          </div>
        </div>
      </section>
    </>
  )
}