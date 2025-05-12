const { pool } = require('../../../config/db')

class CartController
{
    // [GET] /cart
    async readACart(req, res, next) {
        try {
            const id = req.params.id
            const query = 'SELECT * FROM member_information INNER JOIN customer ON customer.member_information_id = member_information.id WHERE customer.id = $1'
            const result = await pool.query(query, [id])

            if (result.rows.length === 0) {
                return res.status(404).json({ 
                    message: 'User not found.'
                })
            }

            res.status(200).json({
                cart: result.rows[0].cart
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /cart
    async createItemsInACart(req, res, next) {
        try {
            const { product_id, quantity, customer_id } = req.body
            const userQuery = 'SELECT * FROM member_information INNER JOIN customer ON customer.member_information_id = member_information.id WHERE customer.id = $1;'
            const userResult = await pool.query(userQuery, [customer_id])
            const productQuery = `SELECT * FROM product WHERE id = $1`
            const productResult = await pool.query(productQuery, [product_id])

            if (userResult.rows.length === 0) {
                return res.status(404).json('User not found.')
            }

            const user = userResult.rows[0]
            const newItems = [...user.cart.items, { 
                id: productResult.rows[0].id, 
                name: productResult.rows[0].name, 
                price: productResult.rows[0].price, 
                photo: productResult.rows[0].photo, 
                quantity: Number(quantity), 
                total_price: (productResult.rows[0].price * quantity)}]
            const newTotalPrice = user.cart.total_price + (productResult.rows[0].price * quantity)

            const updateQuery = `
                UPDATE customer
                SET cart = $1
                WHERE id = $2
            `
            await pool.query(updateQuery, [{ items: newItems, total_price: newTotalPrice }, customer_id])

            res.status(201).json("Product added to this user's cart successfully.")

        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /cart
    async deleteItemsInACart(req, res, next) {
        try {
            const { product_id, customer_id } = req.body

            const cartQuery = 'SELECT cart FROM member_information INNER JOIN customer ON customer.member_information_id = member_information.id WHERE customer.id = $1;'
            const cartResult = await pool.query(cartQuery, [customer_id])

            if (cartResult.rows.length === 0) {
                return res.status(404).json('User\'s cart not found.')
            }

            const cart = cartResult.rows[0].cart
            const updatedItems = cart.items.filter(item => item.id !== product_id)
            const newTotalPrice = updatedItems.reduce((total, item) => total + item.total_price, 0)

            const updateQuery = `
                UPDATE customer
                SET cart = $1
                WHERE id = $2
            `
            await pool.query(updateQuery, [{ items: updatedItems, total_price: newTotalPrice }, customer_id])

            res.status(200).json('Product deleted from cart successfully.')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CartController