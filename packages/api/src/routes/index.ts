/* eslint-disable no-restricted-syntax */
import routes from './routes';

const httpToMethod = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
  PATCH: 'patch',
};

const makeRouter = (app) => {
  const router = app;

  Object.keys(routes).forEach((path) => {
    const handlers = routes[path];
    const methods = Object.keys(handlers);

    for (const method of methods) {
      const route = handlers[method];
      const { handler, validation } = route;

      router[httpToMethod[method]](path, (req, res) => {
        let error;

        if (validation) {
          ['params', 'body', 'query'].forEach((type) => {
            const schema = validation[type];

            if (schema && !error) {
              ({ error } = schema.validate(req[type]));
            }
          });
        }

        if (error) {
          const { details } = error || {};
          const [detail] = details;
          const { message } = detail || {};

          // Hack to strip regex from error (security) TODO: Clean up
          res.status(500).send((message && message.split(': /')[0]) || 'Error!');
        } else {
          handler(req, res);
        }
      });
    }
  });
  // return router;
};

export default makeRouter;
