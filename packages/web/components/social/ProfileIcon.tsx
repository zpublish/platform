import Image from 'next/image';
import { ReactNode } from 'react';
import { VStack } from '../ui/vstack';

const ProfileIcon = ({ size = 40, uri, children, ...props }: {
  size?: number, uri?: string, bg?: string, borderColor?: string, borderWidth?: string | number, children?: ReactNode
}) => (
  <>
    {uri
      ? <Image width={size} height={size} src={uri} className="rounded-[50%]" alt="Profile Image" {...props} />
      : (children
        ? (
          <VStack
            bg="white"
            alignment="center"
            className="rounded-[50%] p-1 border border-[#D2D2D2] bg-white w-10 h-10 items-center"
            {...props}
          >
            {children}
          </VStack>
        ) : <VStack className="rounded-[50%] bg-[#DEDEDE]" style={{ width: size, height: size }} {...props} />)
    }
  </>
);

export default ProfileIcon;
