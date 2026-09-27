const express = require('express');
const router = express.Router();
const controller = require('../controllers/clearances.controller');

router.get('/', controller.getAllClearances);
router.post('/', controller.createClearance);
router.post('/:id/approve', controller.approveClearance);
router.post('/:id/reject', controller.rejectClearance);
router.delete('/:id', controller.deleteClearance);

module.exports = router;
