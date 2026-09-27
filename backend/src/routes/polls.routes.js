const express = require('express');
const router = express.Router();
const controller = require('../controllers/polls.controller');

router.get('/', controller.getActivePoll);
router.get('/active', controller.getActivePoll);
router.post('/', controller.createPoll);
router.post('/:id/vote', controller.votePoll);
router.post('/:id/close', controller.closePoll);

module.exports = router;
