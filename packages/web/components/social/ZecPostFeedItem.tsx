'use client'
import React from 'react';
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

const ZecPostFeedItem = ({
  id, username, name, createdAt, replyToPostId, replyCount, text, likeCount, onPressLike, onPressReply, ...props
}: {
  id?: string | number,
  username?: string,
  name?: string,
  likeCount: number,
  replyCount?: number,
  createdAt?: Date,
  // inReplyToStatusId?: string,
  replyToPostId?: number,
  text?: string,
  onPressLike: () => void,
  onPressReply: () => void,
}) => {
  const isRepliedTo = !!replyToPostId;
  let textContent = text;
  if (isRepliedTo) {
    textContent = text?.replace(/^REPLY::\w+ /, '');
  }
  // console.log({ isRepliedTo });

  return (
    <>
      {isRepliedTo && <VStack className="w-1 h-8 bg-[#E9F7F9] ml-16 -mt-4" />}
      <VStack
        {...(isRepliedTo && { bg: 'white', borderWidth: 1, borderColor: '#c5d3d5', ml: 32 })}
        // bg={isRepliedTo ? 'white' : '#E9F7F9'}
        // #ECF7F9
        className="w-full border border-black bg-card dark:border-[#00FF7F]"
        // className="w-full border-2 border-black bg-[#E9F7F9] dark:bg-background dark:border-white"
        // ml={isRepliedTo && 32}
        {...props}
      >
        {/* <VStack className="py-3 px-4 sm:px-10"> */}
        <VStack className="py-4 px-4 w-full">
          <HStack alignment="none" justify="between" flex={1} className="w-full">
            <VStack alignment="center" className="mr-3">
              {/* {isRepliedTo && <VStack> width="2px" height={32} bg="#B5B5B5" mb={2} />} */}
              <ProfileIcon size={40} /*bg="#F7F7F7"*/ bg="white" borderColor="#D9D9D9" borderWidth={1}>
                {/* <Icon icon={ShieldIcon} color="primary" />   */}
                <Icons.shield color="#F4B728" />
              </ProfileIcon>  
              {/* {isRepliedTo && <VStack> width="2px" flex={1} bg="#B5B5B5" mb={2} />} */}
            </VStack>
            <AnonProfileNamesRow username={username || 'u1*****'} name={name || 'ANONYMOUS'} />
            <HStack flex={1} />
            <HStack alignment="top">
              {createdAt && <Text font="sans" className="font-mono text-sm leading-[20px] text-black dark:text-white">{getTimeAgo(createdAt)}</Text>}
            </HStack>
            {/* <VStack>>
              <NameText mb={1}>{user.name}</NameText>
              <UsernameText>{`@${user.screen_name}`}</UsernameText>
            </Box> */}
            {/* <VStack> flex={1} /> */}
          </HStack>
          <VStack alignment="leading" className="pt-4 self-start">
            <PostText>{textContent}</PostText>
          </VStack>
          <HStack justify="between"  className="mt-3">
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
                  <ZcashHeartIcon />
                </VStack>
                {likeCount > 0 && <Text className="text-[#5F6E7A] ml-0.5">{likeCount}</Text>}
              </HStack>
            </VStack>
            <VStack flex={1} />
            <HStack>
              {[
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
                    alignItems="center"
                    mr={16}
                    as={actionId === 'link' && 'a'}
                    {...actionId !== 'share' && hrefById[actionId] && { href: hrefById[actionId], rel: 'noopener noreferrer', target: '_blank' }}
                    onClick={(actionId === 'share')
                      ? () => { if (typeof nav !== 'undefined' && nav?.canShare && nav.share) { nav?.share({ url: `https://zecpages.com/z/post/${id}/`}) } }
                      : (actionId === 'reply'
                        ? onPressReply
                        : undefined)
                    }
                    >{/* @ts-expect-error 123 */}
                    <Comp fill="#5F6E7A" />
                    {actionId === 'reply' && (
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
