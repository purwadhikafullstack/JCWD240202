const express = require('express');
const router = express.Router();
const { stockController } = require('./../controllers');
const { verifyToken } = require('../middleware/token');

router.get('/', verifyToken, stockController.getStock);
router.patch('/add/:product_stock_id', verifyToken, stockController.addStock);
router.patch(
    '/reduce/:product_stock_id',
    verifyToken,
    stockController.reduceStock,
);

module.exports = router;
