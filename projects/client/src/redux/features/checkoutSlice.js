import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { getUserCartAsync } from './cartSlice';

const initialState = {
    isOrderSuccess: false,
    orderId: null,
};

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        setIsOrderSuccess: (initialState, action) => {
            initialState.isOrderSuccess = action.payload;
        },
        setOrderId: (initialState, action) => {
            initialState.orderId = action.payload;
        },
    },
});

export const createNewOrderAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const createOrder = await axios.post(
            process.env.REACT_APP_API_BASE_URL + `/checkout`,
            {
                cart_id: data.cart_id,
                shipping_address: data.shipping_address,
                courier: data.courier,
                shipping_method: data.shipping_method,
                shipping_fee: data.shipping_fee,
                total_weight: data.total_weight,
                total_cart_price: data.total_cart_price,
                total: data.total,
                warehouse_id: data.warehouse_id,
                receiver_name: data.receiver_name,
                receiver_number: data.receiver_number,
            },
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );

        if (createOrder.data.success) {
            dispatch(setIsOrderSuccess(true));
            dispatch(setOrderId(createOrder.data));
            dispatch(getUserCartAsync());
            toast.success('Checkout Order Success!');
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const { setIsOrderSuccess, setOrderId } = checkoutSlice.actions;
export default checkoutSlice.reducer;
