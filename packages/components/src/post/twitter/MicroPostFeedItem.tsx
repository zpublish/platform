import React, { useState } from 'react';
import { Box, Row, Text } from 'elemental-react';
import { NameText, UsernameText } from '../BasePost';
import { getTimeAgo } from '../../utils/time';
import ProfileIcon from '../../profile/ProfileIcon';
import QuotePost from '../QuotePost';
import { FavoriteIcon, ReplyIcon, RepostIcon, ShareIcon, ZcashIcon } from '../../icons';

type User = any;

const MicroPostFeedItem = ({
  id, user, retweetUser, createdAt, isRepliedTo, retweetedStatus, quotedStatus, text, inReplyToStatusId,
}: {
  id?: string,
  user?: User,
  retweetUser?: User,
  createdAt?: Date,
  isRepliedTo?: boolean,
  retweetedStatus?: boolean,
  quotedStatus?: any,
  text?: string,
  inReplyToStatusId?: string,
}) => {
  const [memoContent, setMemoContent] = useState('test');
  const [tipVisible, setTipVisible] = useState(false);

  return (
    <Box>
      {retweetedStatus && (
        <Row px={[16, 40]} alignItems="center" pt={12}>
          <Row width={40} mr={12}>
            <Box flex={1} />
            <RepostIcon fill="#6D6D6D" />
          </Row>
          <Text fontFamily="Helvetica" fontSize={14} color="#6D6D6D">{`${retweetUser.name} Retweeted`}</Text>
        </Row>
      )}
      <Row py={12} px={[16, 40]}>
        <Box mr={12} alignItems="center">
          {inReplyToStatusId && <Box width="2px" height={32} bg="#B5B5B5" mb={2} />}
          <ProfileIcon size={40} uri={user.profile_image_url_https} />
          {isRepliedTo && <Box width="2px" flex={1} bg="#B5B5B5" mb={2} />}
        </Box>
        <Box flex={1}>
          <Row justifyContent="space-between" flex={1}>
            <Box>
              <NameText mb={1}>{user.name}</NameText>
              <UsernameText>{`@${user.screen_name}`}</UsernameText>
            </Box>
            {/* <Box flex={1} /> */}
            {createdAt && <Text fontFamily="Helvetica" fontSize={16}>{getTimeAgo(createdAt)}</Text>}
          </Row>
          <Box pt="4px">
            {text ? (
            <Text fontSize={16} fontFamily="Helvetica">
              {text}
            </Text>
            ) : (
              <>
                <Box bg="#DEDEDE" height={16} width="90%" mb="4px" />
                <Box bg="#DEDEDE" height={16} width="80%" mb="4px" />
                <Box bg="#DEDEDE" height={16} width="90%" mb="4px" />
              </>
            )}
          </Box>
          {quotedStatus && (
            <QuotePost user={quotedStatus.user} createdAt={new Date(quotedStatus.created_at)} text={quotedStatus.text} />
          )}
          <Row mt={12} justifyContent="space-between">
              {[
                { component: ReplyIcon, id: 'reply' },
                { component: RepostIcon, id: 'repost' },
                { component: FavoriteIcon, id: 'favorite' },
                { component: ShareIcon, id: 'share' },
              ].map(({ component: Comp, id: actionId }) => {
                const hrefById: any = {
                  reply: `https://twitter.com/intent/tweet?in_reply_to=${id}`,
                  repost: `https://twitter.com/intent/retweet?tweet_id=${id}`,
                  favorite: `https://twitter.com/intent/like?tweet_id=${id}`,
                };
                return (// @ts-ignore
                  <Box mr={16} as="a" href={actionId === 'share' ? '#' : hrefById[actionId]} target={actionId !== 'share' && '_blank'} onClick={(actionId === 'share') ? () => { if (typeof navigator !== 'undefined' && navigator?.canShare && navigator.share) { navigator?.share({ url: `https://twitter.com/${user.screen_name}/${id}`}) } } : undefined}>
                    <Comp fill="#5F6E7A" />
                  </Box>
                );
              })}
              <Box flex={1} />
              <Box
                as="a"// @ts-ignore
                href="#"
                onClick={() => {
                  setMemoContent(`TIP_TWEET:${id}`);
                  setTipVisible(!tipVisible);
                }}
              >
                <ZcashIcon />
              </Box>
            </Row>
        </Box>
      </Row>
    </Box>
  );
};

export default MicroPostFeedItem;
