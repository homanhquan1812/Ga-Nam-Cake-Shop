const Customers = require('../model/Customers')
const Staffs = require('../model/Staffs')
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
                    message: 'This username doesn\'t exist.'
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

                const token = jwt.sign({ 
                    _id: customerMatch._id, 
                    csw_username: customerMatch.csw_username, 
                    csw_gender: customerMatch.csw_gender,
                    csw_phonenumber: customerMatch.csw_phonenumber,
                    csw_address: customerMatch.csw_address,
                    csw_name: customerMatch.csw_name,
                    csw_emailaddress: customerMatch.csw_emailaddress,
                    csw_cart: customerMatch.csw_cart
                }, process.env.SECRET_KEY, { expiresIn: '1h' })
                req.session.username = customerMatch.csw_username

                // Send JWT token and user info as JSON response
                res.json({
                    message: 'Login successful for this customer.',
                    token: token,
                    user: {
                        _id: customerMatch._id,
                        csw_username: customerMatch.csw_username,
                        csw_name: customerMatch.csw_name                    }
                })
            } else {
                // Check staff's password
                const staffIsMatch = await bcrypt.compare(csw_password, staffMatch.csw_password)

                if (!staffIsMatch) {
                    return res.status(401).json({
                        message: 'Password is incorrect for this staff.'
                    })
                }

                const token = jwt.sign({ 
                    _id: staffMatch._id, 
                    csw_username: staffMatch.csw_username, 
                    csw_gender: staffMatch.csw_gender,
                    csw_phonenumber: staffMatch.csw_phonenumber,
                    csw_address: staffMatch.csw_address,
                    csw_name: staffMatch.csw_name,
                    csw_emailaddress: staffMatch.csw_emailaddress,
                    csw_position: staffMatch.csw_position,
                    csw_department: staffMatch.csw_department,
                 }, process.env.SECRET_KEY, { expiresIn: '1h' })

                // Send JWT token and user info as JSON response
                res.json({
                    message: 'Login successful for this staff.',
                    token: token,
                    user: {
                        id: staffMatch._id,
                        csw_username: staffMatch.csw_username,
                        csw_name: staffMatch.csw_name,
                        csw_position: staffMatch.csw_position,
                        csw_department: staffMatch.csw_department,
                    }
                })
            } 
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new LoginController