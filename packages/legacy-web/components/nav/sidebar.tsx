import { Box, Text, Row, Button as _Button, Line } from 'elemental-react';
import Link from '../../components/common/Link';

export const NavItem = ({ children, ...props }) => {
  return (
    <Box mx={16} p={16} py="8px">
      <Text fontSize={16}>
        {children}
      </Text>
    </Box>
  )
}

export const Sidebar = ({ navItems }) => {
  return (
    <Box
      position="fixed"
      borderRight="1px"
      borderRightColor="greys.0"
      bg="greys.1"
      top={0}
      bottom={0}
      flex={1}
      zIndex={999}
      display={['none', 'flex']}
    >
      <Box height={64} justifyContent="center" alignItems="center" py={16} px={16}>
        <Link href="/">
          <Text as="span" fontSize={24} bold flexShrink={0}>ELEMENTAL PAY</Text>
        </Link>
      </Box>
      {navItems.map((item) => (
        <Box pt={item.items && 16}>
          {item.component || (item.items ? (
            <Box>
              <Box mx={16} px={16} mb={2}>
                <Text color="greys.6" fontFamily="secondary" fontSize={20} lineHeight={24}>{item.name}</Text>
              </Box>
              {item.items.map(({ href, name }) => (
                <Link href={href}>
                  <NavItem key={name}>
                    {name}
                  </NavItem>
                </Link>
              ))}
            </Box>
          ) : (
            <Link href={item.href}>
              <NavItem key={item.name}>
                {item.name}
              </NavItem>
            </Link>
          ))}
        </Box>
      ))}
      <Box flex={1} />
      <Line width="100%" bg="greys.3" />
      <Link href="/account">
        <NavItem>
          Account
        </NavItem>
      </Link>
    </Box>
  )
}