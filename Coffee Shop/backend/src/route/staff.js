require('dotenv').config()

const express = require('express');
const router = express.Router();
const staffController = require('../app/controller/StaffController');

router.get(`/`, staffController.readAllStaffs)
router.put(`/info`, staffController.updateInfo)
router.put(`/role/:id`, staffController.updateRole)
router.delete(`/:id`, staffController.deleteAStaff)

module.exports = router;