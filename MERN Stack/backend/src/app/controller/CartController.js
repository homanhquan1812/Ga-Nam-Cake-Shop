const Customers = require('../model/Customers')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')
const mongoose = require('mongoose')

class CartController
{
    // [GET] /cart/:id
    async readACart(req, res, next) {
        try {
            const cart = await Customers.findById(req.params.id, 'csw_cart')

            if (!cart) {
                return res.status(404).json('Cart not found.')
            }

            res.status(200).json({
                cart: mongooseToObject(cart)
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /cart
    async createItemsInACart(req, res, next) {
        try {
            const { name, price, _id, photo, qty, productId } = req.body
            const cart = await Customers.findById(_id, 'csw_cart')

            if (!cart) {
                return res.status(404).json('Cart not found.')
            }

            const newItems = [...cart.csw_cart.items, { name, price, productId, photo, qty, totalPrice: (price * qty)}]
            const newTotalPrice = cart.csw_cart.totalPrice + (price * qty)

            await Customers.findByIdAndUpdate(_id, { 
                csw_cart: {
                    items: newItems,
                    totalPrice: newTotalPrice
                }
            })

            res.status(201).json("Product added to this user's cart successfully.")

        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /cart/:userId/:id
    async deleteItemsInACart(req, res, next) {
        try {
            const { userId, id } = req.params
            const cart = await Customers.findById(userId, 'csw_cart')

            if (!cart) {
                return res.status(404).json('Cart not found.')
            }

            const updatedItems = cart.csw_cart.items.filter(item => !item._id.equals(new mongoose.Types.ObjectId(id)))
            const newtotalCost = updatedItems.reduce((total, item) => total + (item.price * item.qty), 0)

            await Customers.findByIdAndUpdate(userId, {
                csw_cart: {
                    items: updatedItems,
                    totalPrice: newtotalCost
                }
            })

            res.status(200).json('Product deleted from cart successfully.')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new CartController