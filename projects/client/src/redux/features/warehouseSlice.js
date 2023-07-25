import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getDataAdminUser } from './adminSlice';

const initialState = {
    availableWh: null,
    isAssigned: false,
    isUnassigned: false,
    dataWh: null,
};

export const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {
        setAvailableWh: (initialState, action) => {
            initialState.availableWh = action.payload;
        },
        setIsAssigned: (initialState, action) => {
            initialState.isAssigned = action.payload;
        },
        setIsUnassigned: (initialState, action) => {
            initialState.isUnassigned = action.payload;
        },
        setDataWh: (initialState, action) => {
            initialState.dataWh = action.payload;
        },
    },
});

export const getAvailableWh = () => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        const result = await axios.get(
            process.env.REACT_APP_API_BASE_URL + '/warehouses/available',
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

        dispatch(setAvailableWh(result?.data?.data));
    } catch (error) {
        console.log(error);
    }
};

export const setWhAdmin = (warehouse_id, user_id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        if (!warehouse_id) {
            throw new Error("Field can't be Empty");
        }

        const result = await axios.patch(
            process.env.REACT_APP_API_BASE_URL +
                `/warehouses/assign-admin/${user_id}`,
            {
                warehouse_id,
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

        dispatch(setIsAssigned(true));
        dispatch(getDataAdminUser());
        dispatch(setIsAssigned(false));
    } catch (error) {
        dispatch(setIsAssigned(false));
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
};

export const unassignWhAdmin = (warehouse_id, user_id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        const result = await axios.patch(
            process.env.REACT_APP_API_BASE_URL +
                `/warehouses/unassign-admin/${user_id}`,
            {
                warehouse_id,
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

        dispatch(setIsUnassigned(true));
        dispatch(getDataAdminUser());
        dispatch(setIsUnassigned(false));
    } catch (error) {
        dispatch(setIsUnassigned(false));
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
};

export const getAllDataWh = () => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        const result = await axios.get(
            process.env.REACT_APP_API_BASE_URL + '/warehouses/',
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

        dispatch(setDataWh(result.data?.data));
    } catch (error) {}
};
export const { setAvailableWh, setIsAssigned, setIsUnassigned, setDataWh } =
    warehouseSlice.actions;
export default warehouseSlice.reducer;
