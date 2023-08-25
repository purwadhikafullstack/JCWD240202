import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const initialState = {
    data: {},
    history: {}
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
    },
});

export const allTransactionAsync = (page, warehouse, search, startDate, endDate, statusId, sort) =>
    async (dispatch) => {
        try {
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
            dispatch(setData(result.data));
        } catch (error) {
            console.log(error.message);
        }
    };

export const confirmPaymentAsync = (cartId) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/transactions/confirmation-payment',
            {
                cart_id: cartId,
            },
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );
        dispatch(allTransactionAsync());
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

export const cancelConfirmPaymentAsync = (order_id) => async (dispatch) => {
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
        dispatch(allTransactionAsync());
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
            console.log(error.response?.data?.message)
        } else {
            console.log(error.message);
        }
    }
}

export const sendUserOrder = (order_id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.post(process.env.REACT_APP_API_BASE_URL + '/transactions/confirmation-shipping',
        {
            order_id,
        },{
            headers: {
                authorization: `Bearer ${dataLogin}`,
            },
        },)
        dispatch(allTransactionAsync());
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
            console.log(error.response?.data?.message)
        } else {
            console.log(error.message);
        }
    }
}

export const cancelShipping = (order_id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.post(process.env.REACT_APP_API_BASE_URL + '/transactions/cancel-shipping',
        {
            order_id
        },{
            headers: {
                authorization: `Bearer ${dataLogin}`,
            },
        },)
        dispatch(allTransactionAsync());
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
            console.log(error.response?.data?.message)
        } else {
            console.log(error.message);
        }
    }
}

export const transactionHistory = (order_id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.get(process.env.REACT_APP_API_BASE_URL + `/transactions/history/${order_id}`)
        dispatch(sethistory(result.data.data))
    } catch (error) {
        if (error.response) {
            console.log(error.response?.data?.message)
        } else {
            console.log(error.message);
        }
    }
}

export const { setData, sethistory } = transactionSlice.actions;
export default transactionSlice.reducer;
