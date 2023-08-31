import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const initialState = {
    totalSales: null,
    categorySales: null,
    productSales: null,
    chartData: null,
    totalOrder: null,
    loading: false,
};

export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setTotalSales: (initialState, action) => {
            initialState.totalSales = action.payload;
        },
        setCategorySales: (initialState, action) => {
            initialState.categorySales = action.payload;
        },
        setProductSales: (initialState, action) => {
            initialState.productSales = action.payload;
        },
        setChartData: (initialState, action) => {
            initialState.chartData = action.payload;
        },
        setTotalOrder: (initialState, action) => {
            initialState.totalOrder = action.payload;
        },
        setLoading: (initialState, action) => {
            initialState.loading = action.payload;
        }
    },
});

export const getTotalMonthlySalesAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const dataSales = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/reports/sales?month=${data.month}&year=${data.year}&warehouse_id=${data.warehouse_id}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        setTimeout(() => {
            dispatch(setLoading(true))
        }, 1000);
        dispatch(setTotalSales(dataSales.data));
    } catch (error) {
        dispatch(setLoading(false))
        toast.error(error.message);
    }
};

export const getSalesPerCategoryAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const categorySales = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/reports/sales/categories?month=${data.month}&year=${data.year}&warehouse_id=${data.warehouse_id}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        setTimeout(() => {
            dispatch(setLoading(true))
        }, 1000);
        dispatch(setCategorySales(categorySales.data));
    } catch (error) {
        dispatch(setLoading(false))
        toast.error(error.message);
    }
};

export const getSalesPerProducts = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const productSales = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/reports/sales/products?page=${data.page}&month=${data.month}&year=${data.year}&warehouse_id=${data.warehouse_id}&category_id=${data.category_id}&search=${data.search}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        setTimeout(() => {
            dispatch(setLoading(true))
        }, 1000);
        dispatch(setProductSales(productSales.data));
    } catch (error) {
        dispatch(setLoading(false))
        toast.error(error.message);
    }
};

export const getChartDataAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const getData = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/reports/sales/charts?month=${data.month}&year=${data.year}&warehouse_id=${data.warehouse_id}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        setTimeout(() => {
            dispatch(setLoading(true))
        }, 1000);
        dispatch(setChartData(getData.data));
    } catch (error) {
        dispatch(setLoading(false))
        toast.error(error.message);
    }
};

export const getTotalOrderAsync = (data) => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const getData = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/reports/orders?month=${data.month}&year=${data.year}&warehouse_id=${data.warehouse_id}`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        setTimeout(() => {
            dispatch(setLoading(true))
        }, 1000);
        dispatch(setTotalOrder(getData.data));
    } catch (error) {
        dispatch(setLoading(false))
        toast.error(error.message);
    }
};

export const {
    setTotalSales,
    setCategorySales,
    setProductSales,
    setChartData,
    setTotalOrder,
    setLoading
} = reportSlice.actions;
export default reportSlice.reducer;
