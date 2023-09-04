import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getDataAdminUser } from './adminSlice';

const initialState = {
    disabledButton: false,
    modal: false,
};

export const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState,
    reducers: {
        setDisabledButton: (initialState, action) => {
            initialState.disabledButton = action.payload;
        },
        setModal: (initialState, action) => {
            initialState.modal = action.payload;
        },
    },
});

export const adminLogin = (email, password) => async (dispatch) => {
    try {
        dispatch(setDisabledButton(true));
        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/auth/admins/login',
            {
                email,
                password,
            },
        );

        localStorage?.setItem('user', JSON.stringify(result.data.data.token));
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
    } catch (error) {
        dispatch(setDisabledButton(false));
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
    } finally {
        dispatch(setDisabledButton(false));
    }
};

export const adminRegister =
    (
        first_name,
        last_name,
        email,
        phone_number,
        password,
        confirm_password,
        params,
        tokenRecaptcha,
    ) =>
    async (dispatch) => {
        try {
            dispatch(setDisabledButton(true));
            const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            const dataLogin = JSON.parse(localStorage?.getItem('user'));

            if (!email.includes('@') || !email.includes('.co')) {
                throw new Error('Invalid Email Address!');
            }

            if (pattern.test(password) === false) {
                throw new Error(
                    'Password must be 8 characters, 1 uppercase, 1 lowercase and 1 number!',
                );
            }

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
                    tokenRecaptcha,
                },
                {
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                    },
                },
            );

            if (result) {
                dispatch(setModal(true));
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
                dispatch(
                    getDataAdminUser(
                        params.page,
                        params.search,
                        params.sort,
                        params.warehouse,
                    ),
                );
            }
        } catch (error) {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
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
        } finally {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
        }
    };

export const { setIsLoginAdmin, setDisabledButton, setModal } =
    adminAuthSlice.actions;
export default adminAuthSlice.reducer;
