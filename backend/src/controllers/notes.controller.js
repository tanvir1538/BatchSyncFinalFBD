const { pool } = require('../config/db');

// GET /api/notes
async function getAllNotes(req, res, next) {
  try {
    const { isToppersNote, status } = req.query;
    let query = 'SELECT * FROM class_notes WHERE 1=1';
    const params = [];

    if (isToppersNote !== undefined) {
      query += ' AND is_toppers_note = ?';
      params.push(isToppersNote === 'true' || isToppersNote === '1' ? 1 : 0);
    }
    if (status) {
      query += ' AND status = ?';
      params.push(status);
    }

    query += ' ORDER BY lecture_number ASC, created_at DESC';
    const [rows] = await pool.query(query, params);

    const result = rows.map((n) => ({
      id: n.id,
      lectureNumber: n.lecture_number,
      courseCode: n.course_code,
      courseName: n.course_name,
      title: n.title,
      summary: n.summary,
      authorName: n.author_name,
      authorId: n.author_id,
      authorScore: n.author_score,
      date: n.date,
      isToppersNote: Boolean(n.is_toppers_note),
      status: n.status,
      readTime: n.read_time,
      fileSize: n.file_size,
      fileType: n.file_type,
      attachmentsCount: n.attachments_count || 0,
      abstract: n.abstract || '',
      sections: typeof n.sections === 'string' ? JSON.parse(n.sections || '[]') : (n.sections || []),
    }));

    res.json(result);
  } catch (err) {
    next(err);
  }
}

