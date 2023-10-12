import NextAuth from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
import { OAuthConfig } from 'next-auth/providers';

import DataAdapter from '../../../lib/adapters/data.adapter';
import { prisma } from '../../../lib/prisma';

type OAuthProfile = { sub: string, username?: string, name?: string, email?: string, image?: string };

const ElementalSSOProvider = ({ oAuthUrl, ssoApiOauthUrl }): OAuthConfig<OAuthProfile> => ({
  id: 'elemental-sso',
  name: 'Elemental SSO',
  type: 'oauth',
  authorization: `${oAuthUrl}/oauth/authorize`,
  // token: `${oAuthUrl}/oauth/token`,
  token: `${oAuthUrl}/oauth/token`,
  userinfo: `${ssoApiOauthUrl}/api/userinfo`,
  clientId: process.env.NEXT_PUBLIC_SSO_CLIENT_ID,
  clientSecret: process.env.ELEMENTAL_SSO_CLIENT_SECRET,
  profile(profile) {
    return {
      id: profile.sub,
      uuid: profile.sub,
      name: profile?.name,
      username: profile?.username,
      email: profile?.email,
      image: profile?.image,
    }
  },
})

export const authOptions = {
  // signIn: '/auth/login',
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),

    ElementalSSOProvider({
      oAuthUrl: process.env.SSO_OAUTH_URL || 'https://elemental-sso.local',
      ssoApiOauthUrl: process.env.SSO_API_OAUTH_URL,
    }),
    // ...add more providers here
  ],
  adapter: DataAdapter(),
  debug: true,
  callbacks: {
    async signIn({ account, user }) {
      // const { email_verified } = profile;
      if (account?.provider === 'elemental-sso') {
        return true;
      }
      return false;
    },
    async session({ session, token, user }) {
      let accessToken;
      const fullUser = await prisma.account.findFirst({
        where: {
          id: user.userId,
        },
      });
      if (fullUser) {
        accessToken = fullUser.access_token!;
      }
      session.user = fullUser;
      // console.log({ session, token, user })
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = accessToken
      // session.user.id = token.id
      session.loggedIn = true;
      
      return session
    }
  }
}

export default NextAuth(authOptions)
