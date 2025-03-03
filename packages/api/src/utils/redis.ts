import { client } from '../data/redis';

type UnknownObj = { [key: string]: unknown };

export const objNotNull = (obj) => typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0;

export const serialiseObjNest = (obj: UnknownObj): UnknownObj => {
  const res = {};
  Object.keys(obj).forEach((k) => {
    const v = obj[k];
    if (v instanceof Date) {
      res[k] = v.toISOString();
    } else if (typeof v === 'object' && v !== null) {
      res[k] = JSON.stringify({ ...v, __type__: 'JSON' });
    } else {
      res[k] = v;
    }
  });
  return res;
};

export const deserialiseObjectNest = (obj: UnknownObj): UnknownObj => {
  const res = {};
  Object.keys(obj).forEach((k) => {
    const v = obj[k];
    try {
      if (typeof v !== 'string') {
        throw new Error();
      }
      const json = JSON.parse(v);
      if (json.__type__ === 'JSON') {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { __type__, ...vals } = json;
        res[k] = vals;
      } else {
        throw new Error();
      }
    } catch (e) {
      res[k] = v;
    }
  });
  return res;
};

export const cacheGet = async (key): Promise<unknown> => {
  const cachedUser = await client.hgetall(key);
  if (objNotNull(cachedUser)) {
    return deserialiseObjectNest(cachedUser);
  }
  return null;
};

export const cacheDelete = async (key) => await client.del(key);

export const cacheSet = async (key, data) => {
  if (!data) {
    return;
  }

  const res = await client.hset(key, serialiseObjNest(data));

  if (!res) {
    await cacheDelete(key);
    return;
  }

  return true;
};
