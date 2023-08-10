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
router.post('/cancel', verifyToken, orderController.userCancelOrder);
router.post('/confirm', verifyToken, orderController.userConfirmDelivery);

module.exports = router;
