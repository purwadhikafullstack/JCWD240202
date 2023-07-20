const express = require('express');
const router = express.Router();
const { authController } = require('./../controllers');
const { verifyToken } = require('../middleware/token');

router.post('/register', authController.userRegistration);
router.patch('/verification', verifyToken, authController.userVerification);
router.post('/login', authController.userLogin);
router.post('/req-forgot-password', authController.reqForgotPassword);
router.patch('/forgot-password', verifyToken, authController.forgotPassword);

module.exports = router;
