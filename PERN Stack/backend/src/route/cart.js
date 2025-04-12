const express = require('express');
const router = express.Router();
const cartController = require('../app/controller/CartController');

router.get('/:id', cartController.readACart)
router.post('/', cartController.createItemsInACart)
router.delete('/', cartController.deleteItemsInACart)

module.exports = router;