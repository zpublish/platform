import { mergeResolvers } from '@graphql-tools/merge';

import scalarResolver from './scalar.resolver';

import userResolver from './user.resolver';
import invoiceResolver from './invoice.resolver';
// import utilResolver from './util.resolver';
// import oAuthResolver from './oauth.resolver';

const resolvers = [
  scalarResolver,
  userResolver,
  invoiceResolver,
  // utilResolver,
  // oAuthResolver,
];

export default mergeResolvers(resolvers);
