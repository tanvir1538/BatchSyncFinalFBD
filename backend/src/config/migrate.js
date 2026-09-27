const fs = require('fs');
const path = require('path');
const { pool } = require('./db');

async function migrateFresh() {
  const conn = await pool.getConnection();
  try {
    console.log('[BatchSync Migrate] Dropping old tables...');
    await conn.query('SET FOREIGN_KEY_CHECKS = 0;');
    const [tables] = await conn.query('SHOW TABLES');
    for (const row of tables) {
      const tableName = Object.values(row)[0];
      await conn.query(`DROP TABLE IF EXISTS \`${tableName}\``);
    }

    console.log('[BatchSync Migrate] Applying schema...');
    const schemaSql = fs.readFileSync(path.resolve(__dirname, '../../../database/schema.sql'), 'utf8');
    await conn.query(schemaSql);

    console.log('[BatchSync Migrate] Applying seed data...');
    const seedSql = fs.readFileSync(path.resolve(__dirname, '../../../database/seed.sql'), 'utf8');
    await conn.query(seedSql);

    console.log('[BatchSync Migrate] Database migrated and seeded successfully!');
  } finally {
    conn.release();
  }
}

if (require.main === module) {
  migrateFresh()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { migrateFresh };
