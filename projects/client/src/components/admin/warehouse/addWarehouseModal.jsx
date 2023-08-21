import { AiOutlineClose } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDataProvincesRo } from '../../../redux/features/warehouseSlice';
import { getDataCitiesRo } from '../../../redux/features/warehouseSlice';
import { addWarehouse } from '../../../redux/features/warehouseSlice';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function AddWareHouseModal({ showModal, params }) {
    const dispatch = useDispatch();
    const dataProvinces = useSelector(
        (state) => state.warehouse.dataProvincesRo,
    );
    const dataCities = useSelector((state) => state.warehouse.dataCitiesRo);
    const setDisabledButton = useSelector(
        (state) => state.warehouse.disabledButton,
    );
    const setModal = useSelector((state) => state.warehouse.modal);

    // input
    const [countFullAddress, setCountFullAddress] = useState(0);
    const [inputFullAddress, setInputFullAddress] = useState('');
    const [inputProvince, setInputProvince] = useState('');
    const [inputProvinceId, setInputProvinceId] = useState('');
    const [inputCity, setInputCity] = useState('');
    const [inputCityId, setInputCityId] = useState('');
    const [inputSubdistrict, setInputSubDistrict] = useState('');
    const [inputPostalCode, setInputPostalCode] = useState('');
    const [filterCities, setFilterCities] = useState([]);

    // find city in provinces
    const filterCity = (id) => {
        let temp = [];
        dataCities.forEach((value) => {
            if (value.province_id === id) {
                temp.push(value);
            }
        });

        setFilterCities(temp);
    };

    useEffect(() => {
        dispatch(getDataProvincesRo());
        dispatch(getDataCitiesRo());
        if (setModal) {
            showModal(false);
        }
    }, [setModal]);

    return (
        <>
            <div className="bg-black bg-opacity-50 fixed inset-0 z-50">
                {/* <!-- Main modal --> */}
                <div className="fixed flex items-center justify-center z-999 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-2xl max-h-full">
                        {/* <!-- Modal content --> */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* <!-- Modal header --> */}
                            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add New Warehouse
                                </h3>
                                <button
                                    onClick={() => showModal(false)}
                                    className="text-gray-500"
                                >
                                    <AiOutlineClose size={16} />
                                </button>
                            </div>
                            {/* <!-- Modal body --> */}
                            <div className="p-6 space-y-6">
                                <form>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Full Address
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <textarea
                                            maxLength={200}
                                            type="text"
                                            placeholder="Full Address"
                                            className="resize-none border border-gray-400 w-[300px] rounded-md px-2 h-24 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                            name="street"
                                            onChange={(e) => {
                                                setInputFullAddress(
                                                    e.target.value,
                                                );
                                                setCountFullAddress(
                                                    e.target.value.length,
                                                );
                                            }}
                                            value={inputFullAddress}
                                        />
                                        <div className="flex justify-end">
                                            <p>{countFullAddress} / 200</p>
                                        </div>
                                    </div>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Province
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <select
                                            type="text"
                                            onChange={(e) => {
                                                setInputProvince(
                                                    e.target.value
                                                        .split(' ')
                                                        .splice(1)
                                                        .toString()
                                                        .replace(/,/g, ' '),
                                                );
                                                setInputProvinceId(
                                                    e.target.value
                                                        .split(' ')[0]
                                                        .replace(/,/g, ''),
                                                );
                                                filterCity(
                                                    e.target.value
                                                        .split(' ')[0]
                                                        .replace(/,/g, ''),
                                                );
                                            }}
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-11 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                            name="province"
                                        >
                                            <option
                                                value=""
                                                className="w-1/2 text-gray-200"
                                            >
                                                Select Province
                                            </option>
                                            {dataProvinces.map(
                                                (value, index) => {
                                                    return (
                                                        <option
                                                            value={`${value.province_id}, ${value.province}`}
                                                            key={index}
                                                        >
                                                            {value.province}
                                                        </option>
                                                    );
                                                },
                                            )}
                                        </select>
                                    </div>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            City
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <select
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-11 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                            name="city"
                                            onChange={(e) => {
                                                setInputCity(
                                                    e.target.value
                                                        .split(' ')
                                                        .slice(1)
                                                        .toString()
                                                        .replace(/,/g, ' '),
                                                );
                                                setInputCityId(
                                                    e.target.value
                                                        .split(' ')
                                                        .shift(),
                                                );
                                            }}
                                        >
                                            <option value="" className="w-1/2">
                                                Select City
                                            </option>
                                            {filterCities.map(
                                                (value, index) => {
                                                    return (
                                                        <option
                                                            value={`${value.city_id} ${value.type} ${value.city_name}`}
                                                            key={index}
                                                        >
                                                            {value.type}{' '}
                                                            {value.city_name}
                                                        </option>
                                                    );
                                                },
                                            )}
                                        </select>
                                    </div>
                                    <div className="block mb-3">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Subdistrict
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <input
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                            name="subdistrict"
                                            placeholder="Subdistrict"
                                            onChange={(e) =>
                                                setInputSubDistrict(
                                                    e.target.value,
                                                )
                                            }
                                            value={inputSubdistrict}
                                        />
                                    </div>
                                    <div className="block">
                                        <span className="block text-sm font-medium text-slate-700 mb-1">
                                            Postal Code
                                            <span className="text-red-600">
                                                *
                                            </span>
                                        </span>
                                        <input
                                            className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                            name="postcode"
                                            placeholder="Postal Code"
                                            onChange={(e) =>
                                                setInputPostalCode(
                                                    e.target.value.replace(
                                                        /[^0-9]/g,
                                                        '',
                                                    ),
                                                )
                                            }
                                            value={inputPostalCode}
                                            maxLength="5"
                                        />
                                    </div>
                                </form>
                            </div>
                            {/* <!-- Modal footer --> */}
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button
                                    className="bg-[#0051BA] enabled:hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3 disabled:cursor-not-allowed"
                                    disabled={
                                        !inputFullAddress ||
                                        !inputProvince ||
                                        !inputCity ||
                                        !inputSubdistrict ||
                                        !inputPostalCode ||
                                        setDisabledButton
                                    }
                                    onClick={() => {
                                        dispatch(
                                            addWarehouse(
                                                inputFullAddress,
                                                inputProvince,
                                                inputProvinceId,
                                                inputCity,
                                                inputCityId,
                                                inputSubdistrict,
                                                inputPostalCode,
                                                params,
                                            ),
                                        );
                                    }}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="bg-red-600 hover:bg-gray-400 rounded-lg text-white text-sm text-white py-2 text-sm p-3"
                                    onClick={() => {
                                        showModal(false);
                                    }}
                                >
                                    Cancel
                                </button>
                                <Backdrop
                                    sx={{
                                        color: '#fff',
                                        zIndex: (theme) =>
                                            theme.zIndex.drawer + 1,
                                    }}
                                    open={setDisabledButton}
                                >
                                    <CircularProgress color="inherit" />
                                </Backdrop>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
