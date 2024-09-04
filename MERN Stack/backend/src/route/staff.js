require('dotenv').config()

const express = require('express');
const router = express.Router();
const staffController = require('../app/controller/StaffController');

router.get(`/${process.env.API_KEY}`, staffController.readAllStaffs)
router.put(`/info/${process.env.API_KEY}`, staffController.updateInfo)
router.put(`/password/${process.env.API_KEY}`, staffController.updatePassword)
router.put(`/rap/${process.env.API_KEY}/:id`, staffController.updateRoleAndPosition)
router.delete(`/${process.env.API_KEY}/:id`, staffController.deleteAStaff)

module.exports = router;