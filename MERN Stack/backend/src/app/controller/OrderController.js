require('dotenv').config()

const Orders = require('../model/Orders')
const Customers = require('../model/Customers')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class OrderController
{
    // [GET] /order
    async getAllOrders(req, res, next) {
        try {
            const orders = await Orders.find({})

            res.status(200).json({
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /order
    async createAnOrder(req, res, next)
    {
        try {        
            const { customer, phonenumber, csw_username, address, products, totalcost, delivered, declined, userId } = req.body
            const newOrder = new Orders({ customer, phonenumber, csw_username, address, products, totalcost, delivered, declined })

            await newOrder.save()
            await Customers.findByIdAndUpdate(userId, {
                csw_cart: {
                    totalPrice: 0, 
                    items: []
                }
            })

            res.status(201).json({
                message: "Order created successfully and user's cart has been reset.",
                order: newOrder
            })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /employee/order/:id
    async orderDelivered(req, res, next)
    {
        try {
            const orderDelivered = await Orders.findByIdAndUpdate(req.params.id, {
                delivered: true
            })

            if (!orderDelivered) {
                return res.status(404).json('Order not found.')
            }

            res.status(200).json({
                message: 'Order delivered.'
            })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /manager/order/:id
    async orderDeclined(req, res, next)
    {
        try {
            const orderDelivered = await Orders.findByIdAndUpdate(req.params.id, {
                declined: true
            })

            if (!orderDelivered) {
                return res.status(404).json('Order not found.')
            }

            res.status(200).json({
                message: 'Order declined.'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OrderController