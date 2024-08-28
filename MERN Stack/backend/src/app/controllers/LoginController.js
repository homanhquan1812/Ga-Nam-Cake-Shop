const Customers = require('../models/Customers')
const Staffs = require('../models/Staffs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class LoginController
{
    // [POST] /login
    async login(req, res, next) {
        const { csw_username, csw_password } = req.body

        try {
            // Find a user
            const customerMatch = await Customers.findOne({ csw_username: csw_username })
            const staffMatch = await Staffs.findOne({ csw_username: csw_username })
            
            if (!customerMatch && !staffMatch) {
                return res.status(401).json({
                    message: 'This username doesn\'t exists.'
                })
            }
            else if (customerMatch) {
                // Check customer's password
                const customerIsMatch = await bcrypt.compare(csw_password, customerMatch.csw_password)

                if (!customerIsMatch) {
                    return res.status(401).json({
                        message: 'Password is incorrect for this customer.'
                    })
                }

                const token = jwt.sign({ id: customerMatch._id, username: customerMatch.csw_username, name: customerMatch.csw_name }, process.env.SECRET_KEY, { expiresIn: '1h' })
                req.session.username = customerMatch.csw_username

                // Send JWT token and user info as JSON response
                res.json({
                    message: 'Login successful for this customer.',
                    token: token,
                    user: {
                        id: customerMatch._id,
                        username: customerMatch.csw_username,
                        name: customerMatch.csw_name,
                        customerSession: req.session.username
                    }
                })
            } else {
                // Check staff's password
                const staffIsMatch = await bcrypt.compare(csw_password, staffMatch.csw_password)

                if (!staffIsMatch) {
                    return res.status(401).json({
                        message: 'Password is incorrect for this staff.'
                    })
                }

                const token = jwt.sign({ id: staffMatch._id, username: staffMatch.csw_username, password: csw_password, name: staffMatch.csw_name, position: staffMatch.csw_position }, process.env.SECRET_KEY, { expiresIn: '1h' })

                // Send JWT token and user info as JSON response
                res.json({
                    message: 'Login successful for this staff.',
                    token: token,
                    user: {
                        id: staffMatch._id,
                        username: staffMatch.csw_username,
                        name: staffMatch.csw_name,
                        position: staffMatch.csw_position
                    }
                })
            } 
        } catch (error) {
            next(error)
        }
    }

    // [POST] /register
    async register(req, res, next)
    {
        try {
            const { 
                csw_name,
                csw_gender,
                csw_phonenumber,
                csw_address,
                csw_username,
                csw_emailaddress,
                csw_password
            } = req.body
            const userCheck = await Customers.findOne({ csw_username: csw_username })

            if (userCheck) {
                res.status(401).json({
                    message: 'This customer already exists.'
                })
            }
            else {
                // Hashing + Salting
                const saltRounds = 10; // Min: 10 = Enough, Max: 12 = Slower performance but better security
                const hashedPassword = await bcrypt.hash(csw_password, saltRounds);
                const newUser = new Customers({ csw_name, csw_gender, csw_phonenumber, csw_address, csw_username, csw_emailaddress, csw_password: hashedPassword });
                await newUser.save()

                res.status(201).json({
                    message: 'Registered successfully!'
                })

            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginController