export default /* GraphQL */`
  type DeleteResponse implements Response {
    success: Boolean!
    message: String!
    code: String
    errorCode: String
  }

  type Mutation {
    resetDatabase: DeleteResponse
  }
`;
