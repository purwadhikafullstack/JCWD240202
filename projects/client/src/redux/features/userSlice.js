import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    dataLogin: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDataLogin: (initialState, action) => {
            initialState.dataLogin = action.payload;
        },
    },
});

export const getDataLogin = () => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const dataUser = await axios.get(
            process.env.REACT_APP_API_BASE_URL + '/users',
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

        dispatch(setDataLogin(dataUser?.data?.data));
    } catch (error) {
        console.log(error);
    }
};

export const { setDataLogin } = userSlice.actions;
export default userSlice.reducer;