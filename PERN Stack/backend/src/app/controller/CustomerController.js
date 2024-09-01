const { pool } = require('../../../config/db')

class CustomerController
{
    // [GET] /customer
    async readAllCustomers(req, res, next) {
        try {
            const customerQuery = 'SELECT id, name, gender, phonenumber, email, address FROM users;'
            const customerResult = await pool.query(customerQuery)

            res.status(200).json({
                customer: customerResult.rows
            })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /customer/:id
    async deleteACustomer(req, res, next) {
        try {
            const id = req.params.id;
            const deleteQuery = 'DELETE FROM users WHERE id = $1'
            const result = await pool.query(deleteQuery, [id])

            if (result.rowCount > 0) {
                res.status(200).json({ 
                    message: 'User deleted successfully.' 
                })
            } else {
                res.status(404).json({ 
                    message: 'User not found.' 
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CustomerController