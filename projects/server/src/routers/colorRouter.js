const express = require('express');
const router = express.Router();
const { colorController } = require('./../controllers');
const {verifyToken, checkAdminRole} = require('./../middleware/token');

router.get('/', colorController.getAllColor);
router.post('/', verifyToken, checkAdminRole, colorController.addColor);
router.delete('/:id', verifyToken, checkAdminRole, colorController.deleteColor)

module.exports = router;
