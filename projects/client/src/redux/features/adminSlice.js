import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    dataAdmin: null,
    isEdited: false,
    isChanged: false,
    isDeleted: false,
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setDataAdmin: (initialState, action) => {
            initialState.dataAdmin = action.payload;
        },
        setIsEdit: (initialState, action) => {
            initialState.isEdited = action.payload;
        },
        setIsChanged: (initialState, action) => {
            initialState.isChanged = action.payload;
        },
        setIsDeleted: (initialState, action) => {
            initialState.isDeleted = action.payload;
        },
    },
});

export const getDataAdminUser =
    (page, sort, search, warehouse) => async (dispatch) => {
        try {
            const dataLogin = JSON.parse(localStorage?.getItem('user'));

            const admins = await axios.get(
                process.env.REACT_APP_API_BASE_URL + '/admins',
                {
                    params: {
                        page,
                        sort,
                        search,
                        warehouse,
                    },
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                    },
                },
            );

            dispatch(setDataAdmin(admins?.data));
        } catch (error) {
            console.log(error);
        }
    };

export const editDataWarehouseAdmin =
    (first_name, last_name, phone_number, id) => async (dispatch) => {
        try {
            const dataLogin = JSON.parse(localStorage?.getItem('user'));

            if (phone_number.match(/[a-zA-Z]/) || phone_number.length < 12) {
                throw new Error('Invalid Phone Number!');
            }

            const result = await axios.patch(
                process.env.REACT_APP_API_BASE_URL +
                    `/admins/edit-profile/${id}`,
                {
                    first_name,
                    last_name,
                    phone_number,
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

            dispatch(setIsEdit(true));
            dispatch(getDataAdminUser());
            dispatch(setIsEdit(false));
        } catch (error) {
            dispatch(setIsEdit(false));
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

export const changePasswordWarehouseAdmin =
    (new_password, confirm_password, id) => async (dispatch) => {
        try {
            const dataLogin = JSON.parse(localStorage?.getItem('user'));
            const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

            if (
                pattern.test(new_password) === false ||
                pattern.test(confirm_password) === false
            ) {
                throw new Error(
                    'Password must be 8 characters, 1 uppercase, 1 lowercase and 1 number!',
                );
            }

            if (new_password !== confirm_password) {
                throw new Error("Password doesn't match");
            }

            const result = await axios.patch(
                process.env.REACT_APP_API_BASE_URL +
                    `/admins/change-password/${id}`,
                {
                    new_password,
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

            dispatch(setIsChanged(true));
            dispatch(getDataAdminUser());
            dispatch(setIsChanged(false));
        } catch (error) {
            dispatch(setIsChanged(false));
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

export const deleteWarehouseAdmin = (id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        const result = await axios.delete(
            process.env.REACT_APP_API_BASE_URL + `/admins/delete/${id}`,
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

        dispatch(setIsDeleted(true));
        dispatch(getDataAdminUser());
        dispatch(setIsDeleted(false));
    } catch (error) {
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

export const { setDataAdmin, setIsEdit, setIsChanged, setIsDeleted } =
    adminSlice.actions;
export default adminSlice.reducer;
