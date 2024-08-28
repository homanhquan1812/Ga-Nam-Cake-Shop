const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

mongoose.plugin(slug)

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Feedbacks = new Schema({
    firstName: { type: String, maxLength: 255, required: true },
    lastName: { type: String, maxLength: 255, required: true },
    email: { type: String, maxLength: 255, required: true },
    phone: { type: String, maxLength: 255, required: true },
    message: { type: String, required: true }
    // slug: { type: String, slug: 'name', unique: true }
}, { timestamps: true });

Feedbacks.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('feedbacks', Feedbacks)