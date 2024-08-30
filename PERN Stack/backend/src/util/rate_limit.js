const rateLimit = require('express-rate-limit')
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max limit: 5 times
    handler: (req, res, next) => {
        res.status(401).json({
        message: 'Too many login attempts from this IP, please try again after 15 minutes'
        })
    },
    skip: (req, res) => {
        // Skip rate limiting if the login was successful
        return req.session && req.session.loginPassed === true
    }
})

module.exports = loginLimiter