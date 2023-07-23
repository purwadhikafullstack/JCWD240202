const express = require('express');
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middleware/token');

const router = express.Router();

router.post('/', verifyToken, cartController.userAddToCart);
router.get('/', verifyToken, cartController.getUserCart);

module.exports = router;
