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

import HomeTimeline from '../components/routes/home-timeline';

const hmacSha256Base64Digest = async (body, k) => {
  let secret = k; // the secret key
  let enc = new TextEncoder("utf-8");
  let algorithm = { name: "HMAC", hash: "SHA-256" };

  let key = await crypto.subtle.importKey("raw", enc.encode(secret), algorithm, false, ["sign", "verify"]);
  let signature = await crypto.subtle.sign(algorithm.name, key, enc.encode(body));
  let digest = btoa(String.fromCharCode(...new Uint8Array(signature)));

  return digest;
}

const Home = () => {
  const viewport = useWindowViewport();
  const [navOverlayOpen, setNavOverlayOpen] = useState(false);

  useEffect(async () => {
    
  }, []);

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
          <HomeTimeline />
          {/* <Section pt="8px">
          </Section> */}
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
