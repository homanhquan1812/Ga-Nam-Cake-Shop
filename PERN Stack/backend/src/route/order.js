const express = require('express')
const router = express.Router()
const orderController = require('../app/controller/OrderController')

router.get('/', orderController.getAllOrders)
router.post('/', orderController.createAnOrder)

module.exports = router