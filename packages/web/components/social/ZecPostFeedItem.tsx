'use client'
import React, { lazy } from 'react';
// import { Icon } from '@elemental-zcash/components';
// import { ShieldIcon } from '@elemental-zcash/icons';

import ProfileIcon from './ProfileIcon';
import { AnonProfileNamesRow, PostText } from './BasePost';
import { LinkIcon, ReplyIcon, ShareIcon, ZcashHeartIcon } from './icons';
import { VStack } from '../ui/vstack';
import { Text } from '../ui/text';
import { HStack } from '../ui/hstack';
import { getTimeAgo } from '@/lib/time';
import { Icons } from '../icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';

// const { LinkIcon } = lazy(() => import('../icons.js'));
// const LinkIcon = lazy(() => import('./icons.js').then((module) => ({ default: module.LinkIcon })));;
// const ReplyIcon = lazy(() => import('./icons.js').then((module) => ({ default: module.ReplyIcon })));;
// const ShareIcon = lazy(() => import('./icons.js').then((module) => ({ default: module.ShareIcon })));;
// const ZcashHeartIcon = lazy(() => import('./icons.js').then((module) => ({ default: module.ZcashHeartIcon })));;


const ZecPostFeedItem = ({
  isLoading, id, username, name, createdAt, isReply, replyToPostId, replyCount, text, likeCount, amount, onPressLike, onPressReply, txid, ...props
}: {
  isLoading?: boolean,
  id?: string | number,
  username?: string,
  name?: string,
  likeCount?: number,
  replyCount?: number,
  createdAt?: Date,
  amount?: number,
  txid?: string,
  // inReplyToStatusId?: string,
  replyToPostId?: number,
  isReply?: boolean,
  text?: string,
  onPressLike?: () => void,
  onPressReply?: () => void,
}) => {
  const isRepliedTo = isReply || !!replyToPostId;
  const isHighlightedPost = (amount || 0) >= 10000000;
  let textContent = text;
  if (isRepliedTo) {
    textContent = text?.replace(/^REPLY::\w+ /, '');
  }
  if (text?.match(/^BOARD::\w+ /)) {

  }
  // console.log({ isRepliedTo });

  return (
    <>
      {isRepliedTo && (!replyCount || replyCount < 3) && <VStack className="w-[1px] h-8 bg-black dark:bg-[#00FF7F] ml-6" />}
      <VStack
        {...(isRepliedTo && replyCount && replyCount < 3 && { bg: 'white', borderWidth: 1, borderColor: '#c5d3d5', ml: 32 })}
        // bg={isRepliedTo ? 'white' : '#E9F7F9'}
        // #ECF7F9
        className={cn(
          "w-full border border-black bg-card dark:border-[#00FF7F]",
          isHighlightedPost && 'bg-[#FF879B] dark:bg-[#4c0322]'
        )}
        // className="w-full border-2 border-black bg-[#E9F7F9] dark:bg-background dark:border-white"
        // ml={isRepliedTo && 32}
        {...props}
      >
        {/* <VStack className="py-3 px-4 sm:px-10"> */}
        <VStack className="py-4 px-4 w-full">
          <HStack alignment="none" justify="between" flex={1} className="w-full">
            <VStack alignment="center" className="mr-3">
              {/* {isRepliedTo && <VStack> width="2px" height={32} bg="#B5B5B5" mb={2} />} */}
              {isLoading ? (
                <Skeleton className="bg-[#323e5a] h-10 w-10 rounded-full" />
              ) : (
                <ProfileIcon size={40} /*bg="#F7F7F7"*/ bg="white" borderColor="#D9D9D9" borderWidth={1}>
                  {/* <Icon icon={ShieldIcon} color="primary" />   */}
                  <Icons.shield color="#F4B728" />
                </ProfileIcon>  
              )}
              {/* {isRepliedTo && <VStack> width="2px" flex={1} bg="#B5B5B5" mb={2} />} */}
            </VStack>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="bg-[#323e5a] rounded-none h-4 w-[150px]" />
                <Skeleton className="bg-[#323e5a] rounded-none h-4 w-[100px]" />
              </div>
            ) : (
              <AnonProfileNamesRow username={username || 'u1*****'} name={name || 'ANONYMOUS'} />
            )}
            <HStack flex={1} />
            <Link href={`/archive/z/${txid}`}>
              <HStack alignment="top">
                {isLoading ? (
                  <Skeleton className="bg-[#323e5a] rounded-none h-4 w-[80px]" />
                ) : (createdAt && <Text font="sans" className="font-mono text-sm leading-[20px] text-black dark:text-white">{getTimeAgo(createdAt)}</Text>)}
              </HStack>
            </Link>
            {/* <VStack>>
              <NameText mb={1}>{user.name}</NameText>
              <UsernameText>{`@${user.screen_name}`}</UsernameText>
            </Box> */}
            {/* <VStack> flex={1} /> */}
          </HStack>
          <VStack alignment="leading" className="pt-4 self-start">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="bg-[#323e5a] rounded-none h-4 w-[350px] max-w-[50vw]" />
                <Skeleton className="bg-[#323e5a] rounded-none h-4 w-[300px] max-w-[40vw]" />
              </div>
            ) : (
              <PostText>{textContent}</PostText>
            )}
          </VStack>
          <HStack justify="between" className="mt-3 w-full">
            <VStack
              // as="a"// @ts-ignore
              // @ts-ignore
              style={{ cursor: 'pointer' }}
              // onClick={onPressLike}
              // onClick={() => {
              //   // setMemoContent(`TIP_TWEET:${id}`);
              //   // setTipVisible(!tipVisible);
              // }}
            >
              <HStack alignment="center">
                <VStack onClick={onPressLike}>
                  {isLoading ? (
                    <Skeleton className="bg-[#323e5a] rounded-none h-6 w-[64px]" />
                  ) : <ZcashHeartIcon />}
                </VStack>
                {!!likeCount && likeCount > 0 && <Text className="text-white ml-1">{likeCount}</Text>}
              </HStack>
            </VStack>
            <VStack flex={1} />
            <HStack>
              {isLoading ? (
                <Skeleton className="bg-[#323e5a] rounded-none h-6 w-[150px]" />
              ): [
                { component: ReplyIcon, id: 'reply' },
                // { component: FavoriteIcon, id: 'favorite' },
                { component: ShareIcon, id: 'share' },
                { component: LinkIcon, id: 'link' },
              ].map(({ component: Comp, id: actionId }) => {
                const hrefById: any = {
                  link: `https://zecpages.com/z/post/${id}/`,
                  // reply: `https://zecpages.com/z/post/${id}/`,
                  // repost: `https://twitter.com/intent/retweet?tweet_id=${id}`,
                  // favorite: `https://twitter.com/intent/like?tweet_id=${id}`,
                };
                const nav: any = typeof window !== 'undefined' ? window?.navigator : {};

                return (// @ts-ignore
                  <HStack
                    alignment="leading"
                    className="mr-4"
                    as={actionId === 'link' && 'a'}
                    {...actionId !== 'share' && hrefById[actionId] && { href: hrefById[actionId], rel: 'noopener noreferrer', target: '_blank' }}
                    onClick={(actionId === 'share')
                      ? () => { if (typeof nav !== 'undefined' && nav?.canShare && nav.share) { nav?.share({ url: `https://zecpages.com/z/post/${id}/`}) } }
                      : (actionId === 'reply'
                        ? onPressReply
                        : undefined)
                    }
                    >
                    <Comp fill="#5F6E7A" />
                    {actionId === 'reply' && !isRepliedTo && (
                      <Text className="text-[#5F6E7A] ml-0.5">
                        {replyCount}
                      </Text>
                    )}
                  </HStack>
                );
              })}
            </HStack>
            {/* <VStack> flex={1} /> */}
          {/* <VStack>
            as="a"// @ts-ignore
            href="#"
            onClick={() => {
              setMemoContent(`TIP_TWEET:${id}`);
              setTipVisible(!tipVisible);
            }}
          >
            <ZcashIcon />
          </Box> */}
          </HStack>
        </VStack>
      </VStack>
    </>
  );
};

export default ZecPostFeedItem;
