const express = require('express');
const router = express.Router();
const servicesController = require('../app/controllers/ServicesController');

router.get('/', servicesController.index)

module.exports = router;