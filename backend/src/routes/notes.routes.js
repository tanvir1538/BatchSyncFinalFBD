const express = require('express');
const router = express.Router();
const controller = require('../controllers/notes.controller');

router.get('/', controller.getAllNotes);
router.get('/:id', controller.getNoteById);
router.post('/', controller.createNote);
router.put('/:id', controller.updateNote);
router.post('/:id/submit-cr', controller.submitNoteToCr);
router.post('/:id/withdraw', controller.withdrawSubmission);
router.post('/:id/elect-topper', controller.electTopperNote);
router.delete('/:id', controller.deleteNote);

module.exports = router;
