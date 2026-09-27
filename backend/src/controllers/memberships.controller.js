const { pool } = require('../config/db');

// GET /api/memberships
async function getAllMemberships(req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM membership_requests ORDER BY created_at DESC');
    const result = rows.map((m) => ({
      id: m.id,
      name: m.name,
      studentId: m.student_id,
      program: m.program,
      requestedAt: m.requested_at,
      tag: m.tag,
      status: m.status,
    }));
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// POST /api/memberships
async function createMembership(req, res, next) {
  try {
    const { name, studentId, program, requestedAt = 'Just now', tag = 'NEW' } = req.body;
    const id = req.body.id || `mem-${Date.now()}`;

    await pool.query(
      `INSERT INTO membership_requests (id, name, student_id, program, requested_at, tag, status)
       VALUES (?, ?, ?, ?, ?, ?, 'pending')`,
      [id, name, studentId, program, requestedAt, tag]
    );

    res.status(201).json({
      id,
      name,
      studentId,
      program,
      requestedAt,
      tag,
      status: 'pending',
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/memberships/:id/approve
async function approveMembership(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query("UPDATE membership_requests SET status = 'approved' WHERE id = ?", [id]);
    res.json({ success: true, message: 'Membership approved' });
  } catch (err) {
    next(err);
  }
}

// POST /api/memberships/:id/reject
async function rejectMembership(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query("UPDATE membership_requests SET status = 'rejected' WHERE id = ?", [id]);
    res.json({ success: true, message: 'Membership rejected' });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/memberships/:id
async function deleteMembership(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM membership_requests WHERE id = ?', [id]);
    res.json({ success: true, message: 'Membership request removed' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllMemberships,
  createMembership,
  approveMembership,
  rejectMembership,
  deleteMembership,
};
