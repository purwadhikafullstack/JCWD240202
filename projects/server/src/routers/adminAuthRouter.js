const express = require('express');
const router = express.Router();
const { adminAuthController } = require('./../controllers');
const { verifyToken, checkAdminRole } = require('./../middleware/token');

router.post('/login', adminAuthController.login);
router.post('/register', verifyToken, checkAdminRole, adminAuthController.register);

module.exports = router;
