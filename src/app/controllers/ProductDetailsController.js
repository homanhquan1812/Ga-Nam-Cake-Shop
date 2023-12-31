const Products = require('../models/Products')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class ProductDetailsController
{
    index(req, res)
    {
        const csw_name = req.session.username
        res.render('product_details', {
            isLoggedIn: req.session.username ? true : false,
            username: req.session.username,
            styles: [
                '/css/lightbox.min.css',
                '/css/owl.carousel.min.css',
                '/css/owl.theme.default.min.css',
                '/css/main.css',
                '/css/productDetails.css'
            ],
            scripts: [
                '/js/jquery.countup.min.js',
                '/js/lightbox.min.js',
                '/js/isotope.pkgd.min.js',
                '/js/owl.carousel.min.js',
                '/js/util.js',
                '/js/main-backtotop.js',
                '/js/main.js',
                'js/script.js'
            ],
            csw_name
        })
    }

    show(req, res, next)
    {
        const csw_name = req.session.username
        Products.findOne({ _id: req.params.id })
            .then(info => {
                res.render('product_details', { 
                    isLoggedIn: req.session.username ? true : false,
                    username: req.session.username,
                    styles: [
                        '/css/lightbox.min.css',
                        '/css/owl.carousel.min.css',
                        '/css/owl.theme.default.min.css',
                        '/css/main.css',
                        '/css/productDetails.css'
                    ],
                    scripts: [
                        '/js/jquery.countup.min.js',
                        '/js/lightbox.min.js',
                        '/js/isotope.pkgd.min.js',
                        '/js/owl.carousel.min.js',
                        '/js/util.js',
                        '/js/main-backtotop.js',
                        '/js/main.js',
                        'js/script.js'
                    ],
                    info: mongooseToObject(info),
                    csw_name
                })
            })
            .catch(next)
    }
}

module.exports = new ProductDetailsController