import log from 'loglevel';
// import { APIError, ErrorCodes } from '../utils';
import { GraphQLContext } from '..';
import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { MutationUpdateUserArgs, UpdateUserInput, UpdateUserMutationVariables } from '../../../../graphql/types/graphql';
import { Resolvers } from '../../../../graphql/types/resolvers';

const validUsername = (str) => {
  return str?.length <= 16;
}

const userResolvers: Resolvers = {
  User: {
    // invoice: async (parent) => {
    //   if (!parent.homePlotId) {
    //     return null;
    //   }
    //   const invoice = await Invoices.byId(parent.invoice);

    //   return invoice;
    // },
  },
  Query: {
    user: async (obj, args, context: GraphQLContext) => {
      const { id } = args;

      if (!id) {
        throw new GraphQLError('No id found');
      }

      let _user = await context.users.findUnique({ where: { id }});
      if (!_user?.id) {
        _user = await context.users.findUnique({ where: { username: id }})
      }
      if (!_user?.id) {
        return null;
      }
      const { socials, ...user } = _user;

      return {
        __typename: 'User',
        id,
        ...(_user as any),
      };
    },
    viewer: async (obj, args, context: GraphQLContext) => {
      const id = context.viewer.userId;

      const _user = await context.users.findUnique({ where: { id }});
      if (!_user?.id) { return {} }
      const { socials, ...user } = _user;

      return {
        __typename: 'User',
        id,
        ...(_user as any),
      };
    },
    // users: async (obj, args, context: GraphQLContext) => {
    //   const users = await context.users.all(context.viewer);
    //   console.log({ users });

    //   return users.map(({ users }) => users);
    // },

  },
  Mutation: {
    updateUser: async (obj, args, context) => {
      const id = args?.input?.id;
      const { username, name, bio, socials: _socials, zcashaddress, viewingKey } = args?.input?.user || {};
      const { viewer } = context;

      if (id !== viewer.userId) {
        throw new GraphQLError('Can’t edit other people’s profiles!');
      }

      if (username) {
        if (!validUsername(username)) {
          throw new GraphQLError('Maximum username length is 16 characters')
        }
        
    
        const user = await context.users.findUnique({
          where: { username },
        })
    
        if (user && user.id !== viewer.id) {
          throw new GraphQLError('That username is taken')
        }
      }
      // const socials = { instagram, youtube };
      const socials = _socials || {};
      console.log('viewer.id: ', viewer.userId);

      const foundUser = await context.users.findUnique({ where: { id: viewer.userId }});
      console.log({ foundUser })

      const user = await context.users.update({
        where: { id: viewer.userId },
        data: { username, name, bio, socials, zcashaddress, viewingKey }
      });

      return {
        __typename: 'UpdateUserSuccess',
        user: user as any,
      }
    },
  }
}

export default userResolvers;
