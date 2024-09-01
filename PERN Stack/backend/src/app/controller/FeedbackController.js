const { pool } = require('../../../config/db')

class FeedbackController
{
    // [GET] /feedback
    async readAllFeedbacks(req, res, next) {
        try {
            const feedbackQuery = 'SELECT * FROM feedbacks;'
            const feedbackResult = await pool.query(feedbackQuery)

            res.status(200).json({
                feedback: feedbackResult.rows
            })
        } catch (error) {
            next(error)
        }
    }

    // [POST] /feedback
    async createAFeedback(req, res, next) {
        try {
            const { first_name, last_name, email, phone, message } = req.body
            const query = `
                INSERT INTO feedbacks (first_name, last_name, email, phone, message)
                VALUES ($1, $2, $3, $4, $5)
                RETURNING id;
            `
            const values = [first_name, last_name, email, phone, message]

            await pool.query(query, values)

            res.status(201).json({
                message: 'New feedback added.'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new FeedbackController