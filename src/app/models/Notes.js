const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

mongoose.plugin(slug)

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Notes = new Schema({
    csw_notes: { type: String, maxLength: 255, required: true }
    // slug: { type: String, slug: 'name', unique: true }
}, { timestamps: true });

Notes.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('notes', Notes)