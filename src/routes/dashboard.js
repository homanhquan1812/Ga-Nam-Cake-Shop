const express = require('express')
const router = express.Router()

const dashboardController = require('../app/controllers/DashboardController')

router.get('/staff', dashboardController.show)
router.get('/manager', dashboardController.index)

module.exports = router