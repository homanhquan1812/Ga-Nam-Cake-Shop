const dashboardRouter = require('./dashboard')

function route(app)
{
    app.use('/dashboard', dashboardRouter)
}

module.exports = route