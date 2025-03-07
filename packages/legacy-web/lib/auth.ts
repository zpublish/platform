// import client from '../apollo-client';
import { useApolloClient } from '@apollo/client';
import { STORAGE_KEYS } from './constants';
import { isLoggedInVar } from './vars';

const TOKEN_TO_STORAGE_KEYS = {
  access: STORAGE_KEYS.ACCESS_TOKEN,
  refresh: STORAGE_KEYS.REFRESH_TOKEN,
} as const;

type TokenType = 'access' | 'refresh';

interface AccessTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  refresh_token: string;
  expires_in: number;
  scope: string;
}

export const readToken = (tokenType: TokenType = 'access') => {
  try {
    return localStorage.getItem(TOKEN_TO_STORAGE_KEYS[tokenType]);
  } catch (e) {
    return null;
  }
};

const writeToken = (tokenType: TokenType, value: string) => {
  localStorage.setItem(TOKEN_TO_STORAGE_KEYS[tokenType], value);
};

export const login = (response: AccessTokenResponse) => {
  const now = new Date();
  const expiresAt = now.setSeconds(now.getSeconds() + response.expires_in);

  writeToken('access', response.access_token);
  writeToken('refresh', response.refresh_token);
  localStorage.setItem(STORAGE_KEYS.EXPIRES_AT, String(expiresAt));

  isLoggedInVar(true);
};

export const logout = () => {
  const client = useApolloClient();
  localStorage.clear();
  isLoggedInVar(false);
  client.clearStore();
};
