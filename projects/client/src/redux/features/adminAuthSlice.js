import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getDataAdminUser } from './adminSlice';

const initialState = {
    isLoginAdmin: null,
    isRegister: null,
};

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setIsLoginAdmin: (initialState, action) => {
            initialState.isLoginAdmin = action.payload;
        },
        setIsRegister: (initialState, action) => {
            initialState.isRegister = action.payload;
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

export const adminRegister =
    (first_name, last_name, email, phone_number, password, confirm_password) =>
    async (dispatch) => {
        try {
            const dataLogin = JSON.parse(localStorage?.getItem('user'));

            if (phone_number.match(/[a-zA-Z]/) || phone_number.length < 12) {
                throw new Error('Invalid Phone Number!');
            }

            if (password !== confirm_password) {
                throw new Error("Password doesn't match");
            }

            const result = await axios.post(
                process.env.REACT_APP_API_BASE_URL + '/auth/admins/register',
                {
                    first_name,
                    last_name,
                    email,
                    phone_number,
                    password,
                    confirm_password,
                },
                {
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                    },
                },
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

            dispatch(setIsRegister(true));
            dispatch(getDataAdminUser());
            dispatch(setIsRegister(false));
        } catch (error) {
            dispatch(setIsRegister(false));
            if (error.response) {
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

export const { setIsLoginAdmin, setIsRegister } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
