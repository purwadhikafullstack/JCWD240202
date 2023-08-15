const express = require('express');
const router = express.Router();
const { mutationController } = require('./../controllers');
const {
    verifyToken,
    checkAdminRole,
    checkUserRole,
    checkWhAdminRole,
} = require('./../middleware/token');

router.post(
    '/product-list',
    verifyToken,
    checkUserRole,
    mutationController.getProductListMutation,
);
router.post(
    '/request',
    verifyToken,
    checkWhAdminRole,
    mutationController.requestMutation,
);

router.patch(
    '/confirm/:mutation_id',
    verifyToken,
    checkWhAdminRole,
    mutationController.confirmMutation,
);

router.patch(
    '/reject/:mutation_id',
    verifyToken,
    checkWhAdminRole,
    mutationController.rejectMutation,
);

router.get('/', verifyToken, mutationController.getAllMutation);
router.get('/mutation-details', mutationController.getAllMutationDetails);

module.exports = router;
