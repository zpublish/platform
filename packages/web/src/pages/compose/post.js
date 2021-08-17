import React, { useEffect, useRef, useState } from 'react';
// import { Link } from 'gatsby';

import { Button, Box, Text, TextInput, Line, useWindowDimensions } from 'elemental-react';
import QRCode from '../../components/qrcode';

import Layout from '../../components/layout';
import SEO from '../../components/seo';
import AppBar from '../../../../components/lib/common/AppBar';
import Section from '../../../../components/lib/common/Section';
import { Circle, Row } from 'elemental-react/lib/main.web.esm';
import useWindowViewport from '../../hooks/use-window-viewport';

const Link = ({ children, to }) => <a href={to}>{children}</a>;

// const Footer = () => (
//   <Box bg="black">
//     <Link to="/page-2/">Go to page 2</Link>
//   </Box>
// );

const _TextInput = React.forwardRef(({ components, multiline, style, ...props }, ref) => {
  const htmlElName = multiline ? 'textarea' : 'input';
  // const { View = 'input' } = components || {};
  const [View, setView] = useState(components?.View || htmlElName);

  useEffect(() => {
    if (multiline) {
      setView(components?.TextArea || 'textarea');
    } else {
      setView(components?.Input || 'input');
    }
  }, [multiline]);

  return (
    <View
      ref={ref}
      style={{ fontSize: 14, outline: 'none', borderWidth: 0, ...style }}
      {...props}
    />
  );
});

const AutoTextArea = ({ ...props }) => {
  const textAreaRef = useRef(null);
  const [text, setText] = useState('');
  const [textAreaHeight, setTextAreaHeight] = useState('auto');
  const [parentHeight, setParentHeight] = useState('auto');

  const onChangeHandler = (event) => {
    setTextAreaHeight("auto");
		setParentHeight(`${textAreaRef.current.scrollHeight}px`);
		setText(event.target.value);

		if (props.onChangeText) {
      // console.debug('debug: ', { onChangeText: props.onChangeText, value: event.target.value });
      props.onChangeText(event.target.value);
		}
  }

  useEffect(() => {
    if (!textAreaRef?.current) {
      return;
    }

    setParentHeight(`${textAreaRef?.current.scrollHeight}px`);
    setTextAreaHeight(`${textAreaRef?.current.scrollHeight}px`);
  }, [text, textAreaRef]);

  return (
    <Box minHeight={parentHeight}>
      <_TextInput
        ref={textAreaRef}
        multiline
        placeholder="What’s up?"
        fontSize={30}
        as="textarea"
        style={{ fontFamily: 'IBM Plex Sans', minHeight: 220, height: textAreaHeight, fontSize: 30, outline: 'none', resize: 'none' }}
        onChange={onChangeHandler}
        rows={1}
      />
    </Box>
  );
};

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

