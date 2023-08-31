import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const initialState = {
    newArrivals: {},
    categories: {},
    bestSeller: {},
    color: {},
    success: false,
    message: false,
    loading: false,
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
        setLoading: (initialState, action) => {
            initialState.loading = action.payload;
        }
    },
});

export const getNewArrivalsAsync = () => async (dispatch) => {
    try {
        dispatch(setLoading(false))
        const getNewArrivals = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/home/newArrivals`,
        );
        
        setTimeout(() => {
            dispatch(setLoading(true));
        }, 1000);
        dispatch(setNewArrivals(getNewArrivals.data));
    } catch (error) {
        dispatch(setLoading(false))
        console.log(error.message);
    }
};

export const getAllCategoriesAsync = () => async (dispatch) => {
    try {
        dispatch(setLoading(false))
        const getCategories = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/categories`,
        );

        setTimeout(() => {
            dispatch(setLoading(true));
        }, 1000);
        dispatch(setCategory(getCategories.data));
    } catch (error) {
        dispatch(setLoading(false))
        console.log(error.message);
    }
};

export const getBestSellerAsync = () => async (dispatch) => {
    try {
        dispatch(setLoading(false))
        const getBestSeller = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/home/bestSeller`,
        );

        setTimeout(() => {
            dispatch(setLoading(true));
        }, 1000);
        dispatch(setBestSeller(getBestSeller.data));
    } catch (error) {
        dispatch(setLoading(false))
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

export const { setNewArrivals, setCategory, setBestSeller, setColor, setSuccess, setMessage, setLoading } =
    homepageSlice.actions;
export default homepageSlice.reducer;
