import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../features/authSlice';
import userReducer from './../features/userSlice';
import homepageReducer from '../features/homepageSlice';
import productReducer from '../features/productSlice';
import cartReducer from '../features/cartSlice';
import adminAuthReducer from '../features/adminAuthSlice';
import addressReducer from '../features/addressSlice';
import adminReducer from '../features/adminSlice';
import warehouseReducer from '../features/warehouseSlice';
import categoryReducer from '../features/categorySlice';
import statusReducer from '../features/statusSlice';
import transactionReducer from '../features/transactionSlice';
import stockReducer from '../features/stockSlice';
import shippingReducer from '../features/shippingSlice';
import checkoutReducer from '../features/checkoutSlice';
import mutationReducer from '../features/mutationSlice';
import orderReducer from '../features/orderSlice';
import stockHistoryReducer from '../features/stockHistorySlice';
import reportReducer from '../features/reportSlice';
import wishlistReducer from '../features/wishlistSlice';
import reviewReducer from '../features/reviewSlice';
import notificationReducer from '../features/notificationSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        homepage: homepageReducer,
        product: productReducer,
        cart: cartReducer,
        adminAuth: adminAuthReducer,
        address: addressReducer,
        admin: adminReducer,
        warehouse: warehouseReducer,
        category: categoryReducer,
        status: statusReducer,
        transaction: transactionReducer,
        stock: stockReducer,
        shipping: shippingReducer,
        checkout: checkoutReducer,
        mutation: mutationReducer,
        order: orderReducer,
        stockHistory: stockHistoryReducer,
        report: reportReducer,
        wishlist: wishlistReducer,
        review: reviewReducer,
        notification: notificationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});
