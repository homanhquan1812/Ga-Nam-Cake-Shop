const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/DashboardController');
const employeesRouter = express.Router();
const managersRouter = express.Router();

// Staff routes
employeesRouter.get('/overview', adminController.index_employees_overview);
employeesRouter.get('/dashboard', adminController.index_employees_dashboard);
employeesRouter.get('/notes', adminController.index_employees_notes);
employeesRouter.get('/products', adminController.index_employees_products);
employeesRouter.get('/settings', adminController.index_employees_settings);

// Manager routes
managersRouter.get('/overview', adminController.index_managers_overview);
managersRouter.get('/dashboard', adminController.index_managers_dashboard);
managersRouter.get('/staffs', adminController.index_managers_staffs);
managersRouter.get('/customers', adminController.index_managers_customers);
managersRouter.get('/notes', adminController.index_managers_notes);
managersRouter.get('/products', adminController.index_managers_products);
managersRouter.get('/settings', adminController.index_managers_settings);

// Use the nested routers
router.use('/employees', employeesRouter);
router.use('/managers', managersRouter);

module.exports = router;
