require('dotenv').config()

const bcrypt = require('bcrypt')
const { pool } = require('../../../config/db')

class RegisterController
{
    // [POST] /register
    async register(req, res, next)
    {
        try {
            const { name, username, password, key, email, phonenumber, gender, position, address } = req.body

            // Validate input fields
            if (!name || !username || !password || !email || !phonenumber || !gender || !address || (key === undefined)) {
                return res.status(400).json('All required fields must be filled.')
            }

            const userCheckQuery = 'SELECT 1 FROM users WHERE username = $1 UNION ALL SELECT 1 FROM admins WHERE username = $1 LIMIT 1'
            const userCheckResult = await pool.query(userCheckQuery, [username])

            // Account must be unique
            if (userCheckResult.rowCount > 0) {
                return res.status(401).json('This username already exists.')
            }
            
            // Hashing + Salting
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)

            // User registration
            if (key !== process.env.MANAGER_KEY && key !== process.env.EMPLOYEE_KEY) {
                const cart = { totalPrice: 0, items: [] }

                const registerUserQuery = `
                    INSERT INTO users (name, username, password, role, email, phonenumber, cart, gender, address)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    RETURNING id
                `
                const registerUserValues = [name, username, hashedPassword, 'User', email, phonenumber, JSON.stringify(cart), gender, address]
                await pool.query(registerUserQuery, registerUserValues)

                res.status(201).json('User registered successfully.')
            } 
            // Employee registration
            else if (key === process.env.EMPLOYEE_KEY) {
                const registerAdminQuery = `
                    INSERT INTO admins (name, username, password, role, email, phonenumber, gender, position, address)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    RETURNING id
                `
                const registerAdminValues = [name, username, hashedPassword, 'Employee', email, phonenumber, gender, position, address]
                await pool.query(registerAdminQuery, registerAdminValues)

                res.status(201).json('Employee registered successfully.')
            }    
            // Manager registration
            else if (key === process.env.MANAGER_KEY) {
                const registerAdminQuery = `
                    INSERT INTO admins (name, username, password, role, email, phonenumber, gender, position, address)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                    RETURNING id
                `
                const registerAdminValues = [name, username, hashedPassword, 'Manager', email, phonenumber, gender, position, address]
                await pool.query(registerAdminQuery, registerAdminValues)

                res.status(201).json('Manager registered successfully.')
            }     
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RegisterController