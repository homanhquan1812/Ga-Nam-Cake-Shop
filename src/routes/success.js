const express = require('express');
const router = express.Router();
const successController = require('../app/controllers/SuccessController');

router.get('/', successController.index)

module.exports = router;