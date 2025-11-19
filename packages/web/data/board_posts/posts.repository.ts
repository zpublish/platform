import { Kysely, sql, Transaction } from 'kysely'
import { Database } from '../index';
import { InsertableBoardPosts, BoardPostsRow } from './posts.table';

export async function insertPost(
  db: Kysely<Database>,
  post: InsertableBoardPosts
): Promise<BoardPostsRow> {
  const insertedPost = await db
    .insertInto('board_posts')
    .values(post)
    .returningAll()
    .executeTakeFirstOrThrow()

  return insertedPost;
}

export async function findPostById(
  db: Kysely<Database>,
  id: number
): Promise<BoardPostsRow | undefined> {
  const user = await db
    .selectFrom('board_posts')
    .where('id', '=', id)
    .selectAll('board_posts')
    .executeTakeFirst()

  return user
}

export async function findPostByTxid(
  db: Kysely<Database>,
  txid: string
): Promise<BoardPostsRow | undefined> {
  const post = await db
    .selectFrom('board_posts')
    .where('txid', '=', txid)
    .selectAll('board_posts')
    .executeTakeFirst()

  return post;
}

export async function getAllPosts(
  db: Kysely<Database>,
  startIndex: number,
  endIndex: number,
): Promise<BoardPostsRow[] | undefined> {
  const posts = await db
    .selectFrom('board_posts')
    .selectAll()
    .orderBy('id', 'desc')
    .offset(startIndex)
    .limit(endIndex - startIndex)
    .execute();

  return posts;
}

export async function getAllPostsByReplyId(
  db: Kysely<Database>,
  startIndex: number = 0,
  endIndex: number = 20,
  txid: string
): Promise<BoardPostsRow[] | undefined> {
  const post = await findPostByTxid(db, txid);
  if (!post) {
    return undefined;
  }
  const posts = await db
    .selectFrom('board_posts')
    .selectAll()
    .where('reply_to_post', '=', post.id)
    .orderBy('id', 'desc')
    .offset(startIndex)
    .limit(endIndex - startIndex)
    .execute();

  return posts;
}

export async function getPostsCount(
  db: Kysely<Database>,
): Promise<number> {
  const result = await db
    .selectFrom('board_posts')
    .select(sql`COUNT(*)`.as('count'))
    .executeTakeFirst();

  const postsCount: number = Number(result?.count) ?? 0;

  return postsCount;
}

export async function getBoardNames(
  db: Kysely<Database>,
): Promise<string[]> {
  const result = await db
    .selectFrom('board_posts')
    .select(sql`DISTINCT board_name`.as('board_name'))
    .execute();

  return result.map((col) => col.board_name).filter(n => typeof n === 'string')
}



// export async function lockUserById(
//   trx: Transaction<Database>,
//   id: string
// ): Promise<BoardPostsRow | undefined> {
//   return lockUser(trx, 'user_id', id)
// }

// export async function lockUserByEmail(
//   trx: Transaction<Database>,
//   email: string
// ): Promise<BoardPostsRow | undefined> {
//   return lockUser(trx, 'email', email)
// }

// async function lockUser(
//   trx: Transaction<Database>,
//   column: 'user_id' | 'email',
//   value: string
// ): Promise<BoardPostsRow | undefined> {
//   const user = await trx
//     .selectFrom('board_posts')
//     .where(column, '=', value)
//     .selectAll('board_posts')
//     .forUpdate()
//     .executeTakeFirst()

//   return user
// }

export async function getLikeCount(
  db: Kysely<Database>,
  txid: string,
): Promise<number> {
  const count = await db
    .selectFrom('likes')
    .select(db.fn.count('id').as('count'))
    .where('post_txid', '=', txid)
    .executeTakeFirst();
  
  return Number(count?.count ?? 0);
}

export async function setPostLikes(
  db: Kysely<Database>,
  txid: string,
  likedTxid: string,
  amount: number,
  likes: number,
): Promise<void> {
  const post = await findPostByTxid(db, likedTxid);
  if (!post) {
    return;
  }
  const insertedLike = await db
    .insertInto('likes')
    .values({
      post_id: post.id,
      txid,
      post_txid: likedTxid,
    })
    .returningAll()
    .executeTakeFirstOrThrow()
  
  if (insertedLike) {
    await db
      .updateTable('board_posts')
      .where('txid', '=', likedTxid)
      .set({ amount, likes })
      .execute()
  }
}

export async function setPostReplyCount(
  db: Kysely<Database>,
  txid: string,
  reply_count: number,
): Promise<void> {
  await db
    .updateTable('board_posts')
    .where('txid', '=', txid)
    .set({ reply_count })
    .execute()
}
