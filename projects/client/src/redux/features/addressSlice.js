import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const initialState = {
    address: null,
    province: [],
    city: [],
};

export const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        setAddress: (initialState, action) => {
            initialState.address = action.payload;
        },
        setProvince: (initialState, action) => {
            initialState.province = action.payload;
        },
        setCity: (initialState, action) => {
            initialState.city = action.payload;
        },
    },
});

export const getUserAddressAsync = () => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const getAddress = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/addresses`,
            {
                headers: {
                    authorization: `Bearer ${getUser}`,
                },
            },
        );

        dispatch(setAddress(getAddress.data));
    } catch (error) {
        console.log('error => ', error);
    }
};

export const getProvincesAsync = () => async (dispatch) => {
    try {
        const provinceRO = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/rajaongkir/provinces`,
        );
        dispatch(setProvince(provinceRO.data));
    } catch (error) {
        console.log('error => ', error);
    }
};

export const getCitiesAsync = () => async (dispatch) => {
    try {
        const citiesRO = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/rajaongkir/cities`,
        );
        dispatch(setCity(citiesRO.data));
    } catch (error) {}
};

export const addNewAddressAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const addAddress = await axios.post(
            process.env.REACT_APP_API_BASE_URL + `/addresses/add`,
            {
                receiver_name: data.receiver_name,
                receiver_number: data.receiver_number,
                province: data.province_name,
                province_id: data.province_id,
                city: data.city_name,
                city_id: data.city_id,
                subdistrict: data.subdistrict,
                street: data.street,
                postcode: data.postcode,
            },
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );

        if (addAddress.data.success) {
            toast.success('Create New Address Success');
        }
    } catch (error) {
        toast.error(error.message);
    }
};

export const { setAddress, setProvince, setCity } = addressSlice.actions;
export default addressSlice.reducer;
