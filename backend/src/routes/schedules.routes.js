const express = require('express');
const router = express.Router();
const controller = require('../controllers/schedules.controller');

router.get('/', controller.getAllSchedules);
router.post('/', controller.createSchedule);
router.put('/:id', controller.updateSchedule);
router.post('/:id/room-swap', controller.swapRoom);
router.delete('/:id', controller.deleteSchedule);

module.exports = router;
