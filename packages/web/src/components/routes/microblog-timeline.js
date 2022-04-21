// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Box, extend, Image, Row, Text } from 'elemental-react';
import { Svg, G, Path, Rect, Circle } from 'react-primitives-svg';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
// import OAuth from 'oauth-1.0a';
import Modal from 'react-modal';
// import crypto from 'crypto';
// import fetch from 'sync-fetch/index';

import { MicroPostFeedItem, ZecPostFeedItem } from '@zpublish/components';
import Section from '@zpublish/components/lib/common/Section';
import userTimelineData from '@zpublish/components/data/user_timeline.json';


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

// const MicroPostFeedItem = ({ id, user, retweetUser, createdAt, isRepliedTo, retweetedStatus, quotedStatus, text, inReplyToStatusId }) => {
//   const [tipVisible, setTipVisible] = useState(false);
//   const { width } = useWindowViewport();
//   const [memoContent, setMemoContent] = useState('test');
//   const [copyIsClicked, setCopyIsClicked] = useState(false);
//   const [copyIsHovered, setCopyIsHovered] = useState(false);

//   const memo = toBase64(unescape(encodeURIComponent(memoContent))).replace('=', '');

//   function openModal() {
//     setTipVisible(true);
//   }
//   const zaddr = 'zs19flc40y4u9qm80mplhqqt7q62076sj0k5v4rvpjcgetcs73fcx7amg3zfr4vnxc4qqh3ct4wgwq';
//   /*
//     function afterOpenModal() {
//       // references are now sync'd and can be accessed.
//       subtitle.style.color = '#f00';
//     }
//   */

//   function closeModal() {
//     setTipVisible(false);
//   }

