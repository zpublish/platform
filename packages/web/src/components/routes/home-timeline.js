// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Box, extend, Image, Row, Text } from 'elemental-react';
import { Svg, G, Path, Rect, Circle } from 'react-primitives-svg';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import OAuth from 'oauth-1.0a';
import Modal from 'react-modal';
// import crypto from 'crypto';
// import fetch from 'sync-fetch/index';

import AppBar from '../../../../components/lib/common/AppBar';
import Footer from '../../../../components/lib/common/Footer';
import Section from '../../../../components/lib/common/Section';

import data from '../../../../components/data/home_timeline.json';
import userTimelineData from '../../../../components/data/user_timeline.json';
import { Button } from 'elemental-react/lib/main.web.esm';
import QRCode from '../qrcode';
import useWindowViewport from '../../hooks/use-window-viewport';

const getTimeAgo = (createdAt) => {
  if (!createdAt) {
    return '';
  }

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

const NameText = extend(Text, () => ({
  fontFamily: 'Helvetica',
  fontSize: 16,
  bold: true,
}));
const UsernameText = extend(Text, () => ({
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
<Svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" overflow="visible">
  <Path fill="none" d="M0 0h24v24H0z"/>
  <Path d="M5.56 5l4.56 4.56H6.63V16h6.98l2.15 2.15H6.63c-1.19 0-2.15-.96-2.15-2.15V9.56H1L5.56 5m12.88 13.41l-4.56-4.56h3.49V7.41h-6.98L8.24 5.27h9.12c1.19 0 2.15.96 2.15 2.15v6.44H23l-4.56 4.55z" fill="#6d6d6d" />
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
              <Path id="Shape_1_" fill={fill} d="M12 0C5.38 0 0 5.38 0 12s5.38 12 12 12 12-5.38 12-12S18.62 0 12 0zm0 22.02C6.47 22.02 1.98 17.53 1.98 12S6.47 1.98 12 1.98 22.02 6.47 22.02 12 17.53 22.02 12 22.02z"/><circle id="Oval_1_" cx="12.13" cy="12.13" r="9.49" fill="#f4b728"/><path id="Path_1_" class="st0" d="M7.91 15.71v1.82h3.23v1.99h1.98v-1.99h3.23v-2.41h-5.01l5.01-6.83V6.47h-3.23V4.48h-1.98v1.99H7.91v2.41h5.01z"/>
            </G>
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

const CopyIcon = ({ ...props }) => {
  return (

    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" style={{ overflow: 'visible', enableBackground: 'new 0 0 24 24' }}>
    <g id="Page-1_1_">
      <g id="Artboard_1_" transform="translate(-4.000000, -4.000000)">
        <g id="Group-14-Copy-2_1_" transform="translate(4.000000, 4.000000)">
          <rect id="Rectangle_9_" style={{ fill: 'none' }} width="24" height="24"/>
          <g id="Group-14-Copy_1_" transform="translate(3.000000, 1.000000)">
            <g id="Group-12-Copy-2_1_" transform="translate(0.000000, 5.000000)">
              <rect id="Rectangle_8_" x="1" y="1" style={{ fillRule: 'evenodd', fill: '#FFFFFF', stroke: '#000000', strokeWidth: 2 }} width="12" height="15"/>
              <g id="Group-11_3_">
                <g transform="translate(4.000000, 5.000000)">
                  <rect id="Rectangle_7_" style={{ fillRule: 'evenodd', clipRule: 'evenodd' }} width="6" height="1"/>
                  <rect id="Rectangle-Copy-6_3_" y="3" style={{ fillRule: 'evenodd', clipRule: 'evenodd' }} width="6" height="1"/>
                  <rect id="Rectangle-Copy-7_3_" y="6" style={{ fillRule: 'evenodd', clipRule: 'evenodd' }} width="6" height="1"/>
                </g>
              </g>
            </g>
            <g id="Group-12_1_" transform="translate(5.000000, 0.000000)">
              <rect id="Rectangle_6_" x="1" y="1" style={{ fillRule: 'evenodd', clipRule: 'evenodd', fill: '#EFFFF9', stroke: '#001CFF', strokeWidth: 2 }} width="12" height="15"/>
              <g id="Group-11_2_">
                <g transform="translate(4.000000, 5.000000)">
                  <rect id="Rectangle_5_" style={{ fillRule: 'evenodd', clipRule: 'evenodd' }} width="6" height="1"/>
                  <rect id="Rectangle-Copy-6_2_" y="3" style={{ fillRule: 'evenodd', clipRule: 'evenodd' }} width="6" height="1"/>
                  <rect id="Rectangle-Copy-7_2_" y="6" style={{ fillRule: 'evenodd', clipRule: 'evenodd' }} width="6" height="1"/>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
    </svg>
    
  );
};

const copyTextToClipboard = async (text) => {
  if (!navigator.clipboard) {
    return;
  }
  return await navigator.clipboard.writeText(text);
}

const toBase64 = (text) => {
  if (typeof window === 'undefined') {
    return Buffer.from(text).toString('base64')
  } else {
    return btoa(text);
  }
};

const MicroPostFeedItem = ({ id, user, retweetUser, createdAt, isRepliedTo, retweetedStatus, quotedStatus, text, inReplyToStatusId }) => {
  const [tipVisible, setTipVisible] = useState(false);
  const { width } = useWindowViewport();
  const [memoContent, setMemoContent] = useState('test');
  const [copyIsClicked, setCopyIsClicked] = useState(false);
  const [copyIsHovered, setCopyIsHovered] = useState(false);

  const memo = toBase64(unescape(encodeURIComponent(memoContent))).replace('=', '');

  function openModal() {
    setTipVisible(true);
  }
  const zaddr = 'zs19flc40y4u9qm80mplhqqt7q62076sj0k5v4rvpjcgetcs73fcx7amg3zfr4vnxc4qqh3ct4wgwq';
  /*
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  */

  function closeModal() {
    setTipVisible(false);
  }

  return (
    <Box borderWidth="unset" borderTopWidth={1} borderBottomWidth={1} borderLeftWidth={0} borderRightWidth={0} borderColor="#EAEAEA">
      <Modal
        isOpen={tipVisible}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: 0,
          },
        }}
        contentLabel="Example Modal"
      >
        <Box p={40}>
          <Row>
            <Box flex={1} />
            <Button fontFamily="IBM Plex Sans" fontSize={14} fontWeight="bold" onClick={closeModal} mb={32}>
              CLOSE
            </Button>
          </Row>
          <Box alignItems="center">
            <Text fontFamily="IBM Plex Mono" fontSize={24} mb={24}>Send 0.001 ZEC to</Text>
            <QRCode
              bgColor="#ffffff"
              fgColor="#000000"
              includeMargin={true}
              style={{ width: width * 0.55, height: width * 0.55, maxHeight: 512, maxWidth: 512 }}
              value={`zcash:${zaddr}?amount=0.001&memo=${memo}`}
            />
          </Box>
          <Row
            bg="#F1F1F1"
            borderRadius={4}
            p="8px"
            px={12}
            mt={32}
            alignItems="center"
          >
            <Text as="codespan" flex={1} style={{ wordBreak: 'break-all' }} fontFamily="IBM Plex Mono" fontSize={12} lineHeight={16}>{`zcash:${zaddr}?amount=0.001&memo=${memo}`}</Text>
            <Box
              style={{ cursor: 'pointer' }}
              ml={16}
              width={32}
              height={32}
              borderWidth={1}
              borderColor="black"
              alignItems="center"
              justifyContent="center"
              onClick={async () => {
                await copyTextToClipboard(`zcash:${zaddr}?amount=0.001&memo=${memo}`);
                setCopyIsClicked(true);
                setTimeout(() => { setCopyIsClicked(false); setCopyIsHovered(false); }, 200);
              }}
              onMouseEnter={() => setCopyIsHovered(true)}
              onMouseLeave={() => { setCopyIsHovered(false); }}
              style={{ ...(copyIsHovered && { opacity: 0.5 }), ...(copyIsClicked && { opacity: 0.1 })}}
            >
              <CopyIcon />
            </Box>
          </Row>
        </Box>
      </Modal>
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
              )
            }
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
};

