const express = require('express')
const router = express.Router()
const { categoryController } = require('./../controllers')
const {verifyToken, checkAdminRole} = require('./../middleware/token');
const upload = require('./../middleware/upload')

router.get('/', categoryController.getAllCategories)
router.post('/', verifyToken, checkAdminRole, upload, categoryController.addCategory)
router.patch('/:id', verifyToken, checkAdminRole, categoryController.editCategory)
router.patch('/images/:id', verifyToken, checkAdminRole, upload, categoryController.editImageCategory)
router.delete('/:id', verifyToken, checkAdminRole, categoryController.deleteCategory)

module.exports = router;
