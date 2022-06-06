import React from 'react';
import { Box, Text, Row } from 'elemental-react'; // @ts-ignore
import { Icon } from '@elemental-zcash/components';
import { ShieldIcon } from '@elemental-zcash/icons';

import ProfileIcon from '../../profile/ProfileIcon';
import { AnonProfileNamesRow, PostText } from '../BasePost';
import { getTimeAgo } from '../../utils/time';
import { FavoriteIcon, LinkIcon, ReplyIcon, ShareIcon, ZcashHeartIcon } from '../../icons';

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
      {isRepliedTo && <Box width="3px" height={32} bg="#E9F7F9" ml={64} mt={-16} />}
      <Box
        bg="#E9F7F9"
        {...(isRepliedTo && { bg: 'white', borderWidth: 1, borderColor: '#c5d3d5', ml: 32 })}
        // bg={isRepliedTo ? 'white' : '#E9F7F9'}
        borderRadius={12}
        // ml={isRepliedTo && 32}
        {...props}
      >
        <Box py={12} px={[16, 40]}>
          <Row justifyContent="space-between" flex={1}>
            <Box mr={12} alignItems="center">
              {/* {isRepliedTo && <Box width="2px" height={32} bg="#B5B5B5" mb={2} />} */}
              <ProfileIcon size={40} /*bg="#F7F7F7"*/ bg="white" borderColor="#D9D9D9" borderWidth={1}>
                <Icon icon={ShieldIcon} color="primary" />  
              </ProfileIcon>  
              {/* {isRepliedTo && <Box width="2px" flex={1} bg="#B5B5B5" mb={2} />} */}
            </Box>
            <AnonProfileNamesRow username={username || 'zs*****'} name={name || 'ANONYMOUS'} />
            <Box flex={1} />
            {/* <Box>
              <NameText mb={1}>{user.name}</NameText>
              <UsernameText>{`@${user.screen_name}`}</UsernameText>
            </Box> */}
            {/* <Box flex={1} /> */}
            {createdAt && <Text fontFamily="Helvetica" fontSize={16}>{getTimeAgo(createdAt)}</Text>}
          </Row>
          <Box pt={16}>
            <PostText text={textContent} />
          </Box>
          <Row mt={12} justifyContent="space-between">
            <Box
              // as="a"// @ts-ignore
              // @ts-ignore
              style={{ cursor: 'pointer' }}
              // onClick={onPressLike}
              // onClick={() => {
              //   // setMemoContent(`TIP_TWEET:${id}`);
              //   // setTipVisible(!tipVisible);
              // }}
            >
              <Row alignItems="center">
                <Box onClick={onPressLike}>
                  <ZcashHeartIcon />
                </Box>
                {likeCount > 0 && <Text ml={1} color="#5F6E7A">{likeCount}</Text>}
              </Row>
            </Box>
            <Box flex={1} />
            <Row>
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
                  <Row
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
                    >
                    <Comp fill="#5F6E7A" />
                    {actionId === 'reply' && (
                      <Text color="#5F6E7A" ml={1}>
                        {replyCount}
                      </Text>
                    )}
                  </Row>
                );
              })}
            </Row>
            {/* <Box flex={1} /> */}
          {/* <Box
            as="a"// @ts-ignore
            href="#"
            onClick={() => {
              setMemoContent(`TIP_TWEET:${id}`);
              setTipVisible(!tipVisible);
            }}
          >
            <ZcashIcon />
          </Box> */}
          </Row>
        </Box>
      </Box>
    </>
  );
};

export default ZecPostFeedItem;
