const Feedbacks = require('../model/Feedbacks')
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose')

class FeedbackController
{
    // [GET] /feedback
    async readAllFeedbacks(req, res, next) {
        try {
            const feedback = await Feedbacks.find({})

            res.status(200).json({
                feedback: multipleMongooseToObject(feedback)
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /feedback
    async createAFeedback(req, res, next) {
        try {
            const { firstName, lastName, email, phone, message } = req.body
            const newFeedback = new Feedbacks(req.body)
            
            await newFeedback.save()

            res.status(201).json({
                message: 'New feedback added.'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new FeedbackController