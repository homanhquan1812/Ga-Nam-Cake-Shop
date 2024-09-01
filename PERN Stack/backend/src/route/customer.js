const express = require('express');
const router = express.Router();
const customerController = require('../app/controller/CustomerController');

router.get('/', customerController.readAllCustomers)
router.delete('/:id', customerController.deleteACustomer)

module.exports = router;