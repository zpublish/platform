// const path = require('path');
import path from 'path';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import log from 'loglevel';
import fs from 'fs';
import { getIntrospectionQuery } from 'graphql';
import fetch from 'node-fetch';
// import OAuth2Server from 'express-oauth-server';
import { isBefore, parse } from 'date-fns';

import { makeExecutableSchema } from '@graphql-tools/schema';

// import typeDefs from './graphql/types';
// import resolvers from './graphql/resolvers';

// import repositories from './repositories';
import routes from './routes';

// import * as oAuthModel from './oauth/model';

// import { db } from './data/pg';

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

const app = express();

// app.oauth = new OAuth2Server({
//   model: oAuthModel,
//   requireClientAuthentication: {
//     password: false,
//   },
// });

if ('DEVELOPMENT') {
  log.setLevel(log.levels.INFO);
}
// if ('PRODUCTION') {
//   log.setLevel(log.levels.WARN);
// }

app
  .disable('x-powered-by')
  .use(express.json())
  .use(express.urlencoded({ extended: false }));

// const getContextFromRequest = async (req) => {
//   try {
//     let viewer;
//     let token;
//     const reqToken =
//       req.headers &&
//       req.headers.authorization &&
//       (req.headers.authorization as string).replace(/^\s*Bearer\s*/, '');
//     if (reqToken) {
//       console.log({ reqToken });
//       token = await repositories.tokens.findByToken(reqToken);
//       console.log({ now: Date.now(), expiresAt: new Date(token.accessTokenExpiresOn) });
//       if (isBefore(Date.now(), new Date(token.accessTokenExpiresOn))) {
//         viewer = await repositories.users.findById(token.userId);
//         console.log(123, ' ', viewer.uuid);
//       }
//     }
//     return { request: req, viewer, token, ...repositories };
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// };

app.post('/oauth/token', (req, res) => {

  console.log({ reqBody: req.body });
  app.oauth.token()(req, res);
});

app.post('/oauth/authorize', function(req, res) {
  // Redirect anonymous users to login page.
  // if (!req.app.locals.user) {
  //   return res.redirect(util.format('/login?client_id=%s&redirect_uri=%s', req.query.client_id, req.query.redirect_uri));
  // }

  return app.oauth.authorize();
});




// app.use('/graphql', graphqlHTTP(async (request) => {
//   return {
//     schema,
//     context: await getContextFromRequest(request),
//     graphiql: process.env.NODE_ENV === 'development',
//   };
// }));

// app.use('/schema.json', async (req, res) => {
//   await fetch('http://localhost:1337/graphql', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ query: getIntrospectionQuery() })
//   })
//     .then(res => res.json())
//     .then(res =>
//       fs.writeFileSync(path.join(__dirname, './schema.json'), JSON.stringify(res.data, null, 2))
//     );

//   res.end();
// });

// Logging middleware
// app.use((req, res, next) => {
//   console.log(JSON.stringify({ url: req.url, body: req.body, params: req.params }));

//   next(req, res);
// });
// app.use((req, _, next) => {
//   console.log(JSON.stringify({ url: req.url, body: req.body, params: req.params }, null, 2));

//   next();
// });


routes(app);

app.use((_, res) => {
  res.status(404).json({ statusCode: 404, error: 'Not Found', message: 'Page not found' });
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  res.end();
});

export default app;
