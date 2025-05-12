const express = require('express');
const router = express.Router();
const noteController = require('../app/controller/NoteController');

router.get('/', noteController.readAllNotes)
router.post('/', noteController.createANote)
router.delete('/:id', noteController.deleteANote)

module.exports = router;