const express = require('express');
const router = express.Router();
const { adminController } = require('./../controllers');
const { verifyToken, checkAdminRole } = require('./../middleware/token');

router.get('/', verifyToken, checkAdminRole, adminController.getDataAdmin);
router.patch('/edit-profile/:id', verifyToken, checkAdminRole, adminController.editDataAdmin);
router.patch('/change-password/:id', verifyToken, checkAdminRole, adminController.changePasswordAdmin)
router.delete('/delete/:id', verifyToken, checkAdminRole, adminController.deleteAdmin)


module.exports = router;
