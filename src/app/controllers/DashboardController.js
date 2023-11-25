// const { multipleMongooseToObject } = require('../../util/mongoose')
class DashboardController
{
    // [GET] /dashboard/employees
    // Overview
    index_employees_overview(req, res)
    {
        res.render('dashboard/employees/overview');
    }

    // Dashboard
    index_employees_dashboard(req, res)
    {
        res.render('dashboard/employees/dashboard');
    }

    // Notes
    index_employees_notes(req, res)
    {
        res.send('dashboard/employees/notes');
    }

    // Products
    index_employees_products(req, res)
    {
        res.send('Tdashboard/employees/products');
    }

    // Settings
    index_employees_settings(req, res)
    {
        res.send('dashboard/employees/settings');
    }

    // [GET] /dashboard/manager
    // Overview
    index_managers_overview(req, res)
    {
        res.render('dashboard/managers/overview');
    }

    // Dashboard
    index_managers_dashboard(req, res)
    {
        res.render('dashboard/managers/dashboard');
    }

    // Staffs
    index_managers_staffs(req, res)
    {
        res.render('dashboard/managers/staffs');
    }

    // Customers
    index_managers_customers(req, res)
    {
        res.send('dashboard/managers/customers');
    }

    // To-do List
    index_managers_notes(req, res)
    {
        res.send('dashboard/managers/notes');
    }

    // Products
    index_managers_products(req, res)
    {
        res.send('Tdashboard/managers/products');
    }

    // Settings
    index_managers_settings(req, res)
    {
        res.send('dashboard/managers/settings');
    }

    // [GET] /:slug
    show(req, res)
    {
        res.send('Test this dashboard');
    }
}

module.exports = new DashboardController