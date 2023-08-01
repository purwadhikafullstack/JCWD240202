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
    },
});
