'use server'
// import { FETCH_POSTS_LIMIT } from "./contants";
import { JSONFilePreset } from 'lowdb/node';
import { Low } from 'lowdb';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';


export type Data = {
  posts: {
    [key: string]: any,
  },
  profiles?: {
    [key: string]: any,
  },
  tweets?: {
    [key: string]: any,
  },
  conversations?: {
    [key: string]: any,
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function getDb() {
  const db = await JSONFilePreset<Data>(path.join(__dirname, './db.json'), { posts: [] });

  return db;
}