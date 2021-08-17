import http from 'http';
// import RedisServer from 'redis-server';
import { promisify } from 'util';
// import dotenv from 'dotenv';

// dotenv.config();

// const redisServer = new RedisServer(6379);
// redisServer.open((err) => {
//   if (err) {
//     throw err;
//   }

//   console.log('Redis listening on 6379.');
// });

// import { client, subscriber, publisher } from './data/redis';
// import { db, pg } from './data/pg';

// import { inject } from './elemental-orm/sql';
// inject({ db, pg });

import app from './app';
// import redisListener from './listeners/redis-listener';

const port = process.env.port || 1337;

const server = http.createServer(app);


const onListening = () => {
  const address = server.address();
  const bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;

  console.log(`Listening on: ${bind}`);
};


server.listen(port);

server.on('listening', onListening);

// subscriber.on('message', redisListener);
// subscriber.subscribe(['global', 'api']);

const serverCloseAsync = () => new Promise((resolve, reject) => {
  try {
    server.close(() => {
      resolve(null);
    });
  } catch (e) {
    reject(e);
  }
});


const onServerStop = async () => {
  try {
    // await client.quit();
    // await subscriber.quit();
    // await publisher.quit();
    // await redisServer.close();
    await serverCloseAsync();

    console.log('Redis server stopped.');
    process.exit();
  } catch (err) {
    console.log('Failed to stop Redis server');
  }
};

process.on('exit', onServerStop);

process.on('SIGINT', onServerStop);

process.on('SIGUSR1', onServerStop);
process.on('SIGUSR2', onServerStop);

