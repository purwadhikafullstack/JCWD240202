import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getAllCategoriesAsync } from './homepageSlice';

const initialState = {
    category: {},
    success: false,
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
    },
});

export const addCategoryAsync = (name, imageCategory) => async (dispatch) => {
    try {
        if (!name) throw new Error('Name required!');

        let fd = new FormData();
        fd.append('data', JSON.stringify({ name }));
        imageCategory.forEach((value) => {
            fd.append('images', value);
        });

        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/categories',
            fd,
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

export const editCategoryAsync = (name, id) => async (dispatch) => {
    try {
        if (!name) throw new Error('Name required!');

        const result = await axios.patch(
            process.env.REACT_APP_API_BASE_URL + `/categories/${id}`,
            {
                name,
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

export const editImageCategoryAsync =
    (imageCategory, id) => async (dispatch) => {
        try {
            // let fd = new FormData();
            // fd.append('images', imageCategory);
            // console.log(fd, 'masukkkk sini fd');
            console.log(imageCategory, id);

            const result = await axios.patch(
                process.env.REACT_APP_API_BASE_URL + `/categories/images/${id}`,
                { images: imageCategory },
                {
                    headers: {
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

export const deleteCategoryAsync = (id) => async (dispatch) => {
    try {
        const result = await axios.delete(
            process.env.REACT_APP_API_BASE_URL + `/categories/${id}`,
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
}

export const { setCategory, setSuccess } = categorySlice.actions;
export default categorySlice.reducer;
