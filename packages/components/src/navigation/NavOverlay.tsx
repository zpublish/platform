import React from 'react';
import { Box, Text, Row } from 'elemental-react';
import { G, Rect, Svg } from 'react-primitives-svg';

import AppBar from '../common/AppBar';
import Footer from '../common/Footer';
import { CloseIcon } from '../icons';



const NavOverlay = ({ title, onMenuClick }: { title?: string, onMenuClick?: () => void }) => {
  return (
    <Box flex={1}>
      <AppBar>
        {/* <AppBar.MenuIcon onClick={onMenuClick} /> */}
        <Box onClick={onMenuClick}>
          <CloseIcon />
        </Box>
        {title ? <AppBar.Title>{title}</AppBar.Title> : <AppBar.Title />}
        <AppBar.Fill />
      </AppBar>
      <Box flex={1} justifyContent="center" alignItems="center">
        {['Home', 'Microblog', 'Videos', 'Photos', 'Articles', 'About'].map((name) => (
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
