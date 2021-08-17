import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

type Data = {
  profiles: {
    [key: string]: any,
  },
  tweets: {
    [key: string]: any,
  },
  conversations: {
    [key: string]: any,
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file = join(__dirname, '../../data/db.json');
const adapter = new JSONFile<Data>(file);
const db = new Low<Data>(adapter);


export default db;
