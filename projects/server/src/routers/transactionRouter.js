const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/token');
const { transactionController } = require('../controllers');

router.get('/', verifyToken, transactionController.getAllTransaction);

module.exports = router;
