require('dotenv').config()

const bcrypt = require('bcrypt')
const { pool } = require('../../../config/db')

class RegisterController
{
    // [POST] /register/customer
    async customerRegister(req, res, next)
    {
        try {
            const { full_name, username, password, email, phone, gender, address } = req.body
            const brand_id = process.env.BRAND_ID

            if (!full_name || !username || !password || !email || !phone || !gender || !address) {
                return res.status(400).json('All required fields must be filled.')
            }

            const checkBrand_id = await pool.query(`SELECT id FROM brand WHERE id = $1`, [brand_id])
            const convertToBoolean = checkBrand_id.rows.length > 0 // > 0 is to use true|false, not 0|1

            if (!convertToBoolean) {
                return res.status(404).json('Incorrect brand_id.')
            }

            const userCheckQuery = `SELECT 1 FROM member_information WHERE username = $1`
            const userCheckResult = await pool.query(userCheckQuery, [username])

            if (userCheckResult.rowCount > 0) {
                return res.status(401).json('This username already exists.')
            }
   
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const memberInfoQuery = `
                INSERT INTO member_information (full_name, username, password, role, email, phone, gender, address)
                VALUES ($1, $2, $3, 'Customer', $4, $5, $6, $7)
                RETURNING id
            `;
            const memberInfoValues = [full_name, username, hashedPassword, email, phone, gender, address];
            const memberInfoResult = await pool.query(memberInfoQuery, memberInfoValues);
            const member_information_id = memberInfoResult.rows[0].id; // Get the generated UUID

            // const cart = { total_price: 0, items: [] };
            const customerQuery = `
                INSERT INTO customer (member_information_id, brand_id)
                VALUES ($1, $2)
                RETURNING id
            `; // 'cart' removed
            const customerValues = [member_information_id, brand_id]; // 'JSON.stringify(cart)' removed

            await pool.query(customerQuery, customerValues);

            res.status(201).json('User registered successfully.');
        } catch (error) {
            next(error)
        }
    }

    // [POST] /register/staff
    async staffRegister(req, res, next)
    {
        try {
            const { full_name, username, password, email, phone, gender, address, role, salary, brand_id, branch_id } = req.body

            if (!full_name || !username || !password || !email || !phone || !gender || !address || !role || !salary || !brand_id || !branch_id) {
                return res.status(400).json('All required fields must be filled.')
            }

            const checkBrand_id = await pool.query(`SELECT id FROM brand WHERE id = $1`, [brand_id])
            const convertToBoolean1 = checkBrand_id.rows.length > 0 // > 0 is to use true|false, not 0|1

            if (!convertToBoolean1) {
                return res.status(404).json('Incorrect brand_id.')
            }

            const checkBranch_id = await pool.query(`SELECT id FROM branch WHERE id = $1`, [branch_id])
            const convertToBoolean2 = checkBranch_id.rows.length > 0 // > 0 is to use true|false, not 0|1

            if (!convertToBoolean2) {
                return res.status(404).json('Incorrect branch_id.')
            }

            const userCheckQuery = `SELECT 1 FROM member_information WHERE username = $1`
            const userCheckResult = await pool.query(userCheckQuery, [username])

            if (userCheckResult.rowCount > 0) {
                return res.status(401).json('This username already exists.')
            }
   
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            const memberInfoQuery = `
                INSERT INTO member_information (full_name, username, password, role, email, phone, gender, address)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id
            `;
            const memberInfoValues = [full_name, username, hashedPassword, role, email, phone, gender, address];
            const memberInfoResult = await pool.query(memberInfoQuery, memberInfoValues);
            const member_information_id = memberInfoResult.rows[0].id;
            const staffQuery = `
                INSERT INTO staff (member_information_id, brand_id, branch_id, salary)
                VALUES ($1, $2, $3, $4)
                RETURNING id
            `; 
            const staffValues = [member_information_id, brand_id, branch_id, salary]; 

            await pool.query(staffQuery, staffValues);

            res.status(201).json('Staff registered successfully.');
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RegisterController