'use server'
// import { FETCH_POSTS_LIMIT } from "./constants";
import { Low } from 'lowdb';
import { getDb, Data } from '@/data';

async function findPost(db: Low<Data>, _txid: string) {
  // Ensure the page number is valid

  // Get the posts from the db
  const post = db.data.posts.find(({ // @ts-ignore
    id_tx,// @ts-ignore
    account,// @ts-ignore
    txid,// @ts-ignore
    id,// @ts-ignore
    height,// @ts-ignore
    timestamp,// @ts-ignore
    value,// @ts-ignore
    address,// @ts-ignore
    receiver,// @ts-ignore
    memo,// @ts-ignore
    expiration,// @ts-ignore
  }) => ((txid === _txid) || (id === Number(_txid))))

  if (!post) {
    return null;
  }

  // console.log({ post })

  const { // @ts-ignore
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
  } = post;

  return {
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
  };
}

async function findReplies(db: Low<Data>, _id: number) {
  // Ensure the page number is valid

  // Get the posts from the db
  const posts = db.data.posts.filter(({ // @ts-ignore
    id_tx,// @ts-ignore
    account,// @ts-ignore
    txid,// @ts-ignore
    id,// @ts-ignore
    height,// @ts-ignore
    timestamp,// @ts-ignore
    value,// @ts-ignore
    address,// @ts-ignore
    receiver,// @ts-ignore
    memo,// @ts-ignore
    reply_to_post,// @ts-ignore
  }) => reply_to_post === _id)

  // console.log({ post })
    return posts.map((post: any) => {
      const { // @ts-ignore
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
    } = post;

    return {
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
    };
  })
}

export default async function getPost({
  txid
}: {
  txid: string;
}) {

  const db = await getDb();
  await db.read();

  const posts = await findPost(db, txid)

  return posts;
}

export async function getReplies({
  id
}: {
  id: number;
}) {

  const db = await getDb();
  await db.read();

  const posts = await findReplies(db, id)

  return posts;
}

