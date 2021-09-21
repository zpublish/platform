// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from 'react-sketchapp-router';
import { Box, extend, Image, Row, Text } from 'elemental-react';
import { Svg, G, Path, Rect, Circle } from 'react-primitives-svg';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
// import fetch from 'sync-fetch/index';

import AppBar from '../../../../components/lib/common/AppBar';
import Footer from '../../../../components/lib/common/Footer';
import Section from '../../../../components/lib/common/Section';

import data from '../../../../components/data/home_timeline.json';

const getTimeAgo = (createdAt) => {
  if (!createdAt) { return ''; }

  let timeAgoText;
  if (differenceInDays(new Date(), createdAt) <= 0) {
    if (differenceInHours(new Date(), createdAt) === 0) {
      timeAgoText = `${differenceInMinutes(new Date(), createdAt)}m`;
    } else {
      timeAgoText = `${differenceInHours(new Date(), createdAt)}h`;
    }
  } else {
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short' });
    const shortMonth = formatter.format(createdAt);
    timeAgoText = `${shortMonth} ${createdAt.getDate()}`;
  }

  return timeAgoText;
}

const ProfileIcon = ({ size = 40, uri }) => (
  <>
    {uri
      ? <Image width={size} height={size} borderRadius="50%" src={uri} />
      : <Box borderRadius="50%" width={size} height={size} bg="#DEDEDE" />
    }
  </>
);

const NameText = extend(Text as any, () => ({
  fontFamily: 'Helvetica',
  fontSize: 16,
  bold: true,
}));
const UsernameText = extend(Text as any, () => ({
  fontFamily: 'Helvetica',
  fontSize: 12,
  color: '#737373'
}));

const QuotePost = ({ user, createdAt, text }) => (
  <Box borderRadius="6px" borderColor="#B5B5B5" borderWidth={1} p={12} mt={16}>
    <Row justifyContent="space-between">
      <Row>
        <ProfileIcon size={24} uri={user.profile_image_url_https} />
        <Box ml="8px">
          <NameText>{user.name}</NameText>
          <UsernameText>{`@${user.screen_name}`}</UsernameText>
        </Box>
      </Row>
      <Text fontFamily="Helvetica" fontSize={16}>{getTimeAgo(createdAt)}</Text>
    </Row>
    <Text mt="8px">{text}</Text>
  </Box>
);

const RepostIcon = ({ fill = '#000000' }) => (
  <Svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <G id="/microposts:mobile" transform="translate(-131.000000, -900.000000)">
              <G id="&lt;MicroPost&gt;-Copy" transform="translate(0.000000, 497.000000)">
                  <G id="Group-17" transform="translate(74.000000, 403.000000)" filter="url(#filter-1)">
                      <G transform="translate(57.000000, 0.000000)" id="Group-15">
                          <Rect id="Rectangle" x="0" y="0" width="24" height="24"></Rect>
                          <G id="Group" transform="translate(1.000000, 5.000000)" fill={fill} fill-rule="nonzero">
                              <Path d="M4.56097561,0 L9.12195122,4.56097561 L5.63414634,4.56097561 L5.63414634,11 L12.6097561,11 L14.7560976,13.1463415 L5.63414634,13.1463415 C4.44875468,13.1463415 3.48780488,12.1853917 3.48780488,11 L3.48780488,4.56097561 L0,4.56097561 L4.56097561,0 M17.4390244,13.4146341 L12.8780488,8.85365854 L16.3658537,8.85365854 L16.3658537,2.41463415 L9.3902439,2.41463415 L7.24390244,0.268292683 L16.3658537,0.268292683 C17.5512453,0.268292683 18.5121951,1.22924249 18.5121951,2.41463415 L18.5121951,8.85365854 L22,8.85365854 L17.4390244,13.4146341 Z" id="Shape"></Path>
                          </G>
                      </G>
                  </G>
              </G>
          </G>
      </G>
  </Svg>
);
const ReplyIcon = ({ fill = '#000' }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" overflow="visible">
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path fill={fill} d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
  </Svg>
);

const FavoriteIcon = ({ fill = '#000' }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" overflow="visible">
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path fill={fill} d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"/>
  </Svg>
);

const ShareIcon = ({ fill = '#000' }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" overflow="visible">
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path fill={fill} d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/>
  </Svg>
);

