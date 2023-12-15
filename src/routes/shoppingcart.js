const express = require('express');
const router = express.Router();
const shoppingcartController = require('../app/controllers/ShoppingCartController');

router.get('/', shoppingcartController.index)

module.exports = router;