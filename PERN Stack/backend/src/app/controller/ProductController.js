const { pool } = require('../../../config/db')

class ProductController
{
    // [GET] /product
    async readAllProducts(req, res, next) {
        try {
            const productQuery = 'SELECT * FROM products;'
            const productResult = await pool.query(productQuery)
            const product = productResult.rows

            res.status(200).json({
                product: product
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
            const product = productResult.rows[0]

            res.status(200).json({
                product: product
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController