// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import FlatList from '@react-platform/native/lib/modules/FlatList';
import { Box, extend, Image, Row, Text, ThemeProvider, useTheme, useWindowDimensions } from 'elemental-react';
import { Svg, G, Path, Rect, Circle } from 'react-primitives-svg';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
// import OAuth from 'oauth-1.0a';
import Modal from 'react-modal';
import { useInfiniteQuery } from 'react-query';
import { InfiniteLoader, List, AutoSizer, CellMeasurer, CellMeasurerCache, WindowScroller } from 'react-virtualized';
import Measure from 'react-measure'

// import crypto from 'crypto';
// import fetch from 'sync-fetch/index';

import { Icon, TextInput, InputField, TruncatedZAddress, CryptoAddressCopy, QRCode, Button } from '@elemental-zcash/components';
import { MicroPostFeedItem, ZecPostFeedItem } from '@zpublish/components';
import Section from '@zpublish/components/lib/common/Section';


// import data from '../../../../components/data/home_timeline.json';
import zecPagesData from '@zpublish/components/data/zecpages_feed.json';
import userTimelineData from '@zpublish/components/data/user_timeline.json';


const cache = new CellMeasurerCache({
  defaultHeight: 50,
  fixedWidth: true
});


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
  const { theme } = useTheme();
  const [items, setItems] = useState(userTimelineData);
  const [zecPagesItems, setZecPagesItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState(null);
  const { width } = useWindowDimensions();
  const zecpagesAddress = 'zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f';
  const zecpagesPostAmount = 0.001;
  const [memo, setMemo] = useState('');
  // const [list, setList] = useState();

  const [conversations, setConversations] = useState({
    
  });

  const zecPagesAddressUri = `zcash:${zecpagesAddress}?amount=${zecpagesPostAmount}&memo=${memo}`;

  // useEffect(async () => {
  //   if (isLoading) {
  //     return;
  //   }

  //   const url = `https://be.zecpages.com/board/${currentPage}`;
  //   setIsLoading(true);

  //   const res = await fetch(url, {
  //     headers: {},
  //   });

  //   const _data = await res.json();

  //   setIsLoading(false);
  //   setZecPagesItems([...zecPagesItems, ..._data]);
  // }, [setZecPagesItems, currentPage]);

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    'zecpages_board',
    async ({ pageParam = 1 }) => {
      const url = `https://be.zecpages.com/board/${pageParam}`;
      const res = await fetch(url);
      const data = await res.json();

      return {
        results: data,
        nextId: pageParam + 1,
      };
    },
    {
      // getPreviousPageParam: firstPage => firstPage.previousId ?? undefined,
      getNextPageParam: lastPage => {
        return lastPage.nextId ?? undefined;
      },
      refetchOnWindowFocus: false,
    }
  );
  
  const results = data?.pages.map(page => page.results).flat() || [];

  const rowCount = hasNextPage ? results.length + 1 : results.length;
  const loadMoreRows = isFetchingNextPage
    ? () => {}
    : ({ startIndex, stopIndex }) => {
      // debugger;
      fetchNextPage();
    };
  const isRowLoaded = ({ index }) => !hasNextPage || !!results[index] || index < results.length;

  const rowRenderer = ({ index, key, style, parent }) => {
    let isLoaded = false;
    let content;
    let item;

    if (!isRowLoaded({ index })) {
      item = {};
    } else {
      isLoaded = true;
      item = results[index];
    }

    const { datetime, memo, id } = item || {};

    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
      >
        {({ measure, registerChild }) => (
          // 'style' attribute required to position cell (within parent List)
          <div ref={registerChild} style={style}>
            <Measure
              bounds
              onResize={contentRect => {
                measure({ height: contentRect.bounds.height, width: contentRect.bounds.width })
                // this.setState({ dimensions: contentRect.bounds })
              }}
            >
              {({ measureRef }) => (
                <div ref={measureRef}>
                  {isLoaded && datetime ? (
                    <ZecPostFeedItem
                      // style={style}
                      // key={key}
                      createdAt={new Date(Number(datetime))}
                      text={memo}
                      mb={16}
                      bg="#E9F7F9"
                    />
                  ) : (
                    <Box>
                      <Text>Loading...</Text>
                    </Box>
                  )}
                </div>
              )}
            </Measure>
            {/* <img
              onLoad={measure}
              src={source}
            /> */}
          </div>
        )}
      </CellMeasurer>
    )
  };

  const closeModal = () => {
    setModalState(null);
  }


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
    <Box flex={1}>
      <Modal
        isOpen={!!modalState}
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
        contentLabel="Modal"
      >
        {{
          zecpages_qrcode: (
            <Box p={40}>
              <Row>
                <Box flex={1} />
                <ThemeProvider
                  theme={{
                    ...theme,
                    colors: {
                      ...theme.colors,
                      btn: {
                        ...theme.colors.btn,
                        bg: 'rgba(0, 0, 0, 1)',
                        hoverBg: 'rgb(40, 40, 40)',
                        focusBg: 'rgb(60, 60, 60)',
                        text: '#fff'
                        // disabledBg: '#E4E2E2',
                        // disabledText: '#7D7D7D',
                        // text: '#000000',
                        // textBtn: {
                        //   text: '#000',
                        //   hoveredBg: '#FFF7E5',
                        //   focusedBg: '#FFF1D1',
                        //   pressedBg: '#FFF1D1',
                        //   disabledText: '#7D7D7D',
                        // }
                    }
                  }
                }}>
                  <Button fontFamily="IBM Plex Sans" color="white" fontSize={14} fontWeight="bold" onClick={closeModal} mb={32}>
                    CLOSE
                  </Button>
                </ThemeProvider>
              </Row>
              <Box alignItems="center">
                <Text fontFamily="IBM Plex Mono" fontSize={24} mb={24}>Send 0.001 ZEC to</Text>
                <QRCode
                  bgColor="#ffffff"
                  fgColor="#000000"
                  includeMargin={true}
                  style={{ width: width * 0.55, height: width * 0.55, maxHeight: 512, maxWidth: 512 }}
                  // value={`zcash:${zaddr}?amount=0.001&memo=${memo}`}
                  value={zecPagesAddressUri}
                />
              </Box>
              {/* <Row
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
              </Row> */}
            </Box>
          ),
        }[modalState]}
      </Modal>
      <Box px={[32, 40]} py={20} center>
        <Text fontSize={20} fontFamily="secondary" center bold>
          {'ZEC-powered anonymous memo board '}
          <a href="https://zecpages.com/boardinfo">
            <Text fontSize={20} fontFamily="secondary" color="blue">(how it works)</Text>
          </a>
        </Text>
      </Box>
      <Box px={[16, 40]} mb={16}>
        <InputField
          label="Write your post here..."
          // onTextChange={(value) => {
          //   setMemo(value);
          // }}
          value={memo}
          labelVisible={false}
        >
          {({ label, value }) =>
            <TextInput
              p={16}
              borderColor="#313880"
              placeholderColor="#636363"
              borderWidth={2}
              label={label}
              value={value}
              onChange={(event) => {
                // setTextAreaHeight("auto");
                // setParentHeight(`${textAreaRef.current.scrollHeight}px`);
                // setText(event.target.value);
            
                setMemo(event.target.value);
              }}
              multiline
            />
          }
        </InputField>
      </Box>
      <Box px={[16, 40]} mb={16}>
        <Box>
          <ThemeProvider theme={{ ...theme, colors: { ...theme.colors, icons: { ...theme.colors.icons, qrcode_box: '#fff' } }}}>
            <CryptoAddressCopy /*bg="#313880"*/
              bg="#224259"
              color="white"
              address={zecpagesAddress}
              onCopyPress={async () => {
                await copyTextToClipboard(zecPagesAddressUri);
              }}
              onQrcodePress={() => {
                setModalState('zecpages_qrcode');
                // console.log('qrcode');
              }}
            />
          </ThemeProvider>
        </Box>
      </Box>
      <Section py={16} flex={1}>
        <Box flex={1}>
          <InfiniteLoader
            isRowLoaded={isRowLoaded}
            loadMoreRows={loadMoreRows}
            rowCount={rowCount}
          >
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller
                // ref={this._setRef}
                scrollElement={window}
                // scrollElement={isScrollingCustomElement ? customElement : window}
              >
                {({ height, isScrolling, onChildScroll, scrollTop, registerChild }) => (
                  <AutoSizer disableHeight>
                    {({ width }) => {
                      return (
                        <div ref={registerChild}>
                          <List
                            ref={registerChild}
                            onRowsRendered={onRowsRendered}
                            rowRenderer={rowRenderer}
                            deferredMeasurementCache={cache}
                            rowHeight={cache.rowHeight}
                            rowCount={rowCount}
                            height={height}
                            autoHeight
                            width={width}
                            scrollTop={scrollTop}
                            // {...otherProps}
                          />
                        </div>
                      );
                    }}
                  </AutoSizer>
                )}
              </WindowScroller>
            )}
          </InfiniteLoader>
        </Box>
        {/* <Box flex={1}>
          <FlatList
            data={results}
            style={{ height: '100%' }}
            keyExtractor={(item) => item.id}
            // getItemLayout={...} - optimisation
            renderItem={({ item }) => {
              const { datetime, memo, id } = item;

              return (
                <ZecPostFeedItem
                  // key={`id-${id}`}
                  createdAt={new Date(Number(datetime))}
                  text={memo}
                  mb={16}
                  bg="#E9F7F9"
                />
              );
            }}
            onEndReachedThreshold={0.2}
            onEndReached={() => {
              if (!isLoading) {
                console.log({ loadNextPage: currentPage + 1 });
                // debugger;
                // setCurrentPage(currentPage + 1);

                // this.fetchUser(this.page); // method for API call 
              }
            }}
          />
        </Box> */}
        {/* {zecPagesItems.map(({ datetime, memo, id }, i) => (
          <ZecPostFeedItem key={id || `index-${i}`} createdAt={new Date(Number(datetime))} text={memo} mb={16} bg="#E9F7F9" />
        ))}   */}
      </Section>
      <a href="https://zecpages.com">
        <Text center fontSize={20} lineHeight={24} color="blue">
          {'> Visit ZECpages'}
        </Text>
      </a>
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
