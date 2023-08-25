import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const initialState = {
    products: {},
    details: {},
    recommendations: null,
    success: false,
    loading: false,
};

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (initialState, action) => {
            initialState.products = action.payload;
        },
        setDetails: (initialState, action) => {
            initialState.details = action.payload;
        },
        setRecommendations: (initialState, action) => {
            initialState.recommendations = action.payload;
        },
        setSuccess: (initialState, action) => {
            initialState.success = action.payload;
        },
        setLoading: (initialState, action) => {
            initialState.loading = action.payload;
        }
    },
});

export const getAllProductsAsync = (data) => async (dispatch) => {
    try {
        const allProducts = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/products`,
            {
                params: {
                    page: data?.page,
                    category: data?.category,
                    sort: data?.sort,
                    search: data?.search,
                },
            },
        );

        setTimeout(() => {
            dispatch(setLoading(true))
        }, 1000);
        clearTimeout(dispatch(setLoading(false)))
        dispatch(setProducts(allProducts.data));
    } catch (error) {
        dispatch(setLoading(false))
        console.log(error.message);
    }
};

export const productDetailsAsync = (id) => async (dispatch) => {
    try {
        const getDetails = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/products/${id}`,
        );

        dispatch(setDetails(getDetails.data));
    } catch (error) {
        console.log(error.message);
    }
};

export const productRecommenadationAsync = (id) => async (dispatch) => {
    try {
        const getRecommend = await axios.get(
            process.env.REACT_APP_API_BASE_URL +
                `/products/${id}/recommendations`,
        );

        dispatch(setRecommendations(getRecommend.data));
    } catch (error) {
        console.log('error');
    }
};

export const addProductAsync = (data, imageProduct) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        if (
            !data.name ||
            !data.category_id ||
            !data.color_id ||
            !data.price ||
            !data.description ||
            !data.length ||
            !data.width ||
            !data.height ||
            !data.weight
        )
            throw new Error('All data required!');

        let fd = new FormData();
        fd.append(
            'data',
            JSON.stringify({
                name: data.name.toUpperCase(),
                category_id: data.category_id,
                color_id: data.color_id,
                price: data.price,
                description: data.description,
                length: data.length,
                width: data.width,
                height: data.height,
                weight: data.weight,
            }),
        );
        imageProduct.forEach((value) => {
            fd.append('images', value);
        });
        console.log(fd);

        const result = await axios.post(
            process.env.REACT_APP_API_BASE_URL + '/products',
            fd,
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

        dispatch(getAllProductsAsync());
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

export const editProductAsync = ( name, category_id, color_id, price, description, length, width, height, weight, id, ) => async (dispatch) => {
        try {
            const dataLogin = JSON.parse(localStorage?.getItem('user'));
            if (
                !name ||
                !category_id ||
                !color_id ||
                !price ||
                !description ||
                !length ||
                !width ||
                !height ||
                !weight
            )
                throw new Error('All data required!');

            const result = await axios.patch(
                process.env.REACT_APP_API_BASE_URL + `/products/${id}`,
                {
                    name: name.toUpperCase(),
                    category_id,
                    color_id,
                    price,
                    description,
                    length,
                    width,
                    height,
                    weight,
                },
                {
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                    },
                },
            );

            dispatch(getAllProductsAsync());

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

export const editProductImageAsync = (imageProduct, id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        let fd = new FormData();
        imageProduct.forEach((value) => {
            fd.append('images', value);
        });

        const result = await axios.patch(
            process.env.REACT_APP_API_BASE_URL + `/products/images/${id}`,
            fd,
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

        if (result) {
            dispatch(productDetailsAsync(id));
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

export const deleteProductAsync = (id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.patch(
            process.env.REACT_APP_API_BASE_URL + `/products/${id}/delete`,
            {},
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

            dispatch(getAllProductsAsync());
            toast.success(result.data.message, {
                position: 'top-center',
                duration: 2000,
                style: { border: '2px solid #000', borderRadius: '10px', background: '#0051BA', color: 'white', },
            });
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
                style: { border: '2px solid #000', borderRadius: '10px', background: '#DC2626', color: 'white',
                },
            });
        }
    }
};

export const thumbnailAsync = (pId, piId) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));
        const result = await axios.patch(
            process.env.REACT_APP_API_BASE_URL + `/products/thumbnail/${pId}/${piId}`,
            {},
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        )
        dispatch(getAllProductsAsync());
        dispatch(productDetailsAsync(pId))
        toast.success(result.data.message, {
            position: 'top-center',
            duration: 2000,
            style: { border: '2px solid #000', borderRadius: '10px', background: '#0051BA', color: 'white', },
        });
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
                style: { border: '2px solid #000', borderRadius: '10px', background: '#DC2626', color: 'white',
                },
            });
        }
    }
}

export const { setProducts, setDetails, setRecommendations, setSuccess, setLoading } =
    productSlice.actions;
export default productSlice.reducer;
