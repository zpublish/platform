import log from 'loglevel';
// import { APIError, ErrorCodes } from '../utils';
import { GraphQLContext } from '..';
import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { CurrencyCode, MutationUpdateUserArgs, UpdateUserInput, UpdateUserMutationVariables } from '../../../../graphql/types/graphql';
import { Resolvers } from '../../../../graphql/types/resolvers';


const userResolvers: Resolvers = {
  Query: {
    invoice: async (obj, args, context: GraphQLContext) => {
      const { id } = args;

      if (!id) {
        throw new GraphQLError('No id found');
      }


      // GET WALLET_ID - fetch(`http://zec_rpc_gateway:5000/wallet/${address}`)
      // { wallet_id } = res.json()
      // fetch(`http://zec_rpc_gateway:5000/rpc/${wallet_id}`)

      const invoice = { status: '', price: 1, currency: CurrencyCode.Zec }

      return {
        __typename: 'Invoice',
        id,
        ...invoice,
      };
    },
    // users: async (obj, args, context: GraphQLContext) => {
    //   const users = await context.users.all(context.viewer);
    //   console.log({ users });

    //   return users.map(({ users }) => users);
    // },

  },
  Mutation: {
    createInvoice: async (obj, args, context) => {
      // GET WALLET_ID - fetch(`http://zec_rpc_gateway:5000/wallet/${address}`)
      // if wallet doesn't exist
        // POST `wallets` { address, ufvk }

      // result - will be init'd already


      return {
        __typename: 'Invoice',
        id: '',
        price: 1,
      };
    },
    deleteInvoice: async (obj, args, context) => {
      
    },
    updateInvoice: async (obj, args, context) => {
      const id = args?.input?.id;
      const { price } = args?.input?.invoice || {};
      const { viewer } = context;

      if (id !== viewer.userId) {
        throw new GraphQLError('Can’t edit other people’s invoices!');
      }

      const invoice = { id, status: '', price: 1, currency: CurrencyCode.Zec }

      // }
      // // const socials = { instagram, youtube };
      // const socials = _socials || {};
      // console.log('viewer.id: ', viewer.userId);

      // const foundUser = await context.users.findUnique({ where: { id: viewer.userId }});
      // console.log({ foundUser })

      // const user = await context.users.update({
      //   where: { id: viewer.userId },
      //   data: { username, name, bio, socials, zcashaddress, viewingKey }
      // });

      return {
        __typename: 'Invoice',
        ...invoice,
      }
    },
  }
}

export default userResolvers;
