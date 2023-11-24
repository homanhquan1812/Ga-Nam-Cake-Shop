const express = require('express')
const router = express.Router()

const dashboardController = require('../app/controllers/DashboardController')

router.get('/staff', dashboardController.index_staff)
router.get('/manager', dashboardController.index_manager)

module.exports = router