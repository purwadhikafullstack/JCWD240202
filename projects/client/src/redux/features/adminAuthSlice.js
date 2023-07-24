import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    isLoginAdmin: null,
};

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setIsLoginAdmin: (initialState, action) => {
            initialState.isLoginAdmin = action.payload;
        },
    },
});

export const adminLogin = (email, password) => async (dispatch) => {
    try {
        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/auth/admins/login',
            {
                email,
                password,
            },
        );

        if (result) {
            dispatch(setIsLoginAdmin(result.data.success));
            localStorage.setItem(
                'user',
                JSON.stringify(result.data.data.token),
            );
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
        }
    } catch (error) {
        if (error.response) {
            dispatch(setIsLoginAdmin(false));
            toast.error(error.response.data.message, {
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
            dispatch(setIsLoginAdmin(false));
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

export const { setIsLoginAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
