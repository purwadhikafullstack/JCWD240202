const express = require('express');
const checkoutCartController = require('../controllers/checkoutCartController');
const { verifyToken } = require('../middleware/token');

const router = express.Router();

router.get(
    '/warehouses',
    verifyToken,
    checkoutCartController.getClosestWarehouse,
);
router.post('/', verifyToken, checkoutCartController.createUserOrder);

module.exports = router;
