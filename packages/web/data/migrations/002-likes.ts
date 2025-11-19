import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('likes')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().notNull().defaultTo(0))
    .addColumn('txid', 'varchar(128)', col => col.unique())
    .addColumn('post_id', 'integer')
    .addColumn('post_txid', 'varchar(255)')
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('likes').execute();
}
