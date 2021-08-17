import React from 'react';
import { Box, Text, Row } from 'elemental-react';
import { Svg, Circle } from 'react-primitives-svg';

const Footer = () => (
  <Box alignItems="center" p={32}>
    <Row alignItems="center" mb={3}>
      {['Terms of Service', 'Privacy Policy', 'Content Policy'].map((name, i, __) => (
        <>
          <Text fontFamily="Roboto" fontSize={14}>
            {name}
          </Text>
          {i >= 0 && i < (__.length - 1) && (
            <Box px={2}>
              <Svg viewBox="0 0 100 100" height={4} width={4}>
                <Circle cx="50" cy="50" r="50"/>
              </Svg>
            </Box>
          )}
        </>
      ))}
    </Row>
    <Row>
      <Text fontFamily="Roboto" fontSize={16}>© {new Date().getFullYear()} ZPublish</Text>
    </Row>
  </Box>
);

export default Footer;
