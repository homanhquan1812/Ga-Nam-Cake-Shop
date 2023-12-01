const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/DashboardController');
const employeesRouter = express.Router();
const managersRouter = express.Router();

// Staff routes
employeesRouter.get('/overview', adminController.employees_overview);
employeesRouter.get('/dashboard', adminController.employees_dashboard);
employeesRouter.get('/notes', adminController.employees_notes);
employeesRouter.get('/products', adminController.employees_products);
employeesRouter.get('/settings', adminController.employees_settings);

// Manager routes
managersRouter.get('/overview', adminController.managers_overview);
managersRouter.get('/dashboard', adminController.managers_dashboard);
managersRouter.get('/staffs', adminController.managers_staffs);
managersRouter.get('/customers', adminController.managers_customers);
managersRouter.get('/notes', adminController.managers_notes);
managersRouter.get('/products', adminController.managers_products);
managersRouter.get('/settings', adminController.managers_settings);
managersRouter.delete('/:id', adminController.managers_deletestaffs)
managersRouter.post('/handle-form-actions', adminController.handleFormActions)
managersRouter.post('/store', adminController.managers_store)

// Use the nested routers
router.use('/employees', employeesRouter);
router.use('/managers', managersRouter);

module.exports = router;
