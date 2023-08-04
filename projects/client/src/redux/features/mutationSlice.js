import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getDataLogin } from './userSlice';

const initialState = {
    listWhMutation: null,
    disabledButton: false,
    modal: false,
    allMutation: null,
};

export const mutationSlice = createSlice({
    name: 'mutation',
    initialState,
    reducers: {
        setListWhMutation: (initialState, action) => {
            initialState.listWhMutation = action.payload;
        },
        setDisabledButton: (initialState, action) => {
            initialState.disabledButton = action.payload;
        },
        setModal: (initialState, action) => {
            initialState.modal = action.payload;
        },
        setAllMutation: (initialState, action) => {
            initialState.allMutation = action.payload;
        },
    },
});

export const getListWhMutation = () => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const listWh = await axios.get(
            process.env.REACT_APP_API_BASE_URL + '/warehouses/list',
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

        dispatch(setListWhMutation(listWh?.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const requestMutation =
    (
        product_stock_id,
        warehouse_origin_id,
        warehouse_destination_id,
        stock,
        quantity,
        params,
    ) =>
    async (dispatch) => {
        try {
            const dataLogin = JSON.parse(localStorage?.getItem('user'));
            dispatch(setDisabledButton(true));

            if (quantity > stock) {
                throw new Error('Not Enough Stock!');
            }

            const reqMutation = await axios.post(
                process.env.REACT_APP_API_BASE_URL + '/mutations/request',
                {
                    product_stock_id,
                    warehouse_origin_id,
                    warehouse_destination_id,
                    stock,
                    quantity,
                },
                {
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                    },
                },
            );

            if (reqMutation) {
                dispatch(setModal(true));
                toast.success(reqMutation.data.message, {
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
            dispatch(
                getAllMutation(
                    params.page,
                    params.response,
                    params.request,
                    params.status,
                    params.sort,
                    params.startDate,
                    params.endDate,
                ),
            );
        } catch (error) {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
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
        } finally {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
        }
    };

export const getAllMutation =
    (page, response, request, status, sort, startDate, endDate) =>
    async (dispatch) => {
        try {
            const dataLogin = JSON.parse(localStorage?.getItem('user'));
            const dataAllMutation = await axios.get(
                process.env.REACT_APP_API_BASE_URL + '/mutations',
                {
                    params: {
                        page,
                        response,
                        request,
                        status,
                        sort,
                        startDate,
                        endDate,
                    },
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                    },
                },
            );

            dispatch(setAllMutation(dataAllMutation?.data));
        } catch (error) {
            console.log(error);
        }
    };

export const {
    setListWhMutation,
    setDisabledButton,
    setModal,
    setAllMutation,
} = mutationSlice.actions;
export default mutationSlice.reducer;
