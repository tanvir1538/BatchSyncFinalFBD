const { pool } = require('../config/db');

// GET /api/notices
async function getAllNotices(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM notices ORDER BY created_at DESC');
    const result = rows.map((n) => ({
      id: n.id,
      title: n.title,
      body: n.body,
      author: n.author,
      time: n.time,
      syncedTelegram: Boolean(n.synced_telegram),
    }));
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// POST /api/notices
async function createNotice(req, res, next) {
  try {
    const { title, body, author = 'CR Tanvir Ahmed', time = 'Just now', syncedTelegram = true } = req.body;
    const id = req.body.id || `notice-${Date.now()}`;

    await pool.query(
      `INSERT INTO notices (id, title, body, author, time, synced_telegram)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, title, body, author, time, syncedTelegram ? 1 : 0]
    );

    res.status(201).json({
      id,
      title,
      body,
      author,
      time,
      syncedTelegram,
    });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/notices/:id
async function deleteNotice(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM notices WHERE id = ?', [id]);
    res.json({ success: true, message: 'Notice removed' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllNotices,
  createNotice,
  deleteNotice,
};
