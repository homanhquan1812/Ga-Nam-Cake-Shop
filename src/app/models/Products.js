const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

mongoose.plugin(slug)

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Products = new Schema({
    csw_products: { type: String, maxLength: 255, required: true },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, maxLength: 255, required: true },
    description: { type: String, maxLength: 255, required: true },
    price: { type: Number, maxLength: 255, required: true },
    // slug: { type: String, slug: 'name', unique: true }
}, { timestamps: true });

Products.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('products', Products)