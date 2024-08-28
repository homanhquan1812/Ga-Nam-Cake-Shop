const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const Orders = require('../models/Orders')

class HistoryController
{
    index(req, res, next)
    {
        Promise.all([Orders.find({})])
            .then(([orders]) => {
                const csw_name = req.session.username

                res.render('history', {
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
                    orders: multipleMongooseToObject(orders),
                    csw_name
                })
            })
            .catch(next)
    }
}

module.exports = new HistoryController