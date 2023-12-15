const dashboardRouter = require('./dashboard');
const loginRouter = require('./login');
const homeRouter = require('./home')
const aboutRouter = require('./about')
const contactRouter = require('./contact')
const galleryRouter = require('./gallery')
const servicesRouter = require('./services')
const shoppingcartRouter = require('./shoppingcart')

function route(app) {
    app.use('/', dashboardRouter);
    app.use('/login', loginRouter);
    app.use('/home', homeRouter)
    app.use('/about', aboutRouter)
    app.use('/contact', contactRouter)
    app.use('/gallery', galleryRouter)
    app.use('/services', servicesRouter)
    app.use('/shoppingcart', shoppingcartRouter)
}

module.exports = route;
