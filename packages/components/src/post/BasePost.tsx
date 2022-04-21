import React from 'react';
import { extend, Text, Box } from 'elemental-react';

export const NameText: typeof Text = extend(Text as any, () => ({
  fontFamily: 'Helvetica',
  fontSize: 16,
  lineHeight: 20,
  bold: true,
}));
export const UsernameText: typeof Text = extend(Text as any, () => ({
  fontFamily: 'Helvetica',
  fontSize: 12,
  color: '#737373'
}));

export const TextPlaceHolder = () => (
  <>
    <Box bg="#DEDEDE" height={16} width="90%" mb="4px" />
    <Box bg="#DEDEDE" height={16} width="80%" mb="4px" />
    <Box bg="#DEDEDE" height={16} width="90%" mb="4px" />
  </>
);

export const ProfileNamesRow = ({ username, name }: { username?: string, name?: string }) => (
  <Box>{/* @ts-ignore */}
    <NameText mb={1}>{name}</NameText>{/* @ts-ignore */}
    <UsernameText>{`@${username}`}</UsernameText>
  </Box>
);
export const AnonProfileNamesRow = ({ username, name }: { username?: string, name?: string }) => (
  <Box>{/* @ts-ignore */}
    <NameText color="#737373" fontWeight={500} mb={1}>{name}</NameText>{/* @ts-ignore */}
    <UsernameText fontFamily="primary">{`${username}`}</UsernameText>
  </Box>
);

export const PostText = ({ text }: { text?: string }) => (
  <Box pt="4px">
    {text ? (
      <Text fontSize={16} fontFamily="Helvetica">
        {text}
      </Text>
    ) : <TextPlaceHolder />}
  </Box>
);
