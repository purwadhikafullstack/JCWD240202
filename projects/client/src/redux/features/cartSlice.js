import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    cart: {},
    newItem: null,
    loading: false,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (initialState, action) => {
            initialState.cart = action.payload;
        },
        setNewItem: (initialState, action) => {
            initialState.newItem = action.payload;
        },
        setLoading: (initialState, action) => {
            initialState.loading = action.payload;
        },
    },
});

export const getUserCartAsync = () => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        dispatch(setLoading(false));
        const getCart = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/carts`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );

        setTimeout(() => {
            dispatch(setLoading(true));
        }, 1000);
        dispatch(setCart(getCart.data));
    } catch (error) {
        dispatch(setLoading(false));
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
            dispatch(getNewItemsAsync());
        }
        dispatch(getUserCartAsync());
    } catch (error) {
        toast.error(error.message);
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
    } catch (error) {
        toast.error(error.message)
    }
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
    } catch (error) {
        toast.error(error.message);
    }
};

export const getNewItemsAsync = () => async (dispatch) => {
    try {
        const getUser = JSON.parse(localStorage?.getItem('user'));

        const newItem = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/carts/newest`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );

        dispatch(setNewItem(newItem.data));
    } catch (error) {
        toast.error(error.message);
    }
};

export const { setCart, setNewItem, setLoading } = cartSlice.actions;
export default cartSlice.reducer;
