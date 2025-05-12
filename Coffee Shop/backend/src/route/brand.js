const express = require('express');
const router = express.Router();
const brandController = require('../app/controller/BrandController');

router.get('/', brandController.readAllBrands)
router.post('/', brandController.createABrand)
router.delete('/:id', brandController.deleteABrand)

module.exports = router;