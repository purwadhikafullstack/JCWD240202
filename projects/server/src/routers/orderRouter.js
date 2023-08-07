const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { verifyToken } = require('./../middleware/token');
const upload = require('../middleware/upload');

router.get('/', verifyToken, orderController.getAllUserOrder);
router.get('/:order_id', verifyToken, orderController.getOrderDetails);
router.post(
    '/payment_proof',
    verifyToken,
    upload,
    orderController.postUserPaymentProof,
);

module.exports = router;
