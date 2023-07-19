const express = require('express');
const router = express.Router();
const { rajaOngkirController } = require('../controllers');

// RAJAONGKIR
router.get('/provinces', rajaOngkirController.getProvinces);
router.get('/cities', rajaOngkirController.getCities)

module.exports = router;
