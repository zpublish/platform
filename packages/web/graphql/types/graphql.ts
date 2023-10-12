/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type Actor = {
  id: Scalars['ID']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export enum CurrencyCode {
  Zec = 'ZEC'
}

export type DeleteResponse = Response & {
  __typename?: 'DeleteResponse';
  code?: Maybe<Scalars['String']['output']>;
  errorCode?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type EncryptedZcashMemoMessage = {
  __typename?: 'EncryptedZcashMemoMessage';
  message?: Maybe<Scalars['String']['output']>;
};

export type Error = {
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type Invoice = {
  __typename?: 'Invoice';
  currency?: Maybe<CurrencyCode>;
  id: Scalars['ID']['output'];
  invoiceId?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  status?: Maybe<Scalars['String']['output']>;
};

export type InvoiceInput = {
  currency: CurrencyCode;
  price: Scalars['Float']['input'];
};

export type InvoiceNotFoundError = Error & {
  __typename?: 'InvoiceNotFoundError';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type InvoiceResult = Invoice | InvoiceNotFoundError;

export type LoginError = Error & {
  __typename?: 'LoginError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type LoginInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};

export type LoginResponse = LoginError | LoginSuccess;

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  accessToken: Scalars['String']['output'];
  expiresIn?: Maybe<Scalars['Date']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  tokenType?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type LoginWithZcashResult = {
  __typename?: 'LoginWithZcashResult';
  message?: Maybe<Scalars['String']['output']>;
};

export type MockResponse = {
  __typename?: 'MockResponse';
  mock?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createInvoice?: Maybe<Invoice>;
  deleteUser?: Maybe<DeleteResponse>;
  login?: Maybe<LoginResponse>;
  loginWithZcash?: Maybe<LoginWithZcashResult>;
  resetDatabase?: Maybe<DeleteResponse>;
  sendPasswordResetEmail?: Maybe<Scalars['Boolean']['output']>;
  sendVerificationEmail?: Maybe<Scalars['Boolean']['output']>;
  sendZcashVerificationToken?: Maybe<EncryptedZcashMemoMessage>;
  /** createUser(input: CreateUserInput!): CreateUserResponse */
  signup?: Maybe<SignupResponse>;
  updateInvoice?: Maybe<Invoice>;
  updateUser?: Maybe<UpdateUserResponse>;
  verifyEmail?: Maybe<Scalars['Boolean']['output']>;
  verifyUser?: Maybe<VerifyUserResponse>;
  verifyZcashAddress?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateInvoiceArgs = {
  input: InvoiceInput;
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationLoginWithZcashArgs = {
  input: LoginInput;
};


export type MutationSendPasswordResetEmailArgs = {
  address: Scalars['String']['input'];
};


export type MutationSendVerificationEmailArgs = {
  address: Scalars['String']['input'];
};


export type MutationSendZcashVerificationTokenArgs = {
  address: Scalars['String']['input'];
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdateInvoiceArgs = {
  input: UpdateInvoiceInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerifyUserArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerifyZcashAddressArgs = {
  token: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getVerificationMessage?: Maybe<Scalars['String']['output']>;
  invoice?: Maybe<InvoiceResult>;
  user?: Maybe<UserResult>;
  userByUsername?: Maybe<UserResult>;
  users?: Maybe<Array<Maybe<User>>>;
  viewer?: Maybe<User>;
};


export type QueryGetVerificationMessageArgs = {
  address: Scalars['String']['input'];
};


export type QueryInvoiceArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryUserByUsernameArgs = {
  name: Scalars['String']['input'];
};

export type Response = {
  code?: Maybe<Scalars['String']['output']>;
  errorCode?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SignupError = Error & {
  __typename?: 'SignupError';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

/**
 * input CreateUserInput {
 *   id: ID!
 *   name: String!
 * }
 *
 * type CreateUserSuccess {
 *   user: User!
 * }
 * type CreateUserInputError implements Error {
 *   message: String!
 *   code: String
 * }
 *
 * union CreateUserResponse =
 *   CreateUserSuccess
 *   | CreateUserInputError
 */
export type SignupInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
  zcashaddress?: InputMaybe<Scalars['String']['input']>;
};

export type SignupResponse = SignupError | SignupSuccess;

export type SignupSuccess = {
  __typename?: 'SignupSuccess';
  code: Scalars['String']['output'];
  user: User;
};

export type SystemUser = Actor & {
  __typename?: 'SystemUser';
  id: Scalars['ID']['output'];
  username: Scalars['String']['output'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
};

export type UpdateInvoiceInput = {
  id: Scalars['ID']['input'];
  invoice?: InputMaybe<InvoiceInput>;
};

export type UpdateUserInput = {
  id: Scalars['ID']['input'];
  user?: InputMaybe<UserInput>;
};

export type UpdateUserInputError = Error & {
  __typename?: 'UpdateUserInputError';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type UpdateUserResponse = UpdateUserInputError | UpdateUserSuccess;

export type UpdateUserSuccess = {
  __typename?: 'UpdateUserSuccess';
  user: User;
};

export type User = Actor & {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isVerifiedEmail?: Maybe<Scalars['Boolean']['output']>;
  joinedOn?: Maybe<Scalars['Date']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  publicZcashaddress?: Maybe<Scalars['String']['output']>;
  socials?: Maybe<UserSocials>;
  unverifiedEmail?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
  viewingKey?: Maybe<Scalars['String']['output']>;
  zcashaddress?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  bio?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  socials?: InputMaybe<UserSocialsInput>;
  username?: InputMaybe<Scalars['String']['input']>;
  viewingKey?: InputMaybe<Scalars['String']['input']>;
  zcashaddress?: InputMaybe<Scalars['String']['input']>;
};

export type UserNotFoundError = Error & {
  __typename?: 'UserNotFoundError';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type UserResult = User | UserNotFoundError;

export type UserSocials = {
  __typename?: 'UserSocials';
  instagram?: Maybe<Scalars['String']['output']>;
  twitter?: Maybe<Scalars['String']['output']>;
  website?: Maybe<Scalars['String']['output']>;
  youtube?: Maybe<Scalars['String']['output']>;
};

export type UserSocialsInput = {
  instagram?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
  website?: InputMaybe<Scalars['String']['input']>;
  youtube?: InputMaybe<Scalars['String']['input']>;
};

export type VerifyUserError = Error & {
  __typename?: 'VerifyUserError';
  code?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type VerifyUserResponse = VerifyUserError | VerifyUserSuccess;

export type VerifyUserSuccess = {
  __typename?: 'VerifyUserSuccess';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type InvoiceQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type InvoiceQuery = { __typename?: 'Query', invoice?: { __typename: 'Invoice', id: string, price: number, currency?: CurrencyCode | null, status?: string | null } | { __typename: 'InvoiceNotFoundError', message: string, code?: string | null } | null };

export type UserInfoFragment = { __typename: 'User', id: string, name?: string | null, username?: string | null, publicZcashaddress?: string | null, zcashaddress?: string | null, bio?: string | null } & { ' $fragmentName'?: 'UserInfoFragment' };

export type UserSettingsFragmentFragment = { __typename?: 'User', email?: string | null, name?: string | null, username?: string | null, publicZcashaddress?: string | null, zcashaddress?: string | null, bio?: string | null, viewingKey?: string | null } & { ' $fragmentName'?: 'UserSettingsFragmentFragment' };

export type ViewerQueryVariables = Exact<{ [key: string]: never; }>;


export type ViewerQuery = { __typename?: 'Query', viewer?: { __typename?: 'User', id: string, email?: string | null, name?: string | null, username?: string | null, publicZcashaddress?: string | null, zcashaddress?: string | null, bio?: string | null, viewingKey?: string | null, socials?: { __typename?: 'UserSocials', instagram?: string | null, youtube?: string | null, twitter?: string | null, website?: string | null } | null } | null };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename: 'UpdateUserInputError', message: string, code?: string | null } | { __typename: 'UpdateUserSuccess', user: { __typename?: 'User', id: string, username?: string | null, unverifiedEmail?: string | null, isVerifiedEmail?: boolean | null } } | null };

export type UserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename: 'User', id: string, username?: string | null, name?: string | null, bio?: string | null, zcashaddress?: string | null, socials?: { __typename?: 'UserSocials', youtube?: string | null, instagram?: string | null, twitter?: string | null, website?: string | null } | null } | { __typename: 'UserNotFoundError', message: string, code?: string | null } | null };

export const UserInfoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"publicZcashaddress"}},{"kind":"Field","name":{"kind":"Name","value":"zcashaddress"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}}]}}]} as unknown as DocumentNode<UserInfoFragment, unknown>;
export const UserSettingsFragmentFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserSettingsFragment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"publicZcashaddress"}},{"kind":"Field","name":{"kind":"Name","value":"zcashaddress"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"viewingKey"}}]}}]} as unknown as DocumentNode<UserSettingsFragmentFragment, unknown>;
export const InvoiceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"invoice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoice"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Invoice"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"currency"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"InvoiceNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<InvoiceQuery, InvoiceQueryVariables>;
export const ViewerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"viewer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"publicZcashaddress"}},{"kind":"Field","name":{"kind":"Name","value":"zcashaddress"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"youtube"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"website"}}]}},{"kind":"Field","name":{"kind":"Name","value":"viewingKey"}}]}}]}}]} as unknown as DocumentNode<ViewerQuery, ViewerQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserSuccess"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"unverifiedEmail"}},{"kind":"Field","name":{"kind":"Name","value":"isVerifiedEmail"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateUserInputError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"zcashaddress"}},{"kind":"Field","name":{"kind":"Name","value":"socials"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"youtube"}},{"kind":"Field","name":{"kind":"Name","value":"instagram"}},{"kind":"Field","name":{"kind":"Name","value":"twitter"}},{"kind":"Field","name":{"kind":"Name","value":"website"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"UserNotFoundError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<UserQuery, UserQueryVariables>;