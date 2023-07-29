const express = require('express');
const router = express.Router();
const { addressController } = require('../controllers');
const { verifyToken } = require('./../middleware/token');

// Router
router.get('/', verifyToken, addressController.userAddress);
router.post('/add', verifyToken, addressController.addNewAddress);
router.patch('/edit/:address_id', verifyToken, addressController.editAddress);
router.patch(
    '/delete/:address_id',
    verifyToken,
    addressController.deleteAddress,
);
router.patch(
    '/primary/:address_id',
    verifyToken,
    addressController.setPrimaryAddress,
);
router.get('/choose', verifyToken, addressController.getChosenAddress);
router.patch('/choose', verifyToken, addressController.setAddressChosen);

module.exports = router;
