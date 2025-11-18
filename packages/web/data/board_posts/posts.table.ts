import { Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface BoardPostsTable {
  id: Generated<number>;
  memo: string;
  datetime: string;
  amount: number;
  txid?: string | null;
  likes?: number;
  reply_zaddr?: string | null;
  reply_to_post?: number | null;
  reply_count?: number;
  ispoll?: boolean;
  board_name?: string | null;
  board_zaddr?: string | null;
}

export type BoardPostsRow = Selectable<BoardPostsTable>
export type InsertableBoardPosts = Insertable<BoardPostsTable>
export type UpdateableBoardPosts = Updateable<BoardPostsTable>
