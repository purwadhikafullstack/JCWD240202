const express = require('express');
const router = express.Router();
const { authController } = require('./../controllers');
const { verifyToken } = require('../middleware/token');

router.post('/register', authController.registration);
router.patch('/verification', verifyToken, authController.verification);
router.post('/login', authController.login);
router.post('/req-forgot-password', authController.reqForgotPassword);
router.patch('/forgot-password', verifyToken, authController.forgotPassword);
router.get('/check-link-expired', verifyToken, authController.expiredLink);
router.post('/login-google', authController.loginGoogle)

module.exports = router;
