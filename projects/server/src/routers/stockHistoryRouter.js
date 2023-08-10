const express = require('express');
const router = express.Router();
const { stockHistoryController } = require('./../controllers');
const { verifyToken, checkUserRole } = require('../middleware/token');

// controller
router.get(
    '/stock-history',
    verifyToken,
    checkUserRole,
    stockHistoryController.getStockHistory,
);

router.get(
    '/stock-log',
    verifyToken,
    checkUserRole,
    stockHistoryController.getStockLog,
);

module.exports = router;
