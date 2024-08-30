const bcrypt = require('bcrypt')
const { pool } = require('../../../config/db')

class DashboardController
{
    /*
     *************************************************
     ******************* EMPLOYEES *******************
     *************************************************
    */
    // Overview
    async employees_overview(req, res, next)
    {
        try {
            const [orders, notes] = await Promise.all([
                Orders.find({}),
                Notes.find({})
            ])
    
            res.json({
                orders: multipleMongooseToObject(orders),
                notes: multipleMongooseToObject(notes)
            })
        } catch (error) {
            next(error)
        }
    }

    // Dashboard
    async employees_dashboard(req, res, next)
    {
        try {
            const orders = await Orders.find({})

            res.json({
                orders: multipleMongooseToObject(orders)
            })
            
        } catch (error) {
            next(error)
        }
    }

    // Orders
    async employees_orders(req, res, next)
    {
        try {
            const orders = await Orders.find({})

            res.json({
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }

    async employees_ordersdelivered(req, res, next)
    {
        try {
            const { delivered, declined } = req.body
            await Orders.findByIdAndUpdate(req.params.id, req.body)

            res.status(200).json({
                message: 'Order delivered.'
            })
        } catch (error) {
            next(error)
        }
    }

    // Notes
    async employees_notes(req, res, next)
    {
        try {
            const [notes, orders] = await Promise.all([
                Notes.find({}), 
                Orders.find({})
            ])

            res.json({
                notes: multipleMongooseToObject(notes),
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }

    // Products
    async employees_products(req, res, next)
    {
        try {
            const [products, orders] = await Promise.all([
                Products.find({}), 
                Orders.find({})
            ])
    
            res.json({
                products: multipleMongooseToObject(products),
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }

    // Feedbacks
    async employees_feedbacks(req, res, next)
    {
        try {
            const [orders, feedbacks] = await Promise.all([
                Orders.find({}), 
                Feedbacks.find({})
            ])

            res.json({
                orders: multipleMongooseToObject(orders),
                feedbacks: multipleMongooseToObject(feedbacks)
            })
        } catch (error) {
            next(error)
        }
    }

    // Settings
    async employees_settings(req, res, next)
    {
        try {
            const info = await Staffs.findOne({})
            const orders = await Orders.find({})

            res.json({
                info: mongooseToObject(info),
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }

    // Changeinfo
    async employees_changeinfo(req, res, next)
    {
        try {
            const info = await Staffs.findById(req.params.id)
            const orders = await Orders.find({})

            res.json({
                info: mongooseToObject(info),
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }

    async employees_updateinfo(req, res, next)
    {
        try {
            const { csw_name, csw_gender, csw_phonenumber, csw_username, csw_password, csw_emailaddress } = req.body
            
            const updateData = { csw_name, csw_gender, csw_phonenumber, csw_username, csw_emailaddress }

            if (csw_password) {
                const saltRounds = 10
                const hashedPassword = await bcrypt.hash(csw_password, saltRounds)
                updateData.csw_password = hashedPassword
            }

            await Staffs.findByIdAndUpdate(req.params.id, updateData)

            res.status(200).json({
                message: "Employee's information updated."
            })
        } catch (error) {
            next(error)
        }
    }

    /*
     ************************************************
     ******************* MANAGERS *******************
     ************************************************
    */
    // Overview
    async managers_overview(req, res, next)
    {
        try {
            const [orders, notes] = await Promise.all([
                Orders.find({}),
                Notes.find({})
            ])
            
            res.json({
                orders: multipleMongooseToObject(orders),
                notes: multipleMongooseToObject(notes)
            })
        } catch (error) {
            next(error)
        }
    }

    // Dashboard
    async managers_dashboard(req, res, next)
    {
        try {
            const orders = await Orders.find({})

            res.json({
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }

    // New Orders
    async managers_orders(req, res, next)
    {
        try {
            const orders = await Orders.find({})

            res.json({
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }

    async managers_ordersdeclined(req, res, next)
    {
        try {
            const { delivered, declined } = req.body
            await Orders.findByIdAndUpdate(req.params.id, req.body)

            res.status(200).json({
                message: 'Order declined.'
            })
        } catch (error) {
            next(error)
        }
    }

    // Staffs
    async managers_staffs(req, res, next)
    {
        try {
            const [staffs, orders] = await Promise.all([
                Staffs.find({}), 
                Orders.find({})
            ])
            const info = await Staffs.findById(req.params.id)

            res.json({
                info: mongooseToObject(info),
                orders: multipleMongooseToObject(orders),
                staffs: multipleMongooseToObject(staffs)
            })
        } catch (error) {
            next(error)
        }
    }
    
    async managers_savestaffs(req, res, next)
    {
        try {
            const { csw_name, csw_gender, csw_phonenumber, csw_username, csw_emailaddress, csw_password, csw_position, csw_department } = req.body
            const newStaff = new Staffs({ csw_name, csw_gender, csw_phonenumber, csw_username, csw_emailaddress, csw_password, csw_position, csw_department })
            await newStaff.save()

            res.status(200).json({
                message: 'Staff saved.'
            })
        } catch (error) {
            next(error)
        }
    }

    async managers_editstaffs(req, res, next)
    {
        try {
            const info = await Staffs.findById(req.params.id)

            res.json({
                info
            })

        } catch (error) {
            next(error)
        }
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////
    async managers_updatestaffs(req, res, next)
    {
        Staffs.updateMany({_id: req.params.id}, req.body)
            .then(() => res.redirect('/managers/staffs'))
            .catch(next)
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////

    async managers_deletestaffs(req, res, next)
    {
        try {
            await Staffs.findByIdAndDelete(req.params.id)

            res.status(200).json({
                message: 'Staff deleted.'
            })
        } catch (error) {
            next(error)
        }
    }

    // Customers
    async managers_customers(req, res, next)
    {
        try {
            const [customers, orders] = await Promise.all([
                Customers.find({}), 
                Orders.find({})
            ])

            res.json({
                orders: multipleMongooseToObject(orders),
                customers: multipleMongooseToObject(customers)
            })    
        } catch (error) {
            next(error)
        }
    }

    async managers_deletecustomers(req, res, next)
    {
        try {
            await Customers.findByIdAndDelete(req.params.id)

            res.status(200).json({
                message: 'Customer deleted.'
            })
        } catch (error) {
            next(error)
        }
    }

    // To-do Lists
    async managers_notes(req, res, next)
    {
        try {
            const [orders, notes] = await Promise.all([
                Orders.find({}), 
                Notes.find({})
            ])
            
            res.json({
                orders: multipleMongooseToObject(orders),
                notes: multipleMongooseToObject(notes)
            })
        } catch (error) {
            next(error)
        }
    }

    async managers_savenotes(req, res, next) {
        try {
            const { csw_notes } = req.body
            const newNote = new Notes(req.body)
            await newNote.save()

            res.status(200).json({
                message: 'Note saved.'
            })
        } catch (error) {
            next(error)
        }
    }

    async managers_deletenotes(req, res, next)
    {
        try {
            await Notes.findByIdAndDelete(req.params.id)

            res.status(200).json({
                message: 'Note deleted.'
            })
        } catch (error) {
            next(error)
        }
    }

    // Products
    async managers_products(req, res, next)
    {
        try {
            const [orders, products] = await Promise.all([
                Orders.find({}),
                Products.find({})
            ])

            res.json({
                orders: multipleMongooseToObject(orders),
                products: multipleMongooseToObject(products)
            })
        } catch (error) {
            next(error)
        }
    }

    async managers_saveproducts(req, res, next) {
        try {
            const { csw_products, type, description, price, photo } = req.body
            const newProduct = new Products(req.body)
            await newProduct.save()

            res.status(200).json({
                message: 'Product saved.'
            })
        } catch (error) {
            next(error)
        }
    }

    async managers_deleteproducts(req, res, next)
    {
        try {
            await Products.findByIdAndDelete(req.params.id)

            res.status(200).json({
                message: 'Product deleted.'
            })
        } catch (error) {
            next(error)
        }
    }

    // Feedbacks
    async managers_feedbacks(req, res, next)
    {
        try {
            const [orders, feedbacks] = await Promise.all([
                Orders.find({}), 
                Feedbacks.find({})
            ])

            res.json({
                orders: multipleMongooseToObject(orders),
                feedbacks: multipleMongooseToObject(feedbacks)
            })
        } catch (error) {
            next(error)
        }
    }

    // Settings
    async managers_settings(req, res, next)
    {
        try {
            const info = await Staffs.findById(req.params.id)
            const orders = await Orders.find({})

            res.json({
                info: mongooseToObject(info),
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }

    // Changeinfo
    async managers_changeinfo(req, res, next)
    {
        try {
            const orders = await Orders.find({})

            res.json({
                orders: multipleMongooseToObject(orders)
            })
        } catch (error) {
            next(error)
        }
    }

    async managers_updateinfo(req, res, next)
    {
        try {
            const { csw_name, csw_gender, csw_phonenumber, csw_username, csw_password, csw_emailaddress } = req.body
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(csw_password, saltRounds)
            
            await Staffs.findByIdAndUpdate(req.params.id, {
                csw_name, csw_gender, csw_phonenumber, csw_username, csw_password: hashedPassword, csw_emailaddress
            })

            res.status(200).json({
                message: "Manager's information updated."
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new DashboardController