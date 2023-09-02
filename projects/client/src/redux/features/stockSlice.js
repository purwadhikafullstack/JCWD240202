import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    stocks: null,
    disabledButton: false,
    modal: false,
    loading: false,
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
        setLoading: (initialState, action) => {
            initialState.loading = action.payload;
        }
    },
});

export const getDataStock =
    (page, search, sort, category, warehouse) => async (dispatch) => {
        try {
            dispatch(setLoading(false))
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
                
            setTimeout(() => {
                dispatch(setLoading(true))
            }, 1000);
            dispatch(setStocks(dataStock?.data));
        } catch (error) {
            dispatch(setLoading(false))
            console.log(error)
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
    (product_stock_id, quantity, params, product_stock) => async (dispatch) => {
        try {
            const token = JSON.parse(localStorage?.getItem('user'));
            dispatch(setDisabledButton(true));

            if(quantity > product_stock) {
                throw new Error('Quantity Exceeds Available Stock!')
            }

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
            if (error.response) {
                toast.error("Update Quantity Failed", {
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

export const { setStocks, setDisabledButton, setModal, setLoading } = stockSlice.actions;
export default stockSlice.reducer;
