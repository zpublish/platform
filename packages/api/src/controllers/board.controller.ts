import { readFile } from 'fs';
import { promisify } from 'util';
import path from 'path';
import Joi from '@hapi/joi';

import { client } from '../redis';

import { __dirname } from '../utils';

const readFileAsync = promisify(readFile);


// FIXME: This is just a mock for testing purposes on a local machine. Never deploy to prod. Will collect data from official API with a cache later
const boardGetController = async (req, res) => {
  const { params } = req;

  const { id } = params;

  try {
    const data = await readFileAsync(path.join(__dirname, `../../data/zecpages/board/${id}.json`), { encoding: 'utf8' });

    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(data);
    res.end();
  } catch (err) {
    res.set('Content-Type', 'text/json');
    console.log(err);

    // TODO: Remove this debug test to check Redis networking works
    let message;
    try {
      await client.set('hkey', 'Hello, World!');
      message = await client.get('hkey');
    } catch(err2) {
      console.log(err2);
    }
    res.status(500).send(JSON.stringify({ errors: [{ message: 'Error occurred'}], message }));
  }
};

export default {
  get: boardGetController,
  validation: {
    params: Joi.object({
      id: Joi.number().integer().min(1).max(9999999).required(),
    }),
  }
};
