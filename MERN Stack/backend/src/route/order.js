const express = require('express')
const router = express.Router()
const employeeRouter = express.Router()
const managerRouter = express.Router()
const orderController = require('../app/controller/OrderController')

router.get('/', orderController.getAllOrders)
router.post('/', orderController.createAnOrder)

// Use the nested routers
router.use('/employee', employeeRouter)
router.use('/manager', managerRouter)

// Employee route deliver an order
employeeRouter.put('/:id', orderController.orderDelivered)

// Manager route to decline an order
managerRouter.put('/:id', orderController.orderDeclined)

module.exports = router