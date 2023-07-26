const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('./../middleware/upload')

router.get('/', productController.getAllProducts);
router.get('/:id/recommendations', productController.getRelatedProducts);
router.get('/:id', productController.getProductDetails);
router.post('/', upload, productController.addNewProduct);
router.patch('/:id', productController.editProduct)
router.patch('/images/:id', upload, productController.editProductImages)
router.delete('/:id', productController.deleteProduct)
router.patch('/thumbnail/:product/:productImage', productController.changeThumbnail)

module.exports = router;
