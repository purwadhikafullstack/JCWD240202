const express = require('express');
const router = express.Router();
const { rajaOngkirController } = require('../controllers');
const { verifyToken } = require('../middleware/token');

// RAJAONGKIR
router.get('/provinces', rajaOngkirController.getProvinces);
router.get('/cities', rajaOngkirController.getCities);
router.post('/costs', verifyToken, rajaOngkirController.getCosts);

module.exports = router;
