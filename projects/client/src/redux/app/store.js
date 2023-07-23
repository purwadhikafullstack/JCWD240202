import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../features/authSlice';
import userReducer from './../features/userSlice';
import homepageReducer from '../features/homepageSlice';
import productReducer from '../features/productSlice';
import adminAuthReducer from '../features/adminAuthSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        homepage: homepageReducer,
        product: productReducer,
        adminAuth: adminAuthReducer,
    },
});
