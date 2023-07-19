import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../features/authSlice';
import homepageReducer from '../features/homepageSlice';
import productReducer from '../features/productSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        homepage: homepageReducer,
        product: productReducer,
    },
});
