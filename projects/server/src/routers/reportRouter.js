const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const upload = require('./../middleware/upload');
const { verifyToken, checkUserRole } = require('./../middleware/token');

router.get('/sales', verifyToken, checkUserRole, reportController.getAllSales);
router.get(
    '/sales/categories',
    verifyToken,
    checkUserRole,
    reportController.getSalesByCategory,
);
router.get(
    '/sales/products',
    verifyToken,
    checkUserRole,
    reportController.getSalesPerProduct,
);
router.get(
    '/sales/charts',
    verifyToken,
    checkUserRole,
    reportController.chartSales,
);
router.get('/orders', verifyToken, checkUserRole, reportController.totalOrder);

module.exports = router;
