const express = require('express');
const router = express.Router();
const dashboardController = require('../app/controllers/DashboardController');
const employeesRouter = express.Router();
const managersRouter = express.Router();

// Employee routes
employeesRouter.get('/', dashboardController.employees_overview)
employeesRouter.get('/overview', dashboardController.employees_overview);
employeesRouter.get('/dashboard', dashboardController.employees_dashboard);
employeesRouter.get('/notes', dashboardController.employees_notes);
employeesRouter.get('/products', dashboardController.employees_products);
employeesRouter.get('/settings', dashboardController.employees_settings);
employeesRouter.get('/orders', dashboardController.employees_orders);
employeesRouter.put('/orders/:id', dashboardController.employees_ordersdelivered)

// Manager routes
managersRouter.get('/', dashboardController.managers_overview)
managersRouter.get('/overview', dashboardController.managers_overview);
managersRouter.get('/dashboard', dashboardController.managers_dashboard);
managersRouter.get('/staffs', dashboardController.managers_staffs);
managersRouter.get('/customers', dashboardController.managers_customers);
managersRouter.get('/notes', dashboardController.managers_notes);
managersRouter.get('/products', dashboardController.managers_products);
managersRouter.get('/settings', dashboardController.managers_settings);
managersRouter.get('/orders', dashboardController.managers_orders)
managersRouter.delete('/staffs/:id', dashboardController.managers_deletestaffs)
managersRouter.delete('/customers/:id', dashboardController.managers_deletecustomers)
managersRouter.delete('/products/:id', dashboardController.managers_deleteproducts)
managersRouter.delete('/notes/:id', dashboardController.managers_deletenotes)
managersRouter.put('/orders/:id', dashboardController.managers_ordersdeclined)
managersRouter.post('/handle-form-actions', dashboardController.handleFormActions)
managersRouter.post('/store', dashboardController.managers_store)
managersRouter.post('/storenotes', dashboardController.managers_storenotes)
managersRouter.post('/storeproducts', dashboardController.managers_storeproducts)
managersRouter.get('/:id', dashboardController.managers_editstaffs)
managersRouter.put('/:id', dashboardController.managers_updatestaffs)

// Use the nested routers
router.use('/employees', employeesRouter);
router.use('/managers', managersRouter);

module.exports = router;
