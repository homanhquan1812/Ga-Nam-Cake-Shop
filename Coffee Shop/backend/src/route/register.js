const express = require('express');
const router = express.Router();
const registerController = require('../app/controller/RegisterController');

router.post('/customer', registerController.customerRegister)
router.post('/staff', registerController.staffRegister)

module.exports = router;