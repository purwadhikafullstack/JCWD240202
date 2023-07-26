import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getDataAdminUser } from './adminSlice';

const initialState = {
    availableWh: null,
    isAssigned: false,
    isUnassigned: false,
    dataWh: null,
    dataProvincesRo: [],
    dataCitiesRo: [],
    status: false,
};

export const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {
        setAvailableWh: (initialState, action) => {
            initialState.availableWh = action.payload;
        },
        setIsAssigned: (initialState, action) => {
            initialState.isAssigned = action.payload;
        },
        setIsUnassigned: (initialState, action) => {
            initialState.isUnassigned = action.payload;
        },
        setDataWh: (initialState, action) => {
            initialState.dataWh = action.payload;
        },
        setDataProvincesRo: (initialState, action) => {
            initialState.dataProvincesRo = action.payload;
        },
        setDataCitiesRo: (initialState, action) => {
            initialState.dataCitiesRo = action.payload;
        },
        setStatus: (initialState, action) => {
            initialState.status = action.payload;
        },
    },
});

export const getAvailableWh = () => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        const result = await axios.get(
            process.env.REACT_APP_API_BASE_URL + '/warehouses/available',
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

        dispatch(setAvailableWh(result?.data?.data));
    } catch (error) {
        console.log(error);
    }
};

export const setWhAdmin = (warehouse_id, user_id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        if (!warehouse_id) {
            throw new Error("Field can't be Empty");
        }

        const result = await axios.patch(
            process.env.REACT_APP_API_BASE_URL +
                `/warehouses/assign-admin/${user_id}`,
            {
                warehouse_id,
            },
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

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

        dispatch(setIsAssigned(true));
        dispatch(getDataAdminUser());
        dispatch(setIsAssigned(false));
    } catch (error) {
        dispatch(setIsAssigned(false));
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
};

export const unassignWhAdmin = (warehouse_id, user_id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        const result = await axios.patch(
            process.env.REACT_APP_API_BASE_URL +
                `/warehouses/unassign-admin/${user_id}`,
            {
                warehouse_id,
            },
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

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

        dispatch(setIsUnassigned(true));
        dispatch(getDataAdminUser());
        dispatch(setIsUnassigned(false));
    } catch (error) {
        dispatch(setIsUnassigned(false));
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
};

export const getAllDataWh =
    (page, search, sort, warehouses) => async (dispatch) => {
        try {
            const dataLogin = JSON.parse(localStorage?.getItem('user'));

            const result = await axios.get(
                process.env.REACT_APP_API_BASE_URL + '/warehouses',
                {
                    params: {
                        page,
                        search,
                        sort,
                        warehouses,
                    },
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                    },
                },
            );

            dispatch(setDataWh(result?.data));
        } catch (error) {
            console.log(error);
        }
    };

export const getDataProvincesRo = () => async (dispatch) => {
    try {
        const provinces = await axios.get(
            process.env.REACT_APP_API_BASE_URL + '/rajaongkir/provinces',
        );

        dispatch(setDataProvincesRo(provinces?.data));
    } catch (error) {
        console.log(error);
    }
};

export const getDataCitiesRo = () => async (dispatch) => {
    try {
        const cities = await axios.get(
            process.env.REACT_APP_API_BASE_URL + '/rajaongkir/cities',
        );

        dispatch(setDataCitiesRo(cities?.data));
    } catch (error) {
        console.log(error);
    }
};

export const addWarehouse =
    (street, province, province_id, city, city_id, subdistrict, postcode) =>
    async (dispatch) => {
        try {
            const dataLogin = JSON.parse(localStorage?.getItem('user'));

            if (postcode.match(/[a-zA-Z]/) || postcode.length < 5) {
                dispatch(setStatus(null));
                throw new Error('Invalid Postal Code!');
            }

            const addNewWarehouse = await axios.post(
                process.env.REACT_APP_API_BASE_URL + '/warehouses/add',
                {
                    street,
                    province,
                    province_id,
                    city,
                    city_id,
                    subdistrict,
                    postcode,
                },
                {
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                    },
                },
            );

            toast.success(addNewWarehouse.data.message, {
                position: 'top-center',
                duration: 2000,
                style: {
                    border: '2px solid #000',
                    borderRadius: '10px',
                    background: '#0051BA',
                    color: 'white',
                },
            });
            
            dispatch(setStatus(true));
            dispatch(getAllDataWh());
            dispatch(setStatus(null));
        } catch (error) {
            dispatch(setStatus(false));
            if (error.response) {
                toast.error(error.response.data.message, {
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

export const editWarehouse =
    (
        street,
        province,
        province_id,
        city,
        city_id,
        subdistrict,
        postcode,
        warehouse_id,
    ) =>
    async (dispatch) => {
        try {
            const dataLogin = JSON.parse(localStorage?.getItem('user'));

            if (!province || !province_id || !city || !city_id) {
                dispatch(setStatus(null));
                throw new Error("Field Can't be Empty!");
            }

            if (postcode.match(/[a-zA-Z]/) || postcode.length < 5) {
                dispatch(setStatus(null));
                throw new Error('Invalid Postal Code!');
            }

            const editWarehouseData = await axios.patch(
                process.env.REACT_APP_API_BASE_URL +
                    `/warehouses/edit/${warehouse_id}`,
                {
                    street,
                    province,
                    province_id,
                    city,
                    city_id,
                    subdistrict,
                    postcode,
                },
                {
                    headers: {
                        authorization: `Bearer ${dataLogin}`,
                    },
                },
            );

            toast.success(editWarehouseData.data.message, {
                position: 'top-center',
                duration: 2000,
                style: {
                    border: '2px solid #000',
                    borderRadius: '10px',
                    background: '#0051BA',
                    color: 'white',
                },
            });

            dispatch(setStatus(true));
            dispatch(getAllDataWh());
            dispatch(setStatus(null));
        } catch (error) {
            dispatch(setStatus(false));
            if (error.response) {
                toast.error(error.response.data.message, {
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

export const deleteWarehouse = (warehouse_id) => async (dispatch) => {
    try {
        const dataLogin = JSON.parse(localStorage?.getItem('user'));

        const deleteWh = await axios.patch(
            process.env.REACT_APP_API_BASE_URL +
                `/warehouses/delete/${warehouse_id}`,
            {},
            {
                headers: {
                    authorization: `Bearer ${dataLogin}`,
                },
            },
        );

        dispatch(setStatus(true));
        toast.success(deleteWh.data.message, {
            position: 'top-center',
            duration: 2000,
            style: {
                border: '2px solid #000',
                borderRadius: '10px',
                background: '#0051BA',
                color: 'white',
            },
        });

        dispatch(getAllDataWh());
        dispatch(setStatus(false));
    } catch (error) {
        dispatch(setStatus(false));
        if (error.response) {
            toast.error('Delete Failed!', {
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

export const {
    setAvailableWh,
    setIsAssigned,
    setIsUnassigned,
    setDataWh,
    setDataProvincesRo,
    setDataCitiesRo,
    setStatus,
} = warehouseSlice.actions;
export default warehouseSlice.reducer;
