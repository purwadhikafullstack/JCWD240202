const rajaOngkirController = require('./rajaongkir');
const addressController = require('./address');
const authController = require('./authController');
const userController = require('./userController');
const homepageController = require('./homepageController');
const productController = require('./productController');
const categoryController = require('./categoryController');
const cartController = require('./cartController');
const adminAuthController = require('./adminAuthController.js');
const adminController = require('./adminController');
const warehouseController = require('./warehouseController');
const colorController = require('./colorController');
const transactionController = require('./transactionController');
const statusController = require('./statusController');
const stockController = require('./stockController');
const checkoutCartController = require('./checkoutCartController');
const mutationController = require('./mutationController');
const stockHistoryController = require('./stockHistoryController')

module.exports = {
    rajaOngkirController,
    addressController,
    authController,
    userController,
    homepageController,
    productController,
    categoryController,
    cartController,
    adminAuthController,
    adminController,
    warehouseController,
    colorController,
    transactionController,
    statusController,
    stockController,
    checkoutCartController,
    mutationController,
    stockHistoryController
};
