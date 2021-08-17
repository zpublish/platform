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
  <Image width={size} height={size} borderRadius="50%" src={uri} />
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

const MicroPostFeedItem = ({ user, retweetUser, createdAt, retweetedStatus, quotedStatus, text, inReplyToStatusId }) => (
  <Box borderTopWidth={1} borderBottomWidth={1} borderColor="#EAEAEA">
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
      <Box mr={12}>
        <ProfileIcon size={40} uri={user.profile_image_url_https} />
      </Box>
      <Box flex={1}>
        <Row justifyContent="space-between" flex={1}>
          <Box>
            <NameText>{user.name}</NameText>
            <UsernameText>{`@${user.screen_name}`}</UsernameText>
          </Box>
          {/* <Box flex={1} /> */}
          <Text fontFamily="Helvetica" fontSize={16}>{getTimeAgo(createdAt)}</Text>
        </Row>
        <Box pt="4px">
          <Text fontSize={16} fontFamily="Helvetica">
            {text}
          </Text>
          {inReplyToStatusId ? <Text>is_reply</Text> : null}
        </Box>
        {quotedStatus && (
          <QuotePost user={quotedStatus.user} createdAt={new Date(quotedStatus.created_at)} text={quotedStatus.text} />
        )}
      </Box>
    </Row>
  </Box>
);


const TimelineFeed = () => {
  const [items, setItems] = useState(data);

  useEffect(() => {
    const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';

    const oauth = OAuth({
      consumer: {
        key: 'n',
        secret: 'n'
      },
      signature_method: 'HMAC-SHA256',
      hash_function(base_string, key) {
          return crypto
            .createHmac('sha256', key)
            .update(base_string)
            .digest('base64')
      },
    });
    const request_data = {
        url: url,
        method: 'GET'
    };
    const data = fetch(url, {
      headers: {...oauth.toHeader(oauth.authorize(request_data, { key: 'n', secret: 'n' }))}
    }).json();
    // const data = await res.json();

    setItems(data.slice(0, 10));
    console.log(data[0]);
  }, []);

  return (
    <Box>
      {items.slice(0, 10).map(({ quoted_status, retweeted_status, in_reply_to_status_id, user, text, ...args }) => {
        let timeAgoText;
        const createdAt = new Date(args.created_at);

        // const secondsDiff = ((new Date()).getTime() - createdAt.getTime()) / 1000;

        return (
          <>
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
              <MicroPostFeedItem user={user} createdAt={createdAt} quotedStatus={quoted_status} text={text} inReplyToStatusId={in_reply_to_status_id} />
            )}
          </>
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