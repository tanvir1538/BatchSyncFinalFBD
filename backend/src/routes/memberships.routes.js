const express = require('express');
const router = express.Router();
const controller = require('../controllers/memberships.controller');

router.get('/', controller.getAllMemberships);
router.post('/', controller.createMembership);
router.post('/:id/approve', controller.approveMembership);
router.post('/:id/reject', controller.rejectMembership);
router.delete('/:id', controller.deleteMembership);

module.exports = router;
