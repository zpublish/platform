import React, { ReactNode } from 'react';
import { Box, Image } from 'elemental-react';

const ProfileIcon = ({ size = 40, uri, children, ...props }: {
  size?: number, uri?: string, bg?: string, borderColor?: string, borderWidth?: string | number, children?: ReactNode
}) => (
  <>
    {uri
      ? <Image width={size} height={size} borderRadius="50%" src={uri} {...props} />
      : (children
        ? (
          <Box
            borderRadius="50%"
            bg="white"
            justifyContent="center"
            alignItems="center" // @ts-ignore
            p="4px"
            size={size}
            {...props}
          >
            {children}
          </Box>
        ) : <Box borderRadius="50%" width={size} height={size} bg="#DEDEDE" size={size} {...props} />)
    }
  </>
);

export default ProfileIcon;
