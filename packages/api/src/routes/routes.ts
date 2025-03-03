/* eslint-disable no-restricted-syntax */
import Joi from '@hapi/joi';

// import {
//   users,
//  } from '../controllers';
// import homeTimeline from '../controllers/home-timeline';
import boardController from '../controllers/board.controller';

const homeTimeline = { get: () => {} };

const schemas = {
  uuid: Joi.string().guid({
    version: ['uuidv4'],
  }),
  username: Joi.string(),
};

const routes = {
  '/api/0.1/board/:id': {
    GET: {
      handler: boardController.get,
      validation: boardController.validation,
    },
  },
  '/api/0.1/home_timeline': {
    GET: {
      handler: homeTimeline.get,
      // validation: {
      //   query: Joi.object({
      //     owner: Joi.alternatives().try(schemas.uuid, Joi.string().valid('null')),
      //     serverId: schemas.locId,
      //     id: schemas.locId,
      //   }),
      // },
    },
  },
  // '/users/:id': {
  //   GET: {
  //     handler: users.byId,
  //     validation: {
  //       params: Joi.object({
  //         id: schemas.locId,
  //       }),
  //     },
  //   },
  //   POST: {
  //     handler: users.create,
  //     validation: {
  //       params: Joi.object({
  //         id: schemas.uuid,
  //       }),
  //       body: Joi.object({
  //         id: schemas.uuid,
  //         name: Joi.string().required(),
  //       }),
  //     },
  //   },
  // },
};

export default routes;
