import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import { Text } from 'elemental-react';

import { Button } from '@elemental-zcash/components';

import Link from '../common/Link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '../common/DropdownMenu';
import { useQuery } from '@apollo/client';
import { graphql } from '../../graphql/types';

const labels = {
  profile: 'Profile',
  settings: 'Settings',
};

const GET_VIEWER_QUERY = graphql(`
  query Viewer {
    viewer {
      id
      email
      name
      username
      publicZcashaddress
      zcashaddress
      bio
      socials {
        instagram
        youtube
        twitter
        website
      }
      viewingKey
    }
  }
`);

export function ProfileDropdownMenu({ children }) {
  const { loading, data, error, client } = useQuery(GET_VIEWER_QUERY);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          <Text mt={2}>My Account</Text>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {[
            data?.viewer?.id ? { id: 'profile', href: `/user/${data?.viewer?.id}`, icon: <User className="mr-2 h-4 w-4" /> } : null,
            { id: 'settings', href: '/profile/settings', icon: <Settings className="mr-2 h-4 w-4" />,
          }].filter(item => Boolean(item?.id)).map(({ id, icon, href }: { id: string, icon: any, href: string }) => (
            <Link key={id} href={href}>
              <DropdownMenuItem className="flex-1">
                {icon}
                <Text as="span" flex={1}>{labels[id]}</Text>
                {/* <span>{labels[id]}</span> */}
              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
            </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
