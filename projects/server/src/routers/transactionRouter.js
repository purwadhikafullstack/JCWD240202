const express = require('express');
const router = express.Router();
const { verifyToken, checkWhAdminRole } = require('../middleware/token');
const { transactionController } = require('../controllers');

router.get('/', verifyToken, transactionController.getAllTransaction);
router.post(
    '/confirmation-payment',
    verifyToken,
    transactionController.confirmationPayment,
);
router.patch(
    '/cancel-payment',
    verifyToken,
    transactionController.cancelConfirmPayment,
);
router.post(
    '/confirmation-shipping',
    verifyToken,
    transactionController.sendUserOrders,
);
router.post(
    '/cancel-shipping',
    verifyToken,
    transactionController.cancelReadyShipping,
);
router.get('/history/:order_id', transactionController.transactionHistory);

module.exports = router;
