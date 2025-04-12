const express = require('express');
const router = express.Router();
const productController = require('../app/controller/ProductController');

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getAProduct)
router.post('/', productController.postAProduct)
router.delete('/', productController.deleteAllProducts)
router.delete('/:id', productController.deleteAProduct)

module.exports = router;