const express = require('express');
const router = express.Router();
const loginController = require('../app/controllers/LoginController');

router.get('/', loginController.index)
router.post('/loginSubmit', loginController.login)
router.post('/registerSubmit', loginController.register)
module.exports = router;