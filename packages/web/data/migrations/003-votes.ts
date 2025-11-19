import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('votes')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().notNull().defaultTo(0))
    .addColumn('poll_id', 'integer')
    .addColumn('poll_txid', 'varchar(255)')
    .addColumn('option', 'integer')
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('votes').execute();
}
