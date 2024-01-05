const mongoose = require('mongoose')
const slug = require('mongoose-slug-updater')
const mongooseDelete = require('mongoose-delete')

mongoose.plugin(slug)

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const products = require('./Products');
const order = require('./Orders')

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
    totalCost: { type: Number, maxLength: 255, required: true}
})

const DatabaseInfo2 = new Schema({
    csw_name: { type: String, maxLength: 255, required: true },
    csw_gender: { type: String, maxLength: 255, required: true},
    csw_phonenumber: { type: String, maxLength: 255, required: true },
    csw_address: { type: String, maxLength: 255, required: true },
    csw_username: { type: String, maxLength: 255, required: true },
    csw_emailaddress: { type: String, maxLength: 255, required: true },
    csw_password: { type: String, maxLength: 255, required: true },
    csw_cart: {items: [DetailedProduct], totalPrice: Number}
    // slug: { type: String, slug: 'name', unique: true }
}, { timestamps: true });

DatabaseInfo2.methods.addToCart = async function(product) {
    const cart = this.csw_cart;
    const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
    console.log(isExisting);
    console.log(product)
    console.log(typeof product._id)
    if (isExisting >= 0) {
        cart.items[isExisting].qty += 1;
        cart.items[isExisting].totalCost += product.price
    } else {
        cart.items.push({ productId: product._id, qty: 1, photo: product.photo, price: product.price, name: product.csw_products, totalCost: product.price});
    }
    if (!cart.totalPrice) {
        cart.totalPrice = 0;
    }
    cart.totalPrice += product.price;
    console.log(cart)
    return this.save();

};

DatabaseInfo2.methods.addToCart2 = async function(product, quantity) {
    const cart = this.csw_cart;
    const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
    console.log(isExisting);
    console.log(product)
    console.log(typeof quantity)
    if (isExisting >= 0) {
        cart.items[isExisting].qty += quantity;
        cart.items[isExisting].totalCost += product.price * quantity
    } else {
        cart.items.push({ productId: product._id, qty: quantity, photo: product.photo, price: product.price, name: product.csw_products, totalCost: product.price * quantity});
    }
    if (!cart.totalPrice) {
        cart.totalPrice = 0;
    }
    cart.totalPrice += product.price * quantity;
    console.log(cart)
    return this.save();

};

DatabaseInfo2.methods.removeFromCart = async function(product) {
    const cart = this.csw_cart;
    const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
    if (isExisting >= 0) {
        cart.totalPrice -= product.price * cart.items[isExisting].qty;
        cart.items.splice(isExisting, 1);
        return this.save();
    }
}
DatabaseInfo2.methods.sendDataToOrder = async function(customer) {
    const newData = {
        field1: 'value1',
        field2: 'value2',
        // ... other fields
    };
    order.insertOne({customer: customer.csw_name})
}

DatabaseInfo2.methods.changingQuantity = async function(product, quantity) {
    const cart = this.csw_cart;
    const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
    if (isExisting >= 0) {
        const a = quantity - cart.items[isExisting].qty;
        cart.totalPrice += product.price * a;
        cart.items[isExisting].qty += a;
        cart.items[isExisting].totalCost += product.price * a
        return this.save();
    }
}

DatabaseInfo2.methods.removeAllFromCart = async function(customer) {
    const cart = this.csw_cart;
    cart.items = [];
    cart.totalPrice = 0;
    return this.save();
}

DatabaseInfo2.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
})

module.exports = mongoose.model('customers', DatabaseInfo2)