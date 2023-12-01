const { multipleMongooseToObject } = require('../../util/mongoose')
const DatabaseInfo = require('../models/Users')

class DashboardController
{
    // [GET] /dashboard/employees
    // Overview
    employees_overview(req, res)
    {
        res.render('dashboard/employees/overview', {
            styles: ['/css/overview.css']
        });
    }

    // Dashboard
    employees_dashboard(req, res, next)
    {
        Promise.all([DatabaseInfo.find({})])
            .then(csw_info => res.render('dashboard/employees/dashboard', {
                styles: ['/css/dashboard.css']
            }))
            .catch(next)
    }

    // Notes
    employees_notes(req, res)
    {
        res.render('dashboard/employees/notes', {
            styles: ['/css/notes.css']
        });
    }

    // Products
    employees_products(req, res)
    {
        res.render('dashboard/employees/products', {
            styles: ['/css/products.css']
        });
    }

    // Settings
    employees_settings(req, res)
    {
        res.render('dashboard/employees/settings', {
            styles: ['/css/settings.css']
        });
    }

    // [GET] /dashboard/manager
    // Overview
    managers_overview(req, res)
    {
        res.render('dashboard/managers/overview', {
            styles: ['/css/overview.css']
        });
    }

    // Dashboard
    managers_dashboard(req, res, next)
    {
        Promise.all([DatabaseInfo.find({})])
            .then(([csw_info]) => res.render('dashboard/managers/dashboard', {
                styles: ['/css/dashboard.css'],
                csw_info: multipleMongooseToObject(csw_info)
            }))
            .catch(next)
    }

    // Staffs
    managers_staffs(req, res, next)
    {
        Promise.all([DatabaseInfo.find({})])
            .then(([csw_info]) => res.render('dashboard/managers/staffs', {
                styles: ['/css/staffs.css'],
                csw_info: multipleMongooseToObject(csw_info)
            }))
            .catch(next)
    }

    // Customers
    managers_customers(req, res)
    {
        res.render('dashboard/managers/customers', {
            styles: ['/css/customers.css']
        });
    }

    // To-do List
    managers_notes(req, res)
    {
        res.render('dashboard/managers/notes', {
            styles: ['/css/notes.css']
        });
    }

    // Products
    managers_products(req, res)
    {
        res.render('dashboard/managers/products', {
            styles: ['/css/products.css']
        });
    }

    // Settings
    managers_settings(req, res)
    {
        res.render('dashboard/managers/settings', {
            styles: ['/css/settings.css']
        });
    }

    // Delete
    managers_deletestaffs(req, res, next)
    {
        DatabaseInfo.delete({_id: req.params.id}, req.body)
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [POST] handle-form-actions
    handleFormActions(req, res, next)
    {
        switch(req.body.action)
        {
            case 'delete':
                DatabaseInfo.deleteOne({_id: { $in: req.body.memberID }})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break
            default:
                res.json({message: 'Action is invalid.'})
        }
    }

    managers_store(req, res, next)
    {
        const formData = req.body      
        const newInfo = new DatabaseInfo(formData)
        newInfo.save()
            .then(() => res.redirect('/managers/staffs'))
            .catch(next)
    }

    // [GET] /:slug
    show(req, res)
    {
        res.send('Test this dashboard');
    }
}

module.exports = new DashboardController