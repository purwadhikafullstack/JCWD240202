const express = require('express');
const router = express.Router();
const { addressController } = require('../controllers');

// Router
router.get('/', addressController.userAddress);

module.exports = router;
