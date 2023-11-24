
// const { multipleMongooseToObject } = require('../../util/mongoose')

class DashboardController
{
    // [GET] /dashboard
    index_staff(req, res)
    {
        res.render('dashboard/staff');
    }

    index_manager(req, res)
    {
        res.render('dashboard/manager');
    }

    // [GET] /:slug
    show(req, res)
    {
        res.send('Test this dashboard');
    }
}

module.exports = new DashboardController