import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const initialState = {
    order: null,
    orderDetails: null,
    loading: false,
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
        setLoading: (initialState, action) => {
            initialState.loading = action.payload
        }
    },
});

export const getAllUserOrderAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        dispatch(setLoading(false))
        const getOrders = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/orders?page=${data.page}&sort=${data.sort}&status_id=${data.status_id}&search=${data.search}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        setTimeout(() => {
            dispatch(setLoading(true));
        }, 1000);
        dispatch(setOrder(getOrders));
    } catch (error) {
        dispatch(setLoading(false))
    }
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

export const userCancelOrderAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const cancelOrder = await axios.post(
            process.env.REACT_APP_API_BASE_URL + `/orders/cancel`,
            {
                order_id: data.order_id,
            },
            {
                headers: {
                    Authorization: `Bearer ${getUser}`,
                },
            },
        );
        if (cancelOrder?.data?.success === true) {
            toast.success('Order Cancelled');
            dispatch(getOrderDetailsAsync({ order_id: data.order_id }));
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const userConfirmOrderAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const confirm = await axios.post(
            process.env.REACT_APP_API_BASE_URL + `/orders/confirm`,
            {
                order_id: data.order_id,
            },
            {
                headers: {
                    Authorization: `Bearer ${getUser}`,
                },
            },
        );
        if (confirm.data.success === true) {
            toast.success('Order Confirmed');
            dispatch(getOrderDetailsAsync({ order_id: data.order_id }));
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const { setOrder, setOrderDetails, setLoading } = orderSlice.actions;
export default orderSlice.reducer;
