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
employeesRouter.get('/orders', adminController.employees_orders);

// Manager routes
managersRouter.get('/overview', adminController.managers_overview);
managersRouter.get('/dashboard', adminController.managers_dashboard);
managersRouter.get('/staffs', adminController.managers_staffs);
managersRouter.get('/customers', adminController.managers_customers);
managersRouter.get('/notes', adminController.managers_notes);
managersRouter.get('/products', adminController.managers_products);
managersRouter.get('/settings', adminController.managers_settings);
managersRouter.delete('/staffs/:id', adminController.managers_deletestaffs)
managersRouter.delete('/customers/:id', adminController.managers_deletecustomers)
managersRouter.delete('/products/:id', adminController.managers_deleteproducts)
managersRouter.delete('/notes/:id', adminController.managers_deletenotes)
managersRouter.post('/handle-form-actions', adminController.handleFormActions)
managersRouter.post('/store', adminController.managers_store)
managersRouter.post('/storenotes', adminController.managers_storenotes)
managersRouter.post('/storeproducts', adminController.managers_storeproducts)
managersRouter.get('/:id', adminController.managers_editstaffs)
managersRouter.put('/:id', adminController.managers_updatestaffs)

// Use the nested routers
router.use('/employees', employeesRouter);
router.use('/managers', managersRouter);

module.exports = router;
