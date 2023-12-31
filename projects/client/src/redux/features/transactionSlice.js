import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getUserNotificationAsync } from './notificationSlice';

const initialState = {
    data: {},
    history: {},
    loading: false,
};

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setData: (initialState, action) => {
            initialState.data = action.payload;
        },
        sethistory: (initialState, action) => {
            initialState.history = action.payload;
        },
        setLoading: (initialState, action) => {
            initialState.loading = action.payload;
        },
    },
});

export const allTransactionAsync =
    (page, warehouse, search, startDate, endDate, statusId, sort) =>
    async (dispatch) => {
        try {
            dispatch(setLoading(false))
            const dataLogin = JSON.parse(localStorage?.getItem('user'));
            const result = await axios.get(
                process.env.REACT_APP_API_BASE_URL + '/transactions',
                {
                    params: {
                        page,
                        warehouse,
                        search,
                        startDate,
                        endDate,
                        statusId,
                        sort,
                    },
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                    },
                },
            );
            setTimeout(() => {
                dispatch(setLoading(true));
            }, 1000);
            dispatch(setData(result.data));
        } catch (error) {
            dispatch(setLoading(false));
            console.log(error.message);
        }
    };

export const confirmPaymentAsync = (cartId, page, warehouse, search, startDate, endDate, statusId, sort) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL +
                '/transactions/confirmation-payment',
            {
                cart_id: cartId,
            },
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );
        dispatch(allTransactionAsync(page, warehouse, search, startDate, endDate, statusId, sort));
        dispatch(getUserNotificationAsync({page: 1}))
        toast.success(result.data.message, {
            position: 'top-center',
            duration: 2000,
            style: {
                border: '2px solid #000',
                borderRadius: '10px',
                background: '#0051BA',
                color: 'white',
            },
        });
    } catch (error) {
        if (error.response) {
            toast.error(error.response?.data?.message, {
                position: 'top-center',
                duration: 2000,
                style: {
                    border: '2px solid #000',
                    borderRadius: '10px',
                    background: '#DC2626',
                    color: 'white',
                },
            });
        } else {
            toast.error(error.message, {
                position: 'top-center',
                duration: 2000,
                style: {
                    border: '2px solid #000',
                    borderRadius: '10px',
                    background: '#DC2626',
                    color: 'white',
                },
            });
        }
    }
};

export const cancelConfirmPaymentAsync = (order_id, page, warehouse, search, startDate, endDate, statusId, sort) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.patch(
            process.env.REACT_APP_API_BASE_URL + '/transactions/cancel-payment',
            {
                order_id,
            },
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );
        dispatch(allTransactionAsync(page, warehouse, search, startDate, endDate, statusId, sort));
        toast.success(result.data.message, {
            position: 'top-center',
            duration: 2000,
            style: {
                border: '2px solid #000',
                borderRadius: '10px',
                background: '#0051BA',
                color: 'white',
            },
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response?.data?.message);
        } else {
            console.log(error.message);
        }
    }
};

export const sendUserOrder = (order_id, page, warehouse, search, startDate, endDate, statusId, sort) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL +
                '/transactions/confirmation-shipping',
            {
                order_id,
            },
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );
        dispatch(allTransactionAsync(page, warehouse, search, startDate, endDate, statusId, sort));
        dispatch(getUserNotificationAsync({page: 1}))
        toast.success(result.data.message, {
            position: 'top-center',
            duration: 2000,
            style: {
                border: '2px solid #000',
                borderRadius: '10px',
                background: '#0051BA',
                color: 'white',
            },
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response?.data?.message);
        } else {
            console.log(error.message);
        }
    }
};

export const cancelShipping = (order_id, page, warehouse, search, startDate, endDate, statusId, sort) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL +
                '/transactions/cancel-shipping',
            {
                order_id,
            },
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );
        dispatch(allTransactionAsync(page, warehouse, search, startDate, endDate, statusId, sort));
        toast.success(result.data.message, {
            position: 'top-center',
            duration: 2000,
            style: {
                border: '2px solid #000',
                borderRadius: '10px',
                background: '#0051BA',
                color: 'white',
            },
        });
    } catch (error) {
        if (error.response) {
            console.log(error.response?.data?.message);
        } else {
            console.log(error.message);
        }
    }
};

export const transactionHistory = (order_id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/transactions/history/${order_id}`,
        );
        dispatch(sethistory(result.data.data));
    } catch (error) {
        if (error.response) {
            console.log(error.response?.data?.message);
        } else {
            console.log(error.message);
        }
    }
};

export const { setData, sethistory, setLoading } = transactionSlice.actions;
export default transactionSlice.reducer;
