const express = require('express');
const router = express.Router();
const productController = require('../app/controller/ProductController');

router.get('/', productController.readAllProducts)
router.get('/:id', productController.readAProduct)

module.exports = router;