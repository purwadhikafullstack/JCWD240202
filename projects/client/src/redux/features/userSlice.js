import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const initialState = {
    dataLogin: null,
    loading: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setDataLogin: (initialState, action) => {
            initialState.dataLogin = action.payload;
        },
        setLoading: (initialState, action) => {
            initialState.loading = action.payload;
        },
    },
});

export const getDataLogin = () => async (dispatch) => {
    dispatch(setLoading(false));
    try {
        const token = JSON.parse(localStorage?.getItem('user'));
        const dataUser = await axios.get(
            process.env.REACT_APP_API_BASE_URL + '/users',
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            },
        );

        setTimeout(() => {
            dispatch(setLoading(true));
        }, 1000);
        dispatch(setDataLogin(dataUser?.data?.data));
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message)
            localStorage.removeItem('user');
        }
        dispatch(setLoading(false));
    }
};

export const { setDataLogin, setLoading } = userSlice.actions;
export default userSlice.reducer;
