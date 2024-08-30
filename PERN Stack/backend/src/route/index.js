require('dotenv').config()

const dashboardRouter = require('./dashboard')
const loginRouter = require('./login')
const feedbackRouter = require('./feedback')
const historyRouter = require('./history')
const registerRouter = require('./register')
const productRouter = require('./product')
const cartRouter = require('./cart')
const orderRouter = require('./order')

function route(app) {
    app.use('/', dashboardRouter)
    app.use('/login', loginRouter)
    app.use('/register', registerRouter)
    app.use('/feedback', feedbackRouter)
    app.use('/history', historyRouter)
    app.use('/product', productRouter)
    app.use('/cart', cartRouter)
    app.use('/order', orderRouter)

    const env = process.env.NODE_ENV
    
    console.log(`Environment: ${env}`)

    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack)

        if (env === 'development') {
            res.status(500).json({
                message: err.stack.split('\n').map(line => line.trim())
            })
        } else {
            res.status(500).json({
                message: 'Something went wrong!'
            })
        }
    })
}

module.exports = route