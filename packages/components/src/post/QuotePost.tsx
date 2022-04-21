import React, { ReactNode } from 'react';
import { Box, Row, Text } from 'elemental-react';
import { NameText, UsernameText } from './BasePost';
import { getTimeAgo } from '../utils/time';
import ProfileIcon from '../profile/ProfileIcon';

type User = {
  [key: string]: any
};

const QuotePost = ({ user, createdAt, text }: { user?: User, createdAt: Date, text?: ReactNode }) => (
  <Box borderRadius="6px" borderColor="#B5B5B5" borderWidth={1} p={12} mt={16}>
    <Row justifyContent="space-between">
      <Row>
        <ProfileIcon size={24} uri={user?.profile_image_url_https} />
        <Box ml="8px">
          <NameText>{user?.name}</NameText>
          <UsernameText>{`@${user?.screen_name}`}</UsernameText>
        </Box>
      </Row>
      <Text fontFamily="Helvetica" fontSize={16}>{getTimeAgo(createdAt)}</Text>
    </Row>
    <Text mt="8px">{text}</Text>
  </Box>
);

export default QuotePost;
