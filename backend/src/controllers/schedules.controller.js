const { pool } = require('../config/db');

// GET /api/schedules
async function getAllSchedules(req, res, next) {
  try {
    const { batch, teacher, status } = req.query;
    let query = 'SELECT * FROM schedules WHERE 1=1';
    const params = [];

    if (batch) {
      query += ' AND batch = ?';
      params.push(batch);
    }
    if (teacher) {
      query += ' AND teacher LIKE ?';
      params.push(`%${teacher}%`);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY created_at ASC';
    const [rows] = await pool.query(query, params);

    const result = rows.map((r) => ({
      id: r.id,
      time: r.time,
      duration: r.duration,
      courseCode: r.course_code,
      courseName: r.course_name,
      teacher: r.teacher,
      room: r.room,
      originalRoom: r.original_room,
      batch: r.batch,
      section: r.section,
      status: r.status,
      statusBadgeText: r.status_badge_text,
      note: r.note,
      overrideCode: r.override_code,
    }));

    res.json(result);
  } catch (err) {
    next(err);
  }
}

// POST /api/schedules
async function createSchedule(req, res, next) {
  try {
    const {
      time,
      duration = '90m',
      courseCode,
      courseName,
      teacher,
      room,
      originalRoom = null,
      batch = 'Batch 12',
      section = 'Section A',
      status = 'upcoming',
      statusBadgeText = 'Upcoming',
      note = '',
      overrideCode = null,
    } = req.body;

    const id = req.body.id || `sched-${Date.now()}`;

    await pool.query(
      `INSERT INTO schedules (id, time, duration, course_code, course_name, teacher, room, original_room, batch, section, status, status_badge_text, note, override_code)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, time, duration, courseCode, courseName, teacher, room, originalRoom, batch, section, status, statusBadgeText, note, overrideCode]
    );

    res.status(201).json({
      id,
      time,
      duration,
      courseCode,
      courseName,
      teacher,
      room,
      originalRoom,
      batch,
      section,
      status,
      statusBadgeText,
      note,
      overrideCode,
    });
  } catch (err) {
    next(err);
  }
}

// PUT /api/schedules/:id
async function updateSchedule(req, res, next) {
  try {
    const { id } = req.params;
    const {
      time,
      duration,
      courseCode,
      courseName,
      teacher,
      room,
      originalRoom,
      batch,
      section,
      status,
      statusBadgeText,
      note,
      overrideCode,
    } = req.body;

    await pool.query(
      `UPDATE schedules
       SET time = COALESCE(?, time),
           duration = COALESCE(?, duration),
           course_code = COALESCE(?, course_code),
           course_name = COALESCE(?, course_name),
           teacher = COALESCE(?, teacher),
           room = COALESCE(?, room),
           original_room = COALESCE(?, original_room),
           batch = COALESCE(?, batch),
           section = COALESCE(?, section),
           status = COALESCE(?, status),
           status_badge_text = COALESCE(?, status_badge_text),
           note = COALESCE(?, note),
           override_code = COALESCE(?, override_code)
       WHERE id = ?`,
      [time, duration, courseCode, courseName, teacher, room, originalRoom, batch, section, status, statusBadgeText, note, overrideCode, id]
    );

    const [rows] = await pool.query('SELECT * FROM schedules WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Schedule item not found' });

    const r = rows[0];
    res.json({
      id: r.id,
      time: r.time,
      duration: r.duration,
      courseCode: r.course_code,
      courseName: r.course_name,
      teacher: r.teacher,
      room: r.room,
      originalRoom: r.original_room,
      batch: r.batch,
      section: r.section,
      status: r.status,
      statusBadgeText: r.status_badge_text,
      note: r.note,
      overrideCode: r.override_code,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/schedules/:id/room-swap
async function swapRoom(req, res, next) {
  try {
    const { id } = req.params;
    const { newRoom } = req.body;

    const [rows] = await pool.query('SELECT * FROM schedules WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Schedule item not found' });

    const current = rows[0];
    const prevRoom = current.original_room || current.room;

    await pool.query(
      `UPDATE schedules
       SET original_room = ?,
           room = ?,
           status = 'override',
           status_badge_text = 'Room Changed',
           override_code = ?
       WHERE id = ?`,
      [prevRoom, newRoom, `SWAP-${Math.floor(100 + Math.random() * 900)}`, id]
    );

    // Add notice and audit log
    await pool.query(
      `INSERT INTO notices (id, title, body, author, time, synced_telegram)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        `notice-swap-${Date.now()}`,
        `${current.course_code} Room Shifted to ${newRoom}`,
        `Routine update: Class shifted from ${prevRoom} to ${newRoom}. Please proceed directly to the new room.`,
        current.teacher || 'Class Teacher',
        'Just now',
        1,
      ]
    );

    res.json({ success: true, message: `Room reassigned to ${newRoom} and broadcasted.` });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/schedules/:id
async function deleteSchedule(req, res, next) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM schedules WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Schedule item not found' });
    }
    res.json({ success: true, message: 'Schedule item deleted' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllSchedules,
  createSchedule,
  updateSchedule,
  swapRoom,
  deleteSchedule,
};
