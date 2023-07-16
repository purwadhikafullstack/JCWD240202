const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/token');
const { userController } = require('../controllers');

const upload = require('./../middleware/upload');

router.get('/', verifyToken, userController.keepLogin);
router.patch('/editprofile', verifyToken, upload, userController.editProfile);

module.exports = router;
