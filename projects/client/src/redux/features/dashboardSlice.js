import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    customers: null,
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setCustomers: (initialState, action) => {
            initialState.customers = action.payload;
        },
    },
});

export const getCustomersAsync = () => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const getCustomerCount = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/dashboards/customers`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        dispatch(setCustomers(getCustomerCount.data));
    } catch (error) {
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
};

export const { setCustomers } = dashboardSlice.actions;
export default dashboardSlice.reducer;
