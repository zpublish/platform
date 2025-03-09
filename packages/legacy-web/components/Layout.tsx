import React from 'react';
import { Box, Text } from 'elemental-react';

import Nav from './nav';

const Footer = () => (
  <Box height={200} flexShrink={0} width="100%" bg="greys.1" alignItems="center" justifyContent="center">
    <Text color="greys.6">Elemental Pay</Text>
  </Box>
)

const Layout = ({ children, showFooter = true, showLogo = true, ...props }) => {
  return (
    <Box flex={1} width="100%" minHeight="100vh">
      <Nav showLogo={showLogo} />
      <Box flex={1}>
        {children}
      </Box>
      {showFooter && <Footer />}
    </Box>
  );
};

export default Layout;
