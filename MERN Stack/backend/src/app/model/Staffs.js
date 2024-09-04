const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const Staffs = new Schema({
    csw_name: { type: String, maxLength: 255, required: true },
    csw_gender: { type: String, maxLength: 255, required: true },
    csw_phonenumber: { type: String, maxLength: 255, required: true, unique: true },
    csw_username: { type: String, maxLength: 255, required: true, unique: true },
    csw_emailaddress: { type: String, maxLength: 255, required: true, unique: true },
    csw_password: { type: String, maxLength: 255, required: true },
    csw_position: { type: String, maxLength: 255, required: true },
    csw_department: { type: String, maxLength: 255 }
}, { timestamps: true })

Staffs.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('staffs', Staffs)