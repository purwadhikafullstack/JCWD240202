import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const initialState = {
    order: null,
    orderDetails: null,
};

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrder: (initialState, action) => {
            initialState.order = action.payload;
        },
        setOrderDetails: (initialState, action) => {
            initialState.orderDetails = action.payload;
        },
    },
});

export const getAllUserOrderAsync = () => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const getOrders = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/orders`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        dispatch(setOrder(getOrders));
    } catch (error) {}
};

export const getOrderDetailsAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const getDetails = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/orders/${data.order_id}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        dispatch(setOrderDetails(getDetails.data));
    } catch (error) {}
};

export const postUserPaymentProofAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const postProof = await axios.post(
            process.env.REACT_APP_API_BASE_URL + `/orders/payment_proof`,
            {
                order_id: data.order_id,
                images: data.images,
            },
            {
                headers: {
                    Authorization: `Bearer ${getUser}`,
                    'Content-Type': 'multipart/form-data',
                },
            },
        );

        if (postProof?.data?.success === true) {
            toast.success('Payment Proof Successfuly Uploaded');
            dispatch(getOrderDetailsAsync({ order_id: data.order_id }));
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const { setOrder, setOrderDetails } = orderSlice.actions;
export default orderSlice.reducer;
