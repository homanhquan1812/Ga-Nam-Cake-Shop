const express = require('express');
const router = express.Router();
const shoppingcartController = require('../app/controllers/ShoppingCartController');

router.get('/', shoppingcartController.index)

router.post('/addToCart', shoppingcartController.addToCart)
router.post('/addToCart2', shoppingcartController.addToCart2)
router.post('/addToCart3', shoppingcartController.addToCart3)
router.post('/deleteFromCart', shoppingcartController.deleteInCart)
router.post('/sendToOrder', shoppingcartController.sendToOrder)
router.post('/changeQuantity', shoppingcartController.changeQuantity)
module.exports = router;