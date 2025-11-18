import { Migrator } from '@/data/migrator'
import { getDb } from '@/data'
import migrations from '@/data/migrations'

async function migrateToLatest() {
  const db = await getDb();
  const migrator = new Migrator(db, migrations);

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      console.log(`migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      console.error(`failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    console.error('failed to migrate')
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

migrateToLatest()
