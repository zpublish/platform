import React from 'react';
import { Box, Text, Row } from 'elemental-react';
import { G, Rect, Svg } from 'react-primitives-svg';

import AppBar from '../common/AppBar';
import Footer from '../common/Footer';

const CloseIcon = () => (
  <Svg width="48px" height="48px" viewBox="0 0 48 48">
    <G stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <G transform="translate(-16.000000, -16.000000)">
        <G transform="translate(16.000000, 16.000000)">
          <Rect x="0" y="0" width="48" height="48" />
          <G transform="translate(24.000000, 24.000000) rotate(-315.000000) translate(-24.000000, -24.000000) translate(4.000000, 22.000000)" fill="#000000">
            <Rect x="0" y="0" width="40" height="4" />
          </G>
          <G transform="translate(8.443651, 8.443651)" fill="#000000">
            <Rect transform="translate(15.556349, 15.556349) rotate(-45.000000) translate(-15.556349, -15.556349) " x="-4.44365081" y="13.5563492" width="40" height="4" />
          </G>
        </G>
      </G>
    </G>
  </Svg>
);

const NavOverlay = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  console.log({ onMenuClick });

  return (
    <Box flex={1}>
      <AppBar>
        {/* <AppBar.MenuIcon onClick={onMenuClick} /> */}
        <Box onClick={onMenuClick}>
          <CloseIcon />
        </Box>
        <AppBar.Title />
        <AppBar.Fill />
      </AppBar>
      <Box flex={1} justifyContent="center" alignItems="center">
        {['Home', 'Instagram', 'About', 'Contact'].map((name) => (
          <Box p={20}>
            <Text color="black" fontSize={32} fontFamily="Roboto" bold>
              {name?.toUpperCase()}
            </Text>
          </Box>
        ))}
      </Box>
      <Footer />
    </Box>
  );
};

export default NavOverlay;
