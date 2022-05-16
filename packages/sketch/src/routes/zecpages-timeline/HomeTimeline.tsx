// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Link } from 'react-sketchapp-router';
import { Box, extend, Image, Row, Text, ThemeProvider, useTheme } from 'elemental-react';
// import { Svg, G, Path, Rect, Circle } from 'react-primitives-svg';
import { Svg, Rect, G, Path, Circle } from '@react-platform/svg';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
// import OAuth from 'oauth-1.0a';
import crypto from 'crypto';
// import fetch from 'sync-fetch/index';

import AppBar from '@zpublish/components/lib/common/AppBar';
import Footer from '@zpublish/components/lib/common/Footer';
// import Section from '@zpublish/components/lib/common/Section';
import { ZecPostFeedItem, MicroPostFeedItem, Section, } from '@zpublish/components';
import { Icon, TextInput, InputField, TruncatedZAddress, CryptoAddressCopy } from '@elemental-zcash/components';

import data from '../../../../components/data/home_timeline.json';
import zecPagesData from '../../../../components/data/zecpages_feed.json';





const TimelineFeed = () => {
  const [items, setItems] = useState(data.slice(0, 10));

  useEffect(() => {
  }, []);

  return (
    <Box>
      <Section py={16}>
        {zecPagesData.map(({ datetime, memo, id }, i) => (
          <ZecPostFeedItem key={id || `index-${i}`} createdAt={new Date(Number(datetime))} text={memo} mb={16} bg="#E9F7F9" />
        ))}
      </Section>
    </Box>
  );
};

const Home = () => {
  const { theme } = useTheme();

  return (
    <Box width="100%" minHeight={720} bg="#D0EDF1">
      {/* <Box width="100%" height={720} bg="gray" /> */}
      <AppBar bg="black" color="white">
        <Link to="/navigation">
          <AppBar.MenuIcon color="white" />
        </Link>
        <AppBar.Title fontSize={20} lineHeight={24}>
          <Text color="white" fontSize={20} lineHeight={24} bold>ZPublish</Text>
          <Text color="white" fontSize={20} lineHeight={24} fontWeight="regular"> – </Text>
          <Text color="white" fontSize={20} lineHeight={24} fontWeight="regular">ZECpages</Text>
        </AppBar.Title>
        <AppBar.Fill />
      </AppBar>
      <Box px={[32, 40]} py={20} center>
        <Text fontSize={20} fontFamily="secondary" center bold>
          {'ZEC-powered anonymous memo board '}
          <Text fontSize={20} fontFamily="secondary" color="blue">(how it works)</Text>
        </Text>
      </Box>
      <Box px={[16, 40]} mb={16}>
        <InputField label="Write your post here..." labelVisible={false}>
          {({ label, value }) => <TextInput p={16} borderColor="#313880" placeholderColor="#636363" borderWidth={2} label={label} value={value} multiline />}
        </InputField>
      </Box>
      <Box px={[16, 40]} mb={16}>
        <Box>
          <ThemeProvider theme={{ ...theme, colors: { ...theme.colors, icons: { ...theme.colors.icons, qrcode_box: '#fff' } }}}>
            <CryptoAddressCopy /*bg="#313880"*/ bg="#224259" color="white" address="zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f" />
          </ThemeProvider>
        </Box>
      </Box>
      {/* <AppBar
          bg="black"
          color="white"
          title={(
            <Text fontSize={20} lineHeight={24}>
              <Text fontSize={20} lineHeight={24} bold>ZPublish</Text>
              <Text fontSize={20} lineHeight={24} fontWeight="regular"> – </Text>
              <Text fontSize={20} lineHeight={24} fontWeight="regular">ZECpages</Text>
            </Text>
          )}
        /> */}
      <Section px="0px" py="0px">
        <TimelineFeed />
      </Section>
      {/* <Gallery images={images} />
      <Section pt="8px">
        <Gallery.InstagramButton />
      </Section> */}
      <Footer />
    </Box>
  );
};

export default Home;