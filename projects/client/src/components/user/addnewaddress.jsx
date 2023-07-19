/* eslint-disable no-throw-literal */
import { useEffect, useState } from 'react';
import { Modal } from 'flowbite-react';
import axios from 'axios';
import { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function NewAddress({ showModal }) {
    // Handle bug Modal Flowbite
    const documentBodyRef = useRef(null);

    // Input
    const [countFullAddress, setCountFullAddress] = useState(0);
    const [inputReceiverName, setInputReceiverName] = useState('');
    const [inputReceiverNumber, setInputReceiverNumber] = useState('');
    const [inputFullAddress, setInputFullAddress] = useState('');
    const [inputProvince, setInputProvince] = useState('');
    const [inputProvinceId, setInputProvinceId] = useState('');
    const [inputCity, setInputCity] = useState('');
    const [inputCityId, setInputCityId] = useState('');
    const [inputSubdistrict, setInputSubDistrict] = useState('');
    const [inputPostalCode, setInputPostalCode] = useState('');

    // Get Data RajaOngkir
    const [dataProvinces, setDataProvinces] = useState([]);
    const [dataCities, setDataCities] = useState([]);
    const [filterCities, setFilterCities] = useState([]);

    const token = JSON.parse(localStorage?.getItem('user'));

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

    const addNewAddress = async () => {
        try {
            if (
                inputReceiverName === '' ||
                inputReceiverNumber === '' ||
                inputFullAddress === '' ||
                inputProvince === '' ||
                inputCity === '' ||
                inputSubdistrict === '' ||
                inputPostalCode === ''
            ) {
                throw { message: "Field can't be empty" };
            } else if (inputReceiverNumber.match(/[a-zA-Z]/)) {
                throw { message: 'Invalid phone number!' };
            } else if (inputPostalCode.match(/[a-zA-Z]/)) {
                throw { message: 'Invalid postal code!' };
            } else {
                const addAddress = await axios.post(
                    process.env.REACT_APP_API_BASE_URL + '/addresses/add',
                    {
                        receiver_name: inputReceiverName,
                        receiver_number: inputReceiverNumber,
                        province: inputProvince,
                        province_id: inputProvinceId,
                        city: inputCity,
                        city_id: inputCityId,
                        subdistrict: inputSubdistrict,
                        street: inputFullAddress,
                        postcode: inputPostalCode,
                    },
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (addAddress.data.success) {
                    toast.success('Create new address success!', {
                        position: 'top-center',
                        duration: 2000,
                        style: {
                            border: '2px solid #000',
                            borderRadius: '10px',
                            background: '#0051BA',
                            color: 'white',
                        },
                    });
                    setTimeout(() => {
                        setCountFullAddress(0);
                        setInputReceiverName('');
                        setInputReceiverNumber('');
                        setInputProvince('');
                        setInputProvinceId('');
                        setInputCity('');
                        setInputCityId('');
                        setInputSubDistrict('');
                        setInputFullAddress('');
                        setInputPostalCode('');
                        showModal('');
                    }, 1000);
                }
            }
        } catch (error) {
            console.log(error);
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

    return (
        <>
            <Toaster />
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
                                maxLength="12"
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
                                <option
                                    value=""
                                    className="w-1/2 text-gray-200"
                                >
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
                                onChange={(e) => {
                                    setInputCity(
                                        e.target.value
                                            .split(' ')
                                            .slice(1)
                                            .toString()
                                            .replace(/,/g, ' '),
                                    );
                                    setInputCityId(
                                        e.target.value.split(' ').shift(),
                                    );
                                }}
                            >
                                <option value="" className="w-1/2">
                                    Select City
                                </option>
                                {filterCities.map((value, index) => {
                                    return (
                                        <option
                                            value={`${value.city_id} ${value.type} ${value.city_name}`}
                                            key={value.city_id}
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
                                maxLength="5"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <div className="flex justify-start gap-3 mb-5 ml-6">
                    <button
                        className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3"
                        onClick={() => addNewAddress()}
                    >
                        Add New Address
                    </button>
                    <button
                        onClick={() => {
                            setCountFullAddress(0);
                            setInputReceiverName('');
                            setInputReceiverNumber('');
                            setInputProvince('');
                            setInputProvinceId('');
                            setInputCity('');
                            setInputCityId('');
                            setInputSubDistrict('');
                            setInputFullAddress('');
                            setInputPostalCode('');
                            showModal('');
                        }}
                        className="bg-red-600 hover:bg-gray-400 rounded-lg text-white text-sm text-white py-2 text-sm p-3"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </>
    );
}