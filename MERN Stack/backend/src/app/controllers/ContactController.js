const Feedbacks = require('../models/Feedbacks')

class ContactController
{
    async store(req, res, next)
    {
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

module.exports = new ContactController