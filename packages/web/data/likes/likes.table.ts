import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface LikesTable {
    id: Generated<number>;
    txid: string;
    post_id: number;
    post_txid: string;
}

export type VotesRow = Selectable<LikesTable>
export type InsertableVotes = Insertable<LikesTable>
export type UpdateableVotes = Updateable<LikesTable>
