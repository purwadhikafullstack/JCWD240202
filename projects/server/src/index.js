require('dotenv/config');
const express = require('express');
const cors = require('cors');
const { join } = require('path');
const bodyParser = require('body-parser');
// const path = require('path');
const {
    rajaOngkirRouter,
    addressRouter,
    userRouter,
    homepageRouter,
    authRouter,
    productRouter,
    categoryRouter,
    cartRouter,
    adminAuthRouter,
    adminRouter,
    warehouseRouter,
    colorRouter,
    transactionRouter,
    statusRouter,
    stockRouter,
    checkoutCartRouter,
    mutationRouter,
    orderRouter,
} = require('./routers');

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('src/public/images'));
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

// #region API ROUTES
// ===========================
// NOTE : Add your routes here

app.use('/api/home', homepageRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/rajaongkir', rajaOngkirRouter);
app.use('/api/addresses', addressRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/carts', cartRouter);
app.use('/api/auth/admins', adminAuthRouter);
app.use('/api/admins', adminRouter);
app.use('/api/warehouses', warehouseRouter);
app.use('/api/color', colorRouter);
app.use('/api/transactions', transactionRouter);
app.use('/api/status', statusRouter);
app.use('/api/orders', orderRouter);

app.use('/api/stocks', stockRouter);
app.use('/api/checkout', checkoutCartRouter);
app.use('/api/mutations', mutationRouter);

app.get('/api', (req, res) => {
    res.send(`Hello, this is my API`);
});

app.get('/api/greetings', (req, res, next) => {
    res.status(200).json({
        message: 'Hello, Student !',
    });
});

// ===========================

// not found
app.use((req, res, next) => {
    if (req.path.includes('/api/')) {
        res.status(404).send('Not found !');
    } else {
        next();
    }
});

// error
app.use((err, req, res, next) => {
    if (req.path.includes('/api/')) {
        console.error('Error : ', err.stack);
        res.status(500).send('Error !');
    } else {
        next();
    }
});

// #endregion

// #region CLIENT
const clientPath = '../../client/build';
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, clientPath, 'index.html'));
});

// #endregion

app.listen(PORT, (err) => {
    if (err) {
        console.log(`ERROR: ${err}`);
    } else {
        console.log(`APP RUNNING at ${PORT} ✅`);
    }
});
