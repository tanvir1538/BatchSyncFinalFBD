const { pool } = require('../config/db');

// GET /api/polls/active or /api/polls
async function getActivePoll(req, res, next) {
  try {
    const [polls] = await pool.query('SELECT * FROM polls ORDER BY created_at DESC LIMIT 1');
    if (polls.length === 0) {
      return res.status(404).json({ message: 'No polls found' });
    }

    const p = polls[0];
    const [options] = await pool.query('SELECT * FROM poll_options WHERE poll_id = ? ORDER BY sort_order ASC', [p.id]);

    const maxVotes = options.length > 0 ? Math.max(...options.map((o) => o.votes)) : 0;

    const formattedOptions = options.map((opt) => ({
      id: opt.id,
      text: opt.text,
      votes: opt.votes,
      isLeading: maxVotes > 0 && opt.votes === maxVotes,
    }));

    res.json({
      id: p.id,
      pollNumber: p.poll_number,
      title: p.title,
      course: p.course,
      initiatedBy: p.initiated_by,
      expiresIn: p.expires_in,
      totalEligible: p.total_eligible,
      userVotedId: p.user_voted_id,
      isClosed: Boolean(p.is_closed),
      options: formattedOptions,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/polls
async function createPoll(req, res, next) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { title, course, initiatedBy = 'CR Tanvir Ahmed', expiresIn = '24 Hours Left', totalEligible = 50, options = [] } = req.body;
    const id = req.body.id || `poll-${Date.now()}`;

    await conn.query(
      `INSERT INTO polls (id, title, course, initiated_by, expires_in, total_eligible, is_closed)
       VALUES (?, ?, ?, ?, ?, ?, 0)`,
      [id, title, course, initiatedBy, expiresIn, totalEligible]
    );

    const createdOptions = [];
    for (let i = 0; i < options.length; i++) {
      const optText = typeof options[i] === 'string' ? options[i] : options[i].text;
      const optId = `opt-${id}-${i + 1}`;
      await conn.query(
        `INSERT INTO poll_options (id, poll_id, text, votes, is_leading, sort_order)
         VALUES (?, ?, ?, 0, 0, ?)`,
        [optId, id, optText, i + 1]
      );
      createdOptions.push({ id: optId, text: optText, votes: 0, isLeading: false });
    }

    // Notice broadcast
    await conn.query(
      `INSERT INTO notices (id, title, body, author, time, synced_telegram)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [`notice-poll-${Date.now()}`, `New Batch Poll: ${title}`, `Vote regarding ${course}. Poll open now.`, initiatedBy, 'Just now', 1]
    );

    await conn.commit();

    const [createdPoll] = await pool.query('SELECT * FROM polls WHERE id = ?', [id]);
    const p = createdPoll[0];

    res.status(201).json({
      id: p.id,
      pollNumber: p.poll_number,
      title: p.title,
      course: p.course,
      initiatedBy: p.initiated_by,
      expiresIn: p.expires_in,
      totalEligible: p.total_eligible,
      isClosed: false,
      options: createdOptions,
    });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
}

// POST /api/polls/:id/vote
async function votePoll(req, res, next) {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    const { id } = req.params;
    const { optionId } = req.body;

    const [pollRows] = await conn.query('SELECT * FROM polls WHERE id = ?', [id]);
    if (pollRows.length === 0) {
      await conn.rollback();
      return res.status(404).json({ message: 'Poll not found' });
    }
    if (pollRows[0].is_closed) {
      await conn.rollback();
      return res.status(400).json({ message: 'Poll is closed' });
    }

    await conn.query('UPDATE poll_options SET votes = votes + 1 WHERE id = ? AND poll_id = ?', [optionId, id]);
    await conn.query('UPDATE polls SET user_voted_id = ? WHERE id = ?', [optionId, id]);

    await conn.commit();

    // Fetch updated poll
    const [options] = await pool.query('SELECT * FROM poll_options WHERE poll_id = ? ORDER BY sort_order ASC', [id]);
    const maxVotes = Math.max(...options.map((o) => o.votes));
    const formattedOptions = options.map((opt) => ({
      id: opt.id,
      text: opt.text,
      votes: opt.votes,
      isLeading: maxVotes > 0 && opt.votes === maxVotes,
    }));

    const p = pollRows[0];
    res.json({
      id: p.id,
      pollNumber: p.poll_number,
      title: p.title,
      course: p.course,
      initiatedBy: p.initiated_by,
      expiresIn: p.expires_in,
      totalEligible: p.total_eligible,
      userVotedId: optionId,
      isClosed: Boolean(p.is_closed),
      options: formattedOptions,
    });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
}

// POST /api/polls/:id/close
async function closePoll(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query("UPDATE polls SET is_closed = 1, expires_in = 'Ended by CR' WHERE id = ?", [id]);
    res.json({ success: true, message: 'Poll closed successfully' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getActivePoll,
  createPoll,
  votePoll,
  closePoll,
};
