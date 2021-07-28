import React from 'react';
import {
  Box, Headline,
} from 'elemental-react';

const SectionTitle = (props: any) => (
  <Headline.H5 name="SectionTitle" mb={3} bold {...props} />
);

const Section = ({ p = [16, 40, 0], pt = 40, pb = 40, children, ...props }: any) => (
  <Box
    as="section"
    p={p}
    pt={pt}
    pb={pb}
    {...props}
  >
    <Box
      width="100%"
      maxWidth={1024}
      alignSelf="center"
    >
      {children}
    </Box>
  </Box>
);

Section.Title = SectionTitle;

export default Section;
