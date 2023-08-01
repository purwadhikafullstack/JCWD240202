const rajaOngkirRouter = require('./rajaongkir');
const addressRouter = require('./address');
const authRouter = require('./authRouter');
const userRouter = require('./userRouter');
const homepageRouter = require('./homepageRouter');
const productRouter = require('./productRouter');
const categoryRouter = require('./categoryRouter');
const cartRouter = require('./cartRouter');
const adminAuthRouter = require('./adminAuthRouter');
const adminRouter = require('./adminRouter');
const warehouseRouter = require('./warehouseRouter');
const colorRouter = require('./colorRouter');
const transactionRouter = require('./transactionRouter');
const orderRouter = require('./orderRouter');
const statusRouter = require('./statusRouter');

module.exports = {
    rajaOngkirRouter,
    addressRouter,
    authRouter,
    userRouter,
    homepageRouter,
    productRouter,
    categoryRouter,
    cartRouter,
    adminAuthRouter,
    adminRouter,
    warehouseRouter,
    colorRouter,
    transactionRouter,
    orderRouter,
    statusRouter,
};
