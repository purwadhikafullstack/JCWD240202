import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const moment = require('moment');

const initialState = {
    stockHistories: null,
    stockLog: null,
    export: [],
    loading: false,
    types: null,
    informations: null,
};

export const stockHistorySlice = createSlice({
    name: 'stockHistory',
    initialState,
    reducers: {
        setStockHistories: (initialState, action) => {
            initialState.stockHistories = action.payload;
        },
        setStockLog: (initialState, action) => {
            initialState.stockLog = action.payload;
        },
        setExport: (initialState, action) => {
            initialState.export = action.payload;
        },
        setLoading: (initialState, action) => {
            initialState.loading = action.payload;
        },
        setTypes: (initialState, action) => {
            initialState.types = action.payload;
        },
        setInformations: (initialState, action) => {
            initialState.informations = action.payload;
        },
    },
});

export const getStockHistory =
    (page, date, category, search, warehouse, sort) => async (dispatch) => {
        try {
            dispatch(setLoading(false));
            const token = JSON.parse(localStorage?.getItem('user'));
            const dataStockHistory = await axios.get(
                process.env.REACT_APP_API_BASE_URL + '/log/stock-history',
                {
                    params: {
                        page,
                        date,
                        category,
                        search,
                        warehouse,
                        sort,
                    },
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );

            setTimeout(() => {
                dispatch(setLoading(true));
            }, 1000);
            dispatch(setStockHistories(dataStockHistory?.data));
        } catch (error) {
            dispatch(setLoading(false));
            console.log(error);
        }
    };

export const getStockLog =
    (page, date, search, warehouse, sort, types, informations) => async (dispatch) => {
        try {
            dispatch(setLoading(false));
            const token = JSON.parse(localStorage?.getItem('user'));
            const dataStockLog = await axios.get(
                process.env.REACT_APP_API_BASE_URL + '/log/stock-log',
                {
                    params: {
                        page,
                        date,
                        search,
                        warehouse,
                        sort,
                        types,
                        informations
                    },
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                },
            );
            setTimeout(() => {
                dispatch(setLoading(true));
            }, 1000);
            dispatch(setStockLog(dataStockLog?.data));

            const exportData = dataStockLog?.data?.export?.map((value) => {
                return {
                    date: moment(new Date(value.createdAt)).format(
                        'DD MMM YYYY',
                    ),
                    product_name: value?.product?.name,
                    user: value?.user?.role?.name.replace(/\b\w/g, (char) =>
                        char.toUpperCase(),
                    ),
                    quantity: value?.quantity,
                    warehouse: value?.warehouse?.city,
                    is_deleted: value?.warehouse?.is_deleted,
                    type: value?.type?.name,
                    information: value?.information?.name,
                };
            });
            dispatch(setExport(exportData));
        } catch (error) {
            dispatch(setLoading(false));
            console.log(error);
        }
    };

    export const getTypes = () => async(dispatch) => {
        try {
            const types = await axios.get(process.env.REACT_APP_API_BASE_URL + '/log/types')
            dispatch(setTypes(types?.data))
        } catch (error) {
            console.log(error);
        }
    };

    export const getInformations = () => async(dispatch) => {
        try {
            const informations = await axios.get(process.env.REACT_APP_API_BASE_URL + '/log/informations')
            dispatch(setInformations(informations?.data))
        } catch (error) {
            console.log(error);
        }
    }
export const { setStockHistories, setStockLog, setExport, setLoading, setTypes, setInformations } =
    stockHistorySlice.actions;
export default stockHistorySlice.reducer;
