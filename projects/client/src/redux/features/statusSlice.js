import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    status: {},
};

export const statusSlice = createSlice({
    name: 'status',
    initialState,
    reducers: {
        setStatus: (initialState, action) => {
            initialState.status = action.payload;
        },
    },
});

export const getAllStatus = () => async (dispatch) => {
    try {
        const result = await axios.get(process.env.REACT_APP_API_BASE_URL + '/status')
        dispatch(setStatus(result.data))
    } catch (error) {
        console.log(error.message);
    }
}

export const { setStatus } = statusSlice.actions
export default statusSlice.reducer