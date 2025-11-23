'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchBoardNames } from "../z/actions";
import { HStack } from "@/components/ui/hstack";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import Feed from "../z/feed";
import ZecPostFeedItem from "@/components/social/ZecPostFeedItem";

export default function HomePosts({ boardNames, pinnedPost }: { boardNames?: string[], pinnedPost?: { amount: number, memo: string } }) {
  const router = useRouter();

  return (
    <section id="post-feed" className="space-y-6 pb-8 pt-4">
      <div className="container max-w-[64rem]">
        {pinnedPost && pinnedPost.amount >= 1000000 && (
          <div className="mb-8">
            <ZecPostFeedItem amount={pinnedPost.amount} text={pinnedPost.memo} />
          </div>
        )}
        <HStack className="w-full gap-2">
          {/* <Input placeholder="Search" className="w-auto" /> */}
          <NativeSelect className="text-black dark:text-white" onChange={e => router.push(`/z/${e.target.value}`)}>
            <NativeSelectOption value="">z/all</NativeSelectOption>
            {boardNames?.map((boardName) => (
              <NativeSelectOption key={boardName} value={boardName}>{`z/${boardName}`}</NativeSelectOption>
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
        <Feed />
      </div>
    </section>
  )
}