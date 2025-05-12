require('dotenv').config()

const { pool } = require('../../../config/db')

class BranchController
{
    // [GET] /branch
    async readAllBranches(req, res, next) {
        try {
            const branchQuery = 'SELECT * FROM branch;'
            const branchResult = await pool.query(branchQuery)

            res.status(200).json({
                branch: branchResult.rows
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /branch
    async createABranch(req, res, next) {
        try {
            const { address, phone, brand_id } = req.body

            if (!brand_id) {
                return res.status(404).json('Please enter brand_id.')
            }

            const checkBrand_id = await pool.query(`SELECT id FROM brand WHERE id = $1`, [brand_id])
            const convertToBoolean = checkBrand_id.rows.length > 0 // > 0 is to use true|false, not 0|1

            if (!convertToBoolean) {
                return res.status(404).json('Incorrect brand_id.')
            }

            const query = `
                INSERT INTO branch (address, phone, brand_id) VALUES ($1, $2, $3)
                RETURNING id;
            `
            const values = [address, phone, brand_id]
            const result = await pool.query(query, values)

            res.status(201).json({
                message: 'Branch added.',
                id: result.rows[0].id
            })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /branch/:id
    async deleteABranch(req, res, next) {
        try {
            const id = req.params.id;
            const deleteQuery = 'DELETE FROM branch WHERE id = $1'
            const result = await pool.query(deleteQuery, [id])

            if (result.rowCount > 0) {
                res.status(200).json({ 
                    message: 'Branch deleted successfully.' 
                })
            } else {
                res.status(404).json({ 
                    message: 'Branch not found.' 
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new BranchController