require('dotenv').config()

const Staffs = require('../model/Staffs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class StaffController
{
    // [GET] /staff
    async readAllStaffs(req, res, next) {
        try {
            const staff = await Staffs.find({})

            res.status(200).json({
                staff: multipleMongooseToObject(staff)
            })
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /staff/info/{API_KEY}
    async updateInfo(req, res, next) {
        const { csw_name, csw_emailaddress, csw_phonenumber } = req.body
        const token = req.headers.authorization.split(' ')[1]

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const staff = await Staffs.findById(decoded._id)

            if (!staff) {
                return res.status(404).json({ message: "This ID doesn't exist." })
            }

            await Staffs.findByIdAndUpdate(decoded._id, {
                csw_name, csw_emailaddress, csw_phonenumber
            })

            const newToken = jwt.sign({
                _id: staff._id,
                csw_username: staff.csw_username,
                csw_name: csw_name,
                csw_emailaddress: csw_emailaddress,
                csw_phonenumber: csw_phonenumber,
                csw_department: staff.csw_department,
                csw_position: staff.csw_position,
                csw_gender: staff.csw_gender
            }, process.env.SECRET_KEY, { expiresIn: '1h' })

            res.status(200).json({
                message: "Information updated successfully.",
                csw_name: csw_name,
                csw_emailaddress: csw_emailaddress,
                csw_phonenumber: csw_phonenumber,
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
            const staff = await Staffs.findById(decoded._id)

            if (!staff) {
                return res.status(404).json("This ID doesn't exist.")
            }

            const passwordMatch = await bcrypt.compare(oldPassword, staff.csw_password)

            if (!passwordMatch) {
                return res.status(401).json('Old password is incorrect.')
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)

            await Staffs.findByIdAndUpdate(decoded._id, {
                csw_password: hashedPassword
            })

            res.status(200).json('Password updated successfully.')
            
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /staff/rap/{API_KEY}/:id
    async updateRoleAndPosition(req, res, next) {
        try {
            const { csw_position, csw_department } = req.body
            console.log(csw_position, csw_department)
            const staff = await Staffs.findByIdAndUpdate(req.params.id, req.body)

            if (!staff) {
                res.status(404).json('No staff found.')
            }

            res.status(200).json({ 
                message: 'Staff updated successfully.'
            })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /staff/{API_KEY}/:id
    async deleteAStaff(req, res, next) {
        try {
            const staff = await Staffs.findById(req.params.id)

            if (!staff) {
                res.status(404).json('No staff found.')
            }

            await staff.delete()

            res.status(200).json({ 
                message: 'Staff deleted successfully.'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new StaffController