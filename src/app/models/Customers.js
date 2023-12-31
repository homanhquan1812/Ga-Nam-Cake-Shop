const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

mongoose.plugin(slug)

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DatabaseInfo2 = new Schema({
    csw_name: { type: String, maxLength: 255, required: true },
    csw_gender: { type: String, maxLength: 255, required: true},
    csw_phonenumber: { type: String, maxLength: 255, required: true },
    csw_address: { type: String, maxLength: 255, required: true },
    csw_username: { type: String, maxLength: 255, required: true },
    csw_emailaddress: { type: String, maxLength: 255, required: true },
    csw_password: { type: String, maxLength: 255, required: true },
    // slug: { type: String, slug: 'name', unique: true }
}, { timestamps: true });

DatabaseInfo2.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('customers', DatabaseInfo2)