//   return (
//     <Box borderWidth="unset" borderTopWidth={1} borderBottomWidth={1} borderLeftWidth={0} borderRightWidth={0} borderColor="#EAEAEA">
//       <Modal
//         isOpen={tipVisible}
//         // onAfterOpen={afterOpenModal}
//         onRequestClose={closeModal}
//         style={{
//           content: {
//             top: '50%',
//             left: '50%',
//             right: 'auto',
//             bottom: 'auto',
//             marginRight: '-50%',
//             transform: 'translate(-50%, -50%)',
//             padding: 0,
//           },
//         }}
//         contentLabel="Example Modal"
//       >
//         <Box p={40}>
//           <Row>
//             <Box flex={1} />
//             <Button fontFamily="IBM Plex Sans" fontSize={14} fontWeight="bold" onClick={closeModal} mb={32}>
//               CLOSE
//             </Button>
//           </Row>
//           <Box alignItems="center">
//             <Text fontFamily="IBM Plex Mono" fontSize={24} mb={24}>Send 0.001 ZEC to</Text>
//             <QRCode
//               bgColor="#ffffff"
//               fgColor="#000000"
//               includeMargin={true}
//               style={{ width: width * 0.55, height: width * 0.55, maxHeight: 512, maxWidth: 512 }}
//               value={`zcash:${zaddr}?amount=0.001&memo=${memo}`}
//             />
//           </Box>
//           <Row
//             bg="#F1F1F1"
//             borderRadius={4}
//             p="8px"
//             px={12}
//             mt={32}
//             alignItems="center"
//           >
//             <Text as="codespan" flex={1} style={{ wordBreak: 'break-all' }} fontFamily="IBM Plex Mono" fontSize={12} lineHeight={16}>{`zcash:${zaddr}?amount=0.001&memo=${memo}`}</Text>
//             <Box
//               style={{ cursor: 'pointer' }}
//               ml={16}
//               width={32}
//               height={32}
//               borderWidth={1}
//               borderColor="black"
//               alignItems="center"
//               justifyContent="center"
//               onClick={async () => {
//                 await copyTextToClipboard(`zcash:${zaddr}?amount=0.001&memo=${memo}`);
//                 setCopyIsClicked(true);
//                 setTimeout(() => { setCopyIsClicked(false); setCopyIsHovered(false); }, 200);
//               }}
//               onMouseEnter={() => setCopyIsHovered(true)}
//               onMouseLeave={() => { setCopyIsHovered(false); }}
//               style={{ ...(copyIsHovered && { opacity: 0.5 }), ...(copyIsClicked && { opacity: 0.1 })}}
//             >
//               <CopyIcon />
//             </Box>
//           </Row>
//         </Box>
//       </Modal>
//       {retweetedStatus && (
//         <Row px={[16, 40]} alignItems="center" pt={12}>
//           <Row width={40} mr={12}>
//             <Box flex={1} />
//             <RepostIcon fill="#6D6D6D" />
//           </Row>
//           <Text fontFamily="Helvetica" fontSize={14} color="#6D6D6D">{`${retweetUser.name} Retweeted`}</Text>
//         </Row>
//       )}
//       <Row py={12} px={[16, 40]}>
//         <Box mr={12} alignItems="center">
//           {inReplyToStatusId && <Box width="2px" height={32} bg="#B5B5B5" mb={2} />}
//           <ProfileIcon size={40} uri={user.profile_image_url_https} />
//           {isRepliedTo && <Box width="2px" flex={1} bg="#B5B5B5" mb={2} />}
//         </Box>
//         <Box flex={1}>
//           <Row justifyContent="space-between" flex={1}>
//             <Box>
//               <NameText mb={1}>{user.name}</NameText>
//               <UsernameText>{`@${user.screen_name}`}</UsernameText>
//             </Box>
//             {/* <Box flex={1} /> */}
//             <Text fontFamily="Helvetica" fontSize={16}>{getTimeAgo(createdAt)}</Text>
//           </Row>
//           <Box pt="4px">
//             {text ? (
//               <Text fontSize={16} fontFamily="Helvetica">
//                 {text}
//               </Text>
//               ) : (
//                 <>
//                   <Box bg="#DEDEDE" height={16} width="90%" mb="4px" />
//                   <Box bg="#DEDEDE" height={16} width="80%" mb="4px" />
//                   <Box bg="#DEDEDE" height={16} width="90%" mb="4px" />
//                 </>
//               )
//             }
//           </Box>
//           {quotedStatus && (
//             <QuotePost user={quotedStatus.user} createdAt={new Date(quotedStatus.created_at)} text={quotedStatus.text} />
//           )}
//           <Row mt={12} justifyContent="space-between">
//             {[
//               { component: ReplyIcon, id: 'reply' },
//               { component: RepostIcon, id: 'repost' },
//               { component: FavoriteIcon, id: 'favorite' },
//               { component: ShareIcon, id: 'share',
//             }].map(({ component: Comp, id: actionId }) => {
//               const hrefById = {
//                 reply: `https://twitter.com/intent/tweet?in_reply_to=${id}`,
//                 repost: `https://twitter.com/intent/retweet?tweet_id=${id}`,
//                 favorite: `https://twitter.com/intent/like?tweet_id=${id}`,
//               };
//               return (
//                 <Box mr={16} as="a" href={actionId === 'share' ? '#' : hrefById[actionId]} target={actionId !== 'share' && '_blank'} onClick={(actionId === 'share') ? () => { if (typeof navigator !== 'undefined' && navigator?.canShare && navigator.share) { navigator?.share({ url: `https://twitter.com/${user.screen_name}/${id}`}) } } : undefined}>
//                   <Comp fill="#5F6E7A" />
//                 </Box>
//               );
//             })}
//             <Box flex={1} />
//             <Box
//               as="a"
//               href="#"
//               onClick={() => {
//                 setMemoContent(`TIP_TWEET:${id}`);
//                 setTipVisible(!tipVisible);
//               }}
//             >
//               <ZcashIcon />
//             </Box>
//           </Row>
//         </Box>
//       </Row>
//     </Box>
//   );
// };

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
  const [zecPagesItems, setZecPagesItems] = useState([,,,,,,]);

  const [conversations, setConversations] = useState({
    
  });

  useEffect(async () => {
    const url = 'https://be.zecpages.com/board/1';

    const res = await fetch(url, {
      headers: {},
    });

    const _data = await res.json();

    setZecPagesItems(_data);
  }, [setZecPagesItems]);

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
      <Section py={16}> 
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
      </Section>
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
