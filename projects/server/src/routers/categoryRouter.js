const express = require('express')
const router = express.Router()
const { categoryController } = require('./../controllers')
// const { verifyToken } = require('../middleware/token')
const upload = require('./../middleware/upload')

router.get('/', categoryController.getAllCategories)
router.post('/', upload, categoryController.addCategory)
router.patch('/:id', categoryController.editCategory)
router.patch('/images/:id', upload, categoryController.editImageCategory)
router.delete('/:id', categoryController.deleteCategory)

module.exports = router;
