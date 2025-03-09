export default /* GraphQL */`
  scalar Date

  type UserSocials {
    youtube: String
    instagram: String
    twitter: String
    website: String
  }
  

  type User implements Actor {
    id: ID!
    username: String
    name: String
    joinedOn: Date
    email: String
    unverifiedEmail: String
    isVerifiedEmail: Boolean
    bio: String
    socials: UserSocials
    zcashaddress: String
    publicZcashaddress: String
    viewingKey: String
  }

  type SystemUser implements Actor {
    id: ID!
    username: String!
  }

  type Tokens {
    accessToken: String
    refreshToken: String
  }

  """
  input CreateUserInput {
    id: ID!
    name: String!
  }

  type CreateUserSuccess {
    user: User!
  }
  type CreateUserInputError implements Error {
    message: String!
    code: String
  }
  
  union CreateUserResponse =
    CreateUserSuccess
    | CreateUserInputError
  """

  input SignupInput {
    email: String
    zcashaddress: String
    username: String
    name: String
    password: String!
  }

  type SignupSuccess {
    user: User!
    code: String!
  }

  type SignupError implements Error {
    message: String!
    code: String!
  }

  union SignupResponse = SignupSuccess | SignupError

  input LoginInput {
    email: String
    username: String
    password: String!
  }

  type LoginSuccess {
    user: User!
    accessToken: String!
    expiresIn: Date
    tokenType: String
    refreshToken: String
  }
  type LoginError implements Error {
    message: String!
    code: String!
  }

  union LoginResponse = LoginSuccess | LoginError

  type DeleteResponse implements Response {
    success: Boolean!
    message: String!
    code: String
    errorCode: String
  }

  input UserSocialsInput {
    instagram: String
    youtube: String
    twitter: String
    website: String
  }

  input UserInput {
    name: String
    username: String
    zcashaddress: String
    bio: String
    socials: UserSocialsInput
    viewingKey: String
  }

  input UpdateUserInput {
    id: ID!
    user: UserInput
  }

  type UpdateUserSuccess {
    user: User!
  }
  type UpdateUserInputError implements Error {
    message: String!
    code: String
  }
  union UpdateUserResponse = UpdateUserSuccess | UpdateUserInputError

  type UserNotFoundError implements Error {
    message: String!
    code: String
  }

  union UserResult = User | UserNotFoundError

  type VerifyUserSuccess {
    success: Boolean
  }
  type VerifyUserError implements Error {
    message: String!
    code: String
  }

  union VerifyUserResponse = VerifyUserSuccess | VerifyUserError

  # type ViewerNotFoundError implements Error {
  #   message: String!
  #   code: String
  # }

  # type Viewer {
  #   user: User
  #   userId: String
  # }

  # union ViewerResult = Viewer | ViewerNotFoundError

  type LoginWithZcashResult {
    message: String
  }

  type EncryptedZcashMemoMessage {
    message: String
  }

  type Query {
    users: [User]
    user(id: ID!): UserResult
    userByUsername(name: String!): UserResult
    getVerificationMessage(address: String!): String
    viewer: User
  }

  type MockResponse {
    mock: String
  }

  type Mutation {
    """
    createUser(input: CreateUserInput!): CreateUserResponse
    """
    signup(input: SignupInput!): SignupResponse
    login(input: LoginInput!): LoginResponse
    loginWithZcash(input: LoginInput!): LoginWithZcashResult
    verifyUser(token: String!): VerifyUserResponse
    updateUser(input: UpdateUserInput!): UpdateUserResponse
    deleteUser(id: ID!): DeleteResponse
    verifyEmail(token: String!): Boolean
    verifyZcashAddress(token: String!): Boolean
    sendVerificationEmail(address: String!): Boolean
    sendZcashVerificationToken(address: String!): EncryptedZcashMemoMessage
    sendPasswordResetEmail(address: String!): Boolean
  }
`;
