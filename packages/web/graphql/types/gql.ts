/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query invoice($id: ID!) {\n    invoice(id: $id) {\n      __typename\n      ...on Invoice {\n        id\n        price\n        currency\n        status\n      }\n      ...on InvoiceNotFoundError {\n        message\n        code\n      }\n    }\n  }\n": types.InvoiceDocument,
    "\n  fragment UserInfo on User {\n    __typename\n    id\n    name\n    username\n    publicZcashaddress\n    zcashaddress\n    bio\n    # instagram\n  }\n": types.UserInfoFragmentDoc,
    "\n  fragment UserSettingsFragment on User {\n    email\n    name\n    username\n    publicZcashaddress\n    zcashaddress\n    bio\n    viewingKey\n  }\n": types.UserSettingsFragmentFragmentDoc,
    "\n  query Viewer {\n    viewer {\n      id\n      email\n      name\n      username\n      publicZcashaddress\n      zcashaddress\n      bio\n      socials {\n        instagram\n        youtube\n        twitter\n        website\n      }\n      viewingKey\n    }\n  }\n": types.ViewerDocument,
    "\n  mutation updateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      __typename\n      ...on UpdateUserSuccess {\n        user {\n          id\n          username\n          unverifiedEmail\n          isVerifiedEmail\n        }\n      }\n      ...on UpdateUserInputError {\n        message\n        code\n      }\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query user($id: ID!) {\n    user(id: $id) {\n      __typename\n      ...on User {\n        id\n        username\n        name\n        bio\n        zcashaddress\n        socials {\n          youtube\n          instagram\n          twitter\n          website\n        }\n      }\n      ...on UserNotFoundError {\n        message\n        code\n      }\n    }\n  }\n": types.UserDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query invoice($id: ID!) {\n    invoice(id: $id) {\n      __typename\n      ...on Invoice {\n        id\n        price\n        currency\n        status\n      }\n      ...on InvoiceNotFoundError {\n        message\n        code\n      }\n    }\n  }\n"): (typeof documents)["\n  query invoice($id: ID!) {\n    invoice(id: $id) {\n      __typename\n      ...on Invoice {\n        id\n        price\n        currency\n        status\n      }\n      ...on InvoiceNotFoundError {\n        message\n        code\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserInfo on User {\n    __typename\n    id\n    name\n    username\n    publicZcashaddress\n    zcashaddress\n    bio\n    # instagram\n  }\n"): (typeof documents)["\n  fragment UserInfo on User {\n    __typename\n    id\n    name\n    username\n    publicZcashaddress\n    zcashaddress\n    bio\n    # instagram\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment UserSettingsFragment on User {\n    email\n    name\n    username\n    publicZcashaddress\n    zcashaddress\n    bio\n    viewingKey\n  }\n"): (typeof documents)["\n  fragment UserSettingsFragment on User {\n    email\n    name\n    username\n    publicZcashaddress\n    zcashaddress\n    bio\n    viewingKey\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Viewer {\n    viewer {\n      id\n      email\n      name\n      username\n      publicZcashaddress\n      zcashaddress\n      bio\n      socials {\n        instagram\n        youtube\n        twitter\n        website\n      }\n      viewingKey\n    }\n  }\n"): (typeof documents)["\n  query Viewer {\n    viewer {\n      id\n      email\n      name\n      username\n      publicZcashaddress\n      zcashaddress\n      bio\n      socials {\n        instagram\n        youtube\n        twitter\n        website\n      }\n      viewingKey\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation updateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      __typename\n      ...on UpdateUserSuccess {\n        user {\n          id\n          username\n          unverifiedEmail\n          isVerifiedEmail\n        }\n      }\n      ...on UpdateUserInputError {\n        message\n        code\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation updateUser($input: UpdateUserInput!) {\n    updateUser(input: $input) {\n      __typename\n      ...on UpdateUserSuccess {\n        user {\n          id\n          username\n          unverifiedEmail\n          isVerifiedEmail\n        }\n      }\n      ...on UpdateUserInputError {\n        message\n        code\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query user($id: ID!) {\n    user(id: $id) {\n      __typename\n      ...on User {\n        id\n        username\n        name\n        bio\n        zcashaddress\n        socials {\n          youtube\n          instagram\n          twitter\n          website\n        }\n      }\n      ...on UserNotFoundError {\n        message\n        code\n      }\n    }\n  }\n"): (typeof documents)["\n  query user($id: ID!) {\n    user(id: $id) {\n      __typename\n      ...on User {\n        id\n        username\n        name\n        bio\n        zcashaddress\n        socials {\n          youtube\n          instagram\n          twitter\n          website\n        }\n      }\n      ...on UserNotFoundError {\n        message\n        code\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;