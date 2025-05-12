const express = require('express');
const router = express.Router();
const feedbackController = require('../app/controller/FeedbackController');

router.get('/', feedbackController.readAllFeedbacks)
router.post('/', feedbackController.createAFeedback)

module.exports = router;