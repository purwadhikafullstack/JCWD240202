const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { verifyToken } = require('./../middleware/token');

router.post('/', verifyToken, wishlistController.addNewWishlist);
router.get('/', verifyToken, wishlistController.getUserWishlist);
router.delete(
    '/products/:product_id',
    verifyToken,
    wishlistController.removeProductFromWishlist,
);

module.exports = router;
