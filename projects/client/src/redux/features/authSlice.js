import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    auth: null,
    isLogin: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (initialState, action) => {
            initialState.auth = action.payload;
        },
        setIsLogin: (initialState, action) => {
            initialState.isLogin = action.payload;
        },
    },
});

export const register = (email) => async (dispatch) => {
    try {
        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/auth/register',
            {
                email,
            },
        );
        toast.success(result.data.message);
    } catch (error) {
        dispatch(setAuth(error.response.data.message));
        console.log(error.message);
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/auth/login',
            {
                email,
                password,
            },
        );

        dispatch(setIsLogin(result.data.success));    
        localStorage.setItem('user', JSON.stringify(result.data.data.token))
        toast.success(result.data.message);
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message);
          } else {
            toast.error(error.message);
          }
    }
};

export const { setAuth, setIsLogin } = authSlice.actions;
export default authSlice.reducer;
