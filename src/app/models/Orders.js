const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

mongoose.plugin(slug)

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const DetailedProduct = new Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    photo: [{type: String, required: true }],
    name: { type: String, maxLength: 255, required: true },
    price: { type: Number, maxLength: 255, required: true },
    qty: { type: Number, maxLength: 255, required: true },
    totalCost: { type: Number, maxLength: 255, required: true}
})

const Orders = new Schema({
    customer: { type: String, maxLength: 255, required: true },
    phonenumber: { type: String, maxLength: 255, required: true},
    address: { type: String, maxLength: 255, required: true },
    csw_username: { type: String, maxLength: 255, required: true },
    products: [DetailedProduct],
    totalcost: { type: Number, maxLength: 255, required: true },
    delivered: {type: Boolean},
    declined: {type: Boolean}
    // slug: { type: String, slug: 'name', unique: true }
}, { timestamps: true });

Orders.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('orders', Orders)