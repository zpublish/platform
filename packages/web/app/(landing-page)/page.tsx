// import Link from "next/link"

// import { env } from "@/env.mjs"
// import { siteConfig } from "@/config/site"
// import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
// import { useEffect, useRef, useState } from "react"
import EllipsisBox from "@/components/ellipsis-box"
import { Icons } from "@/components/icons"
import ZecPostFeedItem from "@/components/social/ZecPostFeedItem"

import zecPagesData from '@zpublish/components/data/zecpages_feed.json';

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



export default async function IndexPage() {
  // const stars = await getGitHubStars()
  const addr = "u1rl2zw85dmjc8m4dmqvtstcyvdjn23n0ad53u5533c97affg9jq208du0vf787vfx4vkd6cd0ma4pxkkuc6xe6ue4dlgjvn9dhzacgk9peejwxdn0ksw3v3yf0dy47znruqftfqgf6xpuelle29g2qxquudxsnnen3dvdx8az6w3tggalc4pla3n4jcs8vf4h29ach3zd8enxulush89";

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
            ZEC-powered Anonymous Memo Board
          </h1>
          <Textarea className="min-h-32 dark:bg-background text-black dark:text-white dark:border-2 dark:border-white" placeholder="Write your post here…" />
          <div className="flex row bg-secondary dark:bg-primary w-full p-3 py-2">
            <div className="w-full">
              <div className="text-black">
                <EllipsisBox text={addr} offset={12} />
              </div>
            </div>
            <Icons.miniQrCode className="ml-3 text-black" />
            <Icons.miniCopy className="ml-2 text-primary dark:text-secondary" style={{ filter: 'drop-shadow(1px 1px 0px rgba(0, 0, 0, .4))' }} />
          </div>
          <div className="flex w-full row justify-between">
            <div className="flex flex-1" />
            <Button variant="secondary" className="text-black">
              SUBMIT POST
            </Button>
          </div>
        </div>
      </section>
      <section id="open-source" className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4">
          {zecPagesData.map(({ datetime, memo, id }, i) => (
          <ZecPostFeedItem
            key={id || `index-${i}`}
            createdAt={new Date(Number(datetime))}
            likeCount={0}
            text={memo}
            onPressLike={null as unknown as () => void}
            onPressReply={null as unknown as () => void}
          />
        ))}  
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