import { Generated, Kysely, SqliteDialect } from "kysely";
import SQLite from 'better-sqlite3';

import { BoardPostsTable } from "./board_posts/posts.table";
import { VotesTable } from "./votes/votes.table";


export interface Database {
  board_posts: BoardPostsTable;
  votes: VotesTable;
}


const db = new Kysely<Database>({
  dialect: new SqliteDialect({
    database: new SQLite('db/zecpublish.db')
  })
});

export async function getDb() {
  return db;
}

