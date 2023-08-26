const express = require('express');
const router = express.Router();
const { verifyToken, checkWhAdminRole } = require('../middleware/token');
const { transactionController } = require('../controllers');

router.get('/', verifyToken, transactionController.getAllTransaction);
router.post(
    '/confirmation-payment',
    verifyToken,
    checkWhAdminRole,
    transactionController.confirmationPayment,
);
router.patch(
    '/cancel-payment',
    verifyToken,
    checkWhAdminRole,
    transactionController.cancelConfirmPayment,
);
router.post(
    '/confirmation-shipping',
    verifyToken,
    checkWhAdminRole,
    transactionController.sendUserOrders,
);
router.post(
    '/cancel-shipping',
    verifyToken,
    checkWhAdminRole,
    transactionController.cancelReadyShipping,
);

module.exports = router;
