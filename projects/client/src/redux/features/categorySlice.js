import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getAllCategoriesAsync } from './homepageSlice';

const initialState = {
    category: {},
    success: false,
    productCategory: null,
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (initialState, action) => {
            initialState.category = action.payload;
        },
        setSuccess: (initialState, action) => {
            initialState.success = action.payload;
        },
        setProductCategory: (initialState, action) => {
            initialState.productCategory = action.payload;
        },
    },
});

export const addCategoryAsync = (name, imageCategory) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        if (!name) throw new Error('Name required!');

        let fd = new FormData();
        fd.append('data', JSON.stringify({ name }));
        imageCategory.forEach((value) => {
            fd.append('images', value);
        });

        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/categories',
            fd,
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

        dispatch(getAllCategoriesAsync());
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
        dispatch(setSuccess(true));
    } catch (error) {
        if (error.response) {
            toast.error(error.response?.data?.message, {
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
        dispatch(setSuccess(false));
    }
};

export const editCategoryAsync = (name, id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        if (!name) throw new Error('Name required!');

        const result = await axios.patch(
            process.env.REACT_APP_API_BASE_URL + `/categories/${id}`,
            {
                name,
            },
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

        dispatch(getAllCategoriesAsync());
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
        dispatch(setSuccess(true));
    } catch (error) {
        if (error.response) {
            toast.error(error.response?.data?.message, {
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
        dispatch(setSuccess(false));
    }
};

export const editImageCategoryAsync =
    (imageCategory, id) => async (dispatch) => {
        try {
            const dataLogin = JSON.parse(localStorage?.getItem('user'));

            const result = await axios.patch(
                process.env.REACT_APP_API_BASE_URL + `/categories/images/${id}`,
                { images: imageCategory },
                {
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                        'content-type': 'multipart/form-data',
                    },
                },
            );

            if (result) {
                dispatch(getAllCategoriesAsync());
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
                dispatch(setSuccess(true));
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response?.data?.message, {
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
            dispatch(setSuccess(false));
        }
    };

export const deleteCategoryAsync = (id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        const result = await axios.delete(
            process.env.REACT_APP_API_BASE_URL + `/categories/${id}`,
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

        if (result) {
            dispatch(getAllCategoriesAsync());
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
        }
    } catch (error) {
        if (error.response) {
            toast.error(error.response?.data?.message, {
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
    }
};

export const getProductCategoryAsync = (data) => async (dispatch) => {
    try {
        const getProducts = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/categories/${data?.id}`,
            {
                params: {
                    page: data?.page,
                    colorId: data?.colorId,
                },
            },
        );
        dispatch(setProductCategory(getProducts.data));
    } catch (error) {
        toast.error(error.message);
    }
};

export const { setCategory, setSuccess, setProductCategory } =
    categorySlice.actions;
export default categorySlice.reducer;
