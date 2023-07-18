import { configureStore } from '@reduxjs/toolkit';

import homepageReducer from '../features/home/homepageSlice';

export const store = configureStore({
    reducer: {
        homepage: homepageReducer,
    },
});
