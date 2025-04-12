require('dotenv').config()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pool } = require('../../../config/db')

class OrderController
{
    // [GET] /order
    async getAllOrders(req, res, next) {
        try {
            const orderQuery = `SELECT * FROM "order";`
            const orderResult = await pool.query(orderQuery)

            res.status(200).json({
                order: orderResult.rows
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /order
    async createAnOrder(req, res, next)
    {
        try {        
            const { customer_id, brand_id, branch_id, payment_method, cart } = req.body
            const customerQuery = 'SELECT * FROM member_information INNER JOIN customer ON customer.member_information_id = member_information.id WHERE customer.id = $1;'
            const customerResult = await pool.query(customerQuery, [customer_id])
            const insertOrderQuery = `
                INSERT INTO "order" (customer_id, full_name, email, phone, gender, address, brand_id, branch_id, status, payment_method, cart)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                RETURNING *
            `
            const orderResult = await pool.query(insertOrderQuery, [
                customer_id, 
                customerResult.rows[0].full_name, 
                customerResult.rows[0].email, 
                customerResult.rows[0].phone, 
                customerResult.rows[0].gender, 
                customerResult.rows[0].address, 
                brand_id, branch_id, 'Processing', payment_method, cart])
            const newOrder = orderResult.rows[0]
            const userQuery = `SELECT * FROM member_information INNER JOIN customer ON customer.member_information_id = member_information.id WHERE customer.id = $1;`
            const userResult = await pool.query(userQuery, [customer_id])

            if (userResult.rows.length === 0) {
                return res.status(404).json({
                    message: 'User not found'
                })
            }

            const userMatch = userResult.rows[0]
            const resetCartQuery = `
                UPDATE customer
                SET cart = '{"total_price": 0, "items": []}'
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
            const checkOrderQuery = 'SELECT * FROM "order" WHERE id = $1'
            const orderResult = await pool.query(checkOrderQuery, [id])

            if (orderResult.rows.length === 0) {
                return res.status(404).json({
                    message: 'Order not found'
                })
            }

            const updateOrderQuery = `
                UPDATE "order"
                SET status = 'Delivered'
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
            const checkOrderQuery = 'SELECT * FROM "order" WHERE id = $1'
            const orderResult = await pool.query(checkOrderQuery, [id])

            if (orderResult.rows.length === 0) {
                return res.status(404).json({
                    message: 'Order not found'
                })
            }

            const updateOrderQuery = `
                UPDATE "order"
                SET status = 'Declined'
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