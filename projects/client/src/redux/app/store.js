import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../features/authSlice';

export const store = configureStore({
    reducer: {
        // insert reducer here
        auth: authReducer,
    },
});
