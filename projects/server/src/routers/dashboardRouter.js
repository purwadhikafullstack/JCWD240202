const express = require('express');
const router = express.Router();
const { dashboardController } = require('./../controllers');
const { verifyToken, checkAdminRole, checkUserRole } = require('./../middleware/token');

router.get('/customers', verifyToken, checkUserRole, dashboardController.getCustomer)

module.exports = router;
