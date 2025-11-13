'use server'
// import { FETCH_POSTS_LIMIT } from "./constants";
import { Low } from 'lowdb';
import { getDb, Data } from '@/data';

async function getPaginatedPosts(db: Low<Data>, page = 1, limit = 10) {
  // Ensure the page number is valid
  page = page > 0 ? page : 1;
  limit = limit > 0 ? limit : 10;

  const totalPosts = db.data?.posts.length || 0;
  const totalPages = Math.ceil(totalPosts / limit);

  // Calculate the starting index for pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Get the posts from the db
  const posts = db.data.posts.reverse().slice(startIndex, endIndex).map(({ // @ts-ignore
    id_tx,// @ts-ignore
    id,// @ts-ignore
    account,// @ts-ignore
    txid,// @ts-ignore
    height,// @ts-ignore
    timestamp,// @ts-ignore
    value,// @ts-ignore
    address,// @ts-ignore
    receiver,// @ts-ignore
    memo,// @ts-ignore
    expiration,// @ts-ignore
    reply_zaddr,// @ts-ignore
    likes,// @ts-ignore
    reply_to_post,// @ts-ignore
    reply_count,// @ts-ignore
    ispoll,// @ts-ignore
    board_name,// @ts-ignore
    board_zaddr,// @ts-ignore
  }) => ({
    "id": Number(id),
    "memo": memo,
    "datetime": String(timestamp * 1000),
    "amount": value,
    "txid": txid,
    "likes": likes,
    "reply_zaddr": reply_zaddr,
    "reply_to_post": reply_to_post,
    "reply_count": reply_count,
    "ispoll": ispoll,
    "board_name": board_name,
    "board_zaddr": board_zaddr,
    "username": null,
  })).filter((n: any) => n.id);

  // Check if there are more posts
  const hasMore = db.data.posts.length > endIndex;

  return {
    posts,
    hasMore,
    page,
    limit,
    nextCursor: hasMore ? page + 1 : null,
    totalPages,
  };
}

export default async function getPosts({
  pageParam = 1,
  limit = 20,
}: {
  pageParam: number;
  limit: number;
}) {

  const db = await getDb();
  await db.read();

  const posts = await getPaginatedPosts(db, pageParam, limit)

  return posts;
}


// constants.ts
// export const FETCH_POSTS_LIMIT = 18;