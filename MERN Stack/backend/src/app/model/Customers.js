const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema

const DetailedProduct = new Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        ref: 'products',
        required: true
    },
    photo: [{type: String, ref: 'products', required: true }],
    name: { type: String, ref: 'products', maxLength: 255, required: true },
    price: { type: Number, ref: 'products', maxLength: 255, required: true },
    qty: { type: Number, maxLength: 255, required: true },
    totalPrice: { type: Number, maxLength: 255, required: true}
})

const Customers = new Schema({
    csw_name: { type: String, maxLength: 255, required: true },
    csw_gender: { type: String, maxLength: 255, required: true},
    csw_phonenumber: { type: String, maxLength: 255, required: true, unique: true },
    csw_address: { type: String, maxLength: 255, required: true },
    csw_username: { type: String, maxLength: 255, required: true, unique: true },
    csw_emailaddress: { type: String, maxLength: 255, required: true, unique: true },
    csw_password: { type: String, maxLength: 255, required: true },
    csw_cart: { items: [DetailedProduct], totalPrice: { type: Number, default: 0} }
}, { timestamps: true })

Customers.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('customers', Customers)