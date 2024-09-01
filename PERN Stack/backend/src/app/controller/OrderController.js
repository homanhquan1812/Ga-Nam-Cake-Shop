require('dotenv').config()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pool } = require('../../../config/db')

class OrderController
{
    // [GET] /order
    async getAllOrders(req, res, next) {
        try {
            const ordersQuery = 'SELECT * FROM orders'
            const ordersResult = await pool.query(ordersQuery)
            const orders = ordersResult.rows

            res.status(200).json({
                orders: orders
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /order
    async createAnOrder(req, res, next)
    {
        try {        
            const { name, email, phonenumber, address, cart, user_id, delivered, declined } = req.body
            const insertOrderQuery = `
                INSERT INTO orders (name, email, phonenumber, address, user_id, cart, delivered, declined)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *
            `
            const orderResult = await pool.query(insertOrderQuery, [name, email, phonenumber, address, user_id, cart, delivered, declined])
            const newOrder = orderResult.rows[0]
            const userQuery = 'SELECT * FROM users WHERE id = $1'
            const userResult = await pool.query(userQuery, [user_id])

            if (userResult.rows.length === 0) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            const userMatch = userResult.rows[0]
            const resetCartQuery = `
                UPDATE users
                SET cart = '{"totalPrice": 0, "items": []}'
                WHERE id = $1
            `
            await pool.query(resetCartQuery, [userMatch.id])

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
            const id = req.params.id
            const checkOrderQuery = 'SELECT * FROM orders WHERE id = $1'
            const orderResult = await pool.query(checkOrderQuery, [id])

            if (orderResult.rows.length === 0) {
                return res.status(404).json({
                    message: 'Order not found'
                })
            }

            const updateOrderQuery = `
                UPDATE orders
                SET delivered = true
                WHERE id = $1
                RETURNING *
            `;
            const updatedOrderResult = await pool.query(updateOrderQuery, [id])
            const updatedOrder = updatedOrderResult.rows[0]

            res.status(200).json({
                message: 'Order delivered.',
                order: updatedOrder
            })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /manager/order/:id
    async orderDeclined(req, res, next)
    {
        try {
            const id = req.params.id
            const checkOrderQuery = 'SELECT * FROM orders WHERE id = $1'
            const orderResult = await pool.query(checkOrderQuery, [id])

            if (orderResult.rows.length === 0) {
                return res.status(404).json({
                    message: 'Order not found'
                })
            }

            const updateOrderQuery = `
                UPDATE orders
                SET declined = true
                WHERE id = $1
                RETURNING *
            `;
            const updatedOrderResult = await pool.query(updateOrderQuery, [id])
            const updatedOrder = updatedOrderResult.rows[0]

            res.status(200).json({
                message: 'Order declined.',
                order: updatedOrder
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new OrderController