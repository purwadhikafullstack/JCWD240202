import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getDataAdminUser } from './adminSlice';

const initialState = {
    availableWh: null,
    dataWh: null,
    dataProvincesRo: [],
    dataCitiesRo: [],
    status: false,
    disabledButton: false,
    modal: false,
    allWarehouse: null,
};

export const warehouseSlice = createSlice({
    name: 'warehouse',
    initialState,
    reducers: {
        setAvailableWh: (initialState, action) => {
            initialState.availableWh = action.payload;
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
        setDisabledButton: (initialState, action) => {
            initialState.disabledButton = action.payload;
        },
        setModal: (initialState, action) => {
            initialState.modal = action.payload;
        },
        setAllWarehouse: (initialState, action) => {
            initialState.allWarehouse = action.payload;
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

export const setWhAdmin =
    (warehouse_id, user_id, params) => async (dispatch) => {
        try {
            dispatch(setDisabledButton(true));
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

            if (result) {
                dispatch(setModal(true));
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
                dispatch(
                    getDataAdminUser(
                        params.page,
                        params.search,
                        params.sort,
                        params.warehouse,
                    ),
                );
            }
        } catch (error) {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
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
        } finally {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
        }
    };

export const unassignWhAdmin =
    (warehouse_id, user_id, params) => async (dispatch) => {
        try {
            dispatch(setDisabledButton(true));
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

            if (result) {
                dispatch(setModal(true));
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
                dispatch(
                    getDataAdminUser(
                        params.page,
                        params.search,
                        params.sort,
                        params.warehouse,
                    ),
                );
            }
        } catch (error) {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
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
        } finally {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
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
    (
        street,
        province,
        province_id,
        city,
        city_id,
        subdistrict,
        postcode,
        params,
    ) =>
    async (dispatch) => {
        try {
            dispatch(setDisabledButton(true));
            const dataLogin = JSON.parse(localStorage?.getItem('user'));

            if (postcode.toString().match(/[a-zA-Z]/) || postcode.toString().length < 5) {
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

            if (addNewWarehouse) {
                dispatch(setModal(true));
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
                dispatch(
                    getAllDataWh(
                        params.page,
                        params.search,
                        params.sort,
                        params.wh,
                    ),
                );
            }
        } catch (error) {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
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
        } finally {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
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
        params,
    ) =>
    async (dispatch) => {
        try {
            dispatch(setDisabledButton(true));
            const dataLogin = JSON.parse(localStorage?.getItem('user'));

            if (!province || !province_id || !city || !city_id) {
                dispatch(setStatus(null));
                throw new Error("Field Can't be Empty!");
            }

            if (postcode.toString().match(/[a-zA-Z]/) || postcode.toString().length < 5) {
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

            if (editWarehouseData) {
                dispatch(setModal(true));
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
                dispatch(
                    getAllDataWh(
                        params.page,
                        params.search,
                        params.sort,
                        params.wh,
                    ),
                );
            }
        } catch (error) {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
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
        } finally {
            dispatch(setDisabledButton(false));
            dispatch(setModal(false));
        }
    };

export const deleteWarehouse = (warehouse_id) => async (dispatch) => {
    try {
        dispatch(setDisabledButton(true));
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

        if (deleteWh) {
            dispatch(setModal(true));
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
        }

        dispatch(getAllDataWh());
    } catch (error) {
        dispatch(setDisabledButton(false));
        dispatch(setModal(false));
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
    } finally {
        dispatch(setDisabledButton(false));
        dispatch(setModal(false));
    }
};

export const getAllWarehousesAsync = () => async (dispatch) => {
    const getUser = localStorage.getItem('user')
        ? JSON.parse(localStorage?.getItem('user'))
        : null;
    try {
        const data = await axios.get(
            process.env.REACT_APP_API_BASE_URL + `/warehouses/all`,
            {
                headers: {
                    Authorization: `bearer ${getUser}`,
                },
            },
        );
        dispatch(setAllWarehouse(data.data));
    } catch (error) {
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

export const {
    setAvailableWh,
    setDataWh,
    setDataProvincesRo,
    setDataCitiesRo,
    setStatus,
    setDisabledButton,
    setModal,
    setAllWarehouse,
} = warehouseSlice.actions;
export default warehouseSlice.reducer;
