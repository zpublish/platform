import Redis from 'ioredis';
import { promisify } from 'util';

const redisArgs = {
  port: 6379,
  host: 'redis',
  password: process.env.REDIS_PSWD || '',
};

export const client = new Redis(redisArgs);
export const publisher = new Redis(redisArgs);
export const subscriber = new Redis(redisArgs);

export const publish = publisher.publish;
export const subscribe = subscriber.subscribe;

export const hmset = client.hmset;
// FIXME: See if these exports can work with ES import

// const {
//   set,
//   get,
//   del,
//   hset,
//   hget,
//   hgetall,
//   sadd,
//   smembers,
// } = client;


// export {
//   set,
//   get,
//   del,
//   hset,
//   hget,
//   hgetall,
//   sadd,
//   smembers,
// };

export const getBuffer = client.getBuffer;
