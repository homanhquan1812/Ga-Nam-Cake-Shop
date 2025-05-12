const { pool } = require('../../../config/db')

class CustomerController
{
    // [GET] /customer
    async readAllCustomers(req, res, next) {
        try {
            const customerQuery = 'SELECT * FROM member_information INNER JOIN customer ON customer.member_information_id = member_information.id;'
            const customerResult = await pool.query(customerQuery)

            res.status(200).json({
                customer: customerResult.rows
            })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /customercustomer/info
    async updateInfo(req, res, next) {
        const { username, email, phone, address, oldPassword, newPassword } = req.body
        const token = req.headers.authorization.split(' ')[1]

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const id = decoded.id
            const updateAdminQuery = `
                UPDATE member_information
                SET email = COALESCE($1, username), phone = COALESCE($2, phone), address = COALESCE($3, address), username = COALESCE($4, username),
                password = COALESCE($5, password)
                FROM customercustomer WHERE customercustomer.member_information_id = member_information.id AND customercustomer.id = $6
                RETURNING member_information.*;
            `
            const adminQuery = 'SELECT * FROM customercustomer INNER JOIN member_information ON customercustomer.member_information_id = member_information.id WHERE customercustomer.id = $1;'
            const result = await pool.query(adminQuery, [id])
            const customercustomer = result.rows[0]
            const passwordMatch = await bcrypt.compare(oldPassword, customercustomer.password)

            if (!passwordMatch) {
                return res.status(401).json('Old password is incorrect.')
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)
            let result2 = await pool.query(updateAdminQuery, [email, phone, address, username, hashedPassword, id])
            console.log(result.rows[0]) // To use 'RETURNING member_information.*'

            if (result2.rows.length === 0) {
                return res.status(404).json({ message: "This ID doesn't exist." })
            }

            const updatedUser = result.rows[0]
            const newToken = jwt.sign({
                id: updatedUser.id,
                username: updatedUser.username,
                name: updatedUser.name,
                role: updatedUser.role,
            }, process.env.SECRET_KEY, { expiresIn: '1h' })

            res.status(200).json({
                message: "Information updated successfully.",
                token: newToken
            })
            
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /customer/:id
    async deleteACustomer(req, res, next) {
        try {
            const id = req.params.id;
            const deleteQuery = 'DELETE FROM customer WHERE id = $1'
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