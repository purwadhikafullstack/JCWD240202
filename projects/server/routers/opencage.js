const express = require('express');
const { openCageController } = require('../controllers');
const router = express.Router();

// OPENCAGE
router.get('/latlong', openCageController.getLatLong);

module.exports = router;