const ZcashIcon = ({ fill = '#231F20' }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" overflow="visible">
    <G id="Page-1_1_">
      <G id="_x2F_microposts:mobile_1_" transform="translate(-320 -900)">
        <G id="_x3C_MicroPost_x3E_-Copy_1_" transform="translate(0 497)">
          <G id="Group-19_1_" transform="translate(74 403)">
            <G id="Group_1_" transform="translate(246)">
              <Path id="Shape_1_" fill={fill} d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm0 22.02C6.47 22.02 1.98 17.53 1.98 12S6.47 1.98 12 1.98 22.02 6.47 22.02 12 17.53 22.02 12 22.02z"/>
              <Circle id="Oval_1_" cx="12.13" cy="12.13" r="9.49" fill="#f4b728"/>
              <Path id="Path_1_" class="st0" d="M7.91 15.71v1.82h3.23v1.99h1.98v-1.99h3.23v-2.41h-5.01l5.01-6.83V6.47h-3.23V4.48h-1.98v1.99H7.91v2.41h5.01z"/>
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

const MicroPostFeedItem = ({ id, user, retweetUser, createdAt, isRepliedTo, retweetedStatus, quotedStatus, text, inReplyToStatusId }) => (
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
          <Text fontFamily="Helvetica" fontSize={16}>{getTimeAgo(createdAt)}</Text>
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
              { component: ShareIcon, id: 'share',
            }].map(({ component: Comp, id: actionId }) => {
              const hrefById = {
                reply: `https://twitter.com/intent/tweet?in_reply_to=${id}`,
                repost: `https://twitter.com/intent/retweet?tweet_id=${id}`,
                favorite: `https://twitter.com/intent/like?tweet_id=${id}`,
              };
              return (
                <Box mr={16} as="a" href={actionId === 'share' ? '#' : hrefById[actionId]} target={actionId !== 'share' && '_blank'} onClick={(actionId === 'share') ? () => { if (typeof navigator !== 'undefined' && navigator?.canShare && navigator.share) { navigator?.share({ url: `https://twitter.com/${user.screen_name}/${id}`}) } } : undefined}>
                  <Comp fill="#5F6E7A" />
                </Box>
              );
            })}
            <Box flex={1} />
            <Box
              as="a"
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


const TimelineFeed = () => {
  const [items, setItems] = useState(data.slice(0, 10));

  useEffect(() => {
    // const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';

    // const oauth = OAuth({
    //   consumer: {
    //     key: 'n',
    //     secret: 'n'
    //   },
    //   signature_method: 'HMAC-SHA256',
    //   hash_function(base_string, key) {
    //       return crypto
    //         .createHmac('sha256', key)
    //         .update(base_string)
    //         .digest('base64')
    //   },
    // });
    // const request_data = {
    //     url: url,
    //     method: 'GET'
    // };
    // const data = fetch(url, {
    //   headers: {...oauth.toHeader(oauth.authorize(request_data, { key: 'n', secret: 'n' }))}
    // }).json();
    // // const data = await res.json();

    // setItems(data.slice(0, 10));
    // console.log(data[0]);
  }, []);

  return (
    <Box>
      {items.slice(0, 10).map(({
        quoted_status, retweeted_status,
        in_reply_to_status_id,
        in_reply_to_screen_name,
        entities, in_reply_to_user_id_str, user, text,
        ...args
      }) => {
        let timeAgoText;
        const createdAt = new Date(args.created_at);

        // const secondsDiff = ((new Date()).getTime() - createdAt.getTime()) / 1000;
        let inReplyToUser;
        if (in_reply_to_screen_name) {
          if (entities?.user_mentions) {
            entities.user_mentions.forEach(({ screen_name, name, id_str }) => {
              if (id_str === in_reply_to_user_id_str) {
                inReplyToUser = { name, screen_name };
              }
            })
          }
        }

        return (
          <Box borderTopWidth={1} borderBottomWidth={1} borderColor="#EAEAEA">
            {retweeted_status ? (
              <MicroPostFeedItem
                user={retweeted_status.user}
                createdAt={new Date(retweeted_status.created_at)}
                quotedStatus={retweeted_status.quoted_status}
                retweetUser={user}
                retweetedStatus={retweeted_status}
                text={retweeted_status.text}
                inReplyToStatusId={in_reply_to_status_id}
              />
            ) : (
              <>
                {in_reply_to_status_id && (
                  <>
                    <MicroPostFeedItem user={inReplyToUser} isRepliedTo />
                    <Text fontSize={16} color="blue" fontFamily="Helvetica" ml={68} my={1}>Show this thread</Text>
                  </>
                )}
                <MicroPostFeedItem user={user} createdAt={createdAt} quotedStatus={quoted_status} text={text} inReplyToStatusId={in_reply_to_status_id} />
              </>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

const Home = () => (
  <Box>
    {/* <Box width="100%" height={720} bg="gray" /> */}
    <AppBar>
      <Link to="/navigation">
        <AppBar.MenuIcon />
      </Link>
      <AppBar.Title />
      <AppBar.Fill />
    </AppBar>
    <Section px="0px">
      <TimelineFeed />
    </Section>
    {/* <Gallery images={images} />
    <Section pt="8px">
      <Gallery.InstagramButton />
    </Section> */}
    <Footer />
  </Box>
);

export default Home;