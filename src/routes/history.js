const express = require('express');
const router = express.Router();
const historyController = require('../app/controllers/HistoryController');

router.get('/', historyController.index)

module.exports = router;