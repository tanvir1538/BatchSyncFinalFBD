const express = require('express');
const router = express.Router();
const controller = require('../controllers/teacher.controller');

router.post('/attendance', controller.recordAttendance);
router.post('/resources', controller.uploadResource);
router.post('/assignments', controller.createAssignment);

module.exports = router;
