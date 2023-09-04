import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const initialState = {
    notifications: null,
};

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotifications: (initialState, action) => {
            initialState.notifications = action.payload;
        },
    },
});

export const getUserNotificationAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const getNotifications = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/notifications?page=${data?.page}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        dispatch(setNotifications(getNotifications.data));
    } catch (error) {
        toast.error(error.message);
    }
};

export const userReadNotificationAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const readNotification = await axios.patch(
            process.env.REACT_APP_API_BASE_URL + `/notifications`,
            {
                notification_id: data?.notification_id,
            },
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );

        if (readNotification.data.success) {
            dispatch(getUserNotificationAsync({ page: 1 }));
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const createNotificationAsync = (data) => async (dispatch) => {
    try {
        const getUser = localStorage.getItem('user')
            ? JSON.parse(localStorage?.getItem('user'))
            : null;
        const createNotif = await axios.post(
            process.env.REACT_APP_API_BASE_URL + `/notifications`,
            {
                order_id: data.order_id,
                title: data.title,
                message: data.message,
            },
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );

        if (createNotif.data.success) {
            dispatch(getUserNotificationAsync({ page: 1 }));
            toast.success('Message Sent To User');
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const { setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
