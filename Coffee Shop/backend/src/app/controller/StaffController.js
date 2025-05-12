require('dotenv').config()

const { pool } = require('../../../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class StaffController
{
    // [GET] /staff
    async readAllStaffs(req, res, next) {
        try {
            const staffQuery = 'SELECT * FROM member_information INNER JOIN staff ON staff.member_information_id = member_information.id;'
            const staffResult = await pool.query(staffQuery)

            res.status(200).json({
                staff: staffResult.rows
            })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /staff/info
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
                FROM staff WHERE staff.member_information_id = member_information.id AND staff.id = $6
                RETURNING member_information.*;
            `
            const adminQuery = 'SELECT * FROM staff INNER JOIN member_information ON staff.member_information_id = member_information.id WHERE staff.id = $1;'
            const result = await pool.query(adminQuery, [id])
            const staff = result.rows[0]
            const passwordMatch = await bcrypt.compare(oldPassword, staff.password)

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

    // [PUT] /staff/role/:id
    async updateRole(req, res, next) {
        try {
            const id = req.params.id
            const { role } = req.body
            const updateQuery = `
                UPDATE member_information
                SET role = COALESCE($1, role)
                FROM staff WHERE staff.member_information_id = member_information.id AND staff.id = $2
                RETURNING member_information.*;
            `;
            const values = [role, id]
            const result = await pool.query(updateQuery, values)

            if (result.rowCount > 0) {
                res.status(200).json({ 
                    message: 'Staff\'s role updated successfully.'
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

    // [DELETE] /staff/:id
    async deleteAStaff(req, res, next) {
        try {
            const id = req.params.id;
            const deleteQuery = 'DELETE FROM staff WHERE id = $1'
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