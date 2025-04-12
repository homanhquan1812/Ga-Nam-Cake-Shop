require('dotenv').config()

const { pool } = require('../../../config/db')

class BrandController
{
    // [GET] /brand
    async readAllBrands(req, res, next) {
        try {
            const brandQuery = 'SELECT * FROM brand;'
            const brandResult = await pool.query(brandQuery)

            res.status(200).json({
                brand: brandResult.rows
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /brand
    async createABrand(req, res, next) {
        try {
            const { logo_url, website_url, name, description, opening_hours, closed_hours } = req.body
            const query = `
                INSERT INTO brand (
                    logo_url, website_url, name, description, opening_hours, closed_hours
                ) VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id;
            `
            const values = [logo_url, website_url, name, description, opening_hours, closed_hours]
            const result = await pool.query(query, values)

            res.status(201).json({
                message: 'Brand added.',
                brand_id: result.rows[0].id
            })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /brand/:id
    async deleteABrand(req, res, next) {
        try {
            const id = req.params.id;
            const deleteQuery = 'DELETE FROM brand WHERE id = $1'
            const result = await pool.query(deleteQuery, [id])

            if (result.rowCount > 0) {
                res.status(200).json({ 
                    message: 'Brand deleted successfully.' 
                })
            } else {
                res.status(404).json({ 
                    message: 'Brand not found.' 
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new BrandController