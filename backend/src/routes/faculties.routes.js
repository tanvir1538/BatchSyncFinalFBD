const express = require('express');
const router = express.Router();
const controller = require('../controllers/faculties.controller');

router.get('/', controller.getAllFaculties);
router.get('/:id', controller.getFacultyById);
router.post('/', controller.createFaculty);
router.put('/:id', controller.updateFaculty);
router.delete('/:id', controller.deleteFaculty);

module.exports = router;
