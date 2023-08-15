import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    newArrivals: {},
    categories: {},
    bestSeller: {},
    color: {},
    success: false,
    message: false
};

export const homepageSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setNewArrivals: (initialState, action) => {
            initialState.newArrivals = action.payload;
        },
        setCategory: (initialState, action) => {
            initialState.category = action.payload;
        },
        setBestSeller: (initialState, action) => {
            initialState.bestSeller = action.payload;
        },
        setColor: (initialState, action) => {
            initialState.color = action.payload;
        },
        setSuccess: (initialState, action) => {
            initialState.success = action.payload;
        },
        setMessage: (initialState, action) => {
            initialState.message = action.payload;
        },
    },
});

export const getNewArrivalsAsync = () => async (dispatch) => {
    try {
        const getNewArrivals = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/home/newArrivals`,
        );

        dispatch(setNewArrivals(getNewArrivals.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const getAllCategoriesAsync = () => async (dispatch) => {
    try {
        const getCategories = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/categories`,
        );

        dispatch(setCategory(getCategories.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const getBestSellerAsync = () => async (dispatch) => {
    try {
        const getBestSeller = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/home/bestSeller`,
        );

        dispatch(setBestSeller(getBestSeller.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const getAllColorAsync = () => async (dispatch) => {
    try {
        const result = await axios.get(
            process.env.REACT_APP_API_BASE_URL + '/colors',
        );
        dispatch(setColor(result.data))
    } catch (error) {
        console.log(error.message);
    }
};

export const addNewColorAsync = (name, color_code) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.post(process.env.REACT_APP_API_BASE_URL + '/colors', {
            name,
            color_code
        },{
            headers: {
                authorization: `Bearer ${dataLogin}`,
            },
        },)
        dispatch(getAllColorAsync())
        toast.success(result.data.message, {
            position: 'top-center',
            duration: 2000,
            style: { border: '2px solid #000', borderRadius: '10px', background: '#0051BA', color: 'white', },
        });
        dispatch(setSuccess(true))
    } catch (error) {
        if (error.response) {
            toast.error(error.response?.data?.message, {
                position: 'top-center',
                duration: 2000,
                style: { border: '2px solid #000', borderRadius: '10px', background: '#DC2626', color: 'white',},
            });
        } else {
            toast.error(error.message, {
                position: 'top-center',
                duration: 2000,
                style: { border: '2px solid #000', borderRadius: '10px', background: '#DC2626', color: 'white',},
            });
        }
    } finally {
        dispatch(setSuccess(false))
        
    }
}

export const deleteColorAsync = (id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.delete(process.env.REACT_APP_API_BASE_URL + `/colors/${id}`, {
            headers: {
                authorization: `Bearer ${dataLogin}`,
            },
        })
        toast.success(result.data.message, {
            position: 'top-center',
            duration: 2000,
            style: { border: '2px solid #000', borderRadius: '10px', background: '#0051BA', color: 'white', },
        });
        dispatch(getAllColorAsync())
        dispatch(setSuccess(true))
    } catch (error) {
        if (error.response) {
            dispatch(setSuccess(true))
            toast.error(error.response?.data?.message, {
                position: 'top-center',
                duration: 2000,
                style: { border: '2px solid #000', borderRadius: '10px', background: '#DC2626', color: 'white',},
            });
        } else {
            toast.error(error.message, {
                position: 'top-center',
                duration: 2000,
                style: { border: '2px solid #000', borderRadius: '10px', background: '#DC2626', color: 'white',},
            });
        }
    } finally {
        dispatch(setSuccess(false))
        // dispatch(setMessage(false))
    }
}

export const { setNewArrivals, setCategory, setBestSeller, setColor, setSuccess, setMessage } =
    homepageSlice.actions;
export default homepageSlice.reducer;
