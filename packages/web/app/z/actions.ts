'use server'
// import { FETCH_POSTS_LIMIT } from "./constants";
import { Low } from 'lowdb';
// import { getDb, Data } from '@/data/json';
import { getAllPosts, getBoardNames, getDecayedPinned, getPostsCount } from '@/data/board_posts/posts.repository';
import { Database, getDb } from '@/data';
import { Kysely } from 'kysely';

async function getPaginatedPosts(db: Kysely<Database>, page = 1, limit = 10, boardName?: string) {
  // Ensure the page number is valid
  page = page > 0 ? page : 1;
  limit = limit > 0 ? limit : 10;

  const totalPosts = await getPostsCount(db) || 0;
  const totalPages = Math.ceil(totalPosts / limit);

  // Calculate the starting index for pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  console.log({ boardNames: await getBoardNames(db) })
  
  // Get the posts from the db
  const posts = (await getAllPosts(db, startIndex, endIndex))?.map(({
    id,
    txid,
    datetime,
    amount,
    memo,
    reply_zaddr,
    likes,
    reply_to_post,
    reply_count,
    ispoll,
    board_name,
    board_zaddr,
  }) => ({
    "id": Number(id),
    "memo": memo,
    "datetime": String(Number(datetime) * 1000),
    "amount": amount,
    "txid": txid,
    "likes": likes,
    "reply_zaddr": reply_zaddr,
    "reply_to_post": reply_to_post,
    "reply_count": reply_count,
    "ispoll": ispoll,
    "board_name": board_name,
    "board_zaddr": board_zaddr,
    "username": null,
  })).filter((n: any) => (n.id && (boardName ? n.board_name === boardName : true)));

  // Check if there are more posts
  const hasMore = totalPosts > endIndex;

  return {
    posts,
    hasMore,
    page,
    limit,
    nextCursor: hasMore ? page + 1 : null,
    totalPages,
  };
}

export async function getDecayedPinnedPost() {
  const db = await getDb();
  const post = await getDecayedPinned(db)

  return post;
}

export default async function getPosts({
  pageParam = 1,
  limit = 20,
  boardName,
}: {
  pageParam: number;
  limit: number;
  boardName?: string;
}) {
  const db = await getDb();
  // await db.read();

  const posts = await getPaginatedPosts(db, pageParam, limit, boardName);

  return posts;
}

export async function fetchBoardNames() {
  const db = await getDb();
  return getBoardNames(db);
}


// constants.ts
// export const FETCH_POSTS_LIMIT = 18;