const TwitterIcon = () => {
  return (
<svg width="18px" height="18px" viewBox="0 0 18 18" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Home" transform="translate(-58.000000, -442.000000)">
            <g id="Group-5" transform="translate(32.000000, 416.000000)">
                <g id="Group-2" transform="translate(27.000000, 27.000000)">
                    <g id="Twitter-social-icons---circle---blue-Copy" fill-rule="nonzero">
                        <g id="Dark_Blue" fill="#1B9DF0">
                            <circle id="Oval" cx="8" cy="8" r="8"></circle>
                        </g>
                        <g id="Logo__x2014__FIXED" transform="translate(3.500000, 4.500000)" fill="#FFFFFF">
                            <path d="M2.98063006,7.5 C6.56790123,7.5 8.5293742,4.61387435 8.5293742,2.11256545 C8.5293742,2.03010471 8.5293742,1.94764398 8.52532993,1.86910995 C8.9054917,1.60209424 9.23712218,1.26832461 9.5,0.887434555 C9.15219242,1.03664921 8.77607493,1.13874346 8.37973606,1.18586387 C8.78416347,0.95026178 9.09152831,0.581151832 9.23712218,0.137434555 C8.86100468,0.353403141 8.44444444,0.510471204 7.99957429,0.596858639 C7.64367816,0.227748691 7.13814389,5.58017855e-16 6.57598978,5.58017855e-16 C5.50021286,5.58017855e-16 4.62664964,0.848167539 4.62664964,1.89267016 C4.62664964,2.04188482 4.64282673,2.18717277 4.6792252,2.32460733 C3.05747126,2.2460733 1.62175394,1.4921466 0.659216688,0.345549738 C0.493401447,0.62434555 0.396338868,0.95026178 0.396338868,1.29581152 C0.396338868,1.95157068 0.740102171,2.53272251 1.26585781,2.87041885 C0.946360153,2.86256545 0.647083865,2.77617801 0.384206045,2.63481675 C0.384206045,2.64267016 0.384206045,2.65052356 0.384206045,2.65837696 C0.384206045,3.57722513 1.05555556,4.33900524 1.94934014,4.51570681 C1.78756918,4.55890052 1.61366539,4.58246073 1.43571733,4.58246073 C1.31034483,4.58246073 1.1890166,4.57068063 1.06768838,4.54712042 C1.3143891,5.30104712 2.0342699,5.84685864 2.88761175,5.86256545 C2.22030651,6.36910995 1.37909749,6.67146597 0.465091528,6.67146597 C0.307364836,6.67146597 0.153682418,6.66361257 -1.14945185e-15,6.64397906 C0.853341848,7.18586387 1.88058748,7.5 2.98063006,7.5" id="Path"></path>
                        </g>
                    </g>
                    <circle id="Oval" stroke="#FFFFFF" cx="8" cy="8" r="8.5"></circle>
                </g>
            </g>
        </g>
    </g>
</svg>
  )
}

const byteSize = str => new Blob([str]).size;

