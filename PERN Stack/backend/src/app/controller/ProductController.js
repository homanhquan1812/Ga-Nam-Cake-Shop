const { pool } = require('../../../config/db')

class ProductController
{
    // [GET] /product
    async getAllProducts(req, res, next) {
        try {
            const productQuery = 'SELECT * FROM product;'
            const productResult = await pool.query(productQuery)

            res.status(200).json({
                product: productResult.rows
            })
        } catch (error) {
            next(error)
        }
    }

    // [GET] /product/:id
    async getAProduct(req, res, next) {
        try {
            const id = req.params.id
            const productQuery = 'SELECT * FROM product WHERE id = $1;'
            const productResult = await pool.query(productQuery, [id])

            res.status(200).json({
                product: productResult.rows[0]
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /product
    async postAProduct(req, res, next) {
        try {
            const { name, photo, type, description, price, brand_id } = req.body

            if (!brand_id) {
                return res.status(404).json('Please enter brand_id.')
            }

            const checkBrand_id = await pool.query(`SELECT id FROM brand WHERE id = $1;`, [brand_id])
            const convertToBoolean = checkBrand_id.rows.length > 0 // > 0 is to use true|false, not 0|1

            if (!convertToBoolean) {
                return res.status(404).json('Incorrect brand_id.')
            }

            const query = `
                INSERT INTO product (name, photo, type, description, price, brand_id)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id;
            `
            const values = [name, photo, type, description, price, brand_id]
            const result = await pool.query(query, values)

            res.status(201).json({
                message: 'New product added.',
                id: result.rows[0].id
            })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /product
    async deleteAProduct(req, res, next) {
        try {
            const id = req.params.id;
            const deleteQuery = 'DELETE FROM product WHERE id = $1;'
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

    // [DELETE] /product
    async deleteAllProducts(req, res, next) {
        try {
            const deleteQuery = 'DELETE FROM product;'
            const result = await pool.query(deleteQuery)

            if (result.rowCount > 0) {
                res.status(200).json({ 
                    message: 'All products deleted successfully.' 
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