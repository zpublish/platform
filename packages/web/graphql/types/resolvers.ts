import { GraphQLContext } from '../../pages/api/graphql';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: GraphQLContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  InvoiceResult: ( Invoice ) | ( InvoiceNotFoundError );
  LoginResponse: ( LoginError ) | ( LoginSuccess );
  SignupResponse: ( SignupError ) | ( SignupSuccess );
  UpdateUserResponse: ( UpdateUserInputError ) | ( UpdateUserSuccess );
  UserResult: ( User ) | ( UserNotFoundError );
  VerifyUserResponse: ( VerifyUserError ) | ( VerifyUserSuccess );
}>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = ResolversObject<{
  Actor: ( SystemUser ) | ( User );
  Error: ( InvoiceNotFoundError ) | ( LoginError ) | ( SignupError ) | ( UpdateUserInputError ) | ( UserNotFoundError ) | ( VerifyUserError );
  Response: ( DeleteResponse );
}>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Actor: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Actor']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CurrencyCode: CurrencyCode;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeleteResponse: ResolverTypeWrapper<DeleteResponse>;
  EncryptedZcashMemoMessage: ResolverTypeWrapper<EncryptedZcashMemoMessage>;
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Error']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Invoice: ResolverTypeWrapper<Invoice>;
  InvoiceInput: InvoiceInput;
  InvoiceNotFoundError: ResolverTypeWrapper<InvoiceNotFoundError>;
  InvoiceResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['InvoiceResult']>;
  LoginError: ResolverTypeWrapper<LoginError>;
  LoginInput: LoginInput;
  LoginResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['LoginResponse']>;
  LoginSuccess: ResolverTypeWrapper<LoginSuccess>;
  LoginWithZcashResult: ResolverTypeWrapper<LoginWithZcashResult>;
  MockResponse: ResolverTypeWrapper<MockResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['Response']>;
  SignupError: ResolverTypeWrapper<SignupError>;
  SignupInput: SignupInput;
  SignupResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['SignupResponse']>;
  SignupSuccess: ResolverTypeWrapper<SignupSuccess>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SystemUser: ResolverTypeWrapper<SystemUser>;
  Tokens: ResolverTypeWrapper<Tokens>;
  UpdateInvoiceInput: UpdateInvoiceInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserInputError: ResolverTypeWrapper<UpdateUserInputError>;
  UpdateUserResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UpdateUserResponse']>;
  UpdateUserSuccess: ResolverTypeWrapper<UpdateUserSuccess>;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserNotFoundError: ResolverTypeWrapper<UserNotFoundError>;
  UserResult: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['UserResult']>;
  UserSocials: ResolverTypeWrapper<UserSocials>;
  UserSocialsInput: UserSocialsInput;
  VerifyUserError: ResolverTypeWrapper<VerifyUserError>;
  VerifyUserResponse: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['VerifyUserResponse']>;
  VerifyUserSuccess: ResolverTypeWrapper<VerifyUserSuccess>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Actor: ResolversInterfaceTypes<ResolversParentTypes>['Actor'];
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  DeleteResponse: DeleteResponse;
  EncryptedZcashMemoMessage: EncryptedZcashMemoMessage;
  Error: ResolversInterfaceTypes<ResolversParentTypes>['Error'];
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Invoice: Invoice;
  InvoiceInput: InvoiceInput;
  InvoiceNotFoundError: InvoiceNotFoundError;
  InvoiceResult: ResolversUnionTypes<ResolversParentTypes>['InvoiceResult'];
  LoginError: LoginError;
  LoginInput: LoginInput;
  LoginResponse: ResolversUnionTypes<ResolversParentTypes>['LoginResponse'];
  LoginSuccess: LoginSuccess;
  LoginWithZcashResult: LoginWithZcashResult;
  MockResponse: MockResponse;
  Mutation: {};
  Query: {};
  Response: ResolversInterfaceTypes<ResolversParentTypes>['Response'];
  SignupError: SignupError;
  SignupInput: SignupInput;
  SignupResponse: ResolversUnionTypes<ResolversParentTypes>['SignupResponse'];
  SignupSuccess: SignupSuccess;
  String: Scalars['String']['output'];
  SystemUser: SystemUser;
  Tokens: Tokens;
  UpdateInvoiceInput: UpdateInvoiceInput;
  UpdateUserInput: UpdateUserInput;
  UpdateUserInputError: UpdateUserInputError;
  UpdateUserResponse: ResolversUnionTypes<ResolversParentTypes>['UpdateUserResponse'];
  UpdateUserSuccess: UpdateUserSuccess;
  User: User;
  UserInput: UserInput;
  UserNotFoundError: UserNotFoundError;
  UserResult: ResolversUnionTypes<ResolversParentTypes>['UserResult'];
  UserSocials: UserSocials;
  UserSocialsInput: UserSocialsInput;
  VerifyUserError: VerifyUserError;
  VerifyUserResponse: ResolversUnionTypes<ResolversParentTypes>['VerifyUserResponse'];
  VerifyUserSuccess: VerifyUserSuccess;
}>;

