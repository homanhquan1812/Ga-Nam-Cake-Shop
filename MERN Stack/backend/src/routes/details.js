const express = require('express');
const router = express.Router();
const details = require('../app/controllers/DetailsController');

router.get('/:id', details.show)

module.exports = router;