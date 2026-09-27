const { pool } = require('../config/db');

// GET /api/audit-logs
async function getAuditLogs(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 50');
    const result = rows.map((a) => ({
      id: a.id,
      title: a.title,
      details: a.details,
      time: a.time,
      actor: a.actor,
    }));
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// POST /api/audit-logs
async function createAuditLog(req, res, next) {
  try {
    const { title, details, time = 'Just now', actor = 'System User' } = req.body;
    const id = req.body.id || `audit-${Date.now()}`;

    await pool.query(
      `INSERT INTO audit_logs (id, title, details, time, actor)
       VALUES (?, ?, ?, ?, ?)`,
      [id, title, details, time, actor]
    );

    res.status(201).json({ id, title, details, time, actor });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAuditLogs,
  createAuditLog,
};
