import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../features/authSlice';
import userReducer from './../features/userSlice';
import homepageReducer from '../features/homepageSlice';
import productReducer from '../features/productSlice';
import cartReducer from '../features/cartSlice';
import adminAuthReducer from '../features/adminAuthSlice';
import adminReducer from '../features/adminSlice';
import warehouseReducer from '../features/warehouseSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        homepage: homepageReducer,
        product: productReducer,
        cart: cartReducer,
        adminAuth: adminAuthReducer,
        admin: adminReducer,
        warehouse: warehouseReducer,
    },
});
