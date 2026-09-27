const { pool } = require('./db');
const { migrateFresh } = require('./migrate');

async function initDatabase() {
  try {
    const conn = await pool.getConnection();
    try {
      console.log('[BatchSync] Checking database schema...');
      let needsInit = false;
      try {
        const [[{ count }]] = await conn.query('SELECT COUNT(*) AS count FROM faculties');
        if (count === 0) needsInit = true;
      } catch (err) {
        needsInit = true;
      }

      if (needsInit) {
        await migrateFresh();
      } else {
        console.log('[BatchSync] Database verified.');
      }
    } finally {
      conn.release();
    }
  } catch (error) {
    console.error('[BatchSync] Database initialization error:', error.message);
  }
}

module.exports = { initDatabase };
