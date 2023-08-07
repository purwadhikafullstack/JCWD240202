const express = require('express');
const router = express.Router();
const { warehouseController } = require('./../controllers');
const {
    verifyToken,
    checkAdminRole,
    checkUserRole,
} = require('./../middleware/token');

router.post(
    '/add',
    verifyToken,
    checkAdminRole,
    warehouseController.createWarehouse,
);
router.patch(
    '/edit/:warehouse_id',
    verifyToken,
    checkAdminRole,
    warehouseController.editWarehouse,
);
router.patch(
    '/delete/:warehouse_id',
    verifyToken,
    checkAdminRole,
    warehouseController.deleteWarehouse,
);
router.patch(
    '/assign-admin/:user_id',
    verifyToken,
    checkAdminRole,
    warehouseController.assignAdminWareHouse,
);
router.get(
    '/',
    verifyToken,
    checkAdminRole,
    warehouseController.getAllDataWarehouse,
);
router.get(
    '/list',
    verifyToken,
    checkUserRole,
    warehouseController.getListWarehouse,
);
router.get(
    '/available',
    verifyToken,
    checkAdminRole,
    warehouseController.getAvailableWarehouse,
);
router.patch(
    '/unassign-admin/:user_id',
    verifyToken,
    checkAdminRole,
    warehouseController.unassignAdminWarehouse,
);

module.exports = router;
