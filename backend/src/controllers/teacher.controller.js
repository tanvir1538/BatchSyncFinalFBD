const { pool } = require('../config/db');

// POST /api/teacher/attendance
async function recordAttendance(req, res, next) {
  try {
    const { courseCode = 'CSE 321', batch = 'Batch 20', presentCount = 42, totalCount = 48, markedBy = 'Dr. Shahria Kabir' } = req.body;
    const id = `att-${Date.now()}`;

    await pool.query(
      `INSERT INTO attendance_logs (id, course_code, batch, present_count, total_count, marked_by)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, courseCode, batch, presentCount, totalCount, markedBy]
    );

    // Add audit log
    await pool.query(
      `INSERT INTO audit_logs (id, title, details, time, actor)
       VALUES (?, ?, ?, ?, ?)`,
      [`audit-${Date.now()}`, 'Digital Attendance Locked', `Attendance logged: ${presentCount}/${totalCount} students in ${courseCode}`, 'Just now', markedBy]
    );

    res.status(201).json({
      success: true,
      message: `Digital Attendance locked: ${presentCount}/${totalCount} students marked present in ${courseCode}.`,
      attendance: { id, courseCode, batch, presentCount, totalCount, markedBy },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/teacher/resources
async function uploadResource(req, res, next) {
  try {
    const { title, courseCode = 'CSE 321', fileUrl = '' } = req.body;
    const id = `res-${Date.now()}`;

    await pool.query(
      `INSERT INTO teacher_resources (id, title, course_code, file_url)
       VALUES (?, ?, ?, ?)`,
      [id, title, courseCode, fileUrl]
    );

    res.status(201).json({
      success: true,
      message: `Resource "${title}" uploaded to ${courseCode} vault.`,
      resource: { id, title, courseCode, fileUrl },
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/teacher/assignments
async function createAssignment(req, res, next) {
  try {
    const { title, courseCode = 'CSE 321', batch = 'Batch 20', dueDate = 'In 7 days' } = req.body;
    const id = `assign-${Date.now()}`;

    await pool.query(
      `INSERT INTO teacher_assignments (id, title, course_code, batch, due_date)
       VALUES (?, ?, ?, ?, ?)`,
      [id, title, courseCode, batch, dueDate]
    );

    res.status(201).json({
      success: true,
      message: `Assignment "${title}" published for ${batch}.`,
      assignment: { id, title, courseCode, batch, dueDate },
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  recordAttendance,
  uploadResource,
  createAssignment,
};
