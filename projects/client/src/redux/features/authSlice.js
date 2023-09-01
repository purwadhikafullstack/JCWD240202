import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

//firebase
import { auth } from '../../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
const provider = new GoogleAuthProvider();

const initialState = {
    auth: null,
    isLogin: false,
    isVerif: false,
    isDenied: false,
    loading: false,
    msg: null
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
        setIsDenied: (initialState, action) => {
            initialState.isDenied = action.payload;
        },
        setLoading: (initialState, action) => {
            initialState.loading = action.payload;
        },
        setMsg: (initialState, action) => {
            initialState.msg = action.payload;
        },
    },
});

export const register = (email) => async (dispatch) => {
    try {
        dispatch(setLoading(true))
        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/auth/register',
            {
                email,
            },
        );
        if (result) {
            dispatch(setLoading(false))
            dispatch(setIsLogin(true));
        }
    } catch (error) {
        dispatch(setAuth(error.response.data.message));
        dispatch(setLoading(false))
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    } finally {
        dispatch(setIsLogin(false));
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
    } finally {
        dispatch(setIsLogin(false))
    }
};

export const verification = (password, confirmPassword, token) => async (dispatch) => {
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
        dispatch(setLoading(true))
        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/auth/req-forgot-password',
            {
                email,
            },
        );
        if (result) {
            dispatch(setLoading(false))
            dispatch(setIsLogin(true));
        }
    } catch (error) {
        dispatch(setMsg(error.response.data.message));
        dispatch(setLoading(false))
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    } finally {
        dispatch(setIsLogin(false));
    }
};

export const resetPassword = (password, confirmPassword, token) => async (dispatch) => {
        try {
            if (password !== confirmPassword) {
                dispatch(setAuth("Password doesn't match"));
                throw new Error("Password doesn't match");
            }
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

export const expiredLink = (token) => async (dispatch) => {
    try {
        const result = await axios.get(process.env.REACT_APP_API_BASE_URL + '/auth/check-link-expired',
            {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
    } catch (error) {
        dispatch(setIsDenied(true))
        if (error.response) {
            toast.error(error.response.data.message);
        } else {
            toast.error(error.message);
        }
    } finally {
        dispatch(setIsDenied(false))
    }
}

export const loginGoogleAsync = () => async (dispatch) => {
    try {
		const response = await signInWithPopup(auth, provider);
        const result = await axios.post(process.env.REACT_APP_API_BASE_URL + '/auth/login-google', {
            data: response.user.providerData[0]
        })
        dispatch(setIsLogin(result.data.success));
        localStorage.setItem('user', JSON.stringify(result.data.data.token));
        toast.success(result.data.message);
    } catch (error) {
        if (error.response) {
            console.log(error.response.data.message);
        } else {
            console.log(error.message);
        }
    } finally {
        dispatch(setIsLogin(false))
    }
}

export const { setAuth, setIsLogin, setIsVerif, setIsDenied, setLoading, setMsg} = authSlice.actions;
export default authSlice.reducer;
