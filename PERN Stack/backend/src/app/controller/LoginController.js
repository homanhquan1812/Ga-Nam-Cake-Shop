const { pool } = require('../../../config/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { use } = require('../../route/cart')

class LoginController
{
    // [POST] /login
    async login(req, res, next) {
        const { username, password } = req.body

        try {
            const userQuery = `SELECT * FROM member_information WHERE username = $1;`
            const userResult = await pool.query(userQuery, [username])
            const userLogin = userResult.rows[0]
            
            if (!userLogin) {
                return res.status(401).json({ 
                    message: 'This username doesn\'t exist.' 
                })
            }

            const isMatch = await bcrypt.compare(password, userLogin.password)

            if (!isMatch) {
                return res.status(401).json({ 
                    message: 'Password is incorrect.' 
                })
            }

            // Customers
            let userLoginQuery = `SELECT * FROM member_information INNER JOIN customer ON customer.member_information_id = member_information.id WHERE username = $1;`
            let userLoginResult = await pool.query(userLoginQuery, [username])

            // Staffs
            if (userLoginResult.rows.length === 0) {
                userLoginQuery = `SELECT * FROM member_information INNER JOIN staff ON staff.member_information_id = member_information.id WHERE username = $1;`
                userLoginResult = await pool.query(userLoginQuery, [username])
            }

            const token = jwt.sign({
                id: userLoginResult.rows[0].id,
                username: userLogin.username,
                full_name: userLogin.full_name, 
                brand_id: userLogin.brand_id,
                role: userLogin.role,
                branch_id: userLogin.branch_id
            }, process.env.SECRET_KEY, { expiresIn: '24h' })

            res.status(200).json({
                message: 'Login successful',
                token: token,
                user: {
                    id: userLoginResult.rows[0].id,
                    username: userLogin.username,
                    full_name: userLogin.full_name,
                    brand_id: userLogin.brand_id,
                    role: userLogin.role,
                    branch_id: userLogin.branch_id
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginController