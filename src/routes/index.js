const dashboardRouter = require('./dashboard');
const loginRouter = require('./login');
const logoutRouter = require('./logout');
const homeRouter = require('./home')
const aboutRouter = require('./about')
const contactRouter = require('./contact')
const galleryRouter = require('./gallery')
const servicesRouter = require('./services')
const shoppingcartRouter = require('./shoppingcart')
const product_detailsRouter = require('./product_details')
const successRouter = require('./success')
const historyRouter = require('./history')

function route(app) {
    app.use('/', dashboardRouter);
    app.use('/login', loginRouter);
    app.use('/home', homeRouter)
    app.use('/about', aboutRouter)
    app.use('/contact', contactRouter)
    app.use('/gallery', galleryRouter)
    app.use('/services', servicesRouter)
    app.use('/shoppingcart', shoppingcartRouter)
    app.use('/logout', logoutRouter)
    app.use('/product_details', product_detailsRouter)
    app.use('/success', successRouter)
    app.use('/history', historyRouter)
}

module.exports = route;
