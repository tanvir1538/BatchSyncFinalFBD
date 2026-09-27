const { pool } = require('../config/db');

// GET /api/funds/summary
async function getFundsSummary(req, res, next) {
  try {
    const [transactions] = await pool.query('SELECT * FROM fund_transactions ORDER BY created_at DESC');

    const formattedTxs = transactions.map((t) => ({
      id: t.id,
      title: t.title,
      amount: parseFloat(t.amount),
      date: t.date,
      type: t.type,
      reference: t.reference,
    }));

    // Calculate dynamic running balance: initial base + sum of all transactions
    const totalTxSum = formattedTxs.reduce((sum, tx) => sum + tx.amount, 0);
    const balance = Math.round((1280.00 + totalTxSum) * 100) / 100;

    res.json({
      balance,
      transactions: formattedTxs,
    });
  } catch (err) {
    next(err);
  }
}

// POST /api/funds/transactions
async function addTransaction(req, res, next) {
  try {
    const { title, amount, type, reference = 'Manual CR Voucher', date = 'Today' } = req.body;
    const id = req.body.id || `tx-${Date.now()}`;
    const signedAmount = type === 'outflow' ? -Math.abs(amount) : Math.abs(amount);

    await pool.query(
      `INSERT INTO fund_transactions (id, title, amount, date, type, reference)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, title, signedAmount, date, type, reference]
    );

    res.status(201).json({
      id,
      title,
      amount: signedAmount,
      date,
      type,
      reference,
    });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/funds/transactions/:id
async function deleteTransaction(req, res, next) {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM fund_transactions WHERE id = ?', [id]);
    res.json({ success: true, message: 'Transaction removed' });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getFundsSummary,
  addTransaction,
  deleteTransaction,
};
