const express = require('express');
const cartController = require('../controllers/cartController');
const { verifyToken } = require('../middleware/token');

const router = express.Router();

router.post('/', verifyToken, cartController.userAddToCart);
router.get('/', verifyToken, cartController.getUserCart);
router.patch('/product/:id', verifyToken, cartController.modifyQuantity);
router.delete('/product/:id', verifyToken, cartController.deleteProductCart);

module.exports = router;
