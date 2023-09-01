const express = require('express');
const router = express.Router();
const { notificationController } = require('./../controllers');
const {
    verifyToken,
    checkAdminRole,
    checkUserRole,
    checkWhAdminRole,
} = require('./../middleware/token');

router.post(
    '/',
    verifyToken,
    checkWhAdminRole,
    notificationController.createNotification,
);
router.get('/', verifyToken, notificationController.getUserNotification);
router.get(
    '/:notification_id',
    verifyToken,
    notificationController.getNotificationDetails,
);
router.patch('/', verifyToken, notificationController.userReadNotification);

module.exports = router;
