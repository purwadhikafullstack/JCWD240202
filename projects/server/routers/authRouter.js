const express = require('express');
const router = express.Router();
const { authController } = require('./../controllers');
const {verifyToken} = require('./../middleware/token');

router.post('/register', authController.userRegistration)
router.patch('/verification', verifyToken, authController.userVerification)
router.post('/login', authController.userLogin)

module.exports = router