export type ActorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Actor'] = ResolversParentTypes['Actor']> = ResolversObject<{
  __resolveType: TypeResolveFn<'SystemUser' | 'User', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type DeleteResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteResponse'] = ResolversParentTypes['DeleteResponse']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type EncryptedZcashMemoMessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['EncryptedZcashMemoMessage'] = ResolversParentTypes['EncryptedZcashMemoMessage']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Error'] = ResolversParentTypes['Error']> = ResolversObject<{
  __resolveType: TypeResolveFn<'InvoiceNotFoundError' | 'LoginError' | 'SignupError' | 'UpdateUserInputError' | 'UserNotFoundError' | 'VerifyUserError', ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type InvoiceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Invoice'] = ResolversParentTypes['Invoice']> = ResolversObject<{
  currency?: Resolver<Maybe<ResolversTypes['CurrencyCode']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  invoiceId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvoiceNotFoundErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceNotFoundError'] = ResolversParentTypes['InvoiceNotFoundError']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type InvoiceResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['InvoiceResult'] = ResolversParentTypes['InvoiceResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'Invoice' | 'InvoiceNotFoundError', ParentType, ContextType>;
}>;

export type LoginErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginError'] = ResolversParentTypes['LoginError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'LoginError' | 'LoginSuccess', ParentType, ContextType>;
}>;

export type LoginSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginSuccess'] = ResolversParentTypes['LoginSuccess']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  expiresIn?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tokenType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LoginWithZcashResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginWithZcashResult'] = ResolversParentTypes['LoginWithZcashResult']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MockResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MockResponse'] = ResolversParentTypes['MockResponse']> = ResolversObject<{
  mock?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createInvoice?: Resolver<Maybe<ResolversTypes['Invoice']>, ParentType, ContextType, RequireFields<MutationCreateInvoiceArgs, 'input'>>;
  deleteUser?: Resolver<Maybe<ResolversTypes['DeleteResponse']>, ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginResponse']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'input'>>;
  loginWithZcash?: Resolver<Maybe<ResolversTypes['LoginWithZcashResult']>, ParentType, ContextType, RequireFields<MutationLoginWithZcashArgs, 'input'>>;
  resetDatabase?: Resolver<Maybe<ResolversTypes['DeleteResponse']>, ParentType, ContextType>;
  sendPasswordResetEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendPasswordResetEmailArgs, 'address'>>;
  sendVerificationEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendVerificationEmailArgs, 'address'>>;
  sendZcashVerificationToken?: Resolver<Maybe<ResolversTypes['EncryptedZcashMemoMessage']>, ParentType, ContextType, RequireFields<MutationSendZcashVerificationTokenArgs, 'address'>>;
  signup?: Resolver<Maybe<ResolversTypes['SignupResponse']>, ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  updateInvoice?: Resolver<Maybe<ResolversTypes['Invoice']>, ParentType, ContextType, RequireFields<MutationUpdateInvoiceArgs, 'input'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UpdateUserResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'input'>>;
  verifyEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationVerifyEmailArgs, 'token'>>;
  verifyUser?: Resolver<Maybe<ResolversTypes['VerifyUserResponse']>, ParentType, ContextType, RequireFields<MutationVerifyUserArgs, 'token'>>;
  verifyZcashAddress?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationVerifyZcashAddressArgs, 'token'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getVerificationMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryGetVerificationMessageArgs, 'address'>>;
  invoice?: Resolver<Maybe<ResolversTypes['InvoiceResult']>, ParentType, ContextType, RequireFields<QueryInvoiceArgs, 'id'>>;
  user?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userByUsername?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<QueryUserByUsernameArgs, 'name'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>;
  viewer?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = ResolversObject<{
  __resolveType: TypeResolveFn<'DeleteResponse', ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
}>;

