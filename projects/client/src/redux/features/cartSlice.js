import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    cart: {},
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (initialState, action) => {
            initialState.cart = action.payload;
        },
    },
});

export const getUserCartAsync = () => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const getCart = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/carts`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );

        dispatch(setCart(getCart.data));
    } catch (error) {
        console.log('error => ', error.message);
    }
};

export const userAddToCartAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const addCart = await axios.post(
            process.env.REACT_APP_API_BASE_URL + `/carts`,
            {
                product_id: data.product_id,
                quantity: data.quantity,
            },
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );

        if (addCart.data.success === true) {
            toast.success('Product added to cart');
        }
        dispatch(getUserCartAsync());
    } catch (error) {
        toast.error('Please Login/Register To Add Product');
    }
};

export const userDeleteProductCartAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const removeProduct = await axios.delete(
            process.env.REACT_APP_API_BASE_URL + `/carts/product/${data.id}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );

        if (removeProduct.data.success) {
            toast.success('Product remove from cart');
        }
        dispatch(getUserCartAsync());
    } catch (error) {}
};

export const modifyQuantityAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const editQty = await axios.patch(
            process.env.REACT_APP_API_BASE_URL + `/carts/product/${data.id}`,
            {
                quantity: data.quantity,
            },
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        if (
            editQty.data.message === 'product removed' ||
            editQty.data.message === 'cart removed'
        ) {
            toast.success(editQty.data.message);
        }
        dispatch(getUserCartAsync());
    } catch (error) {}
};

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
