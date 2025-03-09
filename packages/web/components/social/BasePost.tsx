import { extend } from '@/lib/styles';
import { Text } from '../ui/text';
import { VStack } from '../ui/vstack';

// import React from 'react';
// import { extend, Text, Box } from 'elemental-react';

// export const NameText: typeof Text = extend(Text as any, () => ({
//   fontFamily: 'Helvetica',
//   fontSize: 16,
//   lineHeight: 20,
//   bold: true,
// }));
// export const UsernameText: typeof Text = extend(Text as any, () => ({
//   fontFamily: 'Helvetica',
//   fontSize: 12,
//   color: '#737373'
// }));

const NameText = extend(Text, "font-mono font-bold text-base leading-[20px]", () => ({ bold: true }));
const UsernameText = extend(Text, "font-mono text-black dark:text-white text-[10px] leading-[12px]");


export const TextPlaceHolder = () => (
  <>
    <VStack className="bg-[#DEDEDE] h-4 w-[90%] mb-1" />
    <VStack className="bg-[#DEDEDE] h-4 w-[80%] mb-1" />
    <VStack className="bg-[#DEDEDE] h-4 w-[90%] mb-1" />
  </>
);

// export const ProfileNamesRow = ({ username, name }: { username?: string, name?: string }) => (
//   <Box>{/* @ts-ignore */}
//     <NameText mb={1}>{name}</NameText>{/* @ts-ignore */}
//     <UsernameText>{`@${username}`}</UsernameText>
//   </Box>
// );
export const AnonProfileNamesRow = ({ username, name }: { username?: string, name?: string }) => (
  <VStack alignment="leading">
    {/* <NameText color="#737373" fontWeight={500} mb={1}>{name}</NameText> */}
    <NameText className="text-black dark:text-white font-medium mb-0.5">{name}</NameText>
    <UsernameText>{`${username}`}</UsernameText>
    {/* <NameText color="#737373" fontWeight={500} mb={1}>{name}</NameText>
    <UsernameText fontFamily="primary">{`${username}`}</UsernameText> */}
  </VStack>
);

export const PostText = ({ children }: { children?: string }) => (
  <VStack alignment="leading" className="pt-1">
    {children ? (
      <Text className="text-base font-sans text-black dark:text-white" style={{ wordBreak: 'break-word' }}>
        {children}
      </Text>
    ) : <TextPlaceHolder />}
  </VStack>
);
