const express = require('express');
const router = express.Router();
const controller = require('../controllers/funds.controller');

router.get('/summary', controller.getFundsSummary);
router.get('/', controller.getFundsSummary);
router.post('/transactions', controller.addTransaction);
router.delete('/transactions/:id', controller.deleteTransaction);

module.exports = router;
