import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    data: {},
};

export const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        setData: (initialState, action) => {
            initialState.data = action.payload;
        },
    },
});

const dataLogin = JSON.parse(localStorage?.getItem('user'));

export const allTransactionAsync = (page, warehouse, search, startDate, endDate, statusId, sort) => async (dispatch) => {
    console.log(startDate, endDate)
    try {

        const result = await axios.get(process.env.REACT_APP_API_BASE_URL + '/transactions', {
            params: {
                page,
                warehouse,
                search,
                startDate,
                endDate,
                statusId,
                sort
            },
            headers: {
                authorization: `Bearer ${dataLogin}`,
            },
        },)
        dispatch(setData(result.data))
    } catch (error) {
        console.log(error.message);
    }
}

export const { setData } = transactionSlice.actions
export default transactionSlice.reducer