// GET /api/notes/:id
async function getNoteById(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM class_notes WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Note not found' });

    const n = rows[0];
    res.json({
      id: n.id,
      lectureNumber: n.lecture_number,
      courseCode: n.course_code,
      courseName: n.course_name,
      title: n.title,
      summary: n.summary,
      authorName: n.author_name,
      authorId: n.author_id,
      authorScore: n.author_score,
      date: n.date,
      isToppersNote: Boolean(n.is_toppers_note),
      status: n.status,
      readTime: n.read_time,
      fileSize: n.file_size,
      fileType: n.file_type,
      attachmentsCount: n.attachments_count || 0,
      abstract: n.abstract || '',
      sections: typeof n.sections === 'string' ? JSON.parse(n.sections || '[]') : (n.sections || []),
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/notes
async function createNote(req, res, next) {
  try {
    const {
      lectureNumber = 1,
      courseCode = 'CSE-311',
      courseName = 'Database Management Systems',
      title,
      summary = '',
      authorName = 'Tanvir Hasan',
      authorId = '2102019',
      authorScore = null,
      date = 'Today',
      isToppersNote = false,
      status = 'private_draft',
      readTime = '8 min read',
      fileSize = '2.4 MB',
      fileType = 'PDF',
      attachmentsCount = 0,
      abstract = '',
      sections = [],
    } = req.body;

    const id = req.body.id || `note-${Date.now()}`;
    const sectionsJson = JSON.stringify(sections || []);

    await pool.query(
      `INSERT INTO class_notes (id, lecture_number, course_code, course_name, title, summary, author_name, author_id, author_score, date, is_toppers_note, status, read_time, file_size, file_type, attachments_count, abstract, sections)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        lectureNumber,
        courseCode,
        courseName,
        title,
        summary,
        authorName,
        authorId,
        authorScore,
        date,
        isToppersNote ? 1 : 0,
        status,
        readTime,
        fileSize,
        fileType,
        attachmentsCount,
        abstract,
        sectionsJson,
      ]
    );

    res.status(201).json({
      id,
      lectureNumber,
      courseCode,
      courseName,
      title,
      summary,
      authorName,
      authorId,
      authorScore,
      date,
      isToppersNote,
      status,
      readTime,
      fileSize,
      fileType,
      attachmentsCount,
      abstract,
      sections,
    });
  } catch (err) {
    next(err);
  }
}

// PUT /api/notes/:id
async function updateNote(req, res, next) {
  try {
    const { id } = req.params;
    const {
      lectureNumber,
      courseCode,
      courseName,
      title,
      summary,
      authorName,
      authorId,
      authorScore,
      date,
      isToppersNote,
      status,
      readTime,
      fileSize,
      fileType,
      attachmentsCount,
      abstract,
      sections,
    } = req.body;

    const sectionsJson = sections !== undefined ? JSON.stringify(sections) : null;

    await pool.query(
      `UPDATE class_notes
       SET lecture_number = COALESCE(?, lecture_number),
           course_code = COALESCE(?, course_code),
           course_name = COALESCE(?, course_name),
           title = COALESCE(?, title),
           summary = COALESCE(?, summary),
           author_name = COALESCE(?, author_name),
           author_id = COALESCE(?, author_id),
           author_score = COALESCE(?, author_score),
           date = COALESCE(?, date),
           is_toppers_note = COALESCE(?, is_toppers_note),
           status = COALESCE(?, status),
           read_time = COALESCE(?, read_time),
           file_size = COALESCE(?, file_size),
           file_type = COALESCE(?, file_type),
           attachments_count = COALESCE(?, attachments_count),
           abstract = COALESCE(?, abstract),
           sections = COALESCE(?, sections)
       WHERE id = ?`,
      [
        lectureNumber,
        courseCode,
        courseName,
        title,
        summary,
        authorName,
        authorId,
        authorScore,
        date,
        isToppersNote !== undefined ? (isToppersNote ? 1 : 0) : null,
        status,
        readTime,
        fileSize,
        fileType,
        attachmentsCount,
        abstract,
        sectionsJson,
        id,
      ]
    );

    const [rows] = await pool.query('SELECT * FROM class_notes WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Note not found' });
    const n = rows[0];

    res.json({
      id: n.id,
      lectureNumber: n.lecture_number,
      courseCode: n.course_code,
      courseName: n.course_name,
      title: n.title,
      summary: n.summary,
      authorName: n.author_name,
      authorId: n.author_id,
      authorScore: n.author_score,
      date: n.date,
      isToppersNote: Boolean(n.is_toppers_note),
      status: n.status,
      readTime: n.read_time,
      fileSize: n.file_size,
      fileType: n.file_type,
      attachmentsCount: n.attachments_count || 0,
      abstract: n.abstract || '',
      sections: typeof n.sections === 'string' ? JSON.parse(n.sections || '[]') : (n.sections || []),
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/notes/:id/submit-cr
async function submitNoteToCr(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query("UPDATE class_notes SET status = 'pending_cr_review' WHERE id = ?", [id]);
    res.json({ success: true, message: 'Class note submitted for CR review.' });
  } catch (err) {
    next(err);
  }
}

// POST /api/notes/:id/withdraw
async function withdrawSubmission(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query("UPDATE class_notes SET status = 'private_draft' WHERE id = ?", [id]);
    res.json({ success: true, message: 'Note submission withdrawn back to private drafts.' });
  } catch (err) {
    next(err);
  }
}

// POST /api/notes/:id/elect-topper
async function electTopperNote(req, res, next) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query('SELECT * FROM class_notes WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Note not found' });

    const note = rows[0];
    await pool.query("UPDATE class_notes SET status = 'topper_selected', is_toppers_note = 1 WHERE id = ?", [id]);

    // Create notice for election
    await pool.query(
      `INSERT INTO notices (id, title, body, author, time, synced_telegram)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        `notice-topper-${Date.now()}`,
        `Official Topper Note Elected for Lecture ${note.lecture_number}`,
        `"${note.title}" by ${note.author_name} has been elected as the official Topper's Note.`,
        'CR Tanvir Ahmed',
        'Just now',
        1,
      ]
    );

    res.json({ success: true, message: `Elected "${note.author_name}"'s note as official Topper's Note.` });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/notes/:id
async function deleteNote(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM class_notes WHERE id = ?', [id]);
    res.json({ success: true, message: 'Class note deleted successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  submitNoteToCr,
  withdrawSubmission,
  electTopperNote,
  deleteNote,
};