export type SignupErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignupError'] = ResolversParentTypes['SignupError']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SignupResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignupResponse'] = ResolversParentTypes['SignupResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'SignupError' | 'SignupSuccess', ParentType, ContextType>;
}>;

export type SignupSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['SignupSuccess'] = ResolversParentTypes['SignupSuccess']> = ResolversObject<{
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type SystemUserResolvers<ContextType = any, ParentType extends ResolversParentTypes['SystemUser'] = ResolversParentTypes['SystemUser']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = ResolversObject<{
  accessToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  refreshToken?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateUserInputErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserInputError'] = ResolversParentTypes['UpdateUserInputError']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UpdateUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserResponse'] = ResolversParentTypes['UpdateUserResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'UpdateUserInputError' | 'UpdateUserSuccess', ParentType, ContextType>;
}>;

export type UpdateUserSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateUserSuccess'] = ResolversParentTypes['UpdateUserSuccess']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isVerifiedEmail?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  joinedOn?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  publicZcashaddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  socials?: Resolver<Maybe<ResolversTypes['UserSocials']>, ParentType, ContextType>;
  unverifiedEmail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  viewingKey?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  zcashaddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserNotFoundErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserNotFoundError'] = ResolversParentTypes['UserNotFoundError']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = ResolversObject<{
  __resolveType: TypeResolveFn<'User' | 'UserNotFoundError', ParentType, ContextType>;
}>;

export type UserSocialsResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserSocials'] = ResolversParentTypes['UserSocials']> = ResolversObject<{
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  youtube?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerifyUserErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyUserError'] = ResolversParentTypes['VerifyUserError']> = ResolversObject<{
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type VerifyUserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyUserResponse'] = ResolversParentTypes['VerifyUserResponse']> = ResolversObject<{
  __resolveType: TypeResolveFn<'VerifyUserError' | 'VerifyUserSuccess', ParentType, ContextType>;
}>;

export type VerifyUserSuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyUserSuccess'] = ResolversParentTypes['VerifyUserSuccess']> = ResolversObject<{
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Actor?: ActorResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DeleteResponse?: DeleteResponseResolvers<ContextType>;
  EncryptedZcashMemoMessage?: EncryptedZcashMemoMessageResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  Invoice?: InvoiceResolvers<ContextType>;
  InvoiceNotFoundError?: InvoiceNotFoundErrorResolvers<ContextType>;
  InvoiceResult?: InvoiceResultResolvers<ContextType>;
  LoginError?: LoginErrorResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  LoginSuccess?: LoginSuccessResolvers<ContextType>;
  LoginWithZcashResult?: LoginWithZcashResultResolvers<ContextType>;
  MockResponse?: MockResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  SignupError?: SignupErrorResolvers<ContextType>;
  SignupResponse?: SignupResponseResolvers<ContextType>;
  SignupSuccess?: SignupSuccessResolvers<ContextType>;
  SystemUser?: SystemUserResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  UpdateUserInputError?: UpdateUserInputErrorResolvers<ContextType>;
  UpdateUserResponse?: UpdateUserResponseResolvers<ContextType>;
  UpdateUserSuccess?: UpdateUserSuccessResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserNotFoundError?: UserNotFoundErrorResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
  UserSocials?: UserSocialsResolvers<ContextType>;
  VerifyUserError?: VerifyUserErrorResolvers<ContextType>;
  VerifyUserResponse?: VerifyUserResponseResolvers<ContextType>;
  VerifyUserSuccess?: VerifyUserSuccessResolvers<ContextType>;
}>;

