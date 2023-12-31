const express = require('express');
const router = express.Router();
const product_details = require('../app/controllers/ProductDetailsController');

router.get('/', product_details.index)
router.get('/:id', product_details.show)

module.exports = router;