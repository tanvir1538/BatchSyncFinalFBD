const { pool } = require('../config/db');

// GET /api/dashboard/stats
async function getDashboardStats(req, res, next) {
  try {
    const [[{ facultiesCount }]] = await pool.query('SELECT COUNT(*) AS facultiesCount FROM faculties');
    const [[{ deptsCount }]] = await pool.query('SELECT COUNT(*) AS deptsCount FROM departments');
    const [[{ batchesSum }]] = await pool.query('SELECT COALESCE(SUM(batches_count), 0) AS batchesSum FROM faculties');
    const [[{ studentsSum }]] = await pool.query('SELECT COALESCE(SUM(enrolled_students), 0) AS studentsSum FROM faculties');
    const [[{ pendingClearances }]] = await pool.query("SELECT COUNT(*) AS pendingClearances FROM clearances WHERE status = 'pending'");
    const [[{ pendingMemberships }]] = await pool.query("SELECT COUNT(*) AS pendingMemberships FROM membership_requests WHERE status = 'pending'");
    const [[{ notesCount }]] = await pool.query('SELECT COUNT(*) AS notesCount FROM class_notes');
    const [[{ topperNotesCount }]] = await pool.query("SELECT COUNT(*) AS topperNotesCount FROM class_notes WHERE status = 'topper_selected' OR is_toppers_note = 1");

    res.json({
      facultiesCount,
      deptsCount,
      batchesCount: batchesSum,
      enrolledStudents: studentsSum,
      pendingClearances,
      pendingMemberships,
      totalNotes: notesCount,
      topperNotesCount,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getDashboardStats,
};
