const express = require('express');
const { testConnection } = require('../config/db');

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    API service liveness check
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'BatchSync API is running',
    timestamp: new Date().toISOString(),
    system: 'BatchSync — University Academic Coordination & Management System',
  });
});

/**
 * @route   GET /api/health/db
 * @desc    MySQL database connectivity check
 */
router.get('/db', async (req, res) => {
  const result = await testConnection();
  if (result.ok) {
    return res.status(200).json({
      success: true,
      message: 'Database connection is healthy',
      database: 'MySQL 8+',
      timestamp: new Date().toISOString(),
    });
  }

  return res.status(503).json({
    success: false,
    message: 'Database connection failed',
    error: result.error,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
