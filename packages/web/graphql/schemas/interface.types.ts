export default /* GraphQL */`
  interface Response {
    success: Boolean!
    message: String!
    code: String
    errorCode: String
  }

  interface Error {
    message: String!
    code: String
  }

  interface Actor {
    id: ID!
    username: String
  }
`;
