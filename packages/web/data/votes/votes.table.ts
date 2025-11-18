import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface VotesTable {
    id: Generated<number>;
    poll_id: number;
    poll_txid: string;
    option: number;
}

export type VotesRow = Selectable<VotesTable>
export type InsertableVotes = Insertable<VotesTable>
export type UpdateableVotes = Updateable<VotesTable>
