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

            // Check if the customer has placed an order within the last 5 minutes
            const recentOrderQuery = `
                SELECT * FROM "order" 
                WHERE customer_id = $1 
                AND date_added > (CURRENT_TIMESTAMP - INTERVAL '5 minutes')
                ORDER BY date_added DESC 
                LIMIT 1
            `
            const recentOrderResult = await pool.query(recentOrderQuery, [customer_id])

            if (recentOrderResult.rows.length > 0) {
                // Recent order exists, combine carts
                const existingOrder = recentOrderResult.rows[0]
                const existingCart = existingOrder.cart
                const newCart = JSON.parse(cart)
                
                // Combine items
                const combinedItems = [...existingCart.items]
                
                // Add new items or update quantities
                for (const newItem of newCart.items) {
                    const existingItemIndex = combinedItems.findIndex(item => item.id === newItem.id)
                    
                    if (existingItemIndex >= 0) {
                        // Item exists, update quantity and total_price
                        combinedItems[existingItemIndex].quantity += newItem.quantity
                        combinedItems[existingItemIndex].total_price += newItem.total_price
                    } else {
                        // New item, add to cart
                        combinedItems.push(newItem)
                    }
                }
                
                // Calculate new total price
                const newTotalPrice = combinedItems.reduce((sum, item) => sum + item.total_price, 0)
                
                // Update the existing order
                const updateOrderQuery = `
                    UPDATE "order"
                    SET cart = $1,
                        date_added = CURRENT_TIMESTAMP
                    WHERE id = $2
                    RETURNING *
                `
                const updatedCartJson = JSON.stringify({
                    items: combinedItems,
                    total_price: newTotalPrice
                })
                
                const updatedOrderResult = await pool.query(updateOrderQuery, [updatedCartJson, existingOrder.id])
                const updatedOrder = updatedOrderResult.rows[0]
                
                // Reset the customer's cart
                const resetCartQuery = `
                    UPDATE customer
                    SET cart = '{"total_price": 0, "items": []}'
                    WHERE id = $1
                `
                await pool.query(resetCartQuery, [customer_id])
                
                return res.status(200).json({
                    message: "Order updated successfully by combining with recent order. Customer's cart has been reset.",
                    order: updatedOrder
                })
            } else {
                // No recent order, create new order as before
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
                
                // Reset the customer's cart
                const resetCartQuery = `
                    UPDATE customer
                    SET cart = '{"total_price": 0, "items": []}'
                    WHERE id = $1
                `
                await pool.query(resetCartQuery, [customer_id])
                
                return res.status(201).json({
                    message: "Order created successfully and user's cart has been reset.",
                    order: newOrder
                })
            }
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