const express = require('express');
const router = express.Router();
const historyController = require('../app/controller/HistoryController');

router.get('/', historyController.index)

module.exports = router;