const { pool } = require('../../../config/db')

class ProductController
{
    // [GET] /product
    async readAllProducts(req, res, next) {
        try {
            const productQuery = 'SELECT * FROM products;'
            const productResult = await pool.query(productQuery)

            res.status(200).json({
                product: productResult.rows
            })
        } catch (error) {
            next(error)
        }
    }

    // [GET] /product/:id
    async readAProduct(req, res, next) {
        try {
            const id = req.params.id
            const productQuery = 'SELECT * FROM products WHERE id = $1;'
            const productResult = await pool.query(productQuery, [id])

            res.status(200).json({
                product: productResult.rows[0]
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /product
    async createAProduct(req, res, next) {
        try {
            const { product_name, photo, type, description, price } = req.body
            const query = `
                INSERT INTO products (product_name, photo, type, description, price)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id;
            `
            const values = [product_name, photo, type, description, price]

            await pool.query(query, values)

            res.status(201).json({
                message: 'New product added.'
            })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /product/:id
    async deleteAProduct(req, res, next) {
        try {
            const id = req.params.id;
            const deleteQuery = 'DELETE FROM products WHERE id = $1'
            const result = await pool.query(deleteQuery, [id])

            if (result.rowCount > 0) {
                res.status(200).json({ 
                    message: 'Product deleted successfully.' 
                })
            } else {
                res.status(404).json({ 
                    message: 'Product not found.' 
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController