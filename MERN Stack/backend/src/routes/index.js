const dashboardRouter = require('./dashboard')
const loginRouter = require('./login')
const contactRouter = require('./contact')
const shoppingcartRouter = require('./shoppingcart')
const detailsRouter = require('./details')
const historyRouter = require('./history')

function route(app) {
    app.use('/', dashboardRouter)
    app.use('/login', loginRouter)
    app.use('/contact', contactRouter)
    app.use('/cart', shoppingcartRouter)
    app.use('/details', detailsRouter)
    app.use('/history', historyRouter)

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack)
        res.status(500).json({ 
            message: 'Something went wrong!'
        })
    })
}

module.exports = route