import log from 'loglevel';
import fetch from 'node-fetch';
// import { APIError, ErrorCodes } from '../utils';
import { GraphQLContext } from '..';
import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';
import { CurrencyCode, MutationUpdateUserArgs, UpdateUserInput, UpdateUserMutationVariables } from '../../../../graphql/types/graphql';
import { Resolvers } from '../../../../graphql/types/resolvers';

enum InvoiceStatus {
  NEW = 'new',
  PAID = 'paid',
  EXPIRED = 'expired',
  // complete = 'complete',
  INVALID = 'invalid',
};

const ZEC_RPC_GATEWAY_HOSTNAME = process.env.ZEC_RPC_GATEWAY_HOSTNAME;

const getWalletStatus = async ({ walletId, params = [] }) => {
  const jsonRpcRequest = {
    jsonrpc: '2.0',
    method: 'transactions',
    params: params || [],
    id: 1, // Use any unique identifier for the request ID
  };

  try {
    const response = await fetch(`${ZEC_RPC_GATEWAY_HOSTNAME}/api/rpc/${walletId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonRpcRequest),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const jsonRpcResponse = await response.json();
    return jsonRpcResponse;
  } catch (error) {
    console.error('Error making JSON-RPC request:', error.message);
    throw error;
  }

}

type TransactionsResult = {
  address: string,
  amount: number,
  confirmations: number,
  detailedTxns: any[],
  position: number,
  time: number,
  txid: number,
  type: string,
  zecPrice: number | null,
}[];

const userResolvers: Resolvers = {
  Query: {
    // getInvoicesByAddress: async (obj, args, context: ) => {},
    invoice: async (obj, args, context: GraphQLContext) => {
      const { id } = args;

      if (!id) {
        throw new GraphQLError('No id found');
      }
      const invoiceRes = context.prisma.invoice.findUnique({ where: { id }});
      const invoice = await invoiceRes;
      const user = await invoiceRes.user();
      if (!invoice?.walletId || !user?.zcashaddress) {
        return null;
      }

      // const wallet = await fetch(`${ZEC_RPC_GATEWAY_HOSTNAME}/wallet/${user?.zcashaddress}`)
      const wallet: { id?: number, jsonrpc: '2.0', result: TransactionsResult } = await getWalletStatus({ walletId: invoice.walletId });

      console.log({ result: wallet.result, walletId: invoice.walletId, 'user.zcashaddress': user.zcashaddress, 'invoice.amount': invoice.amount });
      const paid = wallet.result.some(({ address, amount }) => {
        if (address === user.zcashaddress && (amount === Number(invoice.amount))) {
          return true;
        }
        return false;
      })
      // return null as any;

      // GET WALLET_ID - fetch(`${ZEC_RPC_GATEWAY_HOSTNAME}/wallet/${address}`)
      // { wallet_id } = res.json()
      // fetch(`${ZEC_RPC_GATEWAY_HOSTNAME}/rpc/${wallet_id}`)

      // const invoice = { status: '', price: 1, currency: CurrencyCode.Zec }

      return {
        __typename: 'Invoice',
        // ...invoice,
        id,
        price: Number(invoice.amount),
        currency: CurrencyCode.Zec,
        status: paid ? 'paid' : 'new',
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
      const { address, price, currency } = args?.input;

      const user = await context.users.findFirst({ where: { zcashaddress: address }});
      if (!user) {
        throw new Error('Address not found');
      }
      if (!user.viewingKey) {
        return null;
      }
      const walletRes = await fetch(`${ZEC_RPC_GATEWAY_HOSTNAME}/api/wallets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // You may need to include additional headers based on your API requirements
        },
        body: JSON.stringify({ address, ufvk: user.viewingKey })
      })
      let wallet: { error?: string, code?: string, wallet_id?: string } | null = null;
      try {
        wallet = await walletRes.json();
      } catch(err) {
        console.log({ walletRes, err });
      }
      if (wallet?.error && wallet?.code === 'WALLET_EXISTS') {
        if (!wallet.wallet_id) {
          throw new Error("Couldn't find wallet");
        }
        /*
        TODO: Decide whether to implement this for session to restore invoice
        const res = await context.prisma.invoice.findFirst({ where: { walletId: wallet.wallet_id, amount: String(price) }});
        if (res) {
          return {
            __typename: 'Invoice',
            id: res.id,
            price: price,
            status: InvoiceStatus.NEW, // FIXME:
          }
        }
        */
      }
      console.log({ wallet })
      const wallet_id = wallet?.wallet_id;
      if (!wallet_id) {
        throw new Error("Couldn't create wallet");
      }

      const res = await context.prisma.invoice.create({
        data: {
          userId: user.id,
          currency,
          amount: String(price),
          walletId: wallet_id,
        },
      });

      console.log({ res });
      // GET WALLET_ID - fetch(`${ZEC_RPC_GATEWAY_HOSTNAME}/wallet/${address}`)
      // if wallet doesn't exist
        // POST `wallets` { address, ufvk }

      // result - will be init'd already

      if (!res?.id) {
        throw new Error('Failed to create invoice')
      }

      return {
        __typename: 'Invoice',
        id: res.id,
        price: price,
        status: InvoiceStatus.NEW,
      };
    },
    // deleteInvoice: async (obj, args, context) => {
      
    // },
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
