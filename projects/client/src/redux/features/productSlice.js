import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: {},
    details: {},
    recommendations: null,
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (initialState, action) => {
            initialState.products = action.payload;
        },
        setDetails: (initialState, action) => {
            initialState.details = action.payload;
        },
        setRecommendations: (initialState, action) => {
            initialState.recommendations = action.payload;
        },
    },
});

export const getAllProductsAsync = (data) => async (dispatch) => {
    try {
        const allProducts = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/products`,
            {
                params: {
                    page: data.page,
                    category: data.category,
                    sort: data.sort,
                    search: data.search,
                },
            },
        );

        dispatch(setProducts(allProducts.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const productDetailsAsync = (id) => async (dispatch) => {
    try {
        const getDetails = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/products/${id}`,
        );

        dispatch(setDetails(getDetails.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const productRecommenadationAsync = (id) => async (dispatch) => {
    try {
        const getRecommend = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/products/${id}/recommendations`,
        );

        dispatch(setRecommendations(getRecommend.data));
    } catch (error) {
        console.log('error');
    }
};

export const { setProducts, setDetails, setRecommendations } =
    productSlice.actions;
export default productSlice.reducer;
