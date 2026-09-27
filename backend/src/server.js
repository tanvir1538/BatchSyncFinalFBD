const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config();

const app = require('./app');
const { testConnection } = require('./config/db');
const { initDatabase } = require('./config/initDb');

const PORT = parseInt(process.env.PORT || '5080', 10);

async function startServer() {
  // Test database connection and initialize database schema & initial seed data
  const dbStatus = await testConnection();
  if (dbStatus.ok) {
    console.log('[BatchSync] MySQL Database connected successfully.');
    await initDatabase();
  } else {
    console.warn(`[BatchSync] Warning: MySQL Database connection failed (${dbStatus.error}). Server will continue running.`);
  }

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[BatchSync] Express server listening on http://127.0.0.1:${PORT}`);
    console.log(`[BatchSync] Health check: http://127.0.0.1:${PORT}/api/health`);
    console.log(`[BatchSync] Database check: http://127.0.0.1:${PORT}/api/health/db`);
  });

  return server;
}

if (require.main === module) {
  startServer();
}

module.exports = { startServer };