const hmacSha256Base64Digest = async (body, k) => {
  let secret = k; // the secret key
  let enc = new TextEncoder("utf-8");
  let algorithm = { name: "HMAC", hash: "SHA-256" };

  let key = await crypto.subtle.importKey("raw", enc.encode(secret), algorithm, false, ["sign", "verify"]);
  let signature = await crypto.subtle.sign(algorithm.name, key, enc.encode(body));
  let digest = btoa(String.fromCharCode(...new Uint8Array(signature)));

  return digest;
};

const ConversationList = () => {
  return (
    <>

    </>
  );
}

const aggregateDataById = (dataList) => {
  return dataList?.data?.reduce((acc, item) => {
    if (item?.id) {
      acc[item.id] = item;
    }
    return acc;
  })
}

const TimelineFeed = () => {
  const [items, setItems] = useState(userTimelineData);

  const [conversations, setConversations] = useState({
    
  });

  // useEffect(async () => {
  //   const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';

  //   const oauth = OAuth({
  //     consumer: {
  //       key: 'k',
  //       secret: 's'
  //     },
  //     signature_method: 'HMAC-SHA256',
  //     hash_function: hmacSha256Base64Digest,
  //   });
  //   const request_data = {
  //       url: url,
  //       method: 'GET'
  //   };
  //   const oauthAuthorized = await oauth.authorizeAsync(request_data, { key: 'k', secret: 's' })
  //   console.log({ oauthAuthorized });
  //   const res = await fetch(url, {
  //     headers: {...oauth.toHeader(oauthAuthorized)}
  //   });
  //   const _data = await res.json();

  //   setItems(_data.slice(0, 10));
  //   console.log(_data[0]);
  // }, []);

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
        // const secondsDiff = ((new Date()).getTime() - createdAt.getTime()) / 1000;

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
      <TimelineFeed />
  </Box>
);

export default Home;
