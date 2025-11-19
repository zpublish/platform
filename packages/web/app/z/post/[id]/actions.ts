'use server'

import { Database, getDb } from "@/data";
import { findPostByTxid, getAllPostsByReplyId } from "@/data/board_posts/posts.repository";
import { Kysely } from "kysely";

// import { FETCH_POSTS_LIMIT } from "./constants";

async function findPost(db: Kysely<Database>, _txid: string) {
  // Ensure the page number is valid

  const post = await findPostByTxid(db, _txid);

  if (!post) {
    return null;
  }

  // console.log({ post })

  const {
    id,
    txid,
    // height,
    datetime,
    amount,
    // address,
    // receiver,
    memo,
    // expiration,
    reply_zaddr,
    likes,
    reply_to_post,
    reply_count,
    ispoll,
    board_name,
    board_zaddr,
  } = post;

  return {
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
  };
}

async function findReplies(db: Kysely<Database>, _id: string) {
  // Ensure the page number is valid

  // Get the posts from the db
  const posts = await getAllPostsByReplyId(db, 0, 20, _id);

  // console.log({ post })
    return posts?.map((post: any) => {
      const { 
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
      } = post;

    return {
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
    };
  })
}

export default async function getPost({
  txid
}: {
  txid: string;
}) {

  const db = await getDb();

  const posts = await findPost(db, txid)

  return posts;
}

export async function getReplies({
  txid
}: {
  txid: string;
}) {

  const db = await getDb();
  // await db.read();

  const posts = await findReplies(db, txid)

  return posts;
}

