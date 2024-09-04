const Customers = require('../model/Customers')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class CustomerController
{
    // [GET] /customer
    async readAllCustomers(req, res, next) {
        try {
            const customer = await Customers.find({})

            res.status(200).json({
                customer: multipleMongooseToObject(customer)
            })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /customer/:id
    async deleteACustomer(req, res, next) {
        try {
            const customer = await Customers.findById(req.params.id)

            if (!customer) {
                return res.status(404).json('Customer not found.')
            }

            await customer.delete()

            res.status(200).json('Customer deleted successfully.')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CustomerController