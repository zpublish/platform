import React from 'react';

import { Box, Text, useWindowDimensions } from 'elemental-react';

import AppBar from '@zpublish/components/lib/common/AppBar';
import Section from '@zpublish/components/lib/common/Section';
import Footer from '@zpublish/components/lib/common/Footer';
// @ts-ignore
// import QrCode from '../../../../components/lib/qrcode';
import { QRCode } from '@elemental-zcash/components';

import { Link } from 'react-sketchapp-router';



const a = async () => {
  console.log('a');
}

const Home = () => {
  const { width } = useWindowDimensions();

  const zaddr = 'zs1j29m7zdhhyy2eqrz89l4zhk0angqjh368gqkj2vgdyqmeuultteny36n3qsm47zn8du5sw3ts7f';
  const memo = '';

  return (
    <Box>
      {/* <Box width="100%" height={720} bg="gray" /> */}
      <AppBar>
        <Link to="/navigation">
          <AppBar.MenuIcon />
        </Link>
        <AppBar.Title />
        <AppBar.Fill />
      </AppBar>
      <Section pt="8px">
        <Box alignItems="center">
          <Text fontFamily="IBM Plex Mono" fontSize={24} mb={24}>Send 0.001 ZEC to</Text>
          <QRCode
            bgColor="#ffffff"
            fgColor="#000000"
            includeMargin={true}
            size={(width - 32) * 0.8}
            value={`zcash:${zaddr}?amount=0.001&memo=${memo}`}
          />
        </Box>
      </Section>
      <Box flex={1} />
      <Footer />
    </Box>
  );
};

export default Home;