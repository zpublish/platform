import { mergeTypeDefs } from '@graphql-tools/merge';

import interfaces from './interface.types';
import userTypes from './user.types';
import invoiceTypes from './invoice.types';
import utilTypes from './util.types';

const types = [
  interfaces,
  userTypes,
  invoiceTypes,
  utilTypes,
];

// NOTE: 2nd param is optional, and defaults to false
// Only use if you have defined the same type multiple times in
// different files and wish to attempt merging them together.
// @ts-ignore
export default mergeTypeDefs(types, { all: true });
