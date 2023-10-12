import React, { FC } from 'react';
import { styled, Box, extend, Text, Row } from 'elemental-react';
import Link from '../common/Link';
import { config } from '../../config';
import useIsLoggedIn from '../../lib/hooks/use-is-logged-in';
import { AccountCircle } from '../icons';

// const NavContainer = styled(Box)`
//   position: sticky;
//   top: 0;
//   z-index: 99;
//   width: 100%;
// `;
const NavContainer = extend(Box, {
  position: 'sticky',
  top: '0px',
  zIndex: 99,
  width: '100%',
});

const StyledNav = extend(Box, {
  height: 64,
  py: 16,
  px: 16,
  justifyContent: 'center',
  bg: 'greys.1',
  as: 'nav'
});

// const HomeLogo = () =>

const NavContent = extend(Row, {
  width: '100%',
  // alignItems: ['center', 'initial'],
  alignItems: 'center',
  justifyContent: ['center', 'initial'],
});

const LeftItems = extend(Row, {
  flex: 1,
});

const RightItems = extend(Row, {
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
});

export interface Props {
  // clientId: string,
  showLogo?: boolean,
};

const Nav: FC<Props> = ({ showLogo }) => {
  const isLoggedIn = useIsLoggedIn();

  const clientId = config.SSO_CLIENT_ID;

  return (
    <NavContainer>{/* @ts-ignore */}
      <StyledNav>
        <NavContent>
          {showLogo && (
            <Link href="/">
              <Text as="span" fontSize={24} bold flexShrink={0}>ZPublish</Text>
            </Link>
          )}
          <Row
            justifyContent="space-between"
            width="100%"
            display={['none', 'flex']}
            // display={{ base: "none", lg: "flex" }}
          >
            <LeftItems />
            <RightItems>
              {isLoggedIn ? (
                <>
                  <Box height={40} width={40} alignItems="center" justifyContent="center">
                    <AccountCircle size={40} color="gray" />
                  </Box>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                  >
                    <Box p={16}>
                      <Text>LOGIN</Text>
                    </Box>
                  </Link>
                  <Link
                    // href="http://127.0.0.1:3000/auth/signup"
                    // href={`http://elemental-sso.local/auth/signup?callback_uri=https://elemental-pay.local/auth/callback&scope=profile`}
                    href="/auth/signup"
                  >
                    <Box p={16}>
                      <Text>SIGNUP</Text>
                    </Box>
                  </Link>
                </>
              )}
              {/* <Text>Menu</Text> */}
            </RightItems>
          </Row>
          {/* <MobileNavMenu
            isMenuOpen={isMenuOpen}
            isDarkTheme={isDarkTheme}
            toggleMenu={toggleMenu}
            toggleTheme={toggleColorMode}
            toggleSearch={toggleSearch}
            linkSections={mobileLinkSections}
            fromPageParameter={fromPageParameter}
          /> */}
        </NavContent>
      </StyledNav>
    </NavContainer>
  )
}

export default Nav;
