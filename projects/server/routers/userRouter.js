const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/token');
const { userController } = require('../controllers');

const upload = require('./../middleware/upload');

router.get('/', verifyToken, userController.keepLogin);
router.patch('/edit-profile', verifyToken, userController.editProfile);
router.patch('/change-password', verifyToken, userController.changePassword);
router.patch(
    '/edit-profile-picture',
    verifyToken,
    upload,
    userController.editProfilePicture,
);

module.exports = router;
