import { Modal } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function EditModal({ showModal, selected }) {
    // Handle bug Modal Flowbite
    const documentBodyRef = useRef(null);

    // Input
    const [countEditFullAddress, setCountEditFullAddress] = useState(0);
    const [inputEditReceiverName, setInputEditReceiverName] = useState('');
    const [inputEditReceiverNumber, setInputEditReceiverNumber] = useState('');
    const [inputEditFullAddress, setInputEditFullAddress] = useState('');
    const [inputEditProvince, setInputEditProvince] = useState('');
    const [inputEditProvinceId, setInputEditProvinceId] = useState('');
    const [inputEditCity, setInputEditCity] = useState('');
    const [inputEditCityId, setInputEditCityId] = useState('');
    const [inputEditSubdistrict, setInputEditSubDistrict] = useState('');
    const [inputEditPostalCode, setInputEditPostalCode] = useState('');

    // Get Data RajaOngkir
    const [dataProvinces, setDataProvinces] = useState([]);
    const [dataCities, setDataCities] = useState([]);
    const [filterCities, setFilterCities] = useState([]);

    const token = JSON.parse(localStorage?.getItem('user'));

    console.log(selected);

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

    const editAddress = async () => {
        try {
            if (
                inputEditReceiverName === '' ||
                inputEditReceiverNumber === '' ||
                inputEditFullAddress === '' ||
                inputEditProvince === '' ||
                inputEditCity === '' ||
                inputEditSubdistrict === '' ||
                inputEditPostalCode === ''
            ) {
                throw { message: "Field can't be empty" };
            } else if (inputEditReceiverNumber.match(/[a-zA-Z]/)) {
                throw { message: 'Invalid phone number!' };
            } else if (inputEditPostalCode.match(/[a-zA-Z]/)) {
                throw { message: 'Invalid postal code!' };
            } else {
                const editAddress = await axios.patch(
                    process.env.REACT_APP_API_BASE_URL +
                        `/addresses/edit/${selected.id}`,
                    {
                        receiver_name: inputEditReceiverName,
                        receiver_number: inputEditReceiverNumber,
                        province: inputEditProvince,
                        province_id: inputEditProvinceId,
                        city: inputEditCity,
                        city_id: inputEditCityId,
                        subdistrict: inputEditSubdistrict,
                        street: inputEditFullAddress,
                        postcode: inputEditPostalCode,
                    },
                    {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    },
                );
                if (editAddress.data.success) {
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
                        setCountEditFullAddress(0);
                        setInputEditReceiverName('');
                        setInputEditReceiverNumber('');
                        setInputEditProvince('');
                        setInputEditProvinceId('');
                        setInputEditCity('');
                        setInputEditCityId('');
                        setInputEditSubDistrict('');
                        setInputEditFullAddress('');
                        setInputEditPostalCode('');
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
                <Modal.Header>Edit Address</Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="block mb-3">
                            <span className="block text-sm font-medium text-slate-700 mb-1 ">
                                Receiver Name
                            </span>
                            <input
                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                placeholder={selected.receiver_name}
                                name="receiver_name"
                                onChange={(e) => {
                                    setInputEditReceiverName(e.target.value);
                                }}
                                value={inputEditReceiverName}
                                type="text"
                            />
                        </div>
                        <div className="block mb-3">
                            <span className="block text-sm font-medium text-slate-700 mb-1 ">
                                Receiver Number
                            </span>
                            <input
                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                placeholder={selected.receiver_number}
                                name="receiver_number"
                                onChange={(e) => {
                                    setInputEditReceiverNumber(e.target.value);
                                }}
                                value={inputEditReceiverNumber}
                                type="tel"
                                maxLength="12"
                            />
                        </div>
                        <div className="block mb-3">
                            <span className="block text-sm font-medium text-slate-700 mb-1 ">
                                Full Address
                            </span>
                            <textarea
                                maxLength={200}
                                type="text"
                                placeholder={selected.street}
                                className="resize-none border border-gray-400 w-[300px] rounded-md px-2 h-24 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                name="street"
                                onChange={(e) => {
                                    setInputEditFullAddress(e.target.value);
                                    setCountEditFullAddress(
                                        e.target.value.length,
                                    );
                                }}
                                value={inputEditFullAddress}
                            />
                            <div className="flex justify-end">
                                <p>{countEditFullAddress} / 200</p>
                            </div>
                        </div>
                        <div className="block mb-3">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                Province
                            </span>
                            <select
                                type="text"
                                onChange={(e) => {
                                    setInputEditProvince(
                                        e.target.value
                                            .split(' ')
                                            .splice(1)
                                            .toString()
                                            .replace(/,/g, ' '),
                                    );
                                    setInputEditProvinceId(
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
                                onChange={(e) => {
                                    setInputEditCity(
                                        e.target.value
                                            .split(' ')
                                            .slice(1)
                                            .toString()
                                            .replace(/,/g, ' '),
                                    );
                                    setInputEditCityId(
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
                                placeholder={selected.subdistrict}
                                onChange={(e) =>
                                    setInputEditSubDistrict(e.target.value)
                                }
                                value={inputEditSubdistrict}
                            />
                        </div>
                        <div className="block">
                            <span className="block text-sm font-medium text-slate-700 mb-1">
                                Postal Code
                            </span>
                            <input
                                className="border border-gray-400 w-[300px] rounded-md px-2 h-10 disabled:text-gray-600 disabled:cursor-not-allowed w-full focus:outline-none focus:border-blue-700 focus:ring-blue-600 focus:ring-1"
                                name="postcode"
                                placeholder={selected.postcode}
                                onChange={(e) =>
                                    setInputEditPostalCode(e.target.value)
                                }
                                value={inputEditPostalCode}
                                maxLength="5"
                            />
                        </div>
                    </form>
                </Modal.Body>
                <div className="flex justify-start gap-3 mb-5 ml-6">
                    <button
                        className="bg-[#0051BA] hover:bg-gray-400 rounded-lg text-white py-2 text-sm p-3"
                        onClick={() => editAddress()}
                    >
                        Edit My Address
                    </button>
                    <button
                        onClick={() => {
                            setCountEditFullAddress(0);
                            setInputEditReceiverName('');
                            setInputEditReceiverNumber('');
                            setInputEditProvince('');
                            setInputEditProvinceId('');
                            setInputEditCity('');
                            setInputEditCityId('');
                            setInputEditSubDistrict('');
                            setInputEditFullAddress('');
                            setInputEditPostalCode('');
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
