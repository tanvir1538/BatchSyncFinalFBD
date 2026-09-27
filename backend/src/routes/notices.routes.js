const express = require('express');
const router = express.Router();
const controller = require('../controllers/notices.controller');

router.get('/', controller.getAllNotices);
router.post('/', controller.createNotice);
router.delete('/:id', controller.deleteNotice);

module.exports = router;
