const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const Feedbacks = new Schema({
    firstName: { type: String, maxLength: 255, required: true },
    lastName: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true },
    phone: { type: String, maxLength: 255, required: true },
    message: { type: String, required: true }
}, { timestamps: true })

Feedbacks.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('feedbacks', Feedbacks)