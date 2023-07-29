import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    newArrivals: {},
    categories: {},
    bestSeller: {},
    color: {},
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
        setColor: (initialState, action) => {
            initialState.color = action.payload;
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
            process.env.REACT_APP_API_BASE_URL + `/categories`,
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

export const getAllColorAsync = () => async (dispatch) => {
    try {
        const result = await axios.get(
            process.env.REACT_APP_API_BASE_URL + '/color',
        );
        dispatch(setColor(result.data))
    } catch (error) {
        console.log(error.message);
    }
};

export const { setNewArrivals, setCategory, setBestSeller, setColor } =
    homepageSlice.actions;
export default homepageSlice.reducer;
