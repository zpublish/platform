import { ApolloError } from '@apollo/client';

export const getErrorCode = (error?: ApolloError, data?: { __typename, code, message }): { code: string, message: string } | {} => {
  if (!error) {
    // FIXME: Find a nicer method for this hack?
    if (data?.__typename.includes('Error') && data?.code && data?.message) {
      return {
        code: data.code,
        message: data.message,
      };
    }
    return {};
  }
  if (error?.graphQLErrors) {
    const [graphQLError] = error?.graphQLErrors;
    const errorCode = graphQLError?.extensions?.code as string;

    if (errorCode) {
      return { code: errorCode, message: error.message };
    }

    return {}
  }
  return {};
}
