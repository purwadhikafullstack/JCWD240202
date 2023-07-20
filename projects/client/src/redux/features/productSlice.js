import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    products: {},
    details: null,
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
    },
});

export const getAllProductsAsync = (data) => async (dispatch) => {
    try {
        console.log(data);
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

export const { setProducts, setDetails } = productSlice.actions;
export default productSlice.reducer;