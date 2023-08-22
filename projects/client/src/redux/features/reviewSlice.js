import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    reviews: null,
    userReviews: null,
    reviewedId: [],
};

export const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setReviews: (initialState, action) => {
            initialState.reviews = action.payload;
        },
        setUserReviews: (initialState, action) => {
            initialState.userReviews = action.payload;
        },
        setReviewedId: (initialState, action) => {
            initialState.reviewedId = action.payload;
        },
    },
});

export const getReviewsAsync = (data) => async (dispatch) => {
    try {
        const reviewData = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/reviews/products/${data?.product_id}?rating=${data?.rating}&sort=${data?.sort}`,
        );
        dispatch(setReviews(reviewData.data));
    } catch (error) {
        toast.error(error.message);
    }
};

export const createReviewAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const createReview = await axios.post(
            process.env.REACT_APP_API_BASE_URL + `/reviews`,
            {
                comment: data?.comment,
                rating: data?.rating,
                order_id: data?.order_id,
                product_id: data?.product_id,
            },
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );

        if (createReview.data.success) {
            toast.success('Review Submitted');
            // dispatch(getReviewsAsync({ product_id: data?.product_id }));
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const getUserReviewAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const getData = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/reviews/orders/${data?.order_id}/products/${data?.product_id}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );

        if (getData.data.success) {
            dispatch(setUserReviews(getData.data));
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const deleteReviewAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const removeReview = await axios.delete(
            process.env.REACT_APP_API_BASE_URL + `/reviews/${data.review_id}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        if (removeReview.data.success) {
            toast.success('Review Deleted');
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const { setReviews, setUserReviews, setReviewedId } =
    reviewSlice.actions;
export default reviewSlice.reducer;
