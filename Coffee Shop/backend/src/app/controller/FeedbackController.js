const { pool } = require('../../../config/db')

class FeedbackController
{
    // [GET] /feedback
    async readAllFeedbacks(req, res, next) {
        try {
            const feedbackQuery = 'SELECT * FROM feedback;'
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
            const { customer_id, type, content } = req.body

            if (!customer_id || !type || !content) {
                return res.status(409).json('Please fill in all required fields.')
            }

            const query = `
                INSERT INTO feedback (customer_id, type, content)
                VALUES ($1, $2, $3)
                RETURNING id;
            `
            const values = [customer_id, type, content]
            const result = await pool.query(query, values)

            res.status(201).json({
                message: 'New feedback added.',
                feedback: result.rows[0].id
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new FeedbackController