const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { verifyToken } = require('./../middleware/token');

router.post('/', verifyToken, reviewController.createNewReview);
router.get('/products/:product_id', reviewController.getProductReviews);
router.get(
    '/orders/:order_id/products/:product_id',
    verifyToken,
    reviewController.getUserReviews,
);
router.delete('/:review_id', verifyToken, reviewController.removeReview);

module.exports = router;
