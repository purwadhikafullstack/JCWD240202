import axios from 'axios';
import {
    Button,
    Label,
    Modal,
    Select,
    TextInput,
    Textarea,
} from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
    addNewAddressAsync,
    getCitiesAsync,
    getProvincesAsync,
} from '../../../redux/features/addressSlice';
import { toast } from 'react-hot-toast';

export default function ModalAddAddress(props) {
    const documentBodyRef = useRef(null);
    const dispatch = useDispatch();
    const provinceLists = useSelector((state) => state.address.province);
    const cityLists = useSelector((state) => state.address.city);
    const [filterCity, setFilterCity] = useState();
    const [countChar, setCountChar] = useState(0);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [postCode, setPostCode] = useState('');
    const [provinceName, setProvinceName] = useState('');
    const [provinceId, setProvinceId] = useState(0);
    const [cityName, setCityName] = useState('');
    const [cityId, setCityId] = useState(0);
    const _receiverName = useRef();
    const _receiverNumber = useRef();
    const _fullAddress = useRef();
    const _subdistrict = useRef();
    const _postcode = useRef();

    const getProvinceCity = (id) => {
        const cities = [];
        cityLists.forEach((value, index) => {
            if (value.province_id === id) {
                cities.push(value);
            }
        });
        setFilterCity(cities);
    };

    const handlePhoneNumber = (e) => {
        const inputValue = e.target.value;
        const checkInput = inputValue.replace(/[^0-9]/g, '');
        setPhoneNumber(checkInput);
    };

    const handlePostCode = (e) => {
        const inputValue = e.target.value;
        const checkInput = inputValue.replace(/[^0-9]/g, '');
        setPostCode(checkInput);
    };

    const userAddNewAddress = () => {
        const receiver_name = _receiverName.current.value;
        const receiver_number = _receiverNumber.current.value;
        const street = _fullAddress.current.value;
        const subdistrict = _subdistrict.current.value;
        const postcode = _postcode.current.value;
        const province_name = provinceName;
        const province_id = provinceId;
        const city_name = cityName;
        const city_id = cityId;

        if (
            receiver_name === '' ||
            receiver_number === '' ||
            street === '' ||
            subdistrict === '' ||
            postcode === '' ||
            province_name === '' ||
            province_id === '' ||
            city_name === '' ||
            city_id === ''
        ) {
            toast.error('Please fill all the fields');
        } else if (phoneNumber.length < 12) {
            toast.error('Phone Number Must be 12 Digits');
        } else if (postCode.length < 5) {
            toast.error('Postcode must be 5 Digits');
        } else {
            dispatch(
                addNewAddressAsync({
                    receiver_name,
                    receiver_number,
                    street,
                    subdistrict,
                    postcode,
                    province_name,
                    province_id,
                    city_name,
                    city_id,
                }),
            );

            _receiverName.current.value = '';
            _receiverNumber.current.value = '';
            _fullAddress.current.value = '';
            _subdistrict.current.value = '';
            _postcode.current.value = '';
            setPostCode('');
            setPhoneNumber('');
            setProvinceName('');
            setCityName('');

            setTimeout(() => {
                props?.data?.closeAddAddress();
            }, 1000);
        }
    };

    const cancelButton = () => {
        _receiverName.current.value = '';
        _receiverNumber.current.value = '';
        _fullAddress.current.value = '';
        _subdistrict.current.value = '';
        _postcode.current.value = '';
        setProvinceName('');
        setCityName('');

        props?.data?.closeAddAddress();
    };

    useEffect(() => {
        dispatch(getProvincesAsync());
        dispatch(getCitiesAsync());
        documentBodyRef.current = document.body;
    }, []);
    return (
        <Modal
            show={props?.data?.showAddAddress}
            onClose={() => cancelButton()}
            root={documentBodyRef.current}
        >
            <Modal.Header>
                <div className="flex gap-9 items-center justify-start">
                    <div onClick={() => props?.data?.closeAddAddress()}>
                        <IoIosArrowBack />
                    </div>
                    <div>Add New Address</div>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="flex flex-col gap-3">
                    <div>
                        <Label>Receiver Name</Label>
                        <TextInput
                            ref={_receiverName}
                            placeholder="Receiver Name"
                        ></TextInput>
                    </div>
                    <div>
                        <Label>Receiver Number</Label>
                        <TextInput
                            ref={_receiverNumber}
                            placeholder="Receiver Number"
                            maxLength={12}
                            onChange={handlePhoneNumber}
                            value={phoneNumber}
                        ></TextInput>
                    </div>
                    <div>
                        <Label>Full Address</Label>
                        <Textarea
                            maxLength={200}
                            type="text"
                            onChange={(e) => {
                                setCountChar(e.target.value.length);
                            }}
                            ref={_fullAddress}
                            placeholder="Full Address"
                        />
                        <div className="flex justify-end">{countChar}/200</div>
                    </div>
                    <div>
                        <Label>Province</Label>
                        <Select
                            onChange={(e) => {
                                getProvinceCity(
                                    e.target.value
                                        .split(' ')[0]
                                        .replace(/,/g, ''),
                                );
                                setProvinceId(
                                    e.target.value
                                        .split(' ')[0]
                                        .replace(/,/g, ''),
                                );
                                setProvinceName(
                                    e.target.value
                                        .split(' ')
                                        .splice(1)
                                        .toString()
                                        .replace(/,/g, ' '),
                                );
                            }}
                        >
                            <option>Select Province</option>
                            {provinceLists?.map((value, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={`${value.province_id}, ${value.province}`}
                                    >
                                        {value.province}
                                    </option>
                                );
                            })}
                        </Select>
                    </div>
                    <div>
                        <Label>City</Label>
                        <Select
                            onChange={(e) => {
                                setCityId(
                                    e.target.value
                                        .split(' ')[0]
                                        .replace(/,/g, ''),
                                );
                                setCityName(
                                    e.target.value
                                        .split(' ')
                                        .splice(1)
                                        .toString()
                                        .replace(/,/g, ' '),
                                );
                            }}
                        >
                            <option>Select City</option>
                            {filterCity?.map((value, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={`${value.city_id}, ${value.type} ${value.city_name}`}
                                    >
                                        {value.type} {value.city_name}
                                    </option>
                                );
                            })}
                        </Select>
                    </div>
                    <div>
                        <Label>Subdistrict</Label>
                        <TextInput
                            ref={_subdistrict}
                            placeholder="Subdistrict"
                        ></TextInput>
                    </div>
                    <div>
                        <Label>Postal Code</Label>
                        <TextInput
                            maxLength={5}
                            ref={_postcode}
                            placeholder="Postal Code"
                            value={postCode}
                            onChange={handlePostCode}
                        ></TextInput>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    onClick={userAddNewAddress}
                    className="bg-sky-700 text-yellow-200"
                >
                    Add New Address
                </Button>
                <Button onClick={cancelButton} color={'failure'}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
