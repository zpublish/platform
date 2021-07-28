import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import { Box, Row, Text } from 'elemental-react';

import Gallery from '../../../components/src/common/Gallery';

import Layout from '../components/layout';
import SEO from '../components/seo';
import useWindowViewport from '../hooks/use-window-viewport';
import AppBar from '../../../components/lib/common/AppBar';
import NavOverlay from '../../../components/lib/overlays/NavOverlay';
import Section from '../../../components/lib/common/Section';
import Footer from '../../../components/lib/common/Footer';


const Home = () => {
  const viewport = useWindowViewport();
  const [navOverlayOpen, setNavOverlayOpen] = useState(false);

  return (
    <Layout>
      <SEO title="Home | Microblog App" />
      {/* <Box width="100vw"> */}
      <Box bg="white" minHeight={viewport.height} width="100%">
        <Box bg="white">
          <AppBar>
            <AppBar.MenuIcon onClick={() => { setNavOverlayOpen(!navOverlayOpen); }} />
            <AppBar.Title />
            <AppBar.Fill />
          </AppBar>
          <Section pt="8px">
            <a href="./compose/post">
              <Gallery.InstagramButton>
                Create Post
              </Gallery.InstagramButton>
            </a>
          </Section>
          <Footer />
          {navOverlayOpen && (
            <Box position="fixed" bg="white" width="100vw" height="100vh">
              <NavOverlay onMenuClick={() => { setNavOverlayOpen(!navOverlayOpen); }} />
            </Box>
          )}
        </Box>
      </Box>
      {/* </Box> */}
    </Layout>
  );
}

export default Home;
