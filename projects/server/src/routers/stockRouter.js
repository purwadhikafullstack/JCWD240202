const express = require('express');
const router = express.Router();
const { stockController } = require('./../controllers');
const { verifyToken } = require('../middleware/token');

router.get('/', verifyToken, stockController.getStock);

module.exports = router;
