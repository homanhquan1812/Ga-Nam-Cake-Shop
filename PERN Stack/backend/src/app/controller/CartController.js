const { pool } = require('../../../config/db')

class CartController
{
    // [GET] /cart/:id
    async readACart(req, res, next) {
        try {
            const id = req.params.id
            const query = 'SELECT cart FROM users WHERE id = $1'
            const result = await pool.query(query, [id])

            if (result.rows.length === 0) {
                return res.status(404).json({ 
                    message: 'User not found.'
                })
            }

            res.status(200).json({
                id: id,
                cart: result.rows[0].cart
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /cart
    async createItemsInACart(req, res, next) {
        try {
            const { name, price, id, photo, productId, quantity } = req.body

            const userQuery = 'SELECT * FROM users WHERE id = $1'
            const userResult = await pool.query(userQuery, [id])

            if (userResult.rows.length === 0) {
                return res.status(404).json('User not found.')
            }

            const user = userResult.rows[0]
            const newItems = [...user.cart.items, { name, price, photo, productId, quantity, totalPrice: (price * quantity)}]
            const newTotalPrice = user.cart.totalPrice + (price * quantity)

            const updateQuery = `
                UPDATE users
                SET cart = $1
                WHERE id = $2
            `
            await pool.query(updateQuery, [{ items: newItems, totalPrice: newTotalPrice }, id])

            res.status(201).json("Product added to this user's cart successfully.")

        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /cart/:userId/:id
    async deleteItemsInACart(req, res, next) {
        try {
            const { userId, id } = req.params

            const userQuery = 'SELECT * FROM users WHERE id = $1'
            const userResult = await pool.query(userQuery, [userId])

            if (userResult.rows.length === 0) {
                return res.status(404).json('User not found.')
            }

            const cart = userResult.rows[0].cart
            const updatedItems = cart.items.filter(item => item.productId !== id)
            const newTotalPrice = updatedItems.reduce((total, item) => total + item.price, 0)

            const updateQuery = `
                UPDATE users
                SET cart = $1
                WHERE id = $2
            `
            await pool.query(updateQuery, [{ items: updatedItems, totalPrice: newTotalPrice }, userId])

            res.status(200).json('Product deleted from cart successfully.')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CartController