const IndexPage = () => {
  const [navOverlayOpen, setNavOverlayOpen] = useState(false);
  const [stage, setStage] = useState('write');
  const [post, setPost] = useState('');
  const { width } = useWindowViewport();
  const [copyIsHovered, setCopyIsHovered] = useState(false);
  const [copyIsClicked, setCopyIsClicked] = useState(false);
  const [error, setError] = useState(null);

  const zaddr = 'zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f';

  const memo = toBase64(unescape(encodeURIComponent(post))).replace('=', '');

  useEffect(() => {
    if (byteSize(memo) >= 512) {
      setError('Zcash memos are capped to 512 bytes, please shorten your post.');
    } else if (post?.length > 280) {
      setError('Tweets are limited to 280 characters, please shorten your post.');
    } else {
      setError(null);
    }
  }, [byteSize, memo, post]);

  return (
    <Layout>
      <SEO title="Home" />
      <Box
        height="100vh"
        width="100vw"
        bg="white"
      >
        <AppBar>
          <AppBar.MenuIcon onClick={() => { setNavOverlayOpen(!navOverlayOpen); }} />
          <AppBar.Title />
          <AppBar.Fill />
        </AppBar>
        {{
          write: (
            <>
              <Section pt={52} px={[32, 80, 0]} pb="0px">
                {/* <TextInput as="textarea"  /> */}
                <AutoTextArea onChangeText={(text) => setPost(text)}/>
                <Line bg="#E4E4E4" width="100%" mt={40} />
                {error && (
                  <Text color="red" fontSize={12} fontFamily="IBM Plex Sans" my="8px">{error}</Text>
                )}
              </Section>
              <Section pt={32} px={[32, 80, 0]}>
                {/* <Text fontSize={16} fontFamily="IBM Plex Sans" fontWeight={500} pb="8px">
                  Share to
                </Text>
                <Row>
                  <Box position="relative">
                    <Box position="absolute" bottom={0} right={12}>
                      <TwitterIcon />
                    </Box>
                    <Circle borderColor="#12BD60" borderWidth={3} size={40} mr={16} />
                  </Box>
                  <Box position="relative">
                    <Box position="absolute" bottom={0} right={12}>
                      <TwitterIcon />
                    </Box>
                    <Circle borderColor="#CFCFCF" borderWidth={1} size={40} mr={16} />
                  </Box>
                  <Circle borderColor="#CFCFCF" borderWidth={1} size={40} />
                </Row> */}
                <Row justifyContent="flex-end">
                  <Box onClick={() => (post && !error) ? setStage('zecpages') : null}>
                    <Button fontFamily="IBM Plex Serif" fontWeight={600} py="8px" px={24} style={{ cursor: 'pointer' }} borderColor={!post ? 'gray' : 'black'} color={!post ? 'gray' : 'black'}>
                      Post
                    </Button>
                  </Box>
                </Row>
              </Section>
            </>
          ),
          zecpages: (
            <>
              <Section>
                <Row justifyContent="flex-end" mb={24}>
                  <Text fontFamily="IBM Plex Sans" bold fontSize={24}>
                    1 / 2
                  </Text>
                </Row>
                <Box alignItems="center">
                  <Text fontFamily="IBM Plex Mono" fontSize={24} mb={24}>Send 0.001 ZEC to</Text>
                  <Box>
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
                    <Text as="codespan" style={{ wordBreak: 'break-all' }} fontFamily="IBM Plex Mono" fontSize={12} lineHeight={16}>{`zcash:${zaddr}?amount=0.001&memo=${memo}`}</Text>
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
                <Row justifyContent="flex-end">
                  <Button onClick={() => setStage('tweet')} fontFamily="IBM Plex Serif" fontWeight={600} py="8px" px={24}>
                    Next
                  </Button>
                </Row>
              </Section>
            </>
          ),
          tweet: (
            <>
              <Section>
                <Row justifyContent="flex-end">
                  <Text as="p" fontFamily="IBM Plex Sans" fontSize={24} mb={24} bold>
                    2 / 2
                  </Text>
                </Row>
                <Box alignItems="center">
                  <Text fontFamily="IBM Plex Sans" fontSize={24} fontWeight={600} mb={20}>Post to Twitter</Text>
                  <Text mb={80}></Text>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post)}`} target="_blank">
                    <Button borderWidth={0} mb={32} borderRadius="2px" bg="#1B9DF0" fontSize={16} fontFamily="IBM Plex Sans" color="white">
                      Tweet via Twitter.com
                    </Button>
                  </a>
                  <Row
                    bg="#F1F1F1"
                    borderRadius={4}
                    p="8px"
                    px={12}
                    mt={32}
                    alignItems="center"
                  >
                    <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post)}`} target="_blank">
                      <Text color="blue" style={{ textDecoration: 'underline', wordBreak: 'break-all' }}>
                        {`https://twitter.com/intent/tweet?text=${encodeURIComponent(post)}`}
                      </Text>
                    </a>
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
                        await copyTextToClipboard(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post)}`);
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
                  <Box mt={40}>
                    <Button onClick={() => setStage('write')} mb={40} style={{ cursor: 'pointer' }}>
                      Write New Post
                    </Button>
                  </Box>
                </Box>
              </Section>
            </>
          ),
        }[stage]}
        
        <Box
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          flex={1}
          p={40}
        >
          <Box />
          <Link to="https://github.com/macintoshhelper/microblog">
            <Button outlined={false}>
              <Button.Text color="blue" fontFamily="Helvetica" fontSize={[6, 5, 4]}>
                GitHub
                <Text bold fontSize={[6, 5, 4]}>
                  {` >`}
                </Text>
              </Button.Text>
            </Button>
          </Link>
        </Box>
      </Box>
      {/* <Footer /> */}
    </Layout>
  );
};

export default IndexPage;
