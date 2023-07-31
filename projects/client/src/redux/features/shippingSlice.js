import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const initialState = {
    shipping: null,
};

export const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        setShipping: (initialState, action) => {
            initialState.shipping = action.payload;
        },
    },
});

export const getShippingListAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const getShipping = await axios.post(
            process.env.REACT_APP_API_BASE_URL + `/rajaongkir/costs`,
            {
                origin: data.origin_id,
                destination: data.destination_id,
                weight: data.weight,
                courier: data.courier,
            },
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
    } catch (error) {}
};

export const { setShipping } = shippingSlice.actions;
export default shippingSlice.reducer;
