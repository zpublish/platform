import React, { ReactNode } from 'react';
import { Box, Text, Row, Line, extend } from 'elemental-react';

const MenuIcon = ({ color = 'black', ...props }) => (
  <Box width={48} height={48} px="4px" py="6px" justifyContent="space-between" {...props}>
    {(new Array(3).fill(null)).map((_, i) => (<Line key={i} bg={color} height="4px" width="40px" />))}
  </Box>
);


const Title = extend(Text as any, () => ({
  color: 'black',
  ml: 16,
  fontFamily: 'IBM Plex Serif',
  bold: true,
  fontSize: 28,
  lineHeight: 32,
}));

// @ts-ignore
Title.defaultProps = {
  children: 'ZPublish',
};

const Flex = () => (
  <Box flex={1} />
);

const AppBar = ({
  title = 'Title',
  color,
  children,
  ...props
}: { title?: string, color?: string, children?: ReactNode }) => (
  <Row p={16} alignItems="center" justifyContent="space-between" {...props}>
    {children || (
      <>
        <MenuIcon color={color} />{/* @ts-ignore */}
        <Title color={color}>{title}</Title>
        <Flex />
    </>
    )}
    {/* <Box pr="4px">
      <ProfileIcon />
    </Box> */}
  </Row>
);
AppBar.MenuIcon = MenuIcon;
AppBar.Title = Title;
AppBar.Fill = Flex;

export default AppBar;
