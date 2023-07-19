import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    newArrivals: {},
    categories: {},
    bestSeller: {},
};

export const homepageSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setNewArrivals: (initialState, action) => {
            initialState.newArrivals = action.payload;
        },
        setCategory: (initialState, action) => {
            initialState.category = action.payload;
        },
        setBestSeller: (initialState, action) => {
            initialState.bestSeller = action.payload;
        },
    },
});

export const getNewArrivalsAsync = () => async (dispatch) => {
    try {
        const getNewArrivals = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/home/newArrivals`,
        );

        dispatch(setNewArrivals(getNewArrivals.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const getAllCategoriesAsync = () => async (dispatch) => {
    try {
        const getCategories = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/home/categories`,
        );

        dispatch(setCategory(getCategories.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const getBestSellerAsync = () => async (dispatch) => {
    try {
        const getBestSeller = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/home/bestSeller`,
        );

        dispatch(setBestSeller(getBestSeller.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const { setNewArrivals, setCategory, setBestSeller } =
    homepageSlice.actions;
export default homepageSlice.reducer;
