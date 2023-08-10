const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/token');
const { transactionController } = require('../controllers');

router.get('/', verifyToken, transactionController.getAllTransaction);
router.post('/confirmation-payment', verifyToken, transactionController.confirmationPayment);
router.patch('/cancel-payment', verifyToken, transactionController.cancelConfirmPayment)
router.post('/confirmation-shipping', verifyToken, transactionController.sendUserOrders);


module.exports = router;
