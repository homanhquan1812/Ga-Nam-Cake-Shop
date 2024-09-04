require('dotenv').config()

const Customers = require('../model/Customers')
const Staffs = require('../model/Staffs')
const bcrypt = require('bcrypt')

class RegisterController
{
    // [POST] /register
    async register(req, res, next)
    {
        try {
            const { csw_name, csw_gender, csw_phonenumber, csw_address, csw_username, csw_emailaddress, csw_password, key } = req.body

            // Validate input fields
            if (!csw_name || !csw_username || !csw_password || !csw_emailaddress || !csw_phonenumber || !csw_gender || !csw_address) {
                return res.status(400).json('All required fields must be filled.')
            }

            // Find a user
            const customerMatch = await Customers.findOne({
                $or: [
                    { csw_username: csw_username },
                    { csw_emailaddress: csw_emailaddress },
                    { csw_phonenumber: csw_phonenumber }
                ]
            })
    
            const staffMatch = await Staffs.findOne({
                $or: [
                    { csw_username: csw_username },
                    { csw_emailaddress: csw_emailaddress },
                    { csw_phonenumber: csw_phonenumber }
                ]
            })
    
            if (customerMatch || staffMatch) {
                return res.status(401).json({
                    message: 'This username, email address, or phone number already exists.'
                })
            }
            
            // Hashing + Salting
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(csw_password, saltRounds)

            // User registration
            if (key !== process.env.MANAGER_KEY && key !== process.env.EMPLOYEE_KEY) {
                const newUser = new Customers({ csw_name, csw_gender, csw_phonenumber, csw_address, csw_username, csw_emailaddress, csw_password: hashedPassword })

                await newUser.save()

                res.status(201).json('User registered successfully.')
            } 
            // Employee registration
            else if (key === process.env.EMPLOYEE_KEY) {
                const newEmployee = new Staffs({ csw_name, csw_gender, csw_phonenumber, csw_address, csw_username, csw_emailaddress, csw_password: hashedPassword, csw_position: 'Employee', csw_department: '' })

                await newEmployee.save()

                res.status(201).json('Employee registered successfully.')
            }    
            // Manager registration
            else if (key === process.env.MANAGER_KEY) {
                const newManager = new Staffs({ csw_name, csw_gender, csw_phonenumber, csw_address, csw_username, csw_emailaddress, csw_password: hashedPassword, csw_position: 'Manager', csw_department: '' })

                await newManager.save()

                res.status(201).json('Manager registered successfully.')
            }     
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new RegisterController