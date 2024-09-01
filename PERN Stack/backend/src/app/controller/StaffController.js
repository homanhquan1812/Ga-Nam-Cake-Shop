require('dotenv').config()

const { pool } = require('../../../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class StaffController
{
    // [GET] /staff
    async readAllStaffs(req, res, next) {
        try {
            const staffQuery = 'SELECT id, name, gender, phonenumber, email, position, role FROM admins;'
            const staffResult = await pool.query(staffQuery)

            res.status(200).json({
                staff: staffResult.rows
            })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /staff/info/{API_KEY}
    async updateInfo(req, res, next) {
        const { name, email, phonenumber, address } = req.body
        const token = req.headers.authorization.split(' ')[1]

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const id = decoded.id
            const updateAdminQuery = `
                UPDATE admins
                SET name = $1, email = $2, phonenumber = $3, address = $4
                WHERE id = $5
                RETURNING *
            `
            let result = await pool.query(updateAdminQuery, [name, email, phonenumber, address, id])

            if (result.rows.length === 0) {
                return res.status(404).json({ message: "This ID doesn't exist." })
            }

            const updatedUser = result.rows[0]

            // Generate a new JWT with updated details
            const newToken = jwt.sign({
                id: updatedUser.id,
                username: updatedUser.username,
                name: updatedUser.name,
                email: updatedUser.email,
                phonenumber: updatedUser.phonenumber,
                role: updatedUser.role,
                position: updatedUser.position,
                gender: updatedUser.gender,
                address: updatedUser.address
            }, process.env.SECRET_KEY, { expiresIn: '1h' })

            res.status(200).json({
                message: "Information updated successfully.",
                name: updatedUser.name,
                email: updatedUser.email,
                phonenumber: updatedUser.phonenumber,
                address: updatedUser.address,
                token: newToken
            })
            
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /staff/password/{API_KEY}
    async updatePassword(req, res, next) {
        const { oldPassword, newPassword } = req.body
        const token = req.headers.authorization.split(' ')[1]

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const id = decoded.id
            const adminQuery = 'SELECT * FROM admins WHERE id = $1'

            let result = await pool.query(adminQuery, [id])

            if (result.rows.length === 0) {
                return res.status(404).json("This ID doesn't exist.")
            }

            const user = result.rows[0]
            const passwordMatch = await bcrypt.compare(oldPassword, user.password)

            if (!passwordMatch) {
                return res.status(401).json('Old password is incorrect.')
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)

            const updatePasswordQuery = `
                UPDATE admins
                SET password = $1
                WHERE id = $2
            `
            await pool.query(updatePasswordQuery, [hashedPassword, id])

            res.status(200).json('Password updated successfully.')
            
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /staff/rap/{API_KEY}/:id
    async updateRoleAndPosition(req, res, next) {
        try {
            const id = req.params.id
            const { role, position } = req.body
            const updateQuery = `
                UPDATE admins
                SET role = $1, position = $2
                WHERE id = $3
                RETURNING role, position;
            `;
            const values = [role, position, id]
            const result = await pool.query(updateQuery, values)

            if (result.rowCount > 0) {
                res.status(200).json({ 
                    message: 'Staff updated successfully.',
                    staff: result.rows[0]
                })
            } else {
                res.status(404).json({ 
                    message: 'Staff not found.' 
                })
            }
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /staff/{API_KEY}/:id
    async deleteAStaff(req, res, next) {
        try {
            const id = req.params.id;
            const deleteQuery = 'DELETE FROM admins WHERE id = $1'
            const result = await pool.query(deleteQuery, [id])

            if (result.rowCount > 0) {
                res.status(200).json({ 
                    message: 'Staff deleted successfully.' 
                })
            } else {
                res.status(404).json({ 
                    message: 'Staff not found.' 
                })
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new StaffController