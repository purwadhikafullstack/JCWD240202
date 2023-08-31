const express = require('express');
const router = express.Router();
const { statusController } = require('../controllers');

router.get('/', statusController.getAllStatus)

module.exports = router;