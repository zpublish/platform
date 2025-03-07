import { gql } from '@apollo/client';

export const UserInfoFragment = gql`
  fragment UserInfo on User {
    __typename
    id
    name
    username
    publicZcashaddress
    zcashaddress
    bio
    # instagram
  }
`
