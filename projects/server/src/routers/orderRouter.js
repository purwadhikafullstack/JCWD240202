const express = require('express');
const orderController = require('../controllers/orderController');
const { verifyToken } = require('../middleware/token');

const router = express.Router();

router.post('/', verifyToken, orderController.userCheckout);

module.exports = router;
