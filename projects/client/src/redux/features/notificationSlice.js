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

export const getUserNotificationAsync = () => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const getNotifications = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/notifications`,
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

export const { setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
