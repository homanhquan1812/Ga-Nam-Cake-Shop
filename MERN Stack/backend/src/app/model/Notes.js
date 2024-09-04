const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const Notes = new Schema({
    csw_notes: { type: String, maxLength: 255, required: true }
}, { timestamps: true })

Notes.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('notes', Notes)