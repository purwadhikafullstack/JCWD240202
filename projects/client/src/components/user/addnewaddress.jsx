import { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import axios from 'axios';
import { useRef } from 'react';

export default function NewAddress({ showModal }) {
    // Input
    const documentBodyRef = useRef(null);
    const [countFullAddress, setCountFullAddress] = useState(0);
    const [inputReceiverName, setInputReceiverName] = useState('');
    const [inputReceiverNumber, setInputReceiverNumber] = useState('');
    const [inputFullAddress, setInputFullAddress] = useState('');
    const [inputProvince, setInputProvince] = useState('');
    const [inputProvinceId, setInputProvinceId] = useState('');
    const [inputCity, setInputCity] = useState('');
    const [inputCityId, setInputCityId] = useState('')
    const [inputSubdistrict, setInputSubDistrict] = useState('');
    const [inputPostalCode, setInputPostalCode] = useState('');
    console.log(inputPostalCode);
    console.log(inputProvince);
    console.log(inputProvinceId);

    // Get Data RajaOngkir
    const [dataProvinces, setDataProvinces] = useState([]);
    const [dataCities, setDataCities] = useState([]);
    const [filterCities, setFilterCities] = useState([]);

    useEffect(() => {
        getDataProvinces();
        getDataCities();
        documentBodyRef.current = document.body;
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
                root={documentBodyRef.current}
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
                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                placeholder="Receiver Name"
                                onChange={(e) => {
                                    setInputReceiverName(e.target.value);
                                }}
                                value={inputReceiverName}
                                type="text"
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
                                placeholder="Receiver Number"
                                onChange={(e) => {
                                    setInputReceiverNumber(e.target.value);
                                }}
                                value={inputReceiverNumber}
                                type="tel"
                                maxlength="12"
                            />
                        </div>
                        <div className="block mb-3">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                Full Address
                            </span>
                            <textarea
                                maxLength={200}
                                type="text"
                                placeholder="Full Address"
                                className="resize-none border border-gray-400 w-[300px] rounded-md px-2 h-24 w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                name="street"
                                onChange={(e) => {
                                    setInputFullAddress(e.target.value);
                                    setCountFullAddress(e.target.value.length);
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
                                className='className="border border-gray-400 w-[300px] rounded-md px-2 h-11 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"'
                                name="province"
                            >
                                <option value="" className="w-1/2">
                                    Select Province
                                </option>
                                {dataProvinces.map((value, index) => {
                                    return (
                                        <option
                                            value={`${value.province_id}, ${value.province}`}
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
                                <option
                                    value=""
                                    className="w-1/2 disabled selected"
                                >
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
                                placeholder="Subdistrict"
                                onChange={(e) =>
                                    setInputSubDistrict(e.target.value)
                                }
                                value={inputSubdistrict}
                            />
                        </div>
                        <div className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                Postal Code
                            </span>
                            <input
                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                name="postcode"
                                placeholder="Postal Code"
                                onChange={(e) =>
                                    setInputPostalCode(e.target.value)
                                }
                                value={inputPostalCode}
                                maxlength="5"
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
