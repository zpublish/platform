import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('board_posts')
    .ifNotExists()
    .addColumn('id', 'integer', col => col.primaryKey().notNull().defaultTo(0))
    .addColumn('memo', 'varchar(512)', col => col.notNull())
    .addColumn('datetime', 'varchar(64)', col => col.notNull())
    .addColumn('amount', 'integer', col => col.notNull())
    .addColumn('txid', 'varchar(128)', col => col.unique())
    .addColumn('likes', 'integer', col => col.defaultTo(0))
    .addColumn('reply_zaddr', 'varchar(255)')
    .addColumn('reply_to_post', 'integer')
    .addColumn('reply_count', 'integer', col => col.defaultTo(0))
    .addColumn('ispoll', 'boolean', col => col.defaultTo(false))
    .addColumn('board_name', 'varchar(255)')
    .addColumn('board_zaddr', 'varchar(255)')
    .execute();

  // await db.schema
  //   .createTable('person')
  //   .addColumn('id', 'integer', (col) => col.primaryKey())
  //   .addColumn('first_name', 'text', (col) => col.notNull())
  //   .addColumn('last_name', 'text')
  //   .addColumn('gender', 'text', (col) => col.notNull())
  //   .addColumn('created_at', 'text', (col) =>
  //     col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
  //   )
  //   .execute()

  // await db.schema
  //   .createTable('pet')
  //   .addColumn('id', 'integer', (col) => col.primaryKey())
  //   .addColumn('name', 'text', (col) => col.notNull().unique())
  //   .addColumn('owner_id', 'integer', (col) =>
  //     col.references('person.id').onDelete('cascade').notNull(),
  //   )
  //   .addColumn('species', 'text', (col) => col.notNull())
  //   .execute()

  // await db.schema
  //   .createIndex('pet_owner_id_index')
  //   .on('pet')
  //   .column('owner_id')
  //   .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('board_posts').execute();
  // await db.schema.dropTable('person').execute()
}
