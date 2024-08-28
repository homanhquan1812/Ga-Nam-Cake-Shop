const Products = require('../models/Products')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const db = require('../../../config/db')

class ProductDetailsController
{
    async show(req, res, next)
    {
        try {
            const products = await Products.find({})
            const info = await Products.findById(req.params.id)

            res.json({
                info,
                products: multipleMongooseToObject(products)
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new ProductDetailsController()