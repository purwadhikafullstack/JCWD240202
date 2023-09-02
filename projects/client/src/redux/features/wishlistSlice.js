import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    wishlists: null,
    wishlistIds: null,
    loading: false,
};

export const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlists: (initialState, action) => {
            initialState.wishlists = action.payload;
        },
        setWishlistIds: (initialState, action) => {
            initialState.wishlistIds = action.payload;
        },
        setLoading: (initialState, action) => {
            initialState.loading = action.payload;
        },
    },
});

export const getUserWishlists = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        dispatch(setLoading(false))
        const getWishlists = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/wishlists?sort=${data?.sort ? data?.sort : ''}&page=${
                    data?.page ? data?.page : ''
                }`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        setTimeout(() => {
            dispatch(setLoading(true));
        }, 1000);
        dispatch(setWishlists(getWishlists.data));
        const getIds = getWishlists?.data?.allProduct?.wishlists?.map(
            (value) => {
                return value?.product_id;
            },
        );
        dispatch(setWishlistIds(getIds));
    } catch (error) {
        dispatch(setLoading(false));
        toast.error(error.message);
    }
};

export const removeWishlistAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const remove = await axios.delete(
            process.env.REACT_APP_API_BASE_URL +
                `/wishlists/products/${data?.product_id}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        if (remove.data.success) {
            toast.success('Product Removed From Wishlist');
            dispatch(getUserWishlists());
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const addWishlistsAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const addProduct = await axios.post(
            process.env.REACT_APP_API_BASE_URL + `/wishlists`,
            {
                product_id: data.product_id,
            },
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        if (addProduct.data.success) {
            toast.success('Product Added To Wishlist');
            dispatch(getUserWishlists());
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const { setWishlists, setWishlistIds, setLoading } =
    wishlistSlice.actions;
export default wishlistSlice.reducer;
