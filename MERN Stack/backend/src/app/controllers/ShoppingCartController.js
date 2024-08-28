const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const Customers = require('../models/Customers');
const Products = require('../models/Products')
const Orders = require('../models/Orders')

class ShoppingCartController
{
    index(req, res, next)
    {
        const csw_name = req.session.username
        Customers.findOne({csw_username: csw_name})
        .then(info => {
            res.render('shoppingcart', {
                isLoggedIn: req.session.username ? true : false,
                username: req.session.username,
                styles: [
                    '/css/lightbox.min.css',
                    '/css/owl.carousel.min.css',
                    '/css/owl.theme.default.min.css',
                    '/css/main.css',
                    '/css/linea-icon.css',
                    '/css/lightbox.min.css'
                ],
                scripts: [
                    '/js/jquery.countup.min.js',
                    '/js/lightbox.min.js',
                    '/js/isotope.pkgd.min.js',
                    '/js/owl.carousel.min.js',
                    '/js/util.js',
                    '/js/main-backtotop.js',
                    '/js/main.js',
                    '/js/script.js'
                ],
                info: mongooseToObject(info),
                csw_name
        })
        })
        .catch(next)
    }

    async addToCart(req, res, next){
        console.log(req.body);
        try {
            const customer = await Customers.findOne({csw_username: req.session.username});
            if (customer) {
                const product = await Products.findOne({_id: req.body.id});
                if (product) {
                    customer.addToCart(product)
                    .then(() => {
                        res.redirect('/gallery')
                    }).catch(err => console.log(err));
                }
            }
            else {
                console.log('Error')
                res.redirect('/home')
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: req.body });
        }
    }

    async addToCart3(req, res, next){
        console.log(req.body);
        try {
            const customer = await Customers.findOne({csw_username: req.session.username});
            if (customer) {
                const product = await Products.findOne({_id: req.body.id});
                if (product) {
                    customer.addToCart(product)
                    .then(() => {
                        res.redirect(`/product_details/${product._id}`);
                    }).catch(err => console.log(err));
                }
            }
            else {
                console.log('Error')
                res.redirect('/home')
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: req.body });
        }
    }

    async addToCart2(req, res, next){
        console.log(req.body);
        try {
            const customer = await Customers.findOne({csw_username: req.session.username});
            if (customer) {
                const product = await Products.findOne({_id: req.body.id});
                if (product) {
                    customer.addToCart2(product, parseInt(req.body.quantityInput))
                    .then(() => {
                        res.redirect('/shoppingcart')
                    }).catch(err => console.log(err));
                }
            }
            else {
                console.log('Error')
                res.redirect('/home')
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: req.body });
        }
    }

    //getCart
    
    async deleteInCart(req, res, next){
        try {
            const customer = await Customers.findOne({csw_username: req.session.username});
            if (customer) {
                const product = await Products.findOne({_id: req.body.id});
                if (product) {
                    customer.removeFromCart(product)
                    .then(() => {
                        res.redirect('/shoppingcart')
                    }).catch(err => console.log(err));
                }
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: req.body });
        }
    }

    async sendToOrder(req, res, next){
        try {
            const customer = await Customers.findOne({csw_username: req.session.username});
            if (customer) {
                let order = await Orders.create({ customer: customer.csw_name, totalcost: customer.csw_cart.totalPrice, address: customer.csw_address, phonenumber: customer.csw_phonenumber, products: customer.csw_cart.items, csw_username: customer.csw_username, delivered: false, declined: false });
                res.redirect('/success')
                customer.removeAllFromCart(customer)
                    .then(() => {
                        res.redirect('/home')
                    }).catch(err => console.log(err));
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: req.body });
        }
    }

    async changeQuantity(req, res, next) {
        try {
            const customer = await Customers.findOne({csw_username: req.session.username});
            if (customer) {
                const product = await Products.findOne({_id: req.body.id});
                if (product) {
                    customer.changingQuantity(product, req.body.quantity)
                    .then(() => {
                        res.redirect('/shoppingcart')
                    }).catch(err => console.log(err));
                }
            }
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: req.body });
        }
    }
}

module.exports = new ShoppingCartController