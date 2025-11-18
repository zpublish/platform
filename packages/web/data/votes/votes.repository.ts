import { Kysely, Transaction } from 'kysely'
import { Database } from '../index';
import { InsertableVotes, VotesRow } from './votes.table';

export async function insertVote(
  db: Kysely<Database>,
  vote: InsertableVotes
): Promise<VotesRow> {
  const insertedVote = await db
    .insertInto('votes')
    .values(vote)
    .returningAll()
    .executeTakeFirstOrThrow()

  return insertedVote;
}

