const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id/recommendations', productController.getRelatedProducts);
router.get('/:id', productController.getProductDetails);

module.exports = router;
