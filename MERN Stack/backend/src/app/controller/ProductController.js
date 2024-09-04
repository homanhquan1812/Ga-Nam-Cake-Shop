const Products = require('../model/Products')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class ProductController
{
    // [GET] /product
    async readAllProducts(req, res, next) {
        try {
            const product = await Products.find({})

            res.status(200).json({
                product: multipleMongooseToObject(product)
            })
        } catch (error) {
            next(error)
        }
    }

    // [GET] /product/:id
    async readAProduct(req, res, next) {
        try {
            const product = await Products.findById(req.params.id)

            if (!product) {
                return res.status(404).json('No product found.')
            }

            res.status(200).json({
                product: mongooseToObject(product)
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /product
    async createAProduct(req, res, next) {
        try {
            const { csw_products, photo, type, description, price } = req.body
            const newProduct = new Products(req.body)

            await newProduct.save()

            res.status(201).json({
                message: 'New product added.'
            })
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /product/:id
    async deleteAProduct(req, res, next) {
        try {
            const product = await Products.findById(req.params.id)

            if (!product) {
                return res.status(404).json('No product found.')
            }

            await product.delete()

            res.status(200).json({
                message: 'Product deleted successfully.'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ProductController