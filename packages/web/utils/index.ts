
export const extractBearerToken = (headers: { authorization?: string }) =>
  headers?.authorization?.replace(/^\s*Bearer\s*/, '');

export * from './copy';
export * from './string';
