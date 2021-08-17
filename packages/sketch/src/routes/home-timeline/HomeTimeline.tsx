// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from 'react-sketchapp-router';
import { Box, extend, Image, Row, Text } from 'elemental-react';
import { Svg, G, Path, Rect, Circle } from 'react-primitives-svg';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
import fetch from 'sync-fetch/index';

import AppBar from '../../../../components/lib/common/AppBar';
import Footer from '../../../../components/lib/common/Footer';
import Section from '../../../../components/lib/common/Section';

import data from '../../../../components/data/home_timeline.json';


/*
{
    "created_at": "Thu Jul 29 19:24:23 +0000 2021",
    "id": 1420827562566209542,
    "id_str": "1420827562566209542",
    "text": "NPR will be even more politically activist now? https:\/\/t.co\/Sb7O4VerJP",
    "truncated": false,
    "entities": {
      "hashtags": [],
      "symbols": [],
      "user_mentions": [],
      "urls": [
        {
          "url": "https:\/\/t.co\/Sb7O4VerJP",
          "expanded_url": "https:\/\/twitter.com\/kellymcb\/status\/1420764637197340675",
          "display_url": "twitter.com\/kellymcb\/statu…",
          "indices": [
            48,
            71
          ]
        }
      ]
    },
    "source": "<a href=\"http:\/\/twitter.com\/download\/iphone\" rel=\"nofollow\">Twitter for iPhone<\/a>",
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
      "id": 1621201316,
      "id_str": "1621201316",
      "name": "Vladislav Davidzon",
      "screen_name": "VladDavidzon",
      "location": "Between NYC\/Odessa\/Paris.",
      "description": "Fellow @AtlanticCouncil Columnist @tabletmag Eastern Europe @aminterest @ForeignPolicy Founding editor @theodessareview Author of  “From Odessa with Love”",
      "url": "https:\/\/t.co\/IBpNj4aYJQ",
      "entities": {
        "url": {
          "urls": [
            {
              "url": "https:\/\/t.co\/IBpNj4aYJQ",
              "expanded_url": "http:\/\/odessareview.com",
              "display_url": "odessareview.com",
              "indices": [
                0,
                23
              ]
            }
          ]
        },
        "description": {
          "urls": []
        }
      },
      "protected": false,
      "followers_count": 4583,
      "friends_count": 3972,
      "listed_count": 117,
      "created_at": "Thu Jul 25 20:14:47 +0000 2013",
      "favourites_count": 17429,
      "utc_offset": null,
      "time_zone": null,
      "geo_enabled": true,
      "verified": false,
      "statuses_count": 1246,
      "lang": null,
      "contributors_enabled": false,
      "is_translator": false,
      "is_translation_enabled": false,
      "profile_background_color": "C0DEED",
      "profile_background_image_url": "http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
      "profile_background_image_url_https": "https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
      "profile_background_tile": false,
      "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/1056139072526315520\/pw-hgOvS_normal.jpg",
      "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/1056139072526315520\/pw-hgOvS_normal.jpg",
      "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/1621201316\/1471958761",
      "profile_link_color": "1DA1F2",
      "profile_sidebar_border_color": "C0DEED",
      "profile_sidebar_fill_color": "DDEEF6",
      "profile_text_color": "333333",
      "profile_use_background_image": true,
      "has_extended_profile": false,
      "default_profile": true,
      "default_profile_image": false,
      "following": true,
      "follow_request_sent": false,
      "notifications": false,
      "translator_type": "none",
      "withheld_in_countries": []
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "is_quote_status": true,
    "quoted_status_id": 1420764637197340675,
    "quoted_status_id_str": "1420764637197340675",
    "quoted_status": {
      "created_at": "Thu Jul 29 15:14:20 +0000 2021",
      "id": 1420764637197340675,
      "id_str": "1420764637197340675",
      "text": "NPR ethics policy update: Journalists can now participate in activities that advocate for “freedom and dignity of h… https:\/\/t.co\/uYIPszId0J",
      "truncated": true,
      "entities": {
        "hashtags": [],
        "symbols": [],
        "user_mentions": [],
        "urls": [
          {
            "url": "https:\/\/t.co\/uYIPszId0J",
            "expanded_url": "https:\/\/twitter.com\/i\/web\/status\/1420764637197340675",
            "display_url": "twitter.com\/i\/web\/status\/1…",
            "indices": [
              117,
              140
            ]
          }
        ]
      },
      "source": "<a href=\"https:\/\/about.twitter.com\/products\/tweetdeck\" rel=\"nofollow\">TweetDeck<\/a>",
      "in_reply_to_status_id": null,
      "in_reply_to_status_id_str": null,
      "in_reply_to_user_id": null,
      "in_reply_to_user_id_str": null,
      "in_reply_to_screen_name": null,
      "user": {
        "id": 8708112,
        "id_str": "8708112",
        "name": "kellymcb",
        "screen_name": "kellymcb",
        "location": "St. Petersburg, FL",
        "description": "\"The 1st Amendment is the best amendment.\" NPR Public Editor, SVP @Poynter, chair of the Craig Newmark Center for Ethics and Leadership",
        "url": "https:\/\/t.co\/ZVJldQCsSX",
        "entities": {
          "url": {
            "urls": [
              {
                "url": "https:\/\/t.co\/ZVJldQCsSX",
                "expanded_url": "http:\/\/www.poynter.org",
                "display_url": "poynter.org",
                "indices": [
                  0,
                  23
                ]
              }
            ]
          },
          "description": {
            "urls": []
          }
        },
        "protected": false,
        "followers_count": 10327,
        "friends_count": 1193,
        "listed_count": 494,
        "created_at": "Thu Sep 06 21:13:16 +0000 2007",
        "favourites_count": 2400,
        "utc_offset": null,
        "time_zone": null,
        "geo_enabled": true,
        "verified": true,
        "statuses_count": 8034,
        "lang": null,
        "contributors_enabled": false,
        "is_translator": false,
        "is_translation_enabled": false,
        "profile_background_color": "1A1B1F",
        "profile_background_image_url": "http:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
        "profile_background_image_url_https": "https:\/\/abs.twimg.com\/images\/themes\/theme1\/bg.png",
        "profile_background_tile": false,
        "profile_image_url": "http:\/\/pbs.twimg.com\/profile_images\/963427294776909825\/PgoZLjF-_normal.jpg",
        "profile_image_url_https": "https:\/\/pbs.twimg.com\/profile_images\/963427294776909825\/PgoZLjF-_normal.jpg",
        "profile_banner_url": "https:\/\/pbs.twimg.com\/profile_banners\/8708112\/1398887990",
        "profile_link_color": "4A913C",
        "profile_sidebar_border_color": "181A1E",
        "profile_sidebar_fill_color": "F8ABF4",
        "profile_text_color": "796767",
        "profile_use_background_image": true,
        "has_extended_profile": true,
        "default_profile": false,
        "default_profile_image": false,
        "following": false,
        "follow_request_sent": false,
        "notifications": false,
        "translator_type": "none",
        "withheld_in_countries": []
      },
      "geo": null,
      "coordinates": null,
      "place": null,
      "contributors": null,
      "is_quote_status": false,
      "retweet_count": 191,
      "favorite_count": 563,
      "favorited": false,
      "retweeted": false,
      "possibly_sensitive": false,
      "possibly_sensitive_appealable": false,
      "lang": "en"
    },
    "retweet_count": 0,
    "favorite_count": 0,
    "favorited": false,
    "retweeted": false,
    "possibly_sensitive": false,
    "possibly_sensitive_appealable": false,
    "lang": "en"
  }
*/

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
        key: 'KF4tW6swXPg3NnNTbwgnAqrhD',
        secret: '7VijuvSeCaKPTfStq4UahneuyQ3xO7AItqo0AwqlLriHl08DAs'
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
      headers: {...oauth.toHeader(oauth.authorize(request_data, { key: '95449141-g1pufAPk0uRMWsNQmDsyvQolWJBZdx3El1ZVYca2C', secret: 'P7JDxGL9LeSYwFibk6uL6TrEd10SknfCG6wHKhP35x0ev' }))}
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