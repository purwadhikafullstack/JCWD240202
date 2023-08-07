import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    stocks: null,
    disabledButton: false,
    modal: false,
};

export const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        setStocks: (initialState, action) => {
            initialState.stocks = action.payload;
        },
        setDisabledButton: (initialState, action) => {
            initialState.disabledButton = action.payload;
        },
        setModal: (initialState, action) => {
            initialState.modal = action.payload;
        },
    },
});

export const getDataStock =
    (page, search, sort, category, warehouse) => async (dispatch) => {
        try {
            const token = JSON.parse(localStorage?.getItem('user'));
            const dataStock = await axios.get(
                process.env.REACT_APP_API_BASE_URL + '/stocks',
                {
                    params: {
                        page,
                        search,
                        sort,
                        category,
                        warehouse,
                    },
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            dispatch(setStocks(dataStock?.data));
        } catch (error) {
            console.log(error);
        }
    };

export const addQuantity =
    (product_stock_id, quantity, params) => async (dispatch) => {
        try {
            const token = JSON.parse(localStorage?.getItem('user'));
            dispatch(setDisabledButton(true));
            const addStock = await axios.patch(
                process.env.REACT_APP_API_BASE_URL +
                    `/stocks/add/${product_stock_id}`,
                { quantity },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            if (addStock) {
                dispatch(setModal(true));
                toast.success(addStock.data.message, {
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
                getDataStock(
                    params.page,
                    params.search,
                    params.sort,
                    params.category,
                    params.warehouse,
                ),
            );
        } catch (error) {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
            toast.error('Update Quantity Failed!', {
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

export const reduceQuantity =
    (product_stock_id, quantity, params) => async (dispatch) => {
        try {
            const token = JSON.parse(localStorage?.getItem('user'));
            dispatch(setDisabledButton(true));
            const addStock = await axios.patch(
                process.env.REACT_APP_API_BASE_URL +
                    `/stocks/reduce/${product_stock_id}`,
                { quantity },
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            if (addStock) {
                dispatch(setModal(true));
                toast.success(addStock.data.message, {
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
                getDataStock(
                    params.page,
                    params.search,
                    params.sort,
                    params.category,
                    params.warehouse,
                ),
            );
        } catch (error) {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
            toast.error('Update Quantity Failed!', {
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

export const { setStocks, setDisabledButton, setModal } = stockSlice.actions;
export default stockSlice.reducer;
