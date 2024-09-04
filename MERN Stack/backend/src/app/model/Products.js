const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const Products = new Schema({
    csw_products: { type: String, maxLength: 255, required: true },
    createdAt: { type: Date, default: Date.now },
    type: { type: String, maxLength: 255, required: true },
    description: { type: String },
    price: { type: Number, maxLength: 255, required: true },
    photo: [{type: String, required: true }]
}, { timestamps: true })

Products.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('products', Products)