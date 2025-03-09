import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import { getServerSession } from 'next-auth/next'
import { ApolloServerPluginLandingPageDisabled } from '@apollo/server/plugin/disabled';

import { authOptions } from '../auth/[...nextauth]'


import resolvers from './resolvers';
import typeDefs from '../../../graphql/schemas';
import { extractBearerToken } from '../../../utils';
import { prisma } from '../../../lib/prisma';


const server = new ApolloServer({
  resolvers,
  typeDefs,
  plugins: [ApolloServerPluginLandingPageDisabled()],
});

// const getContextFromRequest = async (req) => {
//   const apiWrapper = new APIWrapper(process.env.FLASK_API_URL);
//   const context = {
//     request: req,
//     viewer: new GuestViewer(),
//     flaskApi: apiWrapper,
//     users: new UsersAPI(apiWrapper),
//     oAuth2Client: oAuthClient,
//     token: null,
//   };
//   const token = extractBearerToken(req.headers);

//   if (token) {
//     const userMeta = await getUserFromAccessToken(token);
    
//     if (userMeta) {
//       context.flaskApi = new APIWrapper(process.env.FLASK_API_URL, token);
//       injectAuthorizedApiWrapper({ ...({ users: context.users }) }, context.flaskApi);
//       const user = await context.users.findById(userMeta, userMeta.id);

//       console.log(JSON.stringify({ user }));
//       context.viewer = new AuthenticatedViewer(user);
//       context.token = token;
//       console.log(JSON.stringify({ 'context.viewer': context.viewer }))
//     } else {
//       throw new AuthenticationError('Invalid access token');
//     }
//   }
//   // context.

//   return context;
// };

// export type GraphQLContext = Awaited<ReturnType<typeof getContextFromRequest>>;


const guestViewer = {
  isGuest: true,
  status: 'unauthenticated',
};


const getContextFromRequest = async (req, res) => {
  // const apiWrapper = new APIWrapper(process.env.FLASK_API_URL);
  const token = extractBearerToken(req.headers);
  const viewer = await getServerSession(req, res, authOptions);

  console.log({ viewer })
  const context = {
    request: req,
    prisma,
    viewer: viewer.user && { ...viewer.user, id: viewer.user.userId } || guestViewer,
    // flaskApi: apiWrapper,
    users: prisma.user,
    // oAuth2Client: oAuthClient,
    token: null,
  };
  return context;
}

export type GraphQLContext = Awaited<ReturnType<typeof getContextFromRequest>>;


export default startServerAndCreateNextHandler(server, {
    context: async (req, res) => getContextFromRequest(req, res),
  });