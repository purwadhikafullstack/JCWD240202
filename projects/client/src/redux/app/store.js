import { configureStore } from '@reduxjs/toolkit';
import authReducer from './../features/authSlice';
import userReducer from './../features/userSlice';

export const store = configureStore({
    reducer: {
        // insert reducer here
        auth: authReducer,
        user: userReducer,
    },
});
