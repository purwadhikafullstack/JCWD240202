import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    auth: null,
    isLogin: false,
    isVerif: false,
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
        setIsVerif: (initialState, action) => {
            initialState.isVerif = action.payload;
        },
    },
});

export const register = (email) => async (dispatch) => {
    try {
        await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/auth/register',
            {
                email,
            },
        );
        dispatch(setIsLogin(true));
    } catch (error) {
        dispatch(setAuth(error.response.data.message));
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
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
        localStorage.setItem('user', JSON.stringify(result.data.data.token));
        toast.success(result.data.message);
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    }
};

export const verification =
    (password, confirmPassword, token) => async (dispatch) => {
        try {
            if (password !== confirmPassword) {
                dispatch(setAuth("Password doesn't match"));
                throw new Error("Password doesn't match");
            }

            const result = await axios.patch(
                process.env.REACT_APP_API_BASE_URL + '/auth/verification',
                {
                    password,
                    confirmPassword,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            dispatch(setIsVerif(true));
            toast.success(result.data.message);
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
        }
    };

export const reqResetPassword = (email) => async (dispatch) => {
    try {
        await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/auth/req-forgot-password',
            {
                email,
            },
        );
        dispatch(setIsLogin(true));
    } catch (error) {
        dispatch(setAuth(error.response.data.message));
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    }
};

export const resetPassword =
    (password, confirmPassword, token) => async (dispatch) => {
        try {
            if (password !== confirmPassword) {
                dispatch(setAuth("Password doesn't match"));
                throw new Error("Password doesn't match");
            }
            console.log('masukkkkkkkk');
            const result = await axios.patch(
                process.env.REACT_APP_API_BASE_URL + '/auth/forgot-password',
                {
                    password,
                    confirmPassword,
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            dispatch(setIsVerif(true));
            toast.success(result.data.message);
        } catch (error) {
            if (error.response) {
                dispatch(setAuth(error.response.data.message));
                toast.error(error.response.data.message);
            } else {
                toast.error(error.message);
            }
        }
    };

export const { setAuth, setIsLogin, setIsVerif} = authSlice.actions;
export default authSlice.reducer;
