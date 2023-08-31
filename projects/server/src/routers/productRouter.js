const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('./../middleware/upload')
const {verifyToken, checkAdminRole} = require('./../middleware/token');

router.get('/', productController.getAllProducts);
router.get('/:id/recommendations', productController.getRelatedProducts);
router.get('/:id', productController.getProductDetails);
router.post('/', verifyToken, checkAdminRole, upload, productController.addNewProduct);
router.patch('/:id', verifyToken, checkAdminRole, productController.editProduct)
router.patch('/images/:id', verifyToken, checkAdminRole, upload, productController.editProductImages)
router.patch('/:id/delete', verifyToken, checkAdminRole, productController.deleteProduct)
router.patch('/thumbnail/:product/:productImage', verifyToken, checkAdminRole, productController.changeThumbnail)

module.exports = router;