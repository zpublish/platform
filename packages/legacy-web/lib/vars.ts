import { makeVar } from '@apollo/client';
import { readToken } from './auth';
import { STORAGE_KEYS } from './constants';

type TokenType = 'access' | 'refresh';

const TOKEN_TO_STORAGE_KEYS = {
  access: STORAGE_KEYS.ACCESS_TOKEN,
  refresh: STORAGE_KEYS.REFRESH_TOKEN,
} as const;


export const isLoggedInVar = makeVar(Boolean(readToken()));

