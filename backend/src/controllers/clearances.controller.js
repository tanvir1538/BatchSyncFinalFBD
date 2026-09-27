const { pool } = require('../config/db');

// GET /api/clearances
async function getAllClearances(req, res, next) {
  try {
    const { status = 'pending' } = req.query;
    let query = 'SELECT * FROM clearances';
    const params = [];
    if (status !== 'all') {
      query += ' WHERE status = ?';
      params.push(status);
    }
    query += ' ORDER BY created_at DESC';

    const [rows] = await pool.query(query, params);
    const result = rows.map((c) => ({
      id: c.id,
      applicant: c.applicant,
      applicantRole: c.applicant_role,
      facultyCode: c.faculty_code,
      facultyName: c.faculty_name,
      dept: c.dept,
      requestedRole: c.requested_role,
      credentialsStatus: c.credentials_status,
      submittedAt: c.submitted_at,
      details: c.details,
      type: c.type,
      urgency: c.urgency,
      status: c.status,
    }));

    res.json(result);
  } catch (err) {
    next(err);
  }
}

// POST /api/clearances
async function createClearance(req, res, next) {
  try {
    const {
      applicant,
      applicantRole,
      facultyCode,
      facultyName,
      dept,
      requestedRole,
      credentialsStatus = 'Action Required',
      submittedAt = 'Just now',
      details,
      type = 'teacher',
      urgency = 'normal',
    } = req.body;

    const id = req.body.id || `clr-${Date.now()}`;

    await pool.query(
      `INSERT INTO clearances (id, applicant, applicant_role, faculty_code, faculty_name, dept, requested_role, credentials_status, submitted_at, details, type, urgency, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [id, applicant, applicantRole, facultyCode, facultyName, dept, requestedRole, credentialsStatus, submittedAt, details, type, urgency]
    );

    res.status(201).json({
      id,
      applicant,
      applicantRole,
      facultyCode,
      facultyName,
      dept,
      requestedRole,
      credentialsStatus,
      submittedAt,
      details,
      type,
      urgency,
      status: 'pending',
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/clearances/:id/approve
async function approveClearance(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM clearances WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Clearance request not found' });

    const clr = rows[0];
    await pool.query("UPDATE clearances SET status = 'approved', credentials_status = 'Approved by Central Admin' WHERE id = ?", [id]);

    await pool.query(
      `INSERT INTO audit_logs (id, title, details, time, actor)
       VALUES (?, ?, ?, ?, ?)`,
      [`audit-${Date.now()}`, 'Clearance Endorsed', `Approved ${clr.requested_role} for ${clr.applicant} (${clr.faculty_code})`, 'Just now', 'Central Admin']
    );

    res.json({ success: true, message: `Clearance request for "${clr.applicant}" approved.` });
  } catch (err) {
    next(err);
  }
}

// POST /api/clearances/:id/reject
async function rejectClearance(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM clearances WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Clearance request not found' });

    const clr = rows[0];
    await pool.query("UPDATE clearances SET status = 'rejected', credentials_status = 'Declined' WHERE id = ?", [id]);

    await pool.query(
      `INSERT INTO audit_logs (id, title, details, time, actor)
       VALUES (?, ?, ?, ?, ?)`,
      [`audit-${Date.now()}`, 'Clearance Declined', `Rejected ${clr.requested_role} for ${clr.applicant}`, 'Just now', 'Central Admin']
    );

    res.json({ success: true, message: `Clearance request for "${clr.applicant}" rejected.` });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/clearances/:id
async function deleteClearance(req, res, next) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM clearances WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Clearance not found' });
    res.json({ success: true, message: 'Clearance item removed' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllClearances,
  createClearance,
  approveClearance,
  rejectClearance,
  deleteClearance,
};
