import React from 'react';
import { Box, Text, Row } from 'elemental-react'; // @ts-ignore
import { Icon } from '@elemental-zcash/components';
import { ShieldIcon } from '@elemental-zcash/icons';

import ProfileIcon from '../../profile/ProfileIcon';
import { AnonProfileNamesRow, PostText } from '../BasePost';
import { getTimeAgo } from '../../utils/time';

const ZecPostFeedItem = ({
  username, name, createdAt, inReplyToStatusId, isRepliedTo, text, ...props
}: {
  username?: string,
  name?: string,
  createdAt?: Date,
  inReplyToStatusId?: string,
  isRepliedTo?: boolean,
  text?: string,
}) => (
  <Box bg="white" borderRadius={12} {...props}>
    <Box py={12} px={[16, 40]}>
      <Row justifyContent="space-between" flex={1}>
        <Box mr={12} alignItems="center">
          {inReplyToStatusId && <Box width="2px" height={32} bg="#B5B5B5" mb={2} />}
          <ProfileIcon size={40} /*bg="#F7F7F7"*/ bg="white" borderColor="#D9D9D9" borderWidth={1}>
            <Icon icon={ShieldIcon} color="primary" />  
          </ProfileIcon>  
          {isRepliedTo && <Box width="2px" flex={1} bg="#B5B5B5" mb={2} />}
        </Box>
        <AnonProfileNamesRow username={username || 'zs*****'} name={name || 'ANONYMOUS'} />
        <Box flex={1} />
        {/* <Box>
          <NameText mb={1}>{user.name}</NameText>
          <UsernameText>{`@${user.screen_name}`}</UsernameText>
        </Box> */}
        {/* <Box flex={1} /> */}
        {createdAt && <Text fontFamily="Helvetica" fontSize={16}>{getTimeAgo(createdAt)}</Text>}
      </Row>
      <Box pt={16}>
        <PostText text={text} />
      </Box>
    </Box>
  </Box>
);

export default ZecPostFeedItem;
