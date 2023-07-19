import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../features/authSlice';
import userReducer from './../features/userSlice';
import homepageReducer from '../features/home/homepageSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        homepage: homepageReducer,
    },
});
