
// const { multipleMongooseToObject } = require('../../util/mongoose')

class DashboardController
{
    // [GET] /dashboard
    index(req, res)
    {
        res.render('dashboard');
    }

    // [GET] /:slug
    show(req, res)
    {
        res.send('Test this dashboard');
    }
}

module.exports = new DashboardController