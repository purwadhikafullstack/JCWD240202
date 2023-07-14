import { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import axios from 'axios';

export default function NewAddress({ showModal }) {
    // Get Data RajaOngkir
    const [dataProvinces, setDataProvinces] = useState([]);
    const [dataCities, setDataCities] = useState([]);
    const [filterCities, setFilterCities] = useState([]);

    useEffect(() => {
        getDataProvinces();
        getDataCities();
    }, []);

    const getDataProvinces = async () => {
        try {
            let provinces = await axios.get(
                process.env.REACT_APP_API_BASE_URL + '/rajaongkir/provinces',
            );
            setDataProvinces(provinces.data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(dataProvinces);

    const getDataCities = async () => {
        try {
            let cities = await axios.get(
                process.env.REACT_APP_API_BASE_URL + '/rajaongkir/cities',
            );
            setDataCities(cities.data);
        } catch (error) {
            console.log(error);
        }
    };
    console.log(dataCities);

    // FIND CITY IN PROVINCE
    const filterCity = (id) => {
        let temp = [];

        dataCities.forEach((value, index) => {
            if (value.province_id === id) {
                temp.push(value);
            }
        });

        setFilterCities(temp);
    };

    return (
        <>
            <Modal
                dismissible
                show={() => showModal('show')}
                onClose={() => showModal('')}
            >
                <Modal.Header>Add New Address</Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="block mb-3">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                Receiver Name
                            </span>
                            <input
                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                name="receiver_name"
                            />
                        </div>
                        <div className="block mb-3">
                            <span className="block text-sm font-medium text-slate-700 mb-1 ">
                                Receiver Number
                            </span>
                            <input
                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                name="receiver_number"
                            />
                        </div>
                        <div className="block mb-3">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                Full Address
                            </span>
                            <input
                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                name="street"
                            />
                        </div>
                        <div className="block mb-3">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                Province
                            </span>
                            <select
                                type="text"
                                onChange={(e) => filterCity(e.target.value)}
                                className='className="border border-gray-400 w-[300px] rounded-md px-2 h-11 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"'
                                name="province"
                            >
                                <option value="" className="w-1/2">
                                    Select Province
                                </option>
                                {dataProvinces.map((value, index) => {
                                    return (
                                        <option
                                            // value={`${value.province_id}, ${value.province}`}
                                            // bisa displit pake split operator
                                            value={value.province_id}
                                            key={index}
                                        >
                                            {value.province}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="block mb-3">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                City
                            </span>
                            <select
                                className="border border-gray-400 w-[300px] rounded-md px-2 h-11 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                name="city"
                            >
                                <option value="" className="w-1/2 disabled selected">
                                    Select City
                                </option>
                                {filterCities.map((value, index) => {
                                    return (
                                        <option
                                            value={value.city_id}
                                            key={index}
                                        >
                                            {value.type} {value.city_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="block mb-3">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                Subdistrict
                            </span>
                            <input
                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                name="subdistrict"
                            />
                        </div>
                        <div className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                Postal Code
                            </span>
                            <input
                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                name="postcode"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <div className="flex justify-start gap-3 mb-5 ml-6">
                    <button className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3">
                        Add New Address
                    </button>
                    <button
                        onClick={() => showModal('')}
                        className="bg-rose-600 hover:bg-gray-400 rounded-lg text-white text-sm text-white py-2 text-sm p-3"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
}
