'use server'
// import { FETCH_POSTS_LIMIT } from "./constants";
import { Low } from 'lowdb';
import { getDb, Data } from '@/data';

async function getPaginatedUsers(db: Low<Data>, page = 1, limit = 10) {
  // Ensure the page number is valid
  page = page > 0 ? page : 1;
  limit = limit > 0 ? limit : 10;

  const totalUsers = db.data?.users.length || 0;
  const totalPages = Math.ceil(totalUsers / limit);

  // Calculate the starting index for pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;



  // Get the users from the db
  const users = db.data.users.reverse().slice(startIndex, endIndex).map(({ // @ts-ignore
    id,
    username,
    zaddr,
    proofposturl,
    website,
    twitter,
    description,
  }: any) => ({
    "id": Number(id),
    "username": username,
    "zaddr": zaddr,
    "proofposturl": proofposturl,
    "website": website,
    "twitter": twitter,
    "description": description,
  })).filter((n: any) => n.id);

  // Check if there are more users
  const hasMore = db.data.users.length > endIndex;

  return {
    users,
    hasMore,
    page,
    limit,
    nextCursor: hasMore ? page + 1 : null,
    totalPages,
  };
}

export default async function getUsers({
  pageParam = 1,
  limit = 20,
}: {
  pageParam: number;
  limit: number;
}) {

  const db = await getDb();
  await db.read();

  const users = await getPaginatedUsers(db, pageParam, limit)

  return users;
}


// constants.ts
// export const FETCH_POSTS_LIMIT